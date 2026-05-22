import { create } from 'zustand';
export const PLATFORM_PRESETS = {
    instagram: [
        { ratio: 'square', label: '1:1', width: 1080, height: 1080 },
        { ratio: 'portrait', label: '4:5', width: 1080, height: 1350 },
    ],
    tiktok: [
        { ratio: 'story', label: '9:16', width: 1080, height: 1920 },
        { ratio: 'square', label: '1:1', width: 1080, height: 1080 },
    ],
    facebook: [
        { ratio: 'square', label: '1:1', width: 1080, height: 1080 },
        { ratio: 'portrait', label: '4:5', width: 1080, height: 1350 },
        { ratio: 'landscape', label: '16:9', width: 1080, height: 608 },
    ],
    threads: [
        { ratio: 'square', label: '1:1', width: 1080, height: 1080 },
        { ratio: 'portrait', label: '4:5', width: 1080, height: 1350 },
    ],
    custom: [
        { ratio: 'custom', label: 'Custom', width: 1080, height: 1080 },
    ],
};
const MAX_HISTORY = 50;
function makeFrames(count) {
    return Array.from({ length: count }, (_, i) => ({
        index: i,
        label: `Slide ${i + 1}`,
        backgroundColor: null,
    }));
}
function getObjectBBox(obj) {
    if (obj.type === 'image') {
        const img = obj;
        return { x: img.frameX, y: img.frameY, width: img.frameWidth, height: img.frameHeight };
    }
    return { x: obj.x, y: obj.y, width: obj.width, height: obj.height };
}
function normalizeObjectsForSnapshot(objects) {
    let changed = false;
    const result = {};
    for (const [id, obj] of Object.entries(objects)) {
        if (obj.type === 'image') {
            const img = obj;
            if (img.contentEditMode || img.maskEditMode) {
                result[id] = { ...img, contentEditMode: false, maskEditMode: false };
                changed = true;
                continue;
            }
        }
        else if (obj.type === 'path') {
            const p = obj;
            if (p.pathEditMode) {
                result[id] = { ...p, pathEditMode: false };
                changed = true;
                continue;
            }
        }
        result[id] = obj;
    }
    return changed ? result : objects;
}
export const useCanvasStore = create((set) => {
    function pushHistoryFrom(state) {
        const snapshot = {
            objects: normalizeObjectsForSnapshot(state.objects),
            objectOrder: state.objectOrder,
            ratio: state.ratio,
            frameWidth: state.frameWidth,
            frameHeight: state.frameHeight,
            frames: state.frames,
            backgroundColor: state.backgroundColor,
            frameCount: state.frameCount,
        };
        const trimmed = state.past.length >= MAX_HISTORY
            ? state.past.slice(state.past.length - MAX_HISTORY + 1)
            : state.past;
        return [...trimmed, snapshot];
    }
    return {
        objects: {},
        objectOrder: [],
        selectedId: null,
        selectedIds: [],
        frameCount: 2,
        platform: 'instagram',
        ratio: 'square',
        frameWidth: 1080,
        frameHeight: 1080,
        frames: makeFrames(2),
        backgroundColor: '#ffffff',
        activeTool: 'select',
        resizeMode: 'advanced',
        past: [],
        future: [],
        contextMenu: null,
        activeShapeKind: 'rect',
        textEditingId: null,
        textSelection: null,
        captureTextSelection: null,
        maskDrawMode: null,
        addObject: (obj) => {
            let normalized = obj;
            if (obj.type === 'shape') {
                const s = obj;
                if ((s.kind === 'line' || s.kind === 'arrow') && s.x2 === undefined) {
                    normalized = { ...s, x2: s.x + s.width, y2: s.y + s.height };
                }
            }
            return set((state) => ({
                past: pushHistoryFrom(state),
                future: [],
                objects: { ...state.objects, [normalized.id]: normalized },
                objectOrder: [...state.objectOrder, normalized.id],
            }));
        },
        updateObject: (id, patch) => set((state) => {
            const existing = state.objects[id];
            if (!existing)
                return state;
            return {
                objects: {
                    ...state.objects,
                    [id]: { ...existing, ...patch },
                },
            };
        }),
        commitUpdate: (id, patch) => set((state) => {
            const existing = state.objects[id];
            if (!existing)
                return state;
            return {
                past: pushHistoryFrom(state),
                future: [],
                objects: {
                    ...state.objects,
                    [id]: { ...existing, ...patch },
                },
            };
        }),
        removeObject: (id) => set((state) => {
            const { [id]: _removed, ...rest } = state.objects;
            return {
                past: pushHistoryFrom(state),
                future: [],
                objects: rest,
                objectOrder: state.objectOrder.filter((oid) => oid !== id),
                selectedId: state.selectedId === id ? null : state.selectedId,
                selectedIds: state.selectedIds.filter((sid) => sid !== id),
            };
        }),
        setSelected: (id) => set({
            selectedId: id,
            selectedIds: id !== null ? [id] : [],
        }),
        addToSelection: (id) => set((state) => {
            const already = state.selectedIds.includes(id);
            if (already) {
                const newIds = state.selectedIds.filter((sid) => sid !== id);
                return {
                    selectedIds: newIds,
                    selectedId: newIds.length > 0 ? newIds[newIds.length - 1] : null,
                };
            }
            return {
                selectedIds: [...state.selectedIds, id],
                // Set selectedId when coming from empty selection so properties panel shows something
                selectedId: state.selectedId ?? id,
            };
        }),
        setSelectedIds: (ids) => set({
            selectedIds: ids,
            selectedId: ids.length > 0 ? ids[ids.length - 1] : null,
        }),
        setFrameCount: (n) => set((state) => {
            const clamped = Math.max(1, Math.min(10, n));
            const current = state.frames;
            let frames;
            if (clamped > current.length) {
                frames = [
                    ...current,
                    ...Array.from({ length: clamped - current.length }, (_, i) => ({
                        index: current.length + i,
                        label: `Slide ${current.length + i + 1}`,
                        backgroundColor: null,
                    })),
                ];
            }
            else {
                frames = current.slice(0, clamped);
            }
            return { past: pushHistoryFrom(state), future: [], frameCount: clamped, frames };
        }),
        setActiveTool: (tool) => set({ activeTool: tool }),
        setResizeMode: (mode) => set({ resizeMode: mode }),
        reorderObjects: (fromId, toId, side) => set((state) => {
            const order = [...state.objectOrder];
            const fromIndex = order.indexOf(fromId);
            if (fromIndex === -1)
                return state;
            order.splice(fromIndex, 1);
            const toIndex = order.indexOf(toId);
            if (toIndex === -1)
                return state;
            // Panel is reversed from objectOrder, so:
            // 'before' in panel (insert above target visually) = insert AFTER toId in objectOrder
            // 'after' in panel (insert below target visually) = insert BEFORE toId in objectOrder
            const insertAt = side === 'before' ? toIndex + 1 : toIndex;
            order.splice(insertAt, 0, fromId);
            return { objectOrder: order };
        }),
        toggleLock: (id) => set((state) => {
            const obj = state.objects[id];
            if (!obj)
                return state;
            return {
                past: pushHistoryFrom(state),
                future: [],
                objects: {
                    ...state.objects,
                    [id]: { ...obj, locked: !obj.locked },
                },
            };
        }),
        alignObjects: (anchor) => set((state) => {
            const ids = state.selectedIds;
            if (ids.length < 2)
                return state;
            const bboxes = ids
                .map((id) => state.objects[id])
                .filter((obj) => obj !== undefined)
                .map((obj) => getObjectBBox(obj));
            if (bboxes.length < 2)
                return state;
            const minX = Math.min(...bboxes.map((b) => b.x));
            const minY = Math.min(...bboxes.map((b) => b.y));
            const maxX = Math.max(...bboxes.map((b) => b.x + b.width));
            const maxY = Math.max(...bboxes.map((b) => b.y + b.height));
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;
            const updatedObjects = { ...state.objects };
            for (const id of ids) {
                const obj = state.objects[id];
                if (!obj)
                    continue;
                const bbox = getObjectBBox(obj);
                let dx = 0;
                let dy = 0;
                switch (anchor) {
                    case 'left':
                        dx = minX - bbox.x;
                        break;
                    case 'right':
                        dx = maxX - (bbox.x + bbox.width);
                        break;
                    case 'top':
                        dy = minY - bbox.y;
                        break;
                    case 'bottom':
                        dy = maxY - (bbox.y + bbox.height);
                        break;
                    case 'centerH':
                        dx = centerX - (bbox.x + bbox.width / 2);
                        break;
                    case 'centerV':
                        dy = centerY - (bbox.y + bbox.height / 2);
                        break;
                }
                if (dx === 0 && dy === 0)
                    continue;
                if (obj.type === 'image') {
                    const img = obj;
                    updatedObjects[id] = {
                        ...img,
                        frameX: img.frameX + dx,
                        frameY: img.frameY + dy,
                        x: img.x + dx,
                        y: img.y + dy,
                    };
                }
                else {
                    updatedObjects[id] = { ...obj, x: obj.x + dx, y: obj.y + dy };
                }
            }
            return {
                past: pushHistoryFrom(state),
                future: [],
                objects: updatedObjects,
            };
        }),
        distributeObjects: (axis) => set((state) => {
            const ids = state.selectedIds;
            if (ids.length < 2)
                return state;
            const items = ids
                .map((id) => {
                const obj = state.objects[id];
                if (!obj)
                    return null;
                return { id, obj, bbox: getObjectBBox(obj) };
            })
                .filter((item) => item !== null);
            if (items.length < 2)
                return state;
            const updatedObjects = { ...state.objects };
            if (axis === 'horizontal') {
                items.sort((a, b) => a.bbox.x + a.bbox.width / 2 - (b.bbox.x + b.bbox.width / 2));
                const firstCenter = items[0].bbox.x + items[0].bbox.width / 2;
                const lastCenter = items[items.length - 1].bbox.x + items[items.length - 1].bbox.width / 2;
                const spacing = (lastCenter - firstCenter) / (items.length - 1);
                for (let i = 1; i < items.length - 1; i++) {
                    const { id, obj, bbox } = items[i];
                    const targetCenterX = firstCenter + spacing * i;
                    const dx = targetCenterX - (bbox.x + bbox.width / 2);
                    if (obj.type === 'image') {
                        const img = obj;
                        updatedObjects[id] = { ...img, frameX: img.frameX + dx, x: img.x + dx };
                    }
                    else {
                        updatedObjects[id] = { ...obj, x: obj.x + dx };
                    }
                }
            }
            else {
                items.sort((a, b) => a.bbox.y + a.bbox.height / 2 - (b.bbox.y + b.bbox.height / 2));
                const firstCenter = items[0].bbox.y + items[0].bbox.height / 2;
                const lastCenter = items[items.length - 1].bbox.y + items[items.length - 1].bbox.height / 2;
                const spacing = (lastCenter - firstCenter) / (items.length - 1);
                for (let i = 1; i < items.length - 1; i++) {
                    const { id, obj, bbox } = items[i];
                    const targetCenterY = firstCenter + spacing * i;
                    const dy = targetCenterY - (bbox.y + bbox.height / 2);
                    if (obj.type === 'image') {
                        const img = obj;
                        updatedObjects[id] = { ...img, frameY: img.frameY + dy, y: img.y + dy };
                    }
                    else {
                        updatedObjects[id] = { ...obj, y: obj.y + dy };
                    }
                }
            }
            return {
                past: pushHistoryFrom(state),
                future: [],
                objects: updatedObjects,
            };
        }),
        setRatio: (r, width, height) => set((state) => ({
            past: pushHistoryFrom(state),
            future: [],
            ratio: r,
            frameWidth: width,
            frameHeight: height,
        })),
        setPlatform: (p) => set((state) => {
            const first = PLATFORM_PRESETS[p][0];
            return {
                past: pushHistoryFrom(state),
                future: [],
                platform: p,
                ratio: first.ratio,
                frameWidth: first.width,
                frameHeight: first.height,
            };
        }),
        setFrameBackground: (frameIndex, color) => set((state) => {
            const frames = state.frames.map((f) => f.index === frameIndex ? { ...f, backgroundColor: color } : f);
            return {
                past: pushHistoryFrom(state),
                future: [],
                frames,
            };
        }),
        setCanvasBackground: (color) => set((state) => ({
            past: pushHistoryFrom(state),
            future: [],
            backgroundColor: color,
        })),
        undo: () => set((state) => {
            if (state.past.length === 0)
                return state;
            const previous = state.past[state.past.length - 1];
            const newPast = state.past.slice(0, state.past.length - 1);
            const currentSnapshot = {
                objects: state.objects,
                objectOrder: state.objectOrder,
                ratio: state.ratio,
                frameWidth: state.frameWidth,
                frameHeight: state.frameHeight,
                frames: state.frames,
                backgroundColor: state.backgroundColor,
                frameCount: state.frameCount,
            };
            return {
                past: newPast,
                future: [currentSnapshot, ...state.future],
                objects: previous.objects,
                objectOrder: previous.objectOrder,
                ratio: previous.ratio,
                frameWidth: previous.frameWidth,
                frameHeight: previous.frameHeight,
                frames: previous.frames,
                backgroundColor: previous.backgroundColor,
                frameCount: previous.frameCount,
            };
        }),
        redo: () => set((state) => {
            if (state.future.length === 0)
                return state;
            const next = state.future[0];
            const newFuture = state.future.slice(1);
            const currentSnapshot = {
                objects: state.objects,
                objectOrder: state.objectOrder,
                ratio: state.ratio,
                frameWidth: state.frameWidth,
                frameHeight: state.frameHeight,
                frames: state.frames,
                backgroundColor: state.backgroundColor,
                frameCount: state.frameCount,
            };
            return {
                past: [...state.past, currentSnapshot],
                future: newFuture,
                objects: next.objects,
                objectOrder: next.objectOrder,
                ratio: next.ratio,
                frameWidth: next.frameWidth,
                frameHeight: next.frameHeight,
                frames: next.frames,
                backgroundColor: next.backgroundColor,
                frameCount: next.frameCount,
            };
        }),
        clearContentEditMode: () => set((state) => {
            const updated = {};
            let changed = false;
            for (const [id, obj] of Object.entries(state.objects)) {
                if (obj.type === 'image' && obj.contentEditMode) {
                    updated[id] = { ...obj, contentEditMode: false };
                    changed = true;
                }
                else {
                    updated[id] = obj;
                }
            }
            if (!changed)
                return { maskDrawMode: null };
            return { objects: updated, maskDrawMode: null };
        }),
        clearPathEditMode: () => set((state) => {
            const updated = {};
            let changed = false;
            for (const [id, obj] of Object.entries(state.objects)) {
                if (obj.type === 'path' && obj.pathEditMode) {
                    updated[id] = { ...obj, pathEditMode: false };
                    changed = true;
                }
                else {
                    updated[id] = obj;
                }
            }
            if (!changed)
                return { maskDrawMode: null };
            return { objects: updated, maskDrawMode: null };
        }),
        clearMaskEditMode: () => set((state) => {
            const updated = {};
            let changed = false;
            for (const [id, obj] of Object.entries(state.objects)) {
                if (obj.type === 'image' && obj.maskEditMode) {
                    updated[id] = { ...obj, maskEditMode: false };
                    changed = true;
                }
                else {
                    updated[id] = obj;
                }
            }
            if (!changed)
                return { maskDrawMode: null };
            return { objects: updated, maskDrawMode: null };
        }),
        enterMaskEditMode: (id) => set((state) => {
            const updated = {};
            for (const [oid, obj] of Object.entries(state.objects)) {
                if (obj.type === 'image') {
                    updated[oid] = {
                        ...obj,
                        contentEditMode: false,
                        maskEditMode: oid === id,
                    };
                }
                else {
                    updated[oid] = obj;
                }
            }
            return { objects: updated, maskDrawMode: null };
        }),
        enterMaskDrawMode: (id, tool) => set((state) => {
            const updated = {};
            for (const [oid, obj] of Object.entries(state.objects)) {
                if (obj.type === 'image') {
                    updated[oid] = { ...obj, contentEditMode: false, maskEditMode: false };
                }
                else if (obj.type === 'path') {
                    updated[oid] = { ...obj, pathEditMode: false };
                }
                else {
                    updated[oid] = obj;
                }
            }
            return { objects: updated, maskDrawMode: { id, tool } };
        }),
        clearMaskDrawMode: () => set({ maskDrawMode: null }),
        moveObject: (id, dx, dy) => set((state) => {
            const obj = state.objects[id];
            if (!obj)
                return state;
            let moved;
            if (obj.type === 'shape') {
                const s = obj;
                moved = { ...s, x: s.x + dx, y: s.y + dy,
                    ...(s.x2 !== undefined ? { x2: s.x2 + dx, y2: (s.y2 ?? s.y) + dy } : {}) };
            }
            else if (obj.type === 'path') {
                const p = obj;
                moved = { ...p, x: p.x + dx, y: p.y + dy,
                    anchors: p.anchors.map((a) => ({ ...a, x: a.x + dx, y: a.y + dy })) };
            }
            else if (obj.type === 'image') {
                const img = obj;
                moved = { ...img, x: img.x + dx, y: img.y + dy,
                    frameX: img.frameX + dx, frameY: img.frameY + dy };
            }
            else {
                moved = { ...obj, x: obj.x + dx, y: obj.y + dy };
            }
            return {
                past: pushHistoryFrom(state),
                future: [],
                objects: { ...state.objects, [id]: moved },
            };
        }),
        setContextMenu: (menuState) => set({ contextMenu: menuState }),
        setActiveShapeKind: (kind) => set({ activeShapeKind: kind }),
        setTextEditing: (id) => set({ textEditingId: id, textSelection: null }),
        setTextSelection: (range) => set({ textSelection: range }),
        setCaptureTextSelection: (fn) => set({ captureTextSelection: fn }),
        loadProject: (project) => set(() => {
            // Migrate old TextObjects that used a flat `text` field instead of `spans`
            const migratedObjects = {};
            for (const [id, obj] of Object.entries(project.objects)) {
                if (obj.type === 'text') {
                    const t = obj;
                    if (!t.spans || t.spans.length === 0) {
                        migratedObjects[id] = {
                            ...t,
                            spans: [{ text: t.text ?? '' }],
                        };
                    }
                    else {
                        migratedObjects[id] = obj;
                    }
                }
                else if (obj.type === 'image') {
                    const img = obj;
                    migratedObjects[id] = {
                        ...img,
                        maskEditMode: img.maskEditMode ?? false,
                    };
                }
                else {
                    migratedObjects[id] = obj;
                }
            }
            return {
                objects: migratedObjects,
                objectOrder: project.objectOrder,
                frameCount: project.frameCount,
                platform: project.platform ?? 'instagram',
                ratio: project.ratio,
                frameWidth: project.dimensions.width,
                frameHeight: project.dimensions.height,
                frames: project.frames,
                backgroundColor: project.backgroundColor,
                selectedId: null,
                selectedIds: [],
                contextMenu: null,
                activeTool: 'select',
                textEditingId: null,
                textSelection: null,
                past: [],
                future: [],
            };
        }),
        selectAll: () => set((state) => {
            const ids = state.objectOrder.filter((id) => {
                const obj = state.objects[id];
                return obj && obj.visible && !obj.locked;
            });
            return {
                selectedIds: ids,
                selectedId: ids.length > 0 ? ids[ids.length - 1] : null,
            };
        }),
        bringForward: (id) => set((state) => {
            const order = [...state.objectOrder];
            const idx = order.indexOf(id);
            if (idx === -1 || idx === order.length - 1)
                return state;
            // Swap with next
            const temp = order[idx + 1];
            order[idx + 1] = order[idx];
            order[idx] = temp;
            return {
                past: pushHistoryFrom(state),
                future: [],
                objectOrder: order,
            };
        }),
        sendBackward: (id) => set((state) => {
            const order = [...state.objectOrder];
            const idx = order.indexOf(id);
            if (idx === -1 || idx === 0)
                return state;
            // Swap with previous
            const temp = order[idx - 1];
            order[idx - 1] = order[idx];
            order[idx] = temp;
            return {
                past: pushHistoryFrom(state),
                future: [],
                objectOrder: order,
            };
        }),
        bringToFront: (id) => set((state) => {
            const order = [...state.objectOrder];
            const idx = order.indexOf(id);
            if (idx === -1 || idx === order.length - 1)
                return state;
            order.splice(idx, 1);
            order.push(id);
            return {
                past: pushHistoryFrom(state),
                future: [],
                objectOrder: order,
            };
        }),
        sendToBack: (id) => set((state) => {
            const order = [...state.objectOrder];
            const idx = order.indexOf(id);
            if (idx === -1 || idx === 0)
                return state;
            order.splice(idx, 1);
            order.unshift(id);
            return {
                past: pushHistoryFrom(state),
                future: [],
                objectOrder: order,
            };
        }),
        duplicateObject: (id, offsetX = 10, offsetY = 10) => set((state) => {
            const obj = state.objects[id];
            if (!obj)
                return state;
            const newId = crypto.randomUUID();
            let duplicate;
            if (obj.type === 'image') {
                const img = obj;
                duplicate = {
                    ...img,
                    id: newId,
                    name: undefined,
                    contentEditMode: false,
                    maskEditMode: false,
                    frameX: img.frameX + offsetX,
                    frameY: img.frameY + offsetY,
                    x: img.x + offsetX,
                    y: img.y + offsetY,
                };
            }
            else {
                duplicate = {
                    ...obj,
                    id: newId,
                    name: undefined,
                    x: obj.x + offsetX,
                    y: obj.y + offsetY,
                };
                if (obj.type === 'shape') {
                    const s = obj;
                    if ((s.kind === 'line' || s.kind === 'arrow') && s.x2 !== undefined) {
                        duplicate = { ...duplicate, x2: s.x2 + offsetX, y2: (s.y2 ?? s.y) + offsetY };
                    }
                }
            }
            // Insert duplicate right after the source in objectOrder
            const srcIdx = state.objectOrder.indexOf(id);
            const newOrder = [...state.objectOrder];
            newOrder.splice(srcIdx + 1, 0, newId);
            return {
                past: pushHistoryFrom(state),
                future: [],
                objects: { ...state.objects, [newId]: duplicate },
                objectOrder: newOrder,
            };
        }),
        duplicateObjectAtOrigin: (id, originPos, finalPos) => set((state) => {
            const obj = state.objects[id];
            if (!obj)
                return state;
            const newId = crypto.randomUUID();
            // Build the clone that stays at originPos
            let clone;
            if (obj.type === 'image') {
                const img = obj;
                const op = originPos;
                clone = {
                    ...img,
                    id: newId,
                    name: undefined,
                    contentEditMode: false,
                    maskEditMode: false,
                    frameX: op.frameX,
                    frameY: op.frameY,
                    x: op.frameX,
                    y: op.frameY,
                };
            }
            else {
                const op = originPos;
                clone = {
                    ...obj,
                    id: newId,
                    name: undefined,
                    x: op.x,
                    y: op.y,
                };
            }
            // Update the source object to finalPos
            let updatedSource;
            if (obj.type === 'image') {
                const img = obj;
                const fp = finalPos;
                updatedSource = {
                    ...img,
                    frameX: fp.frameX,
                    frameY: fp.frameY,
                    x: fp.frameX,
                    y: fp.frameY,
                };
            }
            else {
                const fp = finalPos;
                updatedSource = {
                    ...obj,
                    x: fp.x,
                    y: fp.y,
                };
            }
            // Insert clone right before the source in objectOrder
            const srcIdx = state.objectOrder.indexOf(id);
            const newOrder = [...state.objectOrder];
            newOrder.splice(srcIdx, 0, newId);
            return {
                past: pushHistoryFrom(state),
                future: [],
                objects: {
                    ...state.objects,
                    [id]: updatedSource,
                    [newId]: clone,
                },
                objectOrder: newOrder,
            };
        }),
    };
});
