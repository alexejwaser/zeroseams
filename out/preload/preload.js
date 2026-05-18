let electron = require("electron");
//#region src/electron/preload.ts
electron.contextBridge.exposeInMainWorld("electronAPI", {
	platform: process.platform,
	saveFile: (filename, base64) => electron.ipcRenderer.invoke("save-file", {
		filename,
		base64
	})
});
//#endregion
