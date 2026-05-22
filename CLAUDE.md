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
- `naturalWidth/naturalHeight` on `ImageObject` = intrinsic pixel dims of the original bitmap (set at drop time, never changes)
- `contentEditMode: boolean` — false=frame transformer (blue), true=double-click enters content mode (orange #ff7043)
- Transformer is always a sibling of the Group, never inside it; Rect (not Group) is the transform target in frame mode
- **Global `resizeMode`** in store (`'advanced' | 'auto'`), toggled via Toolbar crop/auto-fill icons:
  - `'advanced'` (default): frame resize crops — content stays at its canvas position
  - `'auto'`: frame resize cover-fits (fills) content to new frame, centered — CMD+drag and pure rotation still override

**Multi-Select**
- `selectedId` — drives Properties Panel (single-object props)
- `selectedIds[]` — drives group transformer, align/distribute, and multi-select highlight
- `anchorId` — reference object for alignment; objects align TO its bbox when set; shows gold `#f5a623` border
- `setSelected(id)` sets both; `addToSelection(id)` (shift+click) appends to `selectedIds`; clicking an already-selected object in multi-select mode promotes it to `anchorId`
- When `selectedIds.length > 1`: group `<Transformer>` in CarouselStage is active; individual node transformers and draggable are suppressed; marquee drag on empty canvas (ref: `isMarqueeActiveRef`) selects by overlap
- `commitMultipleUpdates(patches)` / `removeMultipleObjects(ids)` — atomic batch ops with single history entry

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
19 (issue #5): Platform picker + aspect ratio — `Platform` type, `PLATFORM_PRESETS`, `frameWidth` store field, `setPlatform` action; `setRatio(r, w, h)` takes explicit dims; all `FRAME_WIDTH` constant uses replaced with live store value; Toolbar redesigned: platform `<select>` + dynamic per-platform ratio buttons + custom W×H inputs
20 (issue #9): Frame resize modes — global `resizeMode: 'advanced' | 'auto'` in store; `'auto'` cover-fits content on frame resize (SCRL-style); crop/auto-fill icon toggle in Toolbar; `naturalWidth/naturalHeight` on `ImageObject`; "Reset Aspect Ratio" button in content-edit mode restores intrinsic proportions
21 (issue #10): Trackpad navigation — `onWheel` in `CarouselStage.tsx` splits on `e.ctrlKey`: pinch gesture / Ctrl+scroll → zoom toward cursor; two-finger scroll / plain mouse wheel → pan via `deltaX`/`deltaY`
22 (issue #11): External photo editing — Lightroom-style "Edit in X" workflow; `chokidar@3` watches a stable PNG per objectId in `externally-edited/` next to the `.zeroseams` file; `src/types/electron.d.ts` (new) types `window.electronAPI` globally, fixing pre-existing TS errors; 4 new IPC handlers in `src/electron/index.ts` (`get/set-external-editor`, `edit-in-external-app`, `stop-external-edit`); editor preference persisted in `userData/preferences.json`; `src/canvas/useExternalEdit.ts` (new) renderer-side hook that preserves `originalSrc` on first edit; `autosaveFilePath` added to `useSaveStatusStore` so the externally-edited folder always resolves next to the project file even without an explicit Save As; "Edit Externally" in context menu + "External Editor" section in Properties Panel with dynamic editor name, Change button, and watching-state indicator

23 (issue #6): File management save button — replaced the single "Save As…" button on the right with a split-button on the left toolbar (next to Open): "Save" primary (overwrites `currentFilePath` or opens Save As dialog on first save) + "▾" dropdown with "Save As…" (always prompts, updates `currentFilePath`) and "Save a Copy…" (always prompts, does NOT update `currentFilePath`); new `save-project-copy` IPC handler + `saveProjectCopy` in preload + type; autosave and ⌘S/⌘⇧S shortcuts unchanged

24 (issue #4): Rework multi-object selection — group transformer: single Konva `<Transformer>` in `CarouselStage` wires to all selected nodes (`nodeRefMapRef` + `nodeRef` prop on all 4 node components); resize/rotate/drag apply to full group (one undo step via `commitMultipleUpdates`); marquee rubber-band selection on empty canvas drag (`isMarqueeActiveRef`, `marqueeCurrentRef`), Shift+drag extends selection; reference object (`anchorId` in store): click selected object → gold `#f5a623` border, Layer Panel `★` button, Properties Panel "Reference" dropdown — `alignObjects` aligns TO anchor bbox when set; individual transformers and `draggable` suppressed when `selectedIds.length > 1`; keyboard shortcuts extended: Delete/arrow nudge/Cmd+D all act on full `selectedIds[]` (single undo step each); new store actions: `commitMultipleUpdates`, `removeMultipleObjects`, `setAnchor`

## Upcoming (rough roadmap)
- AI features: background removal UI, SAM segmentation, LaMa inpainting
- Typography: font picker, Google Fonts integration
- Templates / presets
- Publish/share flow
- Windows packaging + auto-update
