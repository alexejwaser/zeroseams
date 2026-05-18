import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  saveFile: (filename: string, base64: string): Promise<{ success: boolean; error?: string }> =>
    ipcRenderer.invoke('save-file', { filename, base64 }),
})
