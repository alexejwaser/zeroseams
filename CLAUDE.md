# Zero Seams - Open Source Desktop App for creating seamless Social Media Carousels

## What this is
A desktop Electron app for creating seamless Instagram carousels.
The canvas is one long horizontal surface sliced into Instagram frames.
Think: SCRL app simplicity + Photoshop-level control.

## Tech Stack
- Electron (desktop shell)
- React + TypeScript (UI)
- Konva.js / react-konva (canvas engine)
- @imgly/background-removal (on-device AI, WASM)
- ONNX Runtime (SAM segmentation, LaMa inpainting)
- Zustand (state management)

## Core Concepts (never break these)
- Canvas = one long surface, N frames wide
- A "frame" is one Instagram slide — 1080×1080 (square) or 1080×1350 (portrait); ratio controlled by `ratio` in store
- Objects are either "global" (span canvas freely) or "pinned" (locked to a frame)
- Export = slice canvas at frame boundaries → array of PNGs

## Image Frame/Content Model (InDesign-style, sprint 8)
Every image on the canvas uses a two-layer model — never collapse these back to raw x/y/width/height:

**Frame** — the clipping viewport the user sees and single-clicks to select:
- `frameX`, `frameY` — canvas position
- `frameWidth`, `frameHeight` — visible crop window
- `x`, `y`, `width`, `height` on BaseCanvasObject are kept in sync with frame values for export/layer-panel compatibility

**Content** — the image bitmap floating inside the frame:
- `contentOffsetX`, `contentOffsetY` — image origin relative to frame origin (can be negative = cropped)
- `contentWidth`, `contentHeight` — rendered image size (zoom)

