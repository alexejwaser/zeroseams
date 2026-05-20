import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { join, dirname } from 'path'
import { writeFile, readFile, readdir, stat, mkdir } from 'fs/promises'
import { homedir } from 'os'

function getZeroSeamsDir(): string {
  return join(homedir(), 'Documents', 'ZeroSeams')
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

ipcMain.handle(
  'save-file',
  async (_event, { filename, base64 }: { filename: string; base64: string }) => {
    const win = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0]
    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      defaultPath: join(app.getPath('downloads'), filename),
      filters: [{ name: 'PNG Image', extensions: ['png'] }],
    })
    if (canceled || !filePath) return { success: false, error: 'cancelled' }
    try {
      await writeFile(filePath, Buffer.from(base64, 'base64'))
      console.log(`[main] saved → ${filePath}`)
      return { success: true }
    } catch (error) {
      console.error(`[main] save-file error:`, error)
      return { success: false, error: String(error) }
    }
  },
)

ipcMain.handle(
  'autosave-project',
  async (_event, { filename, json }: { filename: string; json: string }) => {
    const dir = getZeroSeamsDir()
    try {
      await mkdir(dir, { recursive: true })
      const filePath = join(dir, `${filename}.zeroseams`)
      await writeFile(filePath, json, 'utf-8')
      console.log(`[main] autosaved → ${filePath}`)
      return { success: true, filePath }
    } catch (error) {
      console.error(`[main] autosave-project error:`, error)
      return { success: false, error: String(error) }
    }
  },
)

ipcMain.handle('open-project', async () => {
  const win = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0]
  const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    filters: [{ name: 'Zero Seams Project', extensions: ['zeroseams'] }],
    properties: ['openFile'],
  })
  if (canceled || filePaths.length === 0) return { success: false }
  try {
    const json = await readFile(filePaths[0], 'utf-8')
    return { success: true, json }
  } catch (error) {
    console.error(`[main] open-project error:`, error)
    return { success: false, error: String(error) }
  }
})

ipcMain.handle(
  'save-project-as',
  async (_event, { json }: { json: string }) => {
    const win = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0]
    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      defaultPath: join(getZeroSeamsDir(), 'untitled.zeroseams'),
      filters: [{ name: 'Zero Seams Project', extensions: ['zeroseams'] }],
    })
    if (canceled || !filePath) return { success: false, error: 'cancelled' }
    try {
      await mkdir(dirname(filePath), { recursive: true })
      await writeFile(filePath, json, 'utf-8')
      return { success: true, filePath }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  },
)

ipcMain.handle(
  'save-project',
  async (_event, { filePath, json }: { filePath: string; json: string }) => {
    try {
      await writeFile(filePath, json, 'utf-8')
      return { success: true }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  },
)

ipcMain.handle('get-system-fonts', async () => {
  return app.getSystemFonts()
})

ipcMain.handle('list-recent-projects', async () => {
  const dir = getZeroSeamsDir()
  try {
    const entries = await readdir(dir)
    const zeroseamsFiles = entries.filter((name) => name.endsWith('.zeroseams'))
    const files = await Promise.all(
      zeroseamsFiles.map(async (name) => {
        const filePath = join(dir, name)
        const stats = await stat(filePath)
        return {
          name,
          path: filePath,
          modifiedAt: stats.mtime.toISOString(),
        }
      }),
    )
    return { files }
  } catch (error) {
    // Directory doesn't exist yet
    return { files: [] }
  }
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
