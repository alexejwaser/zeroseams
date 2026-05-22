import { useEffect } from 'react';
import { useCanvasStore } from './useCanvasStore';
export function useDeleteShortcut() {
    const selectedId = useCanvasStore((s) => s.selectedId);
    const removeObject = useCanvasStore((s) => s.removeObject);
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key !== 'Backspace' && e.key !== 'Delete')
                return;
            const active = document.activeElement;
            if (active instanceof HTMLInputElement)
                return;
            if (active instanceof HTMLTextAreaElement)
                return;
            if (active instanceof HTMLElement && active.isContentEditable)
                return;
            if (!selectedId)
                return;
            e.preventDefault();
            removeObject(selectedId);
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedId, removeObject]);
}
