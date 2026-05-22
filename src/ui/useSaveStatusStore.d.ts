export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
interface SaveStatusState {
    status: SaveStatus;
    lastSavedAt: string | null;
    projectId: string;
    projectName: string;
    projectFilename: string;
    createdAt: string;
    currentFilePath: string | null;
    setStatus: (status: SaveStatus) => void;
    setLastSavedAt: (at: string) => void;
    setProjectMeta: (id: string, name: string, filename: string, createdAt: string) => void;
    setCurrentFilePath: (path: string | null) => void;
}
export declare const useSaveStatusStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SaveStatusState>>;
export {};