**Edit modes** (controlled by `contentEditMode: boolean`):
- `false` (default) — single-click selects the frame; Transformer (blue) acts on the frame Rect
- `true` — entered by double-click; Transformer (orange #ff7043) acts on the KonvaImage inside the clip Group

**Konva node structure** (CanvasImageNode.tsx):
```
<Group clip={frameWidth×frameHeight}>   ← visual clip container, listening={contentEditMode}
  <KonvaImage x={contentOffsetX} ... /> ← draggable only in content mode
</Group>
<Rect width={frameWidth} .../>          ← invisible hit/transform target in frame mode
<Transformer />                         ← sibling of Group in the Layer (standard Konva pattern)
```
The Transformer is always a sibling of the Group, never inside it. The Rect (not the Group) is the transformer target in frame mode — Groups have no intrinsic size so transformer handles would track content bounds, not frame bounds.

**Proportional scaling** (CMD+Shift while resizing):
- Konva natively handles Shift → toggles `keepRatio` (base=false, Shift XORs to true)
- CMD is tracked via a window keydown/keyup listener on `cmdHeldRef`
- When CMD is held, `syncGroupToRect()` also scales content imperatively (no re-render per frame):
  `scale = (newFrameWidth/frameWidth + newFrameHeight/frameHeight) / 2`
  `contentOffset *= scale`, `contentWidth *= scale`, `contentHeight *= scale`

**Properties panel behaviour:**
- Frame mode: shows frameX/Y/W/H (patching also keeps x/y/width/height in sync)
- Content mode: orange banner + contentOffset/size fields + "Fit frame" and "Fill frame" buttons

**Exit content mode:** clicking stage background calls `clearContentEditMode()` (store action) + `setSelected(null)`

## Multi-Select Model (sprint 9)
The store holds two parallel selection concepts — never collapse these:

- `selectedId: string | null` — the **primary** selection; drives the Properties Panel (single-object props)
- `selectedIds: string[]` — the **group** selection; drives align/distribute and multi-select highlight

**Rules:**
- `setSelected(id)` sets both: `selectedId = id`, `selectedIds = [id]` (or both null/empty)
- `addToSelection(id)` (shift+click) appends to `selectedIds`; sets `selectedId` only when coming from empty selection
- When an object is removed, it is purged from both fields
- Align/distribute reads `selectedIds`; Properties Panel reads `selectedId`

**Align & Distribute** (requires selectedIds.length ≥ 2):
- 6 align anchors: `'left'|'right'|'top'|'bottom'|'centerH'|'centerV'`
- 2 distribute axes: `'horizontal'|'vertical'` (requires ≥ 3 objects)
- Both push a single history snapshot via batch update in one `set()` call
- Image objects use `frameX/frameY` (not `x/y`) as the geometry source for bbox calculation

## Snap System (sprint 9)
`src/canvas/useSnapGuides.ts` — pure logic, no Konva:
- `computeSnap(box, allObjects, frameCount, frameWidth, frameHeight, threshold)` — returns snapped `{x, y}` and `SnapGuide[]`
- Snap targets: every frame's left/center/right edges (vertical), canvas top/center/bottom (horizontal), every other object's edges and centers
- Threshold: `SNAP_THRESHOLD = 8` canvas pixels
- `useSnapGuides()` hook returns a bound `computeSnap(box, excludeId)` that reads store state

`src/canvas/SnapGuides.tsx` — renders `SnapGuide[]` as Konva Lines on a non-listening layer:
- `#ff3b5c` for frame snaps, `#0096ff` for object snaps
- Mounted as Layer 3 in CarouselStage; `activeGuides` state lives in CarouselStage
- Nodes call `onGuidesChange(guides)` on drag move, `onGuidesChange([])` on drag end

## Object Locking (sprint 9)
`locked: boolean` on `BaseCanvasObject` is now fully enforced:
- **Canvas**: when `obj.locked && isSelected`, Transformer attaches with `enabledAnchors=[]` + `rotateEnabled=false` — shows selection box, no handles. Drag is blocked (`draggable={!obj.locked}`). Double-click into content edit mode is blocked for both images and text.
- **UI**: LayerPanel shows a lock toggle icon per row. `toggleLock(id)` pushes undo history.
- Properties Panel still shows read-only values when locked (numeric edits are not blocked at store level by design).

## Canvas Background & Ratio (sprint 9)
`frameHeight` is **dynamic** — stored in `useCanvasStore`, not a constant:
- `ratio: 'square' | 'portrait'` controls `frameHeight`: square=1080, portrait=1350
- `FRAME_HEIGHT` constant was removed from `constants.ts` — always read from store
- `backgroundColor: string` — canvas-wide default background (#ffffff initially)
- `frames: Frame[]` — per-frame metadata; `Frame.backgroundColor: string | null` overrides the canvas default (null = inherit)
- All four fields (`ratio`, `frameHeight`, `frames`, `backgroundColor`, `frameCount`) are included in `HistorySnapshot` and restored on undo/redo

**Ratio toggle**: `[1:1]` / `[4:5]` buttons in Toolbar. `setRatio(r)` pushes history.
**Per-frame BG**: Properties Panel "Canvas" section (no-selection state) has canvas-wide + per-frame color pickers.
**Export**: `exportFrames()` accepts `frameHeight` as a parameter — output is 2×frameHeight pixels tall.

## Domain Parallel Patterns
When implementing across domains, spawn parallel agents:
- canvas-agent: Konva canvas, object manipulation, frame logic
- ui-agent: React panels, toolbars, property inspector
- ai-agent: background removal, segmentation, inpainting pipeline
- electron-agent: IPC, file I/O, packaging, window management

## File Ownership (prevent conflicts)
- src/canvas/** → canvas-agent only
- src/ui/** → ui-agent only  
- src/ai/** → ai-agent only
- src/electron/** → electron-agent only
- src/store/** → shared, coordinate before editing

## Code Style
- TypeScript strict mode, no any
- Components: functional with hooks only
- Canvas objects: always typed with our CanvasObject interface
- AI operations: always async with loading states

## Known Patterns
- File saving must use Electron IPC (window.electronAPI.saveFile) 
  NOT anchor click downloads — Electron's Chromium blocks multi-file 
  anchor downloads silently