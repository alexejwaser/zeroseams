import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('electronAPI', {
    platform: process.platform,
    saveFile: (filename, base64) => ipcRenderer.invoke('save-file', { filename, base64 }),
    autosaveProject: (filename, json) => ipcRenderer.invoke('autosave-project', { filename, json }),
    openProject: () => ipcRenderer.invoke('open-project'),
    listRecentProjects: () => ipcRenderer.invoke('list-recent-projects'),
    saveProjectAs: (json) => ipcRenderer.invoke('save-project-as', { json }),
    saveProject: (filePath, json) => ipcRenderer.invoke('save-project', { filePath, json }),
    getSystemFonts: () => ipcRenderer.invoke('get-system-fonts'),
    getExternalEditor: () => ipcRenderer.invoke('get-external-editor'),
    setExternalEditor: () => ipcRenderer.invoke('set-external-editor'),
    editInExternalApp: (objectId, base64, mimeType, projectFilePath) => ipcRenderer.invoke('edit-in-external-app', { objectId, base64, mimeType, projectFilePath }),
    stopExternalEdit: (objectId) => ipcRenderer.invoke('stop-external-edit', { objectId }),
    onExternalImageChanged: (cb) => {
        const handler = (_e, data) => cb(data);
        ipcRenderer.on('external-image-changed', handler);
        return () => { ipcRenderer.removeListener('external-image-changed', handler); };
    },
});
