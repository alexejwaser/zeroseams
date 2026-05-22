import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useCanvasStore, PLATFORM_PRESETS } from '@/canvas/useCanvasStore';
import { getStageInstance } from '@/canvas/CarouselStage';
import { exportFrames, downloadFrames } from '@/canvas/exportFrames';
import { useSaveStatusStore } from './useSaveStatusStore';
const TOOL_LABELS = {
    select: 'Select',
    text: 'Text',
    shape: 'Shape',
    pen: 'Pen',
};
const TOOLS = ['select', 'text', 'shape', 'pen'];
// Pen icon SVG for Pen tool button
const PEN_ICON = (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", style: { display: 'block' }, children: _jsx("path", { d: "M9 1L11 3L4 10L1 11L2 8L9 1Z", stroke: "currentColor", strokeWidth: "1.2", strokeLinejoin: "round" }) }));
const CROP_ICON = (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [_jsx("path", { d: "M3 1v7h7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M1 3h7v7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] }));
const AUTOFILL_ICON = (_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [_jsx("rect", { x: "1", y: "1", width: "10", height: "10", rx: "1.5", stroke: "currentColor", strokeWidth: "1.2" }), _jsx("rect", { x: "3.5", y: "3.5", width: "5", height: "5", rx: "0.5", fill: "currentColor" })] }));
const PLATFORM_LABELS = {
    instagram: 'Instagram',
    tiktok: 'TikTok',
    facebook: 'Facebook',
    threads: 'Threads',
    custom: 'Custom',
};
const PLATFORMS = ['instagram', 'tiktok', 'facebook', 'threads', 'custom'];
function SaveStatusPill({ status }) {
    if (status === 'idle')
        return null;
    const config = {
        saving: { text: 'Saving…', color: '#aaa' },
        saved: { text: '✓ Saved', color: '#4c4' },
        error: { text: '⚠ Save failed', color: '#f55' },
    };
    const { text, color } = config[status];
    return (_jsx("span", { style: {
            fontSize: 12,
            color,
            whiteSpace: 'nowrap',
            userSelect: 'none',
        }, children: text }));
}
export function Toolbar() {
    const activeTool = useCanvasStore((s) => s.activeTool);
    const setActiveTool = useCanvasStore((s) => s.setActiveTool);
    const frameCount = useCanvasStore((s) => s.frameCount);
    const setFrameCount = useCanvasStore((s) => s.setFrameCount);
    const past = useCanvasStore((s) => s.past);
    const future = useCanvasStore((s) => s.future);
    const undo = useCanvasStore((s) => s.undo);
    const redo = useCanvasStore((s) => s.redo);
    const saveStatus = useSaveStatusStore((s) => s.status);
    const ratio = useCanvasStore((s) => s.ratio);
    const setRatio = useCanvasStore((s) => s.setRatio);
    const frameWidth = useCanvasStore((s) => s.frameWidth);
    const frameHeight = useCanvasStore((s) => s.frameHeight);
    const platform = useCanvasStore((s) => s.platform);
    const setPlatform = useCanvasStore((s) => s.setPlatform);
    const resizeMode = useCanvasStore((s) => s.resizeMode);
    const setResizeMode = useCanvasStore((s) => s.setResizeMode);
    const loadProject = useCanvasStore((s) => s.loadProject);
    const activeShapeKind = useCanvasStore((s) => s.activeShapeKind);
    const setActiveShapeKind = useCanvasStore((s) => s.setActiveShapeKind);
    const setProjectMeta = useSaveStatusStore((s) => s.setProjectMeta);
    const projectName = useSaveStatusStore((s) => s.projectName);
    const currentFilePath = useSaveStatusStore((s) => s.currentFilePath);
    const setCurrentFilePath = useSaveStatusStore((s) => s.setCurrentFilePath);
    const [exportOpen, setExportOpen] = useState(false);
    const [exportMode, setExportMode] = useState('all');
    const [exportSingle, setExportSingle] = useState(1);
    const [exportFrom, setExportFrom] = useState(1);
    const [exportTo, setExportTo] = useState(frameCount);
    const [exporting, setExporting] = useState(false);
    const [recentOpen, setRecentOpen] = useState(false);
    const [recentFiles, setRecentFiles] = useState([]);
    const [loadingProject, setLoadingProject] = useState(false);
    // Local state for custom dimension inputs
    const [customW, setCustomW] = useState(frameWidth);
    const [customH, setCustomH] = useState(frameHeight);
    const exportWrapperRef = useRef(null);
    const recentWrapperRef = useRef(null);
    // Keep exportTo in sync when frameCount changes
    useEffect(() => {
        setExportTo(frameCount);
    }, [frameCount]);
    // Sync custom inputs when frameWidth/frameHeight change externally
    useEffect(() => {
        setCustomW(frameWidth);
        setCustomH(frameHeight);
    }, [frameWidth, frameHeight]);
    // Dismiss export panel on outside click
    useEffect(() => {
        if (!exportOpen)
            return;
        function handleMouseDown(e) {
            if (exportWrapperRef.current != null && !exportWrapperRef.current.contains(e.target)) {
                setExportOpen(false);
            }
        }
        document.addEventListener('mousedown', handleMouseDown);
        return () => { document.removeEventListener('mousedown', handleMouseDown); };
    }, [exportOpen]);
    // Dismiss recent panel on outside click
    useEffect(() => {
        if (!recentOpen)
            return;
        function handleMouseDown(e) {
            if (recentWrapperRef.current != null && !recentWrapperRef.current.contains(e.target)) {
                setRecentOpen(false);
            }
        }
        document.addEventListener('mousedown', handleMouseDown);
        return () => { document.removeEventListener('mousedown', handleMouseDown); };
    }, [recentOpen]);
    async function handleExportAction() {
        const stage = getStageInstance();
        if (!stage)
            return;
        let start;
        let end;
        if (exportMode === 'all') {
            start = 0;
            end = frameCount - 1;
        }
        else if (exportMode === 'single') {
            start = exportSingle - 1;
            end = exportSingle - 1;
        }
        else {
            start = exportFrom - 1;
            end = exportTo - 1;
        }
        setExporting(true);
        try {
            const blobs = await exportFrames(stage, frameCount, frameWidth, frameHeight, start, end);
            await downloadFrames(blobs);
        }
        catch (err) {
            console.error('[export] failed:', err);
            alert(`Export failed: ${String(err)}`);
        }
        finally {
            setExporting(false);
            setExportOpen(false);
        }
    }
    async function handleOpen() {
        setLoadingProject(true);
        try {
            const result = await window.electronAPI.openProject();
            if (!result.success || result.json == null)
                return;
            const project = JSON.parse(result.json);
            loadProject(project);
            const filename = project.name.toLowerCase().replace(/\s+/g, '-');
            setProjectMeta(project.id, project.name, filename, project.createdAt);
            setCurrentFilePath(null);
        }
        catch (err) {
            console.error('[open]', err);
        }
        finally {
            setLoadingProject(false);
            setRecentOpen(false);
        }
    }
    async function handleRecentToggle() {
        if (!recentOpen) {
            const result = await window.electronAPI.listRecentProjects();
            setRecentFiles(result.files);
        }
        setRecentOpen((v) => !v);
    }
    function handleToolClick(tool) {
        setActiveTool(tool);
    }
    function handleMinus() {
        setFrameCount(frameCount - 1);
    }
    function handlePlus() {
        setFrameCount(frameCount + 1);
    }
    function commitCustomDimensions() {
        const w = Math.max(100, Math.min(8000, customW));
        const h = Math.max(100, Math.min(8000, customH));
        setCustomW(w);
        setCustomH(h);
        setRatio('custom', w, h);
    }
    function handleCustomKeyDown(e) {
        if (e.key === 'Enter') {
            commitCustomDimensions();
        }
    }
    const undoDisabled = past.length === 0;
    const redoDisabled = future.length === 0;
    const historyButtonStyle = (disabled) => ({
        padding: '4px 14px',
        height: 30,
        background: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        cursor: disabled ? 'default' : 'pointer',
        fontSize: 13,
        fontWeight: 'normal',
        opacity: disabled ? 0.35 : 1,
        transition: 'opacity 0.15s',
    });
    const segmentButtonStyle = (active) => ({
        padding: '3px 10px',
        height: 24,
        background: active ? '#0af' : 'transparent',
        color: active ? '#fff' : '#aaa',
        border: 'none',
        borderRadius: 3,
        cursor: 'pointer',
        fontSize: 12,
        fontWeight: active ? 'bold' : 'normal',
        transition: 'background 0.15s, color 0.15s',
        whiteSpace: 'nowrap',
    });
    const numberInputStyle = {
        width: 48,
        height: 24,
        background: '#333',
        color: '#fff',
        border: '1px solid #444',
        borderRadius: 3,
        fontSize: 12,
        textAlign: 'center',
        padding: '0 4px',
        boxSizing: 'border-box',
    };
    const presets = PLATFORM_PRESETS[platform];
    return (_jsxs("div", { style: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: 48,
            background: '#2a2a2a',
            borderBottom: '1px solid #333',
            flexShrink: 0,
            boxSizing: 'border-box',
        }, children: [_jsx("div", { style: {
                    paddingLeft: 16,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    flex: '0 0 auto',
                }, children: `Zero Seams${projectName !== 'Untitled Project' ? ` — ${projectName}` : ''}` }), _jsxs("div", { ref: recentWrapperRef, style: { position: 'relative', display: 'flex', marginLeft: 12, flex: '0 0 auto' }, children: [_jsx("button", { onClick: () => { void handleOpen(); }, disabled: loadingProject, style: {
                            padding: '4px 10px',
                            height: 30,
                            background: '#333',
                            color: loadingProject ? '#777' : '#fff',
                            border: 'none',
                            borderRadius: '4px 0 0 4px',
                            cursor: loadingProject ? 'default' : 'pointer',
                            fontSize: 13,
                            borderRight: '1px solid #555',
                            whiteSpace: 'nowrap',
                        }, children: loadingProject ? 'Opening…' : 'Open' }), _jsx("button", { onClick: () => { void handleRecentToggle(); }, style: {
                            padding: '4px 6px',
                            height: 30,
                            background: recentOpen ? '#555' : '#333',
                            color: '#aaa',
                            border: 'none',
                            borderRadius: '0 4px 4px 0',
                            cursor: 'pointer',
                            fontSize: 11,
                        }, title: "Recent projects", children: "\u25BE" }), recentOpen && (_jsx("div", { style: {
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            zIndex: 1000,
                            marginTop: 6,
                            background: '#1e1e1e',
                            border: '1px solid #3a3a3a',
                            borderRadius: 8,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                            padding: '4px 0',
                            minWidth: 260,
                        }, children: recentFiles.length === 0 ? (_jsx("div", { style: { padding: '8px 14px', color: '#555', fontSize: 12 }, children: "No recent projects" })) : (recentFiles.map((file) => (_jsxs("div", { title: file.path, onClick: () => { void handleOpen(); }, style: {
                                padding: '7px 14px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #2a2a2a',
                            }, onMouseEnter: (e) => { e.currentTarget.style.background = '#2a2a2a'; }, onMouseLeave: (e) => { e.currentTarget.style.background = 'transparent'; }, children: [_jsx("div", { style: { color: '#e0e0e0', fontSize: 13, fontWeight: 'bold' }, children: file.name }), _jsx("div", { style: { color: '#666', fontSize: 11 }, children: new Date(file.modifiedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) })] }, file.path)))) }))] }), _jsxs("div", { style: {
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 4,
                }, children: [_jsx("button", { onClick: undo, disabled: undoDisabled, style: historyButtonStyle(undoDisabled), children: "\u21A9 Undo" }), _jsx("button", { onClick: redo, disabled: redoDisabled, style: historyButtonStyle(redoDisabled), children: "\u21AA Redo" }), _jsx("div", { style: { width: 8 } }), TOOLS.map((tool) => (_jsxs("button", { onClick: () => handleToolClick(tool), style: {
                            padding: '4px 14px',
                            height: 30,
                            background: activeTool === tool ? '#0af' : '#333',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: activeTool === tool ? 'bold' : 'normal',
                            transition: 'background 0.15s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: tool === 'pen' ? 5 : 0,
                        }, children: [tool === 'pen' && PEN_ICON, TOOL_LABELS[tool]] }, tool))), activeTool === 'shape' && (_jsx("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            background: '#222',
                            borderRadius: 4,
                            padding: '2px',
                            border: '1px solid #444',
                            marginLeft: 4,
                        }, children: ['rect', 'ellipse', 'line'].map((kind) => (_jsx("button", { onClick: () => { setActiveShapeKind(kind); }, title: kind, style: segmentButtonStyle(activeShapeKind === kind), children: kind === 'rect' ? '▭' : kind === 'ellipse' ? '⬭' : '╱' }, kind))) }))] }), _jsxs("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    paddingRight: 16,
                    flex: '0 0 auto',
                }, children: [_jsxs("div", { style: { display: 'flex', gap: 2, padding: 2, background: '#222', border: '1px solid #444', borderRadius: 4, marginLeft: 8 }, children: [_jsx("button", { title: "Advanced: frame clips content", onClick: () => setResizeMode('advanced'), style: segmentButtonStyle(resizeMode === 'advanced'), children: CROP_ICON }), _jsx("button", { title: "Auto: content fills frame on resize", onClick: () => setResizeMode('auto'), style: segmentButtonStyle(resizeMode === 'auto'), children: AUTOFILL_ICON })] }), _jsx("select", { value: platform, onChange: (e) => { setPlatform(e.target.value); }, style: {
                            height: 28,
                            background: '#222',
                            color: '#aaa',
                            border: '1px solid #444',
                            borderRadius: 4,
                            fontSize: 12,
                            padding: '0 6px',
                            cursor: 'pointer',
                            outline: 'none',
                        }, children: PLATFORMS.map((p) => (_jsx("option", { value: p, children: PLATFORM_LABELS[p] }, p))) }), _jsx("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            background: '#222',
                            borderRadius: 4,
                            padding: '2px',
                            border: '1px solid #444',
                        }, children: presets.map((preset) => (_jsx("button", { onClick: () => { setRatio(preset.ratio, preset.width, preset.height); }, title: `${preset.label} (${preset.width}×${preset.height})`, style: segmentButtonStyle(ratio === preset.ratio), children: preset.label }, preset.ratio))) }), platform === 'custom' && (_jsxs("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                        }, children: [_jsx("input", { type: "number", min: 100, max: 8000, value: customW, onChange: (e) => { setCustomW(Number(e.target.value)); }, onBlur: commitCustomDimensions, onKeyDown: handleCustomKeyDown, style: { ...numberInputStyle, width: 56 }, title: "Width" }), _jsx("span", { style: { color: '#666', fontSize: 12 }, children: "\u00D7" }), _jsx("input", { type: "number", min: 100, max: 8000, value: customH, onChange: (e) => { setCustomH(Number(e.target.value)); }, onBlur: commitCustomDimensions, onKeyDown: handleCustomKeyDown, style: { ...numberInputStyle, width: 56 }, title: "Height" })] })), _jsx("div", { style: { width: 8 } }), _jsx("span", { style: { color: '#aaa', fontSize: 13 }, children: "Frames:" }), _jsx("button", { onClick: handleMinus, disabled: frameCount <= 1, style: {
                            width: 24,
                            height: 24,
                            background: '#333',
                            color: frameCount <= 1 ? '#555' : '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: frameCount <= 1 ? 'default' : 'pointer',
                            fontSize: 14,
                            lineHeight: '1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: "\u2212" }), _jsx("span", { style: {
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: 'bold',
                            minWidth: 16,
                            textAlign: 'center',
                        }, children: frameCount }), _jsx("button", { onClick: handlePlus, disabled: frameCount >= 10, style: {
                            width: 24,
                            height: 24,
                            background: '#333',
                            color: frameCount >= 10 ? '#555' : '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: frameCount >= 10 ? 'default' : 'pointer',
                            fontSize: 14,
                            lineHeight: '1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: "+" }), _jsx("div", { style: { width: 8 } }), _jsxs("div", { ref: exportWrapperRef, style: { position: 'relative' }, children: [_jsx("button", { onClick: () => { setExportOpen((v) => !v); }, style: {
                                    padding: '4px 14px',
                                    height: 30,
                                    background: exportOpen ? '#0af' : '#333',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 4,
                                    cursor: 'pointer',
                                    fontSize: 13,
                                    fontWeight: 'normal',
                                    transition: 'background 0.15s',
                                    whiteSpace: 'nowrap',
                                }, children: "Export" }), exportOpen && (_jsxs("div", { style: {
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    zIndex: 1000,
                                    marginTop: 6,
                                    background: '#1e1e1e',
                                    border: '1px solid #3a3a3a',
                                    borderRadius: 8,
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                                    padding: '12px',
                                    minWidth: 220,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 10,
                                }, children: [_jsx("div", { style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            background: '#222',
                                            borderRadius: 4,
                                            padding: '2px',
                                            border: '1px solid #444',
                                        }, children: ['all', 'single', 'range'].map((mode) => (_jsx("button", { onClick: () => { setExportMode(mode); }, style: segmentButtonStyle(exportMode === mode), children: mode === 'all' ? 'All frames' : mode === 'single' ? 'Single' : 'Range' }, mode))) }), exportMode === 'single' && (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx("span", { style: { color: '#aaa', fontSize: 12 }, children: "Frame" }), _jsx("input", { type: "number", min: 1, max: frameCount, value: exportSingle, onChange: (e) => {
                                                    const v = Math.max(1, Math.min(frameCount, Number(e.target.value)));
                                                    setExportSingle(v);
                                                }, style: numberInputStyle })] })), exportMode === 'range' && (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx("span", { style: { color: '#aaa', fontSize: 12 }, children: "From" }), _jsx("input", { type: "number", min: 1, max: frameCount, value: exportFrom, onChange: (e) => {
                                                    const v = Math.max(1, Math.min(frameCount, Number(e.target.value)));
                                                    setExportFrom(v);
                                                }, style: numberInputStyle }), _jsx("span", { style: { color: '#aaa', fontSize: 12 }, children: "To" }), _jsx("input", { type: "number", min: 1, max: frameCount, value: exportTo, onChange: (e) => {
                                                    const v = Math.max(1, Math.min(frameCount, Number(e.target.value)));
                                                    setExportTo(v);
                                                }, style: numberInputStyle })] })), _jsx("button", { onClick: () => { void handleExportAction(); }, disabled: exporting, style: {
                                            padding: '6px 0',
                                            background: exporting ? '#555' : '#0af',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: 4,
                                            cursor: exporting ? 'default' : 'pointer',
                                            fontSize: 13,
                                            fontWeight: 'bold',
                                            transition: 'background 0.15s',
                                        }, children: exporting ? 'Exporting…' : 'Export' })] }))] }), _jsx("button", { onClick: () => {
                            const state = useCanvasStore.getState();
                            const saveStore = useSaveStatusStore.getState();
                            const project = {
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
                            window.electronAPI.saveProjectAs(JSON.stringify(project))
                                .then((result) => {
                                if (result.success && result.filePath) {
                                    saveStore.setCurrentFilePath(result.filePath);
                                }
                            })
                                .catch((err) => {
                                console.error('[ZeroSeams] Save As failed:', err);
                            });
                        }, style: {
                            background: '#2a2a2a',
                            border: '1px solid #444',
                            borderRadius: 4,
                            color: '#ccc',
                            fontSize: 11,
                            padding: '3px 8px',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                        }, children: "Save As\u2026" }), _jsxs("div", { style: {
                            minWidth: 80,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: 6,
                        }, children: [_jsx(SaveStatusPill, { status: saveStatus }), currentFilePath && (_jsx("span", { style: { color: '#666', fontSize: 11, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: currentFilePath.split('/').pop() }))] })] })] }));
}
