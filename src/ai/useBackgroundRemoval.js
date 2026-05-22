import { useCallback } from 'react';
import { removeBackground } from '@imgly/background-removal';
import { useCanvasStore } from '@/canvas/useCanvasStore';
import { useAIStore } from './useAIStore';
export function useBackgroundRemoval() {
    const upsertOperation = useAIStore((s) => s.upsertOperation);
    const removeBg = useCallback(async (targetObjectId) => {
        const canvasObjects = useCanvasStore.getState().objects;
        const target = canvasObjects[targetObjectId];
        if (!target || target.type !== 'image')
            return;
        const imageObj = target;
        const operationId = crypto.randomUUID();
        const runningOp = {
            id: operationId,
            type: 'background-removal',
            status: 'running',
            targetObjectId,
            progress: 0,
            startedAt: new Date().toISOString(),
        };
        upsertOperation(runningOp);
        try {
            const resultBlob = await removeBackground(imageObj.src, {
                progress: (_key, current, total) => {
                    const progress = total > 0 ? Math.round((current / total) * 100) : 0;
                    upsertOperation({ ...runningOp, progress });
                },
            });
            const dataUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(resultBlob);
            });
            useCanvasStore.getState().updateObject(targetObjectId, {
                src: dataUrl,
                backgroundRemoved: true,
                originalSrc: imageObj.src,
            });
            upsertOperation({
                ...runningOp,
                status: 'done',
                progress: 100,
                completedAt: new Date().toISOString(),
                resultDataUrl: dataUrl,
            });
        }
        catch (err) {
            upsertOperation({
                ...runningOp,
                status: 'error',
                error: String(err),
            });
        }
    }, [upsertOperation]);
    const getOperation = useCallback((targetObjectId) => {
        const ops = useAIStore.getState().operations;
        let found;
        for (const op of Object.values(ops)) {
            if (op.type === 'background-removal' && op.targetObjectId === targetObjectId) {
                found = op;
            }
        }
        return found;
    }, []);
    return { removeBg, getOperation };
}
