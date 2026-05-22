import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useCanvasStore } from '@/canvas/useCanvasStore';
import { useBackgroundRemoval } from '../ai/useBackgroundRemoval';
import { useAIStore } from '../ai/useAIStore';
import { useExternalEdit } from '../canvas/useExternalEdit';
import { useSaveStatusStore } from './useSaveStatusStore';
function MenuItem({ label, kbd, disabled = false, onClick }) {
    const [hovered, setHovered] = useState(false);
    function handleClick() {
        if (disabled)
            return;
        onClick();
    }
    return (_jsxs("div", { role: "menuitem", onClick: handleClick, onMouseEnter: () => { if (!disabled)
            setHovered(true); }, onMouseLeave: () => setHovered(false), style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 14px',
            fontSize: 13,
            color: disabled ? '#555' : '#e0e0e0',
            cursor: disabled ? 'default' : 'pointer',
            background: hovered && !disabled ? '#2a2a2a' : 'transparent',
            userSelect: 'none',
        }, children: [_jsx("span", { children: label }), kbd != null && (_jsx("span", { style: {
                    fontSize: 11,
                    color: '#666',
                    marginLeft: 24,
                }, children: kbd }))] }));
}
function Divider() {
    return (_jsx("div", { style: {
            height: 1,
            background: '#333',
            margin: '4px 0',
        } }));
}
export function ContextMenu() {
    const contextMenu = useCanvasStore((s) => s.contextMenu);
    const setContextMenu = useCanvasStore((s) => s.setContextMenu);
    const objects = useCanvasStore((s) => s.objects);
    const frameCount = useCanvasStore((s) => s.frameCount);
    const duplicateObject = useCanvasStore((s) => s.duplicateObject);
    const bringToFront = useCanvasStore((s) => s.bringToFront);
    const bringForward = useCanvasStore((s) => s.bringForward);
    const sendBackward = useCanvasStore((s) => s.sendBackward);
    const sendToBack = useCanvasStore((s) => s.sendToBack);
    const toggleLock = useCanvasStore((s) => s.toggleLock);
    const removeObject = useCanvasStore((s) => s.removeObject);
    const setFrameCount = useCanvasStore((s) => s.setFrameCount);
    const commitUpdate = useCanvasStore((s) => s.commitUpdate);
    const { removeBg } = useBackgroundRemoval();
    const operations = useAIStore((s) => s.operations);
    const { editExternally } = useExternalEdit();
    const currentFilePath = useSaveStatusStore((s) => s.currentFilePath);
    const menuRef = useRef(null);
    const [clampedPos, setClampedPos] = useState(null);
    // Clamp position to viewport after mount
    useLayoutEffect(() => {
        if (contextMenu == null || menuRef.current == null) {
            setClampedPos(null);
            return;
        }
        const { clientWidth, clientHeight } = menuRef.current;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const left = Math.min(contextMenu.x, vw - clientWidth - 4);
        const top = Math.min(contextMenu.y, vh - clientHeight - 4);
        setClampedPos({ left: Math.max(0, left), top: Math.max(0, top) });
    }, [contextMenu]);
    // Dismiss on outside mousedown
    useEffect(() => {
        if (contextMenu == null)
            return;
        function handleMouseDown(e) {
            if (menuRef.current != null && !menuRef.current.contains(e.target)) {
                setContextMenu(null);
            }
        }
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                setContextMenu(null);
            }
        }
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [contextMenu, setContextMenu]);
    if (contextMenu == null)
        return null;
    const { targetId } = contextMenu;
    // Use the clamped position once available, otherwise use the raw position
    // (the menu renders at raw position on first paint, then snaps — imperceptible)
    const left = clampedPos != null ? clampedPos.left : contextMenu.x;
    const top = clampedPos != null ? clampedPos.top : contextMenu.y;
    function dismiss() {
        setContextMenu(null);
    }
    const content = (_jsx("div", { ref: menuRef, role: "menu", style: {
            position: 'fixed',
            left,
            top,
            background: '#1e1e1e',
            border: '1px solid #3a3a3a',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            padding: '4px 0',
            minWidth: 200,
            zIndex: 9999,
        }, children: targetId != null ? ((() => {
            const obj = objects[targetId];
            const locked = obj?.locked ?? false;
            const isImage = obj?.type === 'image';
            const bgOpRunning = isImage && Object.values(operations).some((op) => op.type === 'background-removal' &&
                op.targetObjectId === targetId &&
                op.status === 'running');
            return (_jsxs(_Fragment, { children: [_jsx(MenuItem, { label: "Duplicate", kbd: "\u2318D", disabled: locked, onClick: () => { duplicateObject(targetId); dismiss(); } }), _jsx(Divider, {}), _jsx(MenuItem, { label: "Bring to Front", kbd: "\u2318\u21E7]", disabled: locked, onClick: () => { bringToFront(targetId); dismiss(); } }), _jsx(MenuItem, { label: "Bring Forward", kbd: "\u2318]", disabled: locked, onClick: () => { bringForward(targetId); dismiss(); } }), _jsx(MenuItem, { label: "Send Backward", kbd: "\u2318[", disabled: locked, onClick: () => { sendBackward(targetId); dismiss(); } }), _jsx(MenuItem, { label: "Send to Back", kbd: "\u2318\u21E7[", disabled: locked, onClick: () => { sendToBack(targetId); dismiss(); } }), _jsx(Divider, {}), _jsx(MenuItem, { label: locked ? 'Unlock' : 'Lock', kbd: "\u2318L", onClick: () => { toggleLock(targetId); dismiss(); } }), _jsx(MenuItem, { label: "Delete", kbd: "\u232B", onClick: () => { removeObject(targetId); dismiss(); } }), isImage && (_jsxs(_Fragment, { children: [_jsx("hr", { style: { borderColor: '#3a3a3a', margin: '4px 0', border: 'none', borderTop: '1px solid #3a3a3a' } }), _jsx(MenuItem, { label: bgOpRunning ? 'Removing Background…' : 'Remove Background', disabled: bgOpRunning || locked, onClick: () => { void removeBg(targetId); setContextMenu(null); } }), _jsx(MenuItem, { label: "Fit Frame to Content", disabled: locked, onClick: () => {
                                    const img = obj;
                                    const θ = (img.rotation ?? 0) * (Math.PI / 180);
                                    const dx = img.contentOffsetX * Math.cos(θ) - img.contentOffsetY * Math.sin(θ);
                                    const dy = img.contentOffsetX * Math.sin(θ) + img.contentOffsetY * Math.cos(θ);
                                    commitUpdate(targetId, {
                                        frameX: img.frameX + dx, frameY: img.frameY + dy,
                                        x: img.frameX + dx, y: img.frameY + dy,
                                        frameWidth: img.contentWidth, frameHeight: img.contentHeight,
                                        width: img.contentWidth, height: img.contentHeight,
                                        contentOffsetX: 0, contentOffsetY: 0,
                                    });
                                    setContextMenu(null);
                                } }), _jsx(MenuItem, { label: "Fill Frame with Content", disabled: locked, onClick: () => {
                                    const img = obj;
                                    const scale = Math.max(img.frameWidth / img.contentWidth, img.frameHeight / img.contentHeight);
                                    commitUpdate(targetId, {
                                        contentWidth: img.contentWidth * scale,
                                        contentHeight: img.contentHeight * scale,
                                        contentOffsetX: (img.frameWidth - img.contentWidth * scale) / 2,
                                        contentOffsetY: (img.frameHeight - img.contentHeight * scale) / 2,
                                    });
                                    setContextMenu(null);
                                } }), _jsx(MenuItem, { label: "Edit Externally", disabled: locked, onClick: () => {
                                    void editExternally(targetId, currentFilePath);
                                    dismiss();
                                } })] }))] }));
        })()) : (_jsxs(_Fragment, { children: [_jsx(MenuItem, { label: "Add Frame", disabled: frameCount >= 10, onClick: () => { setFrameCount(frameCount + 1); dismiss(); } }), _jsx(MenuItem, { label: "Remove Frame", disabled: frameCount <= 1, onClick: () => { setFrameCount(frameCount - 1); dismiss(); } })] })) }));
    return ReactDOM.createPortal(content, document.body);
}
