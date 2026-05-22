import { create } from 'zustand';
export const useSaveStatusStore = create((set) => ({
    status: 'idle',
    lastSavedAt: null,
    projectId: crypto.randomUUID(),
    projectName: 'Untitled Project',
    projectFilename: 'untitled',
    createdAt: new Date().toISOString(),
    currentFilePath: null,
    setStatus: (status) => set({ status }),
    setLastSavedAt: (at) => set({ lastSavedAt: at }),
    setProjectMeta: (id, name, filename, createdAt) => set({ projectId: id, projectName: name, projectFilename: filename, createdAt }),
    setCurrentFilePath: (path) => set({ currentFilePath: path }),
}));
