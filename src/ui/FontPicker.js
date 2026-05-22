import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
const MAC_SYSTEM_FONTS = [
    'American Typewriter', 'Andale Mono', 'Arial', 'Arial Black', 'Arial Narrow',
    'Arial Rounded MT Bold', 'Arial Unicode MS', 'Avenir', 'Avenir Next',
    'Avenir Next Condensed', 'Baskerville', 'Big Caslon', 'Bodoni 72',
    'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bradley Hand',
    'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster',
    'Charter', 'Cochin', 'Comic Sans MS', 'Copperplate', 'Courier',
    'Courier New', 'DIN Alternate', 'DIN Condensed', 'Damascus',
    'DejaVu Sans', 'DejaVu Sans Mono', 'DejaVu Serif', 'Didot',
    'Futura', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica',
    'Helvetica Neue', 'Herculanum', 'Hoefler Text', 'Impact',
    'Lucida Grande', 'Marker Felt', 'Menlo', 'Monaco', 'Noteworthy',
    'Optima', 'Palatino', 'Papyrus', 'Phosphate', 'PT Mono',
    'PT Sans', 'PT Sans Caption', 'PT Sans Narrow', 'PT Serif',
    'PT Serif Caption', 'Rockwell', 'SF Mono', 'SF Pro Display',
    'SF Pro Text', 'Savoye LET', 'SignPainter', 'Skia', 'Snell Roundhand',
    'Superclarendon', 'Symbol', 'Tahoma', 'Times New Roman', 'Trattatello',
    'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 'Wingdings 2',
    'Wingdings 3', 'Zapf Dingbats', 'Zapfino',
];
export function FontPicker({ value, onChange, }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [fonts, setFonts] = useState([]);
    const [highlightIdx, setHighlightIdx] = useState(0);
    const containerRef = useRef(null);
    const searchRef = useRef(null);
    const listRef = useRef(null);
    // Enumerate system fonts via Electron IPC (app.getSystemFonts)
    useEffect(() => {
        window.electronAPI.getSystemFonts()
            .then((families) => {
            if (families && families.length > 10) {
                const sorted = [...new Set(families)].sort((a, b) => a.localeCompare(b));
                setFonts(sorted);
            }
            else {
                setFonts(MAC_SYSTEM_FONTS);
            }
        })
            .catch(() => {
            setFonts(MAC_SYSTEM_FONTS);
        });
    }, []);
    // Close on outside click
    useEffect(() => {
        if (!open)
            return;
        function handleClick(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
                setSearch('');
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);
    // Focus search input when dropdown opens
    useEffect(() => {
        if (open) {
            setTimeout(() => searchRef.current?.focus(), 0);
            setHighlightIdx(0);
        }
    }, [open]);
    const filtered = search
        ? fonts.filter((f) => f.toLowerCase().includes(search.toLowerCase()))
        : fonts;
    // Scroll highlighted item into view
    useEffect(() => {
        if (!listRef.current)
            return;
        const item = listRef.current.children[highlightIdx];
        item?.scrollIntoView({ block: 'nearest' });
    }, [highlightIdx]);
    function handleKeyDown(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1));
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightIdx((i) => Math.max(i - 1, 0));
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            if (filtered[highlightIdx]) {
                onChange(filtered[highlightIdx]);
                setOpen(false);
                setSearch('');
            }
        }
        else if (e.key === 'Escape') {
            setOpen(false);
            setSearch('');
        }
    }
    function handleSearchChange(e) {
        setSearch(e.target.value);
        setHighlightIdx(0);
    }
    const displayValue = value ?? '—';
    return (_jsxs("div", { ref: containerRef, style: { position: 'relative', flex: 1 }, children: [_jsx("button", { onClick: () => setOpen((o) => !o), style: {
                    width: '100%',
                    background: '#1a1a1a',
                    border: '1px solid #444',
                    borderRadius: 4,
                    color: value ? '#fff' : '#666',
                    fontSize: 13,
                    padding: '3px 8px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: value ?? 'inherit',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                }, children: displayValue }), open && (_jsxs("div", { style: {
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: '#222',
                    border: '1px solid #444',
                    borderRadius: 4,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: 260,
                }, onKeyDown: handleKeyDown, children: [_jsx("input", { ref: searchRef, value: search, onChange: handleSearchChange, placeholder: "Search fonts\u2026", style: {
                            background: '#2a2a2a',
                            border: 'none',
                            borderBottom: '1px solid #444',
                            color: '#fff',
                            fontSize: 12,
                            padding: '6px 8px',
                            outline: 'none',
                            flexShrink: 0,
                        } }), _jsxs("div", { ref: listRef, style: { overflowY: 'auto', flex: 1 }, children: [filtered.length === 0 && (_jsx("div", { style: { color: '#666', fontSize: 12, padding: '8px 10px' }, children: "No fonts found" })), filtered.map((family, idx) => (_jsx("div", { onMouseDown: (e) => {
                                    e.preventDefault();
                                    onChange(family);
                                    setOpen(false);
                                    setSearch('');
                                }, onMouseEnter: () => setHighlightIdx(idx), style: {
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                    background: idx === highlightIdx ? '#0af2' : family === value ? '#1a3a4a' : 'transparent',
                                    color: '#ddd',
                                    fontSize: 14,
                                    fontFamily: family,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }, children: family }, family)))] })] }))] }));
}
