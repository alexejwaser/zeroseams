import { create } from 'zustand'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface SaveStatusState {
  status: SaveStatus
  lastSavedAt: string | null
  setStatus: (status: SaveStatus) => void
  setLastSavedAt: (at: string) => void
}

export const useSaveStatusStore = create<SaveStatusState>((set) => ({
  status: 'idle',
  lastSavedAt: null,
  setStatus: (status) => set({ status }),
  setLastSavedAt: (at) => set({ lastSavedAt: at }),
}))
