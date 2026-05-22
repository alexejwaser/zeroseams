import { useEffect } from 'react';
import { useCanvasStore } from './useCanvasStore';
import { useViewportStore } from './useViewportStore';
import { useSaveStatusStore } from '@/ui/useSaveStatusStore';
function buildProjectSnapshot(state, saveStore) {
    return {
        id: saveStore.projectId,
        name: saveStore.projectName,
        platform: state.platform,
        ratio: state.ratio,
        dimensions: { width: state.frameWidth, height: state.frameHeight },
        frameCount: state.frameCount,
        frames: state.frames,
        backgroundColor: state.backgroundColor,
        objects: state.objects,
        objectOrder: state.objectOrder,
        createdAt: saveStore.createdAt,
        updatedAt: new Date().toISOString(),
        version: 1,
    };
}
export function useKeyboardShortcuts() {
    const setActiveTool = useCanvasStore((s) => s.setActiveTool);
    const setSelected = useCanvasStore((s) => s.setSelected);
    const clearContentEditMode = useCanvasStore((s) => s.clearContentEditMode);
    const clearPathEditMode = useCanvasStore((s) => s.clearPathEditMode);
    const clearMaskDrawMode = useCanvasStore((s) => s.clearMaskDrawMode);
    const selectAll = useCanvasStore((s) => s.selectAll);
    const duplicateObject = useCanvasStore((s) => s.duplicateObject);
    const bringForward = useCanvasStore((s) => s.bringForward);
    const sendBackward = useCanvasStore((s) => s.sendBackward);
    const bringToFront = useCanvasStore((s) => s.bringToFront);
    const sendToBack = useCanvasStore((s) => s.sendToBack);
    const toggleLock = useCanvasStore((s) => s.toggleLock);
    const removeObject = useCanvasStore((s) => s.removeObject);
    const commitUpdate = useCanvasStore((s) => s.commitUpdate);
    const moveObject = useCanvasStore((s) => s.moveObject);
    const undo = useCanvasStore((s) => s.undo);
    const redo = useCanvasStore((s) => s.redo);
    useEffect(() => {
        function handleKeyDown(e) {
            // Skip if focus is in an editable element
            const active = document.activeElement;
            if (active instanceof HTMLInputElement)
                return;
            if (active instanceof HTMLTextAreaElement)
                return;
            if (active instanceof HTMLElement && active.isContentEditable)
                return;
            // Read current state at event time (not captured in closure)
            const state = useCanvasStore.getState();
            const { selectedId, objects } = state;
            // Tool shortcuts (no modifier)
            if (!e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                if (e.key === 'v') {
                    setActiveTool('select');
                    return;
                }
                if (e.key === 't') {
                    setActiveTool('text');
                    return;
                }
                if (e.key === 'r') {
                    setActiveTool('shape');
                    return;
                }
                if (e.key === 'p') {
                    setActiveTool('pen');
                    return;
                }
            }
            if (e.key === 'Escape') {
                // If context menu is open, let it handle its own Escape — don't clear selection
                if (useCanvasStore.getState().contextMenu !== null)
                    return;
                // If mask draw is active, cancel draw without deselecting the image
                if (useCanvasStore.getState().maskDrawMode !== null) {
                    clearMaskDrawMode();
                    return;
                }
                setSelected(null);
                clearContentEditMode();
                clearPathEditMode();
                return;
            }
            // Backspace / Delete
            if (e.key === 'Backspace' || e.key === 'Delete') {
                if (!selectedId)
                    return;
                e.preventDefault();
                removeObject(selectedId);
                return;
            }
            // Arrow keys — nudge
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                if (!selectedId)
                    return;
                const obj = objects[selectedId];
                if (!obj || obj.locked)
                    return;
                e.preventDefault();
                const delta = e.shiftKey ? 10 : 1;
                const dx = e.key === 'ArrowLeft' ? -delta : e.key === 'ArrowRight' ? delta : 0;
                const dy = e.key === 'ArrowUp' ? -delta : e.key === 'ArrowDown' ? delta : 0;
                if (obj.type === 'image') {
                    const img = obj;
                    commitUpdate(selectedId, {
                        frameX: img.frameX + dx,
                        frameY: img.frameY + dy,
                        x: img.x + dx,
                        y: img.y + dy,
                    });
                }
                else if (obj.type === 'shape') {
                    const s = obj;
                    if (s.kind === 'line' || s.kind === 'arrow') {
                        moveObject(selectedId, dx, dy);
                    }
                    else {
                        commitUpdate(selectedId, { x: obj.x + dx, y: obj.y + dy });
                    }
                }
                else if (obj.type === 'path') {
                    moveObject(selectedId, dx, dy);
                }
                else {
                    commitUpdate(selectedId, { x: obj.x + dx, y: obj.y + dy });
                }
                return;
            }
            // Meta shortcuts
            if (e.metaKey) {
                // Zoom shortcuts
                if (e.key === '=' || e.key === '+') {
                    e.preventDefault();
                    const { zoom, setZoom } = useViewportStore.getState();
                    setZoom(Math.min(8, zoom * 1.25));
                    return;
                }
                if (e.key === '-') {
                    e.preventDefault();
                    const { zoom, setZoom } = useViewportStore.getState();
                    setZoom(Math.max(0.1, zoom * 0.8));
                    return;
                }
                if (e.key === '0') {
                    e.preventDefault();
                    useViewportStore.getState().resetViewport();
                    return;
                }
                if (e.key === 's' && !e.shiftKey) {
                    e.preventDefault();
                    const saveStore = useSaveStatusStore.getState();
                    const currentState = useCanvasStore.getState();
                    const project = buildProjectSnapshot(currentState, saveStore);
                    if (saveStore.currentFilePath) {
                        window.electronAPI.saveProject(saveStore.currentFilePath, JSON.stringify(project))
                            .then(() => { })
                            .catch(() => { });
                    }
                    else {
                        window.electronAPI.saveProjectAs(JSON.stringify(project))
                            .then((result) => {
                            if (result.success && result.filePath) {
                                saveStore.setCurrentFilePath(result.filePath);
                            }
                        })
                            .catch(() => { });
                    }
                    return;
                }
                if (e.key === 's' && e.shiftKey) {
                    e.preventDefault();
                    const saveStore = useSaveStatusStore.getState();
                    const currentState = useCanvasStore.getState();
                    const project = buildProjectSnapshot(currentState, saveStore);
                    window.electronAPI.saveProjectAs(JSON.stringify(project))
                        .then((result) => {
                        if (result.success && result.filePath) {
                            saveStore.setCurrentFilePath(result.filePath);
                        }
                    })
                        .catch(() => { });
                    return;
                }
                if (e.key === 'a') {
                    e.preventDefault();
                    selectAll();
                    return;
                }
                if (e.key === 'd') {
                    e.preventDefault();
                    if (!selectedId)
                        return;
                    const obj = objects[selectedId];
                    if (!obj || obj.locked)
                        return;
                    duplicateObject(selectedId);
                    return;
                }
                if (e.key === 'z' && !e.shiftKey) {
                    e.preventDefault();
                    undo();
                    return;
                }
                if (e.key === 'z' && e.shiftKey) {
                    e.preventDefault();
                    redo();
                    return;
                }
                if (e.key === 'l') {
                    e.preventDefault();
                    if (!selectedId)
                        return;
                    toggleLock(selectedId);
                    return;
                }
                // Layer order — check shift first for to-front/to-back
                if (e.key === ']' && e.shiftKey) {
                    e.preventDefault();
                    if (!selectedId)
                        return;
                    bringToFront(selectedId);
                    return;
                }
                if (e.key === '[' && e.shiftKey) {
                    e.preventDefault();
                    if (!selectedId)
                        return;
                    sendToBack(selectedId);
                    return;
                }
                if (e.key === ']' && !e.shiftKey) {
                    e.preventDefault();
                    if (!selectedId)
                        return;
                    bringForward(selectedId);
                    return;
                }
                if (e.key === '[' && !e.shiftKey) {
                    e.preventDefault();
                    if (!selectedId)
                        return;
                    sendBackward(selectedId);
                    return;
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [
        setActiveTool,
        setSelected,
        clearContentEditMode,
        clearPathEditMode,
        clearMaskDrawMode,
        selectAll,
        duplicateObject,
        bringForward,
        sendBackward,
        bringToFront,
        sendToBack,
        toggleLock,
        removeObject,
        commitUpdate,
        moveObject,
        undo,
        redo,
    ]);
}
