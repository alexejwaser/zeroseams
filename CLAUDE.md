# Zero Seams — AI Dev Guide

## What this is
Desktop Electron app for creating seamless Instagram carousels. One long horizontal canvas sliced into Instagram frames. Simple enough for quick social posts, precise enough for real design work.

## Tech Stack
- Electron + React + TypeScript
- Konva.js / react-konva (canvas engine)
- Zustand (state management)
- @imgly/background-removal (on-device AI, WASM)
- ONNX Runtime (SAM segmentation, LaMa inpainting)

## Core Concepts — never break these
- Canvas = one long surface, N frames wide
- A "frame" = one Instagram slide — 1080×1080 (square) or 1080×1350 (portrait); controlled by `ratio` in store
- `frameHeight` is dynamic — always read from store, never hardcode it
- Objects are `global` (span canvas freely) or `pinned` (locked to a frame)
- Export = slice canvas at frame boundaries → array of PNGs via Electron IPC (not anchor downloads)

## File Ownership
- `src/canvas/` — canvas-agent only
- `src/ui/` — ui-agent only
- `src/ai/` — ai-agent only
- `src/electron/` — electron-agent only
- `src/store/` — shared, coordinate before editing

## Key Architecture Decisions

**Image Frame/Content Model (InDesign-style)**
Two-layer model — never collapse:
- Frame (`frameX/Y`, `frameWidth/Height`) = visible crop viewport; `x/y/width/height` kept in sync for compatibility
- Content (`contentOffsetX/Y`, `contentWidth/Height`) = image bitmap floating inside frame
- `contentEditMode: boolean` — false=frame transformer (blue), true=double-click enters content mode (orange #ff7043)
- Transformer is always a sibling of the Group, never inside it; Rect (not Group) is the transform target in frame mode

**Multi-Select**
- `selectedId` — drives Properties Panel (single-object props)
- `selectedIds[]` — drives align/distribute and multi-select highlight
- `setSelected(id)` sets both; `addToSelection(id)` (shift+click) appends to `selectedIds`

**Shape/Ellipse convention**: store uses bounding-box top-left `(x, y)` for ALL types. Konva Ellipse uses center — convert at render time.

**Text**: InDesign-style resize — handles resize the textbox, text reflows. Scale is never stored (`scaleX/Y` always 1 after transform).

**Pen/Bezier tool (sprint 14)**: `PathObject` with `anchors: AnchorPoint[]`. `CanvasPathNode.tsx` renders SVG path from anchors. `anchorsToPathData()` exported from there for use in CarouselStage.

**Snap**: `useSnapGuides.ts` — snaps to frame edges/centers and other objects' edges/centers. Threshold 8px. Rendered as Konva Lines (non-listening layer).

**Locking**: `locked: boolean` on every object. When locked: transformer shows no handles, drag disabled, double-click blocked.

**History**: `past[]`/`future[]` snapshots in store. `commitUpdate` = push snapshot. Loading a project resets history entirely (not undoable).

**Thumbnails**: separate Zustand store (`useThumbnailStore`), generated via HTML Canvas 2D, triggered only on `past.length` changes.

## Keyboard Shortcuts
Handled in `useKeyboardShortcuts.ts`, mounted once in CarouselStage. No-op when focus is in input/textarea.

`V` select · `T` text · `R` shape · `P` pen · `L` line · `Escape` deselect · `⌘A` select all · `⌘D` duplicate · `⌘Z/⇧Z` undo/redo · `⌘]/[` layer order · `⌘L` lock · arrows nudge · `⌫` delete

## Sprint History (completed)
1–7: Project scaffold, canvas foundation, types, Electron shell
8: Image frame/content model (InDesign-style crop/zoom)
9: Multi-select, snap guides, object locking, canvas background/ratio
10: Text tool, undo/redo, history
11: Context menu, layer thumbnails, keyboard shortcuts, option+drag duplicate
12: Export panel (all/single/range), image context menu actions, filename capture
13: Shape tool (rect/ellipse/line/arrow), project load/save UI, text transform fix
14: Pen/bezier tool, line tool endpoint fix

## Upcoming (rough roadmap)
- AI features: background removal UI, SAM segmentation, LaMa inpainting
- Typography: font picker, Google Fonts integration
- Templates / presets
- Publish/share flow
- Windows packaging + auto-update
