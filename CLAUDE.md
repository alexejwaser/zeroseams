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

## Keyboard Shortcuts (sprint 11)
All shortcuts handled in `src/canvas/useKeyboardShortcuts.ts`, mounted once in CarouselStage.
Guard: no-op when focus is in INPUT / TEXTAREA / contentEditable.

| Key | Action |
|-----|--------|
| `V` | Select tool |
| `T` | Text tool |
| `R` | Shape tool |
| `Escape` | Deselect / exit content-edit mode (skipped when context menu is open) |
| `⌘A` | Select all visible, non-locked objects |
| `⌘D` | Duplicate selected (10px offset) |
| `⌘]` | Bring forward |
| `⌘[` | Send backward |
| `⌘⇧]` | Bring to front |
| `⌘⇧[` | Send to back |
| `⌘L` | Toggle lock |
| Arrow | Nudge 1px (Shift = 10px) |
| `⌫` / `Delete` | Delete selected |
| `⌘Z` | Undo |
| `⌘⇧Z` | Redo |

Old `useDeleteShortcut.ts` and `useUndoRedoShortcuts.ts` are superseded by `useKeyboardShortcuts.ts`.

## Export (sprint 12)
Export lives in `src/ui/Toolbar.tsx` — right side, opens a compact panel below the button.
- Three modes: **All frames** (default), **Single** (one frame number input), **Range** (From / To inputs), all 1-indexed in UI
- `exportFrames(stage, frameCount, frameWidth, frameHeight, startFrame, endFrame)` in `src/canvas/exportFrames.ts` — `startFrame`/`endFrame` are 0-indexed optional params defaulting to full range
- `downloadFrames(blobs)` unchanged — saves via Electron IPC, names `frame-N.png`
- Panel dismisses on outside mousedown (same pattern as ContextMenu)
- No export button exists outside the Toolbar

## Context Menu (sprint 11 + sprint 12)
`src/ui/ContextMenu.tsx` — React portal to `document.body`, `position: fixed`.
- Right-click on a canvas object → object-level menu (Duplicate, Bring/Send, Lock, Delete)
- Right-click on empty canvas → canvas-level menu (Add/Remove Frame)
- **Image-only items** (sprint 12): separator + Remove Background, Fit Frame to Content, Fill Frame with Content
  - Remove Background: disabled while a `background-removal` AI op is running for that object
  - Fit/Fill: use `commitUpdate` (undo-able), same math as Properties Panel
- State: `contextMenu: { x, y, targetId } | null` in `useCanvasStore` — volatile, NOT in `HistorySnapshot`
- Dismiss: click outside, Escape, any enabled menu item click
- Disabled items do not call `setContextMenu(null)` — menu stays open

## Layer Thumbnails (sprint 11 + sprint 12)
`src/canvas/useThumbnailStore.ts` — separate Zustand store, never in HistorySnapshot.
- Thumbnails generated via HTML Canvas 2D (no Konva) at 60×60 (`SIZE` constant)
- Generation triggers only on `past.length` changes (i.e. after `commitUpdate`), not during live drag
- `useThumbnailGenerator()` hook mounted once in CarouselStage
- LayerPanel displays 44×44 thumbnail cells; row height 48px; no type-icon column

## Image Drop Filename (sprint 12)
`src/canvas/useImageDrop.ts` captures `file.name.replace(/\.[^.]+$/, '')` and stores it as `name` on the created object. LayerPanel's `getDisplayName()` already prefers `obj.name` over the fallback `"Image N"` label.

## Option+Drag Duplicate (sprint 11)
Hold Alt/Option while dragging to leave a copy at the original position.
- `pendingDuplicateRef` latches on first Alt-held drag move; checked at drag end
- `duplicateObjectAtOrigin(id, originPos, finalPos)` — single `set()` → one history entry
- Images use `{ frameX, frameY }` for origin/final; text uses `{ x, y }`

## Shape Tool (sprint 13)
`src/canvas/CanvasShapeNode.tsx` — handles `rect`, `ellipse`, `line`, `arrow` ShapeObjects.
- **Ellipse coordinate convention**: Store uses bounding-box top-left `(x, y)` for ALL object types. Konva Ellipse uses center. Conversions:
  - Render: `x={obj.x + obj.width/2}`, `y={obj.y + obj.height/2}`, `radiusX/Y = obj.width/2, obj.height/2`
  - `onDragMove/End`: `rawX = node.x() - obj.width/2`
  - `onTransform/End`: bake via `getDimsFromNode` / `bakeNodeScale` helpers inside the component
- **Transformer anchors**: rect/ellipse = all 8; line/arrow = middle-left + middle-right only, rotate disabled
- **Drawing interaction** in `CarouselStage.tsx`: mousedown on empty stage → sets `drawStartRef` + `previewShape` state; mousemove → updates preview rect; mouseup → `addObject` + `setSelected` + revert to select tool. Misclicks (`width < 5 && height < 5`) are discarded.
- **Sub-type selector**: `activeShapeKind: ShapeKind` in `useCanvasStore`; selector appears in Toolbar only when `activeTool === 'shape'`
- Option+drag duplicate uses `{ x, y }` origin/final (same as text — not `{ frameX, frameY }`)

## Text Transform (sprint 13)
Text resize is **InDesign-style**: handles resize the textbox boundary, text reflows inside. Scale is never stored.
- `onTransform`: bake `node.width() * node.scaleX()` → `node.width()`, reset scale to 1 imperatively; call `updateObject`
- `onTransformEnd`: same bake; if **CMD+Shift held** during a corner drag → also scale `fontSize` proportionally (`newFontSize = fontSize * (newWidth / oldWidth)`)
- `KonvaText` has `wrap="word"` — text clips to `height` boundary (no auto-grow)
- `scaleX/scaleY` on TextObject are always 1 after sprint 13 — never multiply by them in textarea or snap box calculations
- `cmdHeldRef` tracks Meta key (separate useEffect, same pattern as `altHeldRef`)

## Project Load/Save (sprint 13)
- **`loadProject(project: CarouselProject)`** in `useCanvasStore` — replaces all 7 canvas state fields and resets `selectedId/selectedIds/contextMenu/activeTool/past/future`. Does NOT call `pushHistoryFrom` — loading is a session reset, not undoable.
- **`useSaveStatusStore`** (`src/ui/useSaveStatusStore.ts`) now holds project metadata: `projectId`, `projectName`, `projectFilename`, `createdAt`. Set via `setProjectMeta(id, name, filename, createdAt)`. `useAutosave.ts` reads these via `useSaveStatusStore.getState()` (not React hooks — it's inside a non-React callback).
- **`useAutosave.ts` bug fixes (sprint 13)**: `ratio`, `frames`, `backgroundColor`, `frameHeight` now read from `state` (were previously hardcoded). Project metadata now comes from `useSaveStatusStore.getState()`.
- **Open UI**: Toolbar has a split Open/▾ button. Open triggers `window.electronAPI.openProject()` → file dialog → parse JSON → `loadProject` + `setProjectMeta`. The ▾ chevron fetches `listRecentProjects()` and shows a dropdown.

## Known Patterns
- File saving must use Electron IPC (window.electronAPI.saveFile) 
  NOT anchor click downloads — Electron's Chromium blocks multi-file 
  anchor downloads silently