// Type augmentation for the contextBridge API exposed by src/electron/preload.ts

interface SaveFileResult {
  success: boolean
  error?: string
}

interface AutosaveProjectResult {
  success: boolean
  filePath?: string
  error?: string
}

interface OpenProjectResult {
  success: boolean
  json?: string
  error?: string
}

interface RecentProjectFile {
  name: string
  path: string
  modifiedAt: string
}

interface ListRecentProjectsResult {
  files: RecentProjectFile[]
}

interface ElectronAPI {
  platform: NodeJS.Platform
  saveFile: (filename: string, base64: string) => Promise<SaveFileResult>
  autosaveProject: (filename: string, json: string) => Promise<AutosaveProjectResult>
  openProject: () => Promise<OpenProjectResult>
  listRecentProjects: () => Promise<ListRecentProjectsResult>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {}
