import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useCanvasStore } from '@/canvas/useCanvasStore';
import { useThumbnailStore } from '@/canvas/useThumbnailStore';
import { useAI } from '@/ai';
import { useAIStore } from '@/ai';
import { useExternalEdit } from '@/canvas/useExternalEdit';
import { useSaveStatusStore } from './useSaveStatusStore';
import { getSelectionStyle, applyStyleToRange, applyStyleToAll, } from '@/canvas/textSpans';
import { FontPicker } from './FontPicker';
function NumberField({ label, value, step = 1, min, max, onChange, }) {
    function handleChange(e) {
        const parsed = parseFloat(e.target.value);
        if (!isNaN(parsed)) {
            onChange(parsed);
        }
    }
    return (_jsxs("div", { style: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 8,
            gap: 8,
        }, children: [_jsx("label", { style: {
                    color: '#aaa',
                    fontSize: 12,
                    width: 64,
                    flexShrink: 0,
                }, children: label }), _jsx("input", { type: "number", value: value, step: step, min: min, max: max, onChange: handleChange, style: {
                    flex: 1,
                    background: '#1a1a1a',
                    border: '1px solid #444',
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: 13,
                    padding: '3px 6px',
                    boxSizing: 'border-box',
                    outline: 'none',
                } })] }));
}
function MixedNumberField({ label, value, step = 1, min, max, onChange, }) {
    const isMixed = value === undefined;
    function handleChange(e) {
        const parsed = parseFloat(e.target.value);
        if (!isNaN(parsed)) {
            onChange(parsed);
        }
    }
    return (_jsxs("div", { style: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 8,
            gap: 8,
        }, children: [_jsx("label", { style: {
                    color: '#aaa',
                    fontSize: 12,
                    width: 64,
                    flexShrink: 0,
                }, children: label }), _jsx("input", { type: "number", value: isMixed ? '' : value, placeholder: isMixed ? '—' : undefined, step: step, min: min, max: max, onChange: handleChange, style: {
                    flex: 1,
                    background: '#1a1a1a',
                    border: '1px solid #444',
                    borderRadius: 4,
                    color: isMixed ? '#666' : '#fff',
                    fontSize: 13,
                    padding: '3px 6px',
                    boxSizing: 'border-box',
                    outline: 'none',
                } })] }));
}
function ColorInput({ value, onChange }) {
    const [hexText, setHexText] = React.useState(value);
    React.useEffect(() => {
        setHexText(value);
    }, [value]);
    function handleSwatchChange(e) {
        onChange(e.target.value);
    }
    function handleTextChange(e) {
        setHexText(e.target.value);
    }
    function handleTextBlur() {
        const cleaned = hexText.trim();
        // Accept #rrggbb or rrggbb formats
        if (/^#?[0-9a-fA-F]{6}$/.test(cleaned)) {
            const normalized = cleaned.startsWith('#') ? cleaned : `#${cleaned}`;
            onChange(normalized);
            setHexText(normalized);
        }
        else {
            // Revert to last valid value
            setHexText(value);
        }
    }
    function handleTextKeyDown(e) {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    }
    return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [_jsx("input", { type: "color", value: value, onChange: handleSwatchChange, style: {
                    width: 32,
                    height: 24,
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    padding: 0,
                    background: 'none',
                    flexShrink: 0,
                } }), _jsx("input", { type: "text", value: hexText, onChange: handleTextChange, onBlur: handleTextBlur, onKeyDown: handleTextKeyDown, style: {
                    flex: 1,
                    background: '#1a1a1a',
                    border: '1px solid #444',
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: 12,
                    padding: '3px 6px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    fontFamily: 'monospace',
                } })] }));
}
function MixedColorInput({ value, onChange }) {
    const isMixed = value === undefined;
    const displayValue = isMixed ? '#808080' : value;
    const [hexText, setHexText] = React.useState(displayValue);
    React.useEffect(() => {
        setHexText(isMixed ? '' : (value ?? '#000000'));
    }, [value, isMixed]);
    function handleSwatchChange(e) {
        onChange(e.target.value);
    }
    function handleTextChange(e) {
        setHexText(e.target.value);
    }
    function handleTextBlur() {
        const cleaned = hexText.trim();
        if (/^#?[0-9a-fA-F]{6}$/.test(cleaned)) {
            const normalized = cleaned.startsWith('#') ? cleaned : `#${cleaned}`;
            onChange(normalized);
            setHexText(normalized);
        }
        else {
            setHexText(isMixed ? '' : (value ?? '#000000'));
        }
    }
    function handleTextKeyDown(e) {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    }
    return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: [_jsxs("div", { style: { position: 'relative', flexShrink: 0 }, children: [_jsx("input", { type: "color", value: displayValue, onChange: handleSwatchChange, style: {
                            width: 32,
                            height: 24,
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                            padding: 0,
                            background: 'none',
                            opacity: isMixed ? 0.4 : 1,
                        } }), isMixed && (_jsx("span", { style: {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: '#fff',
                            fontSize: 10,
                            pointerEvents: 'none',
                            fontWeight: 'bold',
                        }, children: "\u2014" }))] }), _jsx("input", { type: "text", value: hexText, placeholder: isMixed ? '—' : undefined, onChange: handleTextChange, onBlur: handleTextBlur, onKeyDown: handleTextKeyDown, style: {
                    flex: 1,
                    background: '#1a1a1a',
                    border: '1px solid #444',
                    borderRadius: 4,
                    color: isMixed ? '#666' : '#fff',
                    fontSize: 12,
                    padding: '3px 6px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    fontFamily: 'monospace',
                } })] }));
}
// ---------------------------------------------------------------------------
// Shared style constants
// ---------------------------------------------------------------------------
const sectionLabelStyle = {
    color: '#aaa',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginTop: 12,
    marginBottom: 6,
};
const alignButtonStyle = (active) => ({
    flex: 1,
    height: 28,
    background: active ? '#0af' : '#333',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
    padding: '0 4px',
});
const distributeButtonStyle = (disabled) => ({
    flex: 1,
    height: 28,
    background: '#333',
    color: disabled ? '#555' : '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: disabled ? 'default' : 'pointer',
    fontSize: 12,
    opacity: disabled ? 0.45 : 1,
});
function AlignDistributeSection({ selectedCount, onAlign, onDistribute, }) {
    const distributeDisabled = selectedCount < 3;
    return (_jsxs("div", { style: { padding: '12px 12px 0' }, children: [_jsx("div", { style: sectionLabelStyle, children: "Align & Distribute" }), _jsxs("div", { style: { display: 'flex', gap: 4, marginBottom: 4 }, children: [_jsx("button", { style: alignButtonStyle(), onClick: () => onAlign('left'), title: "Align left edges", children: "Left" }), _jsx("button", { style: alignButtonStyle(), onClick: () => onAlign('centerH'), title: "Center horizontally", children: "Center H" }), _jsx("button", { style: alignButtonStyle(), onClick: () => onAlign('right'), title: "Align right edges", children: "Right" })] }), _jsxs("div", { style: { display: 'flex', gap: 4, marginBottom: 4 }, children: [_jsx("button", { style: alignButtonStyle(), onClick: () => onAlign('top'), title: "Align top edges", children: "Top" }), _jsx("button", { style: alignButtonStyle(), onClick: () => onAlign('centerV'), title: "Center vertically", children: "Middle V" }), _jsx("button", { style: alignButtonStyle(), onClick: () => onAlign('bottom'), title: "Align bottom edges", children: "Bottom" })] }), _jsxs("div", { style: { display: 'flex', gap: 4, marginBottom: 12 }, children: [_jsx("button", { style: distributeButtonStyle(distributeDisabled), disabled: distributeDisabled, onClick: () => onDistribute('horizontal'), title: distributeDisabled ? 'Select 3+ objects to distribute' : 'Distribute horizontally', children: "Distribute H" }), _jsx("button", { style: distributeButtonStyle(distributeDisabled), disabled: distributeDisabled, onClick: () => onDistribute('vertical'), title: distributeDisabled ? 'Select 3+ objects to distribute' : 'Distribute vertically', children: "Distribute V" })] }), _jsxs("div", { style: {
                    color: '#555',
                    fontSize: 11,
                    marginBottom: 12,
                    paddingBottom: 12,
                    borderBottom: '1px solid #333',
                }, children: [selectedCount, " objects selected"] })] }));
}
function FrameRow({ frame, canvasDefault, onColorChange, onClear }) {
    const effectiveColor = frame.backgroundColor ?? canvasDefault;
    return (_jsxs("div", { style: { marginBottom: 10 }, children: [_jsxs("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 4,
                    gap: 6,
                }, children: [_jsx("span", { style: { color: '#ddd', fontSize: 12, flex: 1 }, children: frame.label }), frame.backgroundColor !== null && (_jsx("button", { onClick: onClear, style: {
                            background: 'none',
                            border: 'none',
                            color: '#888',
                            fontSize: 11,
                            cursor: 'pointer',
                            padding: '0 2px',
                            textDecoration: 'underline',
                        }, children: "Clear" })), frame.backgroundColor === null && (_jsx("span", { style: { color: '#555', fontSize: 11 }, children: "Default" }))] }), _jsx(ColorInput, { value: effectiveColor, onChange: onColorChange })] }));
}
function CanvasSection({ backgroundColor, frames, ratio, onCanvasBgChange, onFrameBgChange, onFrameBgClear, }) {
    const formatLabel = ratio === 'portrait' ? '4:5 (Portrait)' : '1:1 (Square)';
    return (_jsxs("div", { style: { padding: '12px 12px 0' }, children: [_jsx("div", { style: { ...sectionLabelStyle, marginTop: 0 }, children: "Canvas" }), _jsxs("div", { style: {
                    color: '#aaa',
                    fontSize: 12,
                    marginBottom: 10,
                }, children: ["Format: ", formatLabel] }), _jsx("div", { style: sectionLabelStyle, children: "Background" }), _jsx("div", { style: { marginBottom: 12 }, children: _jsx(ColorInput, { value: backgroundColor, onChange: onCanvasBgChange }) }), _jsx("div", { style: sectionLabelStyle, children: "Per-Frame Colors" }), frames.map((frame) => (_jsx(FrameRow, { frame: frame, canvasDefault: backgroundColor, onColorChange: (color) => onFrameBgChange(frame.index, color), onClear: () => onFrameBgClear(frame.index) }, frame.index)))] }));
}
function TextSection({ textObj, selectedId, textEditingId, textSelection, onCommit, }) {
    // Determine whether we are in span-selection mode:
    // editing this object AND a non-collapsed range is selected.
    const isInEditMode = textEditingId === selectedId;
    const hasRangeSelection = isInEditMode &&
        textSelection !== null &&
        textSelection.start !== textSelection.end;
    // Resolve the style to display. In span-selection mode: getSelectionStyle().
    // Otherwise: layer-level defaults.
    const selStyle = hasRangeSelection
        ? getSelectionStyle(textObj, textSelection.start, textSelection.end)
        : null;
    // Helpers that return the effective value for span-selectable fields.
    // Returns `undefined` when mixed (only possible in span-selection mode).
    function effectiveFontFamily() {
        return hasRangeSelection ? selStyle.fontFamily : textObj.fontFamily;
    }
    function effectiveFontSize() {
        return hasRangeSelection ? selStyle.fontSize : textObj.fontSize;
    }
    function effectiveFontStyle() {
        return hasRangeSelection ? selStyle.fontStyle : textObj.fontStyle;
    }
    function effectiveFill() {
        return hasRangeSelection ? selStyle.fill : textObj.fill;
    }
    function effectiveLetterSpacing() {
        return hasRangeSelection ? selStyle.letterSpacing : textObj.letterSpacing;
    }
    // Apply a style change for a span-selectable field.
    function applySpanField(style) {
        if (hasRangeSelection) {
            // Span-range mode: only update spans, do NOT touch layer defaults.
            const newSpans = applyStyleToRange(textObj, textSelection.start, textSelection.end, style);
            onCommit(selectedId, { spans: newSpans });
        }
        else {
            // Whole-layer mode: update both layer default and all spans.
            const newSpans = applyStyleToAll(textObj, style);
            onCommit(selectedId, { ...style, spans: newSpans });
        }
    }
    // Toggle bold/italic, accounting for mixed state when hasRangeSelection.
    function toggleFontStyleBit(bit) {
        const current = effectiveFontStyle();
        // When mixed, treat as "not active" — so toggling adds the bit.
        const hasBold = current !== undefined && current.includes('bold');
        const hasItalic = current !== undefined && current.includes('italic');
        let next;
        if (bit === 'bold') {
            next = hasBold
                ? (hasItalic ? 'italic' : 'normal')
                : (hasItalic ? 'bold italic' : 'bold');
        }
        else {
            next = hasItalic
                ? (hasBold ? 'bold' : 'normal')
                : (hasBold ? 'bold italic' : 'italic');
        }
        applySpanField({ fontStyle: next });
    }
    const currentFontFamily = effectiveFontFamily();
    const currentFontSize = effectiveFontSize();
    const currentFontStyle = effectiveFontStyle();
    const currentFill = effectiveFill();
    const currentLetterSpacing = effectiveLetterSpacing();
    // Bold/italic active state — false when mixed (undefined).
    const boldActive = currentFontStyle !== undefined && currentFontStyle.includes('bold');
    const italicActive = currentFontStyle !== undefined && currentFontStyle.includes('italic');
    return (_jsxs("div", { style: { padding: '12px 12px 0' }, children: [_jsx(NumberField, { label: "X", value: textObj.x, onChange: (val) => onCommit(selectedId, { x: val }) }), _jsx(NumberField, { label: "Y", value: textObj.y, onChange: (val) => onCommit(selectedId, { y: val }) }), _jsx(NumberField, { label: "Width", value: textObj.width, min: 1, onChange: (val) => onCommit(selectedId, { width: val }) }), _jsx(NumberField, { label: "Rotation", value: textObj.rotation, onChange: (val) => onCommit(selectedId, { rotation: val }) }), _jsx(NumberField, { label: "Opacity", value: textObj.opacity, step: 0.01, min: 0, max: 1, onChange: (val) => onCommit(selectedId, { opacity: val }) }), isInEditMode ? (_jsx("div", { style: {
                    background: 'rgba(0,170,255,0.12)',
                    border: '1px solid #0af',
                    borderRadius: 4,
                    padding: '5px 8px',
                    marginTop: 10,
                    marginBottom: 4,
                    color: '#0af',
                    fontSize: 11,
                }, children: hasRangeSelection
                    ? `Editing selection (chars ${textSelection.start}–${textSelection.end})`
                    : 'Text edit mode — select characters to style them' })) : (_jsx("div", { style: {
                    color: '#555',
                    fontSize: 12,
                    marginTop: 10,
                    marginBottom: 4,
                    fontStyle: 'italic',
                }, children: "Double-click the text layer on the canvas to edit content." })), _jsx("div", { style: { ...sectionLabelStyle }, children: "Font" }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }, children: [_jsx("label", { style: { color: '#aaa', fontSize: 12, width: 64, flexShrink: 0 }, children: "Family" }), _jsx(FontPicker, { value: currentFontFamily, onChange: (family) => applySpanField({ fontFamily: family }) })] }), _jsx(MixedNumberField, { label: "Size", value: currentFontSize, min: 8, max: 400, onChange: (val) => applySpanField({ fontSize: val }) }), _jsx("div", { style: { ...sectionLabelStyle }, children: "Style" }), _jsx("div", { style: { display: 'flex', gap: 4, marginBottom: 8 }, children: ['bold', 'italic'].map((bit) => {
                    const active = bit === 'bold' ? boldActive : italicActive;
                    return (_jsx("button", { onClick: () => toggleFontStyleBit(bit), style: {
                            padding: '3px 10px',
                            height: 28,
                            background: active ? '#0af' : '#333',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: bit === 'bold' ? 'bold' : 'normal',
                            fontStyle: bit === 'italic' ? 'italic' : 'normal',
                        }, children: bit === 'bold' ? 'B' : 'I' }, bit));
                }) }), _jsx("div", { style: { display: 'flex', gap: 4, marginBottom: 8 }, children: ['left', 'center', 'right'].map((a) => (_jsx("button", { onClick: () => onCommit(selectedId, { align: a }), style: {
                        padding: '3px 10px',
                        height: 28,
                        flex: 1,
                        background: textObj.align === a ? '#0af' : '#333',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 12,
                    }, children: a === 'left' ? '←' : a === 'center' ? '↔' : '→' }, a))) }), _jsx("div", { style: { ...sectionLabelStyle }, children: "Color" }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }, children: [_jsx("label", { style: { color: '#aaa', fontSize: 12, width: 64, flexShrink: 0 }, children: "Fill" }), _jsx("div", { style: { flex: 1 }, children: _jsx(MixedColorInput, { value: currentFill, onChange: (color) => applySpanField({ fill: color }) }) })] }), _jsx("div", { style: { ...sectionLabelStyle }, children: "Spacing" }), _jsx(MixedNumberField, { label: "Letter Sp.", value: currentLetterSpacing, step: 0.5, onChange: (val) => applySpanField({ letterSpacing: val }) }), _jsx(NumberField, { label: "Line H.", value: textObj.lineHeight, step: 0.1, min: 0.5, max: 4, onChange: (val) => onCommit(selectedId, { lineHeight: val }) })] }));
}
// ---------------------------------------------------------------------------
// PropertiesPanel (root export)
// ---------------------------------------------------------------------------
export function PropertiesPanel() {
    const objects = useCanvasStore((s) => s.objects);
    const selectedId = useCanvasStore((s) => s.selectedId);
    const selectedIds = useCanvasStore((s) => s.selectedIds);
    const updateObject = useCanvasStore((s) => s.updateObject);
    const commitUpdate = useCanvasStore((s) => s.commitUpdate);
    const enterMaskEditMode = useCanvasStore((s) => s.enterMaskEditMode);
    const maskDrawMode = useCanvasStore((s) => s.maskDrawMode);
    const enterMaskDrawMode = useCanvasStore((s) => s.enterMaskDrawMode);
    const clearMaskDrawMode = useCanvasStore((s) => s.clearMaskDrawMode);
    const alignObjects = useCanvasStore((s) => s.alignObjects);
    const thumbnails = useThumbnailStore((s) => s.thumbnails);
    const distributeObjects = useCanvasStore((s) => s.distributeObjects);
    const backgroundColor = useCanvasStore((s) => s.backgroundColor);
    const frames = useCanvasStore((s) => s.frames);
    const ratio = useCanvasStore((s) => s.ratio);
    const setCanvasBackground = useCanvasStore((s) => s.setCanvasBackground);
    const setFrameBackground = useCanvasStore((s) => s.setFrameBackground);
    const textEditingId = useCanvasStore((s) => s.textEditingId);
    const textSelection = useCanvasStore((s) => s.textSelection);
    const captureTextSelection = useCanvasStore((s) => s.captureTextSelection);
    const { removeBg } = useAI();
    const operations = useAIStore((s) => s.operations);
    const clearOperation = useAIStore((s) => s.clearOperation);
    const { editExternally, stopEditing, activeObjectId } = useExternalEdit();
    const currentFilePath = useSaveStatusStore((s) => s.currentFilePath);
    const [externalEditor, setExternalEditor] = useState(null);
    useEffect(() => {
        void window.electronAPI.getExternalEditor().then(setExternalEditor);
    }, []);
    async function pickNewEditor() {
        const editor = await window.electronAPI.setExternalEditor();
        if (editor)
            setExternalEditor(editor);
    }
    const selectedObj = selectedId !== null ? objects[selectedId] : null;
    const isImage = selectedObj?.type === 'image';
    const isText = selectedObj?.type === 'text';
    const isShape = selectedObj?.type === 'shape';
    const isPath = selectedObj?.type === 'path';
    const isMultiSelect = selectedIds.length > 1;
    const isNoneSelected = selectedId === null && selectedIds.length === 0;
    const activeBgOp = selectedId
        ? Object.values(operations).find((op) => op.type === 'background-removal' && op.targetObjectId === selectedId)
        : undefined;
    React.useEffect(() => {
        if (activeBgOp?.status === 'done') {
            const t = setTimeout(() => clearOperation(activeBgOp.id), 2000);
            return () => clearTimeout(t);
        }
        return undefined;
    }, [activeBgOp?.status, activeBgOp?.id, clearOperation]);
    function patch(partial) {
        if (!selectedId)
            return;
        updateObject(selectedId, partial);
    }
    function handleRemoveBg() {
        if (selectedId)
            void removeBg(selectedId);
    }
    // When a text layer is in inline edit mode, prevent non-input mouse clicks in this
    // panel from stealing focus away from the contenteditable. Buttons, toggles, color
    // swatches, and label clicks all go through here. Actual <input> and <select> elements
    // are exempt so they can still receive keyboard focus when needed (e.g. font-size field).
    function handlePanelMouseDown(e) {
        if (!textEditingId)
            return;
        // Snapshot the live browser selection NOW — before focus can move away
        // from the contenteditable (either via preventDefault below or by focusing an input).
        captureTextSelection?.();
        const target = e.target;
        const needsKeyboardFocus = target instanceof HTMLInputElement ||
            target instanceof HTMLSelectElement ||
            target instanceof HTMLTextAreaElement;
        if (!needsKeyboardFocus) {
            e.preventDefault();
        }
    }
    return (_jsxs("div", { id: "properties-panel", onMouseDown: handlePanelMouseDown, style: {
            width: 260,
            flexShrink: 0,
            height: '100%',
            background: '#2a2a2a',
            borderLeft: '1px solid #333',
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
                }, children: "Properties" }), _jsxs("div", { style: {
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }, children: [isMultiSelect && (_jsx(AlignDistributeSection, { selectedCount: selectedIds.length, onAlign: alignObjects, onDistribute: distributeObjects })), isNoneSelected && (_jsx(CanvasSection, { backgroundColor: backgroundColor, frames: frames, ratio: ratio, onCanvasBgChange: setCanvasBackground, onFrameBgChange: setFrameBackground, onFrameBgClear: (frameIndex) => setFrameBackground(frameIndex, null) })), !isMultiSelect && selectedObj !== null && !isImage && !isText && !isShape && !isPath && (_jsx("div", { style: {
                            padding: '20px 12px',
                            color: '#555',
                            fontSize: 13,
                        }, children: "No properties" })), !isMultiSelect && selectedObj !== null && isText && selectedId !== null && (_jsx(TextSection, { textObj: selectedObj, selectedId: selectedId, textEditingId: textEditingId, textSelection: textSelection, onCommit: commitUpdate })), !isMultiSelect && selectedObj !== null && isShape && (() => {
                        const shapeObj = selectedObj;
                        return (_jsxs("div", { style: { padding: '12px 12px 0' }, children: [_jsx("div", { style: sectionLabelStyle, children: "Transform" }), _jsx(NumberField, { label: "X", value: Math.round(shapeObj.x), onChange: (val) => patch({ x: val }) }), _jsx(NumberField, { label: "Y", value: Math.round(shapeObj.y), onChange: (val) => patch({ y: val }) }), _jsx(NumberField, { label: "Width", value: Math.round(shapeObj.width), min: 1, onChange: (val) => patch({ width: val }) }), _jsx(NumberField, { label: "Height", value: Math.round(shapeObj.height), min: 1, onChange: (val) => patch({ height: val }) }), _jsx(NumberField, { label: "Rotation", value: shapeObj.rotation, onChange: (val) => patch({ rotation: val }) }), _jsx(NumberField, { label: "Opacity", value: shapeObj.opacity, step: 0.01, min: 0, max: 1, onChange: (val) => patch({ opacity: val }) }), _jsx("div", { style: sectionLabelStyle, children: "Fill" }), _jsx(ColorInput, { value: shapeObj.fill || '#000000', onChange: (color) => { commitUpdate(shapeObj.id, { fill: color }); } }), _jsx("div", { style: sectionLabelStyle, children: "Stroke" }), _jsx(ColorInput, { value: shapeObj.stroke || '#000000', onChange: (color) => { commitUpdate(shapeObj.id, { stroke: color }); } }), _jsx(NumberField, { label: "Stroke W.", value: shapeObj.strokeWidth, min: 0, step: 0.5, onChange: (val) => { commitUpdate(shapeObj.id, { strokeWidth: val }); } }), shapeObj.kind === 'rect' && (_jsx(NumberField, { label: "Corner R.", value: shapeObj.cornerRadius ?? 0, min: 0, onChange: (val) => { commitUpdate(shapeObj.id, { cornerRadius: val }); } }))] }));
                    })(), !isMultiSelect && selectedObj !== null && isPath && (() => {
                        const pathObj = selectedObj;
                        return (_jsxs("div", { style: { padding: '12px 12px 0' }, children: [pathObj.pathEditMode && (_jsx("div", { style: {
                                        background: 'rgba(68,136,255,0.15)',
                                        border: '1px solid #4488ff',
                                        borderRadius: 4,
                                        padding: '6px 8px',
                                        marginBottom: 8,
                                        color: '#4488ff',
                                        fontSize: 11,
                                    }, children: "Path edit mode \u2014 drag anchors and handles" })), _jsxs("div", { style: { color: '#888', fontSize: 11, marginBottom: 8 }, children: ["X: ", Math.round(pathObj.x), " \u00B7 Y: ", Math.round(pathObj.y), " \u00B7 W: ", Math.round(pathObj.width), " \u00B7 H: ", Math.round(pathObj.height)] }), _jsx("div", { style: sectionLabelStyle, children: "Opacity" }), _jsx(NumberField, { label: "Opacity", value: pathObj.opacity, step: 0.01, min: 0, max: 1, onChange: (val) => patch({ opacity: val }) }), _jsx("div", { style: sectionLabelStyle, children: "Fill" }), _jsx(ColorInput, { value: pathObj.fill || '#000000', onChange: (color) => { commitUpdate(pathObj.id, { fill: color }); } }), _jsx("div", { style: sectionLabelStyle, children: "Stroke" }), _jsx(ColorInput, { value: pathObj.stroke || '#000000', onChange: (color) => { commitUpdate(pathObj.id, { stroke: color }); } }), _jsx(NumberField, { label: "Stroke W.", value: pathObj.strokeWidth, min: 0, step: 0.5, onChange: (val) => { commitUpdate(pathObj.id, { strokeWidth: val }); } })] }));
                    })(), !isMultiSelect && selectedObj !== null && isImage && (() => {
                        const imgObj = selectedObj;
                        const isContentMode = imgObj.contentEditMode === true;
                        if (!isContentMode) {
                            // FRAME MODE
                            return (_jsxs("div", { style: { padding: '12px 12px 0' }, children: [_jsx("div", { style: { color: '#aaa', fontSize: 11, fontWeight: 'bold', letterSpacing: '0.08em',
                                            textTransform: 'uppercase', marginBottom: 6 }, children: "Frame" }), _jsx(NumberField, { label: "X", value: imgObj.frameX, onChange: (val) => patch({ frameX: val, x: val }) }), _jsx(NumberField, { label: "Y", value: imgObj.frameY, onChange: (val) => patch({ frameY: val, y: val }) }), _jsx(NumberField, { label: "W", value: imgObj.frameWidth, min: 1, onChange: (val) => patch({ frameWidth: val, width: val }) }), _jsx(NumberField, { label: "H", value: imgObj.frameHeight, min: 1, onChange: (val) => patch({ frameHeight: val, height: val }) }), _jsx(NumberField, { label: "Rotation", value: imgObj.rotation, onChange: (val) => patch({ rotation: val }) }), _jsx(NumberField, { label: "Opacity", value: imgObj.opacity, step: 0.01, min: 0, max: 1, onChange: (val) => patch({ opacity: val }) }), _jsx("div", { style: { color: '#555', fontSize: 11, marginTop: 8, marginBottom: 8 }, children: "Double-click image to edit content" }), _jsxs("div", { style: { borderTop: '1px solid #333', paddingTop: 10, marginTop: 4, marginBottom: 10 }, children: [_jsx("div", { style: { color: '#aaa', fontSize: 11, fontWeight: 'bold', letterSpacing: '0.08em',
                                                    textTransform: 'uppercase', marginBottom: 8 }, children: "Mask" }), imgObj.maskEditMode ? (
                                            /* Mask edit mode active banner */
                                            _jsxs("div", { style: {
                                                    background: '#1e3a2f',
                                                    border: '1px solid #2d6a4f',
                                                    borderRadius: 4,
                                                    padding: '6px 10px',
                                                    marginBottom: 8,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }, children: [_jsx("span", { style: { color: '#52b788', fontSize: 11 }, children: "Editing mask path" }), _jsx("button", { onClick: () => {
                                                            if (selectedId)
                                                                commitUpdate(selectedId, { maskEditMode: false });
                                                        }, style: {
                                                            background: '#2d6a4f',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: 3,
                                                            padding: '2px 8px',
                                                            cursor: 'pointer',
                                                            fontSize: 11,
                                                        }, children: "Done" })] })) : imgObj.mask == null ? (
                                            /* No mask — draw mode picker or active draw banner */
                                            maskDrawMode?.id === selectedId ? (
                                            /* Draw in progress for this image */
                                            _jsxs("div", { children: [_jsxs("div", { style: { color: '#0af', fontSize: 11, marginBottom: 8 }, children: ["Drawing ", maskDrawMode.tool, " mask \u2014", ' ', maskDrawMode.tool === 'pen'
                                                                ? 'click to add points, close path to finish'
                                                                : 'drag to define shape'] }), _jsx("button", { onClick: () => clearMaskDrawMode(), style: {
                                                            width: '100%',
                                                            height: 28,
                                                            background: '#3a2020',
                                                            color: '#f88',
                                                            border: '1px solid #6a2020',
                                                            borderRadius: 4,
                                                            cursor: 'pointer',
                                                            fontSize: 12,
                                                        }, children: "Cancel" })] })) : (
                                            /* Tool picker */
                                            _jsxs("div", { children: [_jsx("div", { style: { color: '#777', fontSize: 11, marginBottom: 6 }, children: "Add mask:" }), _jsx("div", { style: { display: 'flex', gap: 6 }, children: ['pen', 'rect', 'ellipse'].map((tool) => (_jsx("button", { onClick: () => { if (selectedId)
                                                                enterMaskDrawMode(selectedId, tool); }, style: {
                                                                flex: 1,
                                                                height: 28,
                                                                background: '#333',
                                                                color: '#ccc',
                                                                border: '1px solid #444',
                                                                borderRadius: 4,
                                                                cursor: 'pointer',
                                                                fontSize: 12,
                                                            }, children: tool === 'pen' ? 'Pen' : tool === 'rect' ? 'Rect' : 'Oval' }, tool))) })] }))) : (
                                            /* Mask controls */
                                            _jsxs(_Fragment, { children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }, children: [thumbnails[`${selectedId}__mask`] != null && (_jsx("div", { style: {
                                                                    width: 36, height: 36, flexShrink: 0, borderRadius: 3,
                                                                    overflow: 'hidden', border: '1px solid #3a3a3a', background: '#000',
                                                                }, children: _jsx("img", { src: thumbnails[`${selectedId}__mask`], style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }, alt: "mask", draggable: false }) })), _jsx("button", { onClick: () => { if (selectedId)
                                                                    enterMaskEditMode(selectedId); }, style: {
                                                                    flex: 1,
                                                                    height: 28,
                                                                    background: '#333',
                                                                    color: '#ccc',
                                                                    border: '1px solid #555',
                                                                    borderRadius: 4,
                                                                    cursor: 'pointer',
                                                                    fontSize: 11,
                                                                }, children: "Edit Mask" }), _jsx("button", { onClick: () => {
                                                                    if (selectedId)
                                                                        commitUpdate(selectedId, { mask: { ...imgObj.mask, visible: !imgObj.mask.visible } });
                                                                }, title: imgObj.mask.visible ? 'Hide mask' : 'Show mask', style: {
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    padding: '0 4px',
                                                                    fontSize: 14,
                                                                    opacity: imgObj.mask.visible ? 0.9 : 0.3,
                                                                }, children: "\uD83D\uDC41" }), _jsx("button", { onClick: () => {
                                                                    if (selectedId)
                                                                        commitUpdate(selectedId, { mask: undefined });
                                                                }, title: "Delete mask", style: {
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    padding: '0 4px',
                                                                    fontSize: 12,
                                                                    color: '#f44',
                                                                    opacity: 0.7,
                                                                }, children: "\u2715" })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }, children: [_jsx("label", { style: { color: '#aaa', fontSize: 12, width: 64, flexShrink: 0 }, children: "Feather" }), _jsx("input", { type: "range", min: 0, max: 50, step: 1, value: imgObj.mask.feather, onChange: (e) => {
                                                                    if (!selectedId)
                                                                        return;
                                                                    updateObject(selectedId, { mask: { ...imgObj.mask, feather: Number(e.target.value) } });
                                                                }, onMouseUp: (e) => {
                                                                    if (!selectedId)
                                                                        return;
                                                                    commitUpdate(selectedId, { mask: { ...imgObj.mask, feather: Number(e.target.value) } });
                                                                }, style: { flex: 1 } }), _jsx("span", { style: { color: '#ccc', fontSize: 12, width: 24, textAlign: 'right' }, children: imgObj.mask.feather })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }, children: [_jsx("label", { style: { color: '#aaa', fontSize: 12, width: 64, flexShrink: 0 }, children: "Invert" }), _jsx("input", { type: "checkbox", checked: imgObj.mask.inverted, onChange: () => {
                                                                    if (selectedId)
                                                                        commitUpdate(selectedId, { mask: { ...imgObj.mask, inverted: !imgObj.mask.inverted } });
                                                                } })] })] }))] })] }));
                        }
                        // CONTENT EDIT MODE
                        return (_jsxs("div", { style: { padding: '12px 12px 0' }, children: [_jsx("div", { style: {
                                        marginLeft: -12,
                                        marginRight: -12,
                                        marginTop: -12,
                                        marginBottom: 12,
                                        padding: '6px 12px',
                                        background: '#ff7043',
                                        color: '#fff',
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                    }, children: "Content Edit Mode" }), _jsx("div", { style: { color: '#aaa', fontSize: 11, fontWeight: 'bold', letterSpacing: '0.08em',
                                        textTransform: 'uppercase', marginBottom: 6 }, children: "Content" }), _jsx(NumberField, { label: "Offset X", value: imgObj.contentOffsetX, onChange: (val) => patch({ contentOffsetX: val }) }), _jsx(NumberField, { label: "Offset Y", value: imgObj.contentOffsetY, onChange: (val) => patch({ contentOffsetY: val }) }), _jsx(NumberField, { label: "Width", value: imgObj.contentWidth, min: 1, onChange: (val) => patch({ contentWidth: val }) }), _jsx(NumberField, { label: "Height", value: imgObj.contentHeight, min: 1, onChange: (val) => patch({ contentHeight: val }) }), _jsx("button", { onClick: () => {
                                        if (!selectedId || !imgObj.naturalWidth || !imgObj.naturalHeight)
                                            return;
                                        const aspect = imgObj.naturalWidth / imgObj.naturalHeight;
                                        commitUpdate(selectedId, { contentHeight: Math.round(imgObj.contentWidth / aspect) });
                                    }, style: {
                                        width: '100%', height: 30,
                                        background: '#333', color: '#fff',
                                        border: '1px solid #555', borderRadius: 4,
                                        cursor: 'pointer', fontSize: 12, marginBottom: 6,
                                    }, children: "Reset Aspect Ratio" }), _jsx("button", { onClick: () => {
                                        if (!selectedId)
                                            return;
                                        const theta = imgObj.rotation * (Math.PI / 180);
                                        const cosTheta = Math.cos(theta);
                                        const sinTheta = Math.sin(theta);
                                        const newFrameX = imgObj.frameX +
                                            imgObj.contentOffsetX * cosTheta -
                                            imgObj.contentOffsetY * sinTheta;
                                        const newFrameY = imgObj.frameY +
                                            imgObj.contentOffsetX * sinTheta +
                                            imgObj.contentOffsetY * cosTheta;
                                        commitUpdate(selectedId, {
                                            frameX: newFrameX,
                                            frameY: newFrameY,
                                            x: newFrameX,
                                            y: newFrameY,
                                            frameWidth: imgObj.contentWidth,
                                            frameHeight: imgObj.contentHeight,
                                            width: imgObj.contentWidth,
                                            height: imgObj.contentHeight,
                                            contentOffsetX: 0,
                                            contentOffsetY: 0,
                                        });
                                    }, style: {
                                        width: '100%',
                                        height: 30,
                                        background: '#333',
                                        color: '#fff',
                                        border: '1px solid #555',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: 12,
                                        marginBottom: 6,
                                    }, children: "Fit frame to content" }), _jsx("button", { onClick: () => {
                                        const scale = Math.max(imgObj.frameWidth / imgObj.contentWidth, imgObj.frameHeight / imgObj.contentHeight);
                                        const newW = imgObj.contentWidth * scale;
                                        const newH = imgObj.contentHeight * scale;
                                        patch({
                                            contentWidth: newW,
                                            contentHeight: newH,
                                            contentOffsetX: (imgObj.frameWidth - newW) / 2,
                                            contentOffsetY: (imgObj.frameHeight - newH) / 2,
                                        });
                                    }, style: {
                                        width: '100%',
                                        height: 30,
                                        background: '#333',
                                        color: '#fff',
                                        border: '1px solid #555',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: 12,
                                        marginBottom: 6,
                                    }, children: "Fill frame with content" }), _jsx("div", { style: { color: '#888', fontSize: 11, marginTop: 8, marginBottom: 8 }, children: "Click outside to exit content mode" })] }));
                    })(), _jsx("div", { style: { flex: 1 } }), !isMultiSelect && isImage && selectedObj !== null && (_jsxs("div", { style: {
                            padding: 12,
                            borderTop: '1px solid #333',
                            flexShrink: 0,
                        }, children: [_jsx("div", { style: {
                                    color: '#aaa',
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    marginBottom: 8,
                                }, children: "AI Tools" }), activeBgOp?.status === 'running' && (_jsxs("div", { style: { background: '#1a1a1a', borderRadius: 6, padding: '8px 10px' }, children: [_jsxs("div", { style: { color: '#aaa', fontSize: 12, marginBottom: 6 }, children: ["Removing background\u2026 ", activeBgOp.progress, "%"] }), _jsx("div", { style: { background: '#333', borderRadius: 3, height: 6, overflow: 'hidden' }, children: _jsx("div", { style: {
                                                background: '#0af',
                                                width: `${activeBgOp.progress}%`,
                                                height: '100%',
                                                transition: 'width 0.2s',
                                            } }) })] })), activeBgOp?.status === 'done' && (_jsx("div", { style: { color: '#4f4', fontSize: 13 }, children: "Background removed" })), activeBgOp?.status === 'error' && (_jsx("div", { style: { color: '#f44', fontSize: 12 }, children: activeBgOp.error })), (!activeBgOp || activeBgOp.status === 'idle') && (_jsx("button", { onClick: handleRemoveBg, style: {
                                    width: '100%',
                                    height: 32,
                                    background: '#0af',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                }, children: "Remove BG" }))] })), !isMultiSelect && isImage && selectedId !== null && (_jsxs("div", { style: {
                            padding: 12,
                            borderTop: '1px solid #333',
                            flexShrink: 0,
                        }, children: [_jsx("div", { style: {
                                    color: '#aaa',
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    marginBottom: 8,
                                }, children: "External Editor" }), _jsx("div", { style: { color: '#666', fontSize: 11, marginBottom: 6 }, children: externalEditor ? `Default: ${externalEditor.name}` : 'No default editor set' }), activeObjectId === selectedId ? (_jsxs(_Fragment, { children: [_jsx("div", { style: { color: '#52b788', fontSize: 12, marginBottom: 6 }, children: "Watching for changes\u2026" }), _jsx("button", { onClick: () => { void stopEditing(selectedId); }, style: {
                                            width: '100%',
                                            height: 28,
                                            background: '#2a2a2a',
                                            color: '#aaa',
                                            border: '1px solid #444',
                                            borderRadius: 6,
                                            cursor: 'pointer',
                                            fontSize: 12,
                                        }, children: "Stop Watching" })] })) : (_jsxs("div", { style: { display: 'flex', gap: 6 }, children: [_jsx("button", { onClick: () => { void editExternally(selectedId, currentFilePath); }, style: {
                                            flex: 1,
                                            height: 32,
                                            background: '#2a2a2a',
                                            color: '#e0e0e0',
                                            border: '1px solid #444',
                                            borderRadius: 6,
                                            cursor: 'pointer',
                                            fontSize: 13,
                                        }, children: externalEditor != null ? `Edit in ${externalEditor.name}` : 'Edit Externally' }), externalEditor != null && (_jsx("button", { onClick: () => { void pickNewEditor(); }, title: "Change default editor", style: {
                                            height: 32,
                                            padding: '0 10px',
                                            background: '#2a2a2a',
                                            color: '#888',
                                            border: '1px solid #444',
                                            borderRadius: 6,
                                            cursor: 'pointer',
                                            fontSize: 11,
                                        }, children: "Change" }))] }))] }))] })] }));
}
