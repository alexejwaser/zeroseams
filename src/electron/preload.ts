import { contextBridge } from 'electron'

// Expose a minimal API surface to the renderer.
// Expand this as IPC channels are added.
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
})
