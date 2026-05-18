// Type augmentation for the contextBridge API exposed by src/electron/preload.ts

interface SaveFileResult {
  success: boolean
  error?: string
}

interface ElectronAPI {
  platform: NodeJS.Platform
  saveFile: (filename: string, base64: string) => Promise<SaveFileResult>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {}
