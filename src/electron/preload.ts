import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  saveFile: (filename: string, base64: string): Promise<{ success: boolean; error?: string }> =>
    ipcRenderer.invoke('save-file', { filename, base64 }),
  autosaveProject: (
    filename: string,
    json: string,
  ): Promise<{ success: boolean; filePath?: string; error?: string }> =>
    ipcRenderer.invoke('autosave-project', { filename, json }),
  openProject: (): Promise<{ success: boolean; json?: string; error?: string }> =>
    ipcRenderer.invoke('open-project'),
  listRecentProjects: (): Promise<{
    files: Array<{ name: string; path: string; modifiedAt: string }>
  }> => ipcRenderer.invoke('list-recent-projects'),
  saveProjectAs: (json: string): Promise<{ success: boolean; filePath?: string; error?: string }> =>
    ipcRenderer.invoke('save-project-as', { json }),
  saveProject: (filePath: string, json: string): Promise<{ success: boolean; error?: string }> =>
    ipcRenderer.invoke('save-project', { filePath, json }),
  getSystemFonts: (): Promise<string[]> =>
    ipcRenderer.invoke('get-system-fonts'),
})
