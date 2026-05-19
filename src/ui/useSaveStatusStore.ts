import { create } from 'zustand'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface SaveStatusState {
  status: SaveStatus
  lastSavedAt: string | null
  projectId: string
  projectName: string
  projectFilename: string
  createdAt: string
  setStatus: (status: SaveStatus) => void
  setLastSavedAt: (at: string) => void
  setProjectMeta: (id: string, name: string, filename: string, createdAt: string) => void
}

export const useSaveStatusStore = create<SaveStatusState>((set) => ({
  status: 'idle',
  lastSavedAt: null,
  projectId: crypto.randomUUID(),
  projectName: 'Untitled Project',
  projectFilename: 'untitled',
  createdAt: new Date().toISOString(),
  setStatus: (status) => set({ status }),
  setLastSavedAt: (at) => set({ lastSavedAt: at }),
  setProjectMeta: (id, name, filename, createdAt) => set({ projectId: id, projectName: name, projectFilename: filename, createdAt }),
}))
