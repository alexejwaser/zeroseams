import { useEffect, useRef, useState } from 'react';
import { useCanvasStore } from './useCanvasStore';
import { useSaveStatusStore } from '@/ui/useSaveStatusStore';
export function useAutosave() {
    const setStoreStatus = useSaveStatusStore((s) => s.setStatus);
    const setStoreLastSavedAt = useSaveStatusStore((s) => s.setLastSavedAt);
    // Local mirror for the return value (kept in sync with the store)
    const [status, setStatus] = useState('idle');
    const [lastSavedAt, setLastSavedAt] = useState(null);
    // versionRef is a local increment counter — stays in the hook
    const versionRef = useRef(0);
    const debounceRef = useRef(null);
    // Keep local state in sync with the shared store so callers of this hook
    // see the same values without an extra store subscription.
    function applyStatus(next) {
        setStatus(next);
        setStoreStatus(next);
    }
    function applyLastSavedAt(at) {
        setLastSavedAt(at);
        setStoreLastSavedAt(at);
    }
    useEffect(() => {
        const unsubscribe = useCanvasStore.subscribe(() => {
            if (debounceRef.current !== null) {
                clearTimeout(debounceRef.current);
            }
            debounceRef.current = setTimeout(() => {
                debounceRef.current = null;
                applyStatus('saving');
                const state = useCanvasStore.getState();
                const { frameCount, objects, objectOrder } = state;
                const saveStore = useSaveStatusStore.getState();
                versionRef.current += 1;
                const project = {
                    id: saveStore.projectId,
                    name: saveStore.projectName,
                    platform: state.platform,
                    ratio: state.ratio,
                    dimensions: { width: state.frameWidth, height: state.frameHeight },
                    frameCount,
                    frames: state.frames,
                    backgroundColor: state.backgroundColor,
                    objects,
                    objectOrder,
                    createdAt: saveStore.createdAt,
                    updatedAt: new Date().toISOString(),
                    version: versionRef.current,
                };
                const savePromise = window.electronAPI.autosaveProject(saveStore.projectFilename, JSON.stringify(project));
                savePromise
                    .then(() => {
                    applyStatus('saved');
                    const savedAt = new Date().toISOString();
                    applyLastSavedAt(savedAt);
                    setTimeout(() => {
                        applyStatus('idle');
                    }, 3000);
                })
                    .catch(() => {
                    applyStatus('error');
                });
            }, 2000);
        });
        return () => {
            unsubscribe();
            if (debounceRef.current !== null) {
                clearTimeout(debounceRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { status, lastSavedAt };
}
