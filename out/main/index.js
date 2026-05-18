let electron = require("electron");
let path = require("path");
let fs_promises = require("fs/promises");
//#region src/electron/index.ts
function createWindow() {
	const win = new electron.BrowserWindow({
		width: 1400,
		height: 900,
		webPreferences: {
			preload: (0, path.join)(__dirname, "../preload/preload.js"),
			contextIsolation: true,
			nodeIntegration: false
		}
	});
	if (process.env.NODE_ENV === "development") win.loadURL("http://localhost:5173");
	else win.loadFile((0, path.join)(__dirname, "../renderer/index.html"));
}
electron.ipcMain.handle("save-file", async (_event, { filename, base64 }) => {
	const win = electron.BrowserWindow.getFocusedWindow() ?? electron.BrowserWindow.getAllWindows()[0];
	const { canceled, filePath } = await electron.dialog.showSaveDialog(win, {
		defaultPath: (0, path.join)(electron.app.getPath("downloads"), filename),
		filters: [{
			name: "PNG Image",
			extensions: ["png"]
		}]
	});
	if (canceled || !filePath) return {
		success: false,
		error: "cancelled"
	};
	try {
		await (0, fs_promises.writeFile)(filePath, Buffer.from(base64, "base64"));
		console.log(`[main] saved → ${filePath}`);
		return { success: true };
	} catch (error) {
		console.error(`[main] save-file error:`, error);
		return {
			success: false,
			error: String(error)
		};
	}
});
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
	if (process.platform !== "darwin") electron.app.quit();
});
electron.app.on("activate", () => {
	if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
});
//#endregion
