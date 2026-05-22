import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useCanvasStore } from '@/canvas/useCanvasStore';
import { useThumbnailStore } from '@/canvas/useThumbnailStore';
function typeLabel(type) {
    switch (type) {
        case 'image': return 'Image';
        case 'text': return 'Text';
        case 'shape': return 'Shape';
        case 'group': return 'Group';
        case 'path': return 'Path';
    }
}
export function LayerPanel() {
    const objects = useCanvasStore((s) => s.objects);
    const objectOrder = useCanvasStore((s) => s.objectOrder);
    const selectedId = useCanvasStore((s) => s.selectedId);
    const selectedIds = useCanvasStore((s) => s.selectedIds);
    const setSelected = useCanvasStore((s) => s.setSelected);
    const addToSelection = useCanvasStore((s) => s.addToSelection);
    const updateObject = useCanvasStore((s) => s.updateObject);
    const reorderObjects = useCanvasStore((s) => s.reorderObjects);
    const toggleLock = useCanvasStore((s) => s.toggleLock);
    const enterMaskEditMode = useCanvasStore((s) => s.enterMaskEditMode);
    const thumbnails = useThumbnailStore((s) => s.thumbnails);
    const dragId = useRef(null);
    const [dropPos, setDropPos] = useState(null);
    // Reversed: top layer (last in objectOrder) appears first in list
    const reversedOrder = [...objectOrder].reverse();
    function handleRowClick(e, id) {
        if (e.shiftKey) {
            e.stopPropagation();
            addToSelection(id);
        }
        else {
            setSelected(id);
        }
    }
    function handleEyeClick(e, obj) {
        e.stopPropagation();
        updateObject(obj.id, { visible: !obj.visible });
    }
    function handleLockClick(e, id) {
        e.stopPropagation();
        toggleLock(id);
    }
    function getDisplayName(id, originalIndex) {
        const obj = objects[id];
        if (!obj)
            return 'Unknown';
        if (obj.name)
            return obj.name;
        return `${typeLabel(obj.type)} ${originalIndex + 1}`;
    }
    return (_jsxs("div", { style: {
            width: 240,
            flexShrink: 0,
            height: '100%',
            background: '#2a2a2a',
            borderRight: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            overflow: 'hidden',
        }, children: [_jsx("div", { style: {
                    padding: '12px 12px 8px',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 'bold',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid #333',
                    flexShrink: 0,
                }, children: "Layers" }), _jsxs("div", { style: {
                    flex: 1,
                    overflowY: 'auto',
                }, children: [reversedOrder.length === 0 && (_jsx("div", { style: {
                            padding: '16px 12px',
                            color: '#555',
                            fontSize: 12,
                        }, children: "No layers yet" })), reversedOrder.map((id) => {
                        const obj = objects[id];
                        if (!obj)
                            return null;
                        const originalIndex = objectOrder.indexOf(id);
                        const isSelected = selectedIds.includes(id) || selectedId === id;
                        const isDropBefore = dropPos?.id === id && dropPos.side === 'before';
                        const isDropAfter = dropPos?.id === id && dropPos.side === 'after';
                        return (_jsxs("div", { draggable: true, onClick: (e) => handleRowClick(e, id), onDragStart: (e) => {
                                dragId.current = id;
                                e.dataTransfer.setData('text/plain', id);
                                e.dataTransfer.effectAllowed = 'move';
                            }, onDragOver: (e) => {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = 'move';
                                const rect = e.currentTarget.getBoundingClientRect();
                                const side = e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
                                setDropPos({ id, side });
                            }, onDragLeave: (e) => {
                                if (!e.currentTarget.contains(e.relatedTarget))
                                    setDropPos(null);
                            }, onDrop: (e) => {
                                e.preventDefault();
                                const fromId = dragId.current ?? e.dataTransfer.getData('text/plain');
                                const side = dropPos?.id === id ? dropPos.side : 'before';
                                if (fromId && fromId !== id)
                                    reorderObjects(fromId, id, side);
                                dragId.current = null;
                                setDropPos(null);
                            }, onDragEnd: () => { dragId.current = null; setDropPos(null); }, style: {
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 8px',
                                background: isSelected ? 'rgba(0,170,255,0.15)' : 'transparent',
                                cursor: 'pointer',
                                userSelect: 'none',
                                gap: 6,
                                borderLeft: isSelected ? '2px solid #0af' : '2px solid transparent',
                                borderTop: isDropBefore ? '2px solid #0af' : '2px solid transparent',
                                borderBottom: isDropAfter ? '2px solid #0af' : '2px solid transparent',
                                boxSizing: 'border-box',
                            }, children: [obj.type === 'image' && obj.mask != null ? (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }, children: [_jsx("div", { onClick: (e) => { e.stopPropagation(); setSelected(id); }, style: {
                                                width: 30, height: 30, borderRadius: 3, overflow: 'hidden',
                                                background: '#111', border: '1px solid #3a3a3a', cursor: 'pointer', flexShrink: 0,
                                            }, children: thumbnails[id] != null ? (_jsx("img", { src: thumbnails[id], style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }, alt: "", draggable: false })) : (_jsx("div", { style: { width: '100%', height: '100%', background: '#222' } })) }), _jsx("span", { style: { color: '#555', fontSize: 10, flexShrink: 0 }, children: "\u26D3" }), _jsx("div", { onClick: (e) => { e.stopPropagation(); enterMaskEditMode(id); }, title: "Click to edit mask", style: {
                                                width: 30, height: 30, borderRadius: 3, overflow: 'hidden',
                                                background: '#000', border: '1px solid #3a3a3a', cursor: 'pointer', flexShrink: 0,
                                            }, children: thumbnails[`${id}__mask`] != null ? (_jsx("img", { src: thumbnails[`${id}__mask`], style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }, alt: "mask", draggable: false })) : (_jsx("div", { style: { width: '100%', height: '100%', background: '#111' } })) })] })) : (_jsx("div", { style: {
                                        width: 44, height: 44, flexShrink: 0, borderRadius: 3,
                                        overflow: 'hidden', background: '#111', border: '1px solid #3a3a3a',
                                    }, children: thumbnails[id] != null ? (_jsx("img", { src: thumbnails[id], style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }, alt: "", draggable: false })) : (_jsx("div", { style: { width: '100%', height: '100%', background: '#222' } })) })), _jsx("span", { style: {
                                        flex: 1,
                                        color: obj.visible ? '#ddd' : '#555',
                                        fontSize: 13,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        pointerEvents: 'none',
                                    }, children: getDisplayName(id, originalIndex) }), _jsx("button", { draggable: false, onClick: (e) => handleLockClick(e, id), title: obj.locked ? 'Unlock layer' : 'Lock layer', style: {
                                        flexShrink: 0,
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '0 2px',
                                        fontSize: 13,
                                        lineHeight: '1',
                                        opacity: obj.locked ? 1 : 0.3,
                                    }, children: obj.locked ? '🔒' : '🔓' }), _jsx("button", { draggable: false, onClick: (e) => handleEyeClick(e, obj), title: obj.visible ? 'Hide layer' : 'Show layer', style: {
                                        flexShrink: 0,
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '0 2px',
                                        fontSize: 14,
                                        lineHeight: '1',
                                        opacity: 0.7,
                                    }, children: obj.visible ? '👁' : '🚫' })] }, id));
                    })] })] }));
}
