import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { join, dirname, basename, extname } from 'path';
import { writeFile, readFile, readdir, stat, mkdir } from 'fs/promises';
import { homedir, tmpdir } from 'os';
import { spawn } from 'child_process';
import chokidar from 'chokidar';
function getZeroSeamsDir() {
    return join(homedir(), 'Documents', 'ZeroSeams');
}
function getPreferencesPath() {
    return join(app.getPath('userData'), 'preferences.json');
}
async function readPreferences() {
    try {
        const raw = await readFile(getPreferencesPath(), 'utf-8');
        return JSON.parse(raw);
    }
    catch {
        return {};
    }
}
async function writePreferences(prefs) {
    await writeFile(getPreferencesPath(), JSON.stringify(prefs, null, 2), 'utf-8');
}
const watchers = new Map();
const tempFiles = new Map();
let mainWindow = null;
function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            preload: join(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:5173');
    }
    else {
        win.loadFile(join(__dirname, '../renderer/index.html'));
    }
    mainWindow = win;
    win.on('closed', () => { mainWindow = null; });
}
ipcMain.handle('save-file', async (_event, { filename, base64 }) => {
    const win = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0];
    const { canceled, filePath } = await dialog.showSaveDialog(win, {
        defaultPath: join(app.getPath('downloads'), filename),
        filters: [{ name: 'PNG Image', extensions: ['png'] }],
    });
    if (canceled || !filePath)
        return { success: false, error: 'cancelled' };
    try {
        await writeFile(filePath, Buffer.from(base64, 'base64'));
        console.log(`[main] saved → ${filePath}`);
        return { success: true };
    }
    catch (error) {
        console.error(`[main] save-file error:`, error);
        return { success: false, error: String(error) };
    }
});
ipcMain.handle('autosave-project', async (_event, { filename, json }) => {
    const dir = getZeroSeamsDir();
    try {
        await mkdir(dir, { recursive: true });
        const filePath = join(dir, `${filename}.zeroseams`);
        await writeFile(filePath, json, 'utf-8');
        console.log(`[main] autosaved → ${filePath}`);
        return { success: true, filePath };
    }
    catch (error) {
        console.error(`[main] autosave-project error:`, error);
        return { success: false, error: String(error) };
    }
});
ipcMain.handle('open-project', async () => {
    const win = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0];
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
        filters: [{ name: 'Zero Seams Project', extensions: ['zeroseams'] }],
        properties: ['openFile'],
    });
    if (canceled || filePaths.length === 0)
        return { success: false };
    try {
        const json = await readFile(filePaths[0], 'utf-8');
        return { success: true, json };
    }
    catch (error) {
        console.error(`[main] open-project error:`, error);
        return { success: false, error: String(error) };
    }
});
ipcMain.handle('save-project-as', async (_event, { json }) => {
    const win = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0];
    const { canceled, filePath } = await dialog.showSaveDialog(win, {
        defaultPath: join(getZeroSeamsDir(), 'untitled.zeroseams'),
        filters: [{ name: 'Zero Seams Project', extensions: ['zeroseams'] }],
    });
    if (canceled || !filePath)
        return { success: false, error: 'cancelled' };
    try {
        await mkdir(dirname(filePath), { recursive: true });
        await writeFile(filePath, json, 'utf-8');
        return { success: true, filePath };
    }
    catch (error) {
        return { success: false, error: String(error) };
    }
});
ipcMain.handle('save-project', async (_event, { filePath, json }) => {
    try {
        await writeFile(filePath, json, 'utf-8');
        return { success: true };
    }
    catch (error) {
        return { success: false, error: String(error) };
    }
});
ipcMain.handle('get-system-fonts', async () => {
    return app.getSystemFonts();
});
ipcMain.handle('list-recent-projects', async () => {
    const dir = getZeroSeamsDir();
    try {
        const entries = await readdir(dir);
        const zeroseamsFiles = entries.filter((name) => name.endsWith('.zeroseams'));
        const files = await Promise.all(zeroseamsFiles.map(async (name) => {
            const filePath = join(dir, name);
            const stats = await stat(filePath);
            return {
                name,
                path: filePath,
                modifiedAt: stats.mtime.toISOString(),
            };
        }));
        return { files };
    }
    catch (error) {
        // Directory doesn't exist yet
        return { files: [] };
    }
});
ipcMain.handle('get-external-editor', async () => {
    const prefs = await readPreferences();
    return prefs.defaultExternalEditor ?? null;
});
ipcMain.handle('set-external-editor', async () => {
    const win = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0];
    const filters = process.platform === 'darwin'
        ? [{ name: 'Applications', extensions: ['app'] }]
        : process.platform === 'win32'
            ? [{ name: 'Executables', extensions: ['exe'] }]
            : [];
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
        title: 'Choose External Editor',
        properties: ['openFile'],
        filters,
    });
    if (canceled || filePaths.length === 0)
        return null;
    const execPath = filePaths[0];
    const name = basename(execPath, extname(execPath));
    const editor = { name, execPath };
    const prefs = await readPreferences();
    await writePreferences({ ...prefs, defaultExternalEditor: editor });
    return editor;
});
ipcMain.handle('edit-in-external-app', async (_event, { objectId, base64, projectFilePath, }) => {
    // Stop any existing watcher for this object
    const existing = watchers.get(objectId);
    if (existing) {
        await existing.close();
        watchers.delete(objectId);
    }
    // Determine temp file location
    let tempPath;
    if (projectFilePath) {
        const versionsDir = join(dirname(projectFilePath), 'versions');
        await mkdir(versionsDir, { recursive: true });
        tempPath = join(versionsDir, `${objectId}-${Date.now()}.png`);
    }
    else {
        tempPath = join(tmpdir(), `zeroseams-${objectId}-${Date.now()}.png`);
    }
    await writeFile(tempPath, Buffer.from(base64, 'base64'));
    tempFiles.set(objectId, tempPath);
    const prefs = await readPreferences();
    const editor = prefs.defaultExternalEditor;
    if (editor) {
        if (process.platform === 'darwin') {
            spawn('open', ['-a', editor.execPath, tempPath]);
        }
        else {
            spawn(editor.execPath, [tempPath]);
        }
    }
    else {
        await shell.openPath(tempPath);
    }
    const watcher = chokidar.watch(tempPath, {
        awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 },
    });
    watcher.on('change', () => {
        void (async () => {
            try {
                const buf = await readFile(tempPath);
                const newBase64 = buf.toString('base64');
                mainWindow?.webContents.send('external-image-changed', { objectId, base64: newBase64 });
            }
            catch (err) {
                console.error('[main] error reading changed file:', err);
            }
        })();
    });
    watchers.set(objectId, watcher);
    return { success: true };
});
ipcMain.handle('stop-external-edit', async (_event, { objectId }) => {
    const watcher = watchers.get(objectId);
    if (watcher) {
        await watcher.close();
        watchers.delete(objectId);
    }
    tempFiles.delete(objectId);
    return { success: true };
});
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
        createWindow();
});
