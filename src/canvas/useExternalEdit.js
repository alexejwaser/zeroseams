import { useEffect, useState } from 'react';
import { useCanvasStore } from './useCanvasStore';
export function useExternalEdit() {
    const commitUpdate = useCanvasStore((s) => s.commitUpdate);
    const objects = useCanvasStore((s) => s.objects);
    const [activeObjectId, setActiveObjectId] = useState(null);
    useEffect(() => {
        return window.electronAPI.onExternalImageChanged(({ objectId, base64 }) => {
            const obj = useCanvasStore.getState().objects[objectId];
            if (!obj)
                return;
            const mimeMatch = obj.src.match(/data:([^;]+)/);
            const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
            const patch = { src: `data:${mimeType};base64,${base64}` };
            if (!obj.originalSrc)
                patch.originalSrc = obj.src;
            commitUpdate(objectId, patch);
        });
    }, [commitUpdate]);
    async function editExternally(objectId, projectFilePath) {
        const obj = objects[objectId];
        if (!obj || obj.type !== 'image')
            return;
        const imgObj = obj;
        let editor = await window.electronAPI.getExternalEditor();
        if (!editor) {
            editor = await window.electronAPI.setExternalEditor();
            if (!editor)
                return;
        }
        const commaIdx = imgObj.src.indexOf(',');
        const header = imgObj.src.slice(0, commaIdx);
        const base64 = imgObj.src.slice(commaIdx + 1);
        const mimeMatch = header.match(/data:([^;]+)/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
        const result = await window.electronAPI.editInExternalApp(objectId, base64, mimeType, projectFilePath);
        if (result.success)
            setActiveObjectId(objectId);
    }
    async function stopEditing(objectId) {
        await window.electronAPI.stopExternalEdit(objectId);
        setActiveObjectId(null);
    }
    return { editExternally, stopEditing, activeObjectId };
}
