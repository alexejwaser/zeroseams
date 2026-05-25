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

**Snap**: `useSnapGuides.ts` — snaps to frame edges/centers and other objects' edges/centers. Threshold 8px. Rendered as Konva Lines (non-listening layer). Hook exposes `computeSnap`/`computeSnapResize` (single-object, exclude one ID) and `computeSnapGroup`/`computeSnapResizeGroup` (multi-select, exclude a set of IDs). CarouselStage calls the group variants during `handleGroupDragLive`, `boundBoxFunc`, and the manual `multiSelectDragStartRef` drag path.

**Locking**: `locked: boolean` on every object. When locked: transformer shows no handles, drag disabled, double-click blocked.

**History**: `past[]`/`future[]` snapshots in store. `commitUpdate` = push snapshot. Loading a project resets history entirely (not undoable).

**Thumbnails**: separate Zustand store (`useThumbnailStore`), generated via HTML Canvas 2D, triggered only on `past.length` changes.

## Keyboard Shortcuts
Handled in `useKeyboardShortcuts.ts`, mounted once in CarouselStage. No-op when focus is in input/textarea.

`V` select · `T` text · `R` shape · `P` pen · `L` line · `S` snap toggle · `Escape` deselect · `⌘A` select all · `⌘D` duplicate · `⌘Z/⇧Z` undo/redo · `⌘]/[` layer order · `⌘L` lock · arrows nudge · `⌫` delete

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

25 (issue #19): Multi-select bounding box respects frame layer — `nodeRef` in `CanvasImageNode` changed from `groupRef` (clip Group; Konva's `getClientRect()` ignores the clip, returning full content extent) to `frameRectRef` (invisible Rect at exact frame bounds); `syncRef` prop + `syncRefMapRef` in `CarouselStage` expose `syncGroupOnTransform` so the visual clip group stays in sync during live group drag/transform; group transformer `onTransform`/`onDragMove` call each image's sync fn — multi-select snap-to-guides extended to group drag (both transformer drag and manual imperative drag paths) and group resize via `boundBoxFunc`; `useSnapGuides` hook extended with `computeSnapGroup`/`computeSnapResizeGroup` that exclude all selected IDs from snap targets

26 (issue #12): Rotation snapping + unified snap toggle — `snapEnabled: boolean` + `toggleSnap()` in store (default on); `useSnapGuides` hook exposes `snapRotation` (gated on `snapEnabled`) + all 4 position/resize snap methods short-circuit when snap is off; rotation snap uses Konva's native `rotationSnaps={[0,45,90,135,180,225,270,315]}` + `rotationSnapTolerance={8}` props on all Transformer components (individual nodes + group) — live snap during drag with no position drift; `snapRotation` also applied in `onTransformEnd` / `handleGroupTransformEnd` as commit-time safety; `S` key toggles snap; Toolbar snap button (crosshair icon, `#0af` when on)

27 (issue #3): Pen tool anchor conversion + larger handles — double-clicking an anchor in edit mode toggles corner ↔ curve: curve→corner zeros both handles; corner→curve computes tangent-direction handles (30px, using prev/next anchor direction, wraps correctly for closed paths); each toggle creates one undo entry via `commitUpdate`; anchor circle `radius 5→7`, handle circles `radius 4→6`

28 (issue #22): Compact icon-first toolbar redesign — install `lucide-react`; all text-only tool buttons (Select/Text/Shape/Pen) replaced with icon-only buttons (`MousePointer2`, `Type`, `Square`/`Circle`/`Minus` dynamic on active sub-type, `PenTool`); Undo/Redo → `Undo2`/`Redo2`; Open → `FolderOpen` icon only; Save → `Save` icon + "Save" text; Export → `ImageDown` + "Export"; shared `iconBtnStyle(active, disabled)` helper replaces verbose per-button inline styles; toolbar height 48→40px; `title` attribute on every button with keyboard shortcut hints; snap/crop/autofill custom SVGs unchanged

29 (issue #26): Fix multi-object transform — three bugs all rooted in `syncGroupOnTransform` being called with single-object logic during group transforms: (1) **No crop during group scale**: added `isGroupTransform` param to `syncGroupOnTransform`; when true, content follows frame proportionally per-axis (`scaleX = newWidth/frameWidth`) ignoring `resizeMode` — exposed via new `syncGroupRef` prop + `syncGroupRefMapRef` in CarouselStage; `handleGroupTransformLive`/`handleGroupDragLive` call group-sync fn with fallback to regular sync for non-image nodes; `<Rect onTransform>` guard (`if (isInMultiSelectMode) return`) prevents single-object crop branch from interfering during group transforms. (2) **Correct bounding box after transform**: `tr.nodes([])` detaches transformer at the very top of `handleGroupTransformEnd` before scale-baking so Konva cannot fight React's re-render of updated `width/height` props; `requestAnimationFrame(() => setGroupTransformKey(k+1))` defers transformer re-wire until after React propagates new node dimensions. (3) **Single-object proportional by default**: `keepRatio={true}` on the single-object `<Transformer>` — Shift toggles to free stretch via Konva's XOR. Playwright test suite added (`scripts/test-multiselect-transform.mjs`, 55 assertions across 8 scenarios); stores exposed on `window` for test access.

30 (issue #2): Fix resize-handle snap to guides — root cause: Konva's `boundBoxFunc` provides `newBox` in **absolute screen coordinates** (via `getAbsoluteTransform()`), while `computeSnapResize` was using logical canvas coords for snap targets; at `CANVAS_SCALE=0.5` this caused snap to misfire on the wrong targets. Fix: each `boundBoxFunc` in `CanvasImageNode`, `CanvasShapeNode`, `CanvasTextNode`, and the group transformer in `CarouselStage` now converts `newBox` absolute→logical before snapping and converts the snapped result back to absolute before returning. Secondary fix: for corner handles with `keepRatio=true` (images, group transformer), `computeSnapResize` now accepts a `keepRatio?` boolean; when true it snaps only the axis with the closer target and derives the other from the original aspect ratio, preserving proportionality. Threshold fix: `logicalThreshold = 8 / scale` keeps the snap zone a consistent 8 screen-pixels at any zoom.

31 (issue #28): Masking system overhaul — four fixes: (1) **External edit refresh**: `loadedImage` added to inner-group cache effect deps in `CanvasImageNode`; without it the Konva cache was rebuilt on `src` change (image still loading) but never again when `useImage` resolved asynchronously, permanently showing pre-edit pixels through the mask. (2) **Pen mask parity**: anchor circle radius 5→7, handle circles 4→6 in both the mask edit overlay (`CanvasImageNode`) and the draw preview (`CarouselStage`); double-click corner↔curve toggle added to edit overlay (same tangent-handle logic as `CanvasPathNode`). (3) **Quick-mask toolbar button**: `maskModeActive: boolean` (transient, not in history) + `setMaskModeActive` in store; auto-set `true` when an `ImageObject` is selected via `setSelected`; `Scissors` icon button appears in Toolbar left of Shape — active = cyan, click deselects + resets to select tool; shape/pen tool mousedown guards in `CarouselStage` intercept draw gestures and route to `enterMaskDrawMode` when active (interception placed before the `e.target !== stage` gate so clicks on the image are caught; `draggable` on `frameRectRef` also gated on `activeTool !== 'select'` to prevent accidental image drag). (4) **Properties Panel icon buttons**: `iconBtnStyle` extracted to `src/ui/iconBtnStyle.ts` (shared); mask tool-picker text buttons replaced with `PenTool/Square/Circle` icons; Edit Mask → `Pencil`; visibility toggle → `Eye`/`EyeOff`; remove → `Trash2`. Bonus: `MaskData.kind?: 'pen'|'rect'|'ellipse'` field stamped at creation time; rect/ellipse masks now use a Konva `<Transformer>` in edit mode (drag to move, handles to resize, scale baked on `onTransformEnd`, ellipse anchors recomputed from new bbox using K=0.5523 bezier approximation) rather than individual corner circles. `Tooltip` component (`src/ui/Tooltip.tsx`) adopted across Toolbar, PropertiesPanel, and LayerPanel.

32 (issue #30): Mode-aware transform defaults — `keepRatio` on the image Transformer now mirrors `resizeMode`: `resizeMode === 'auto'` (autofill) → proportional default, Shift = free; `resizeMode === 'advanced'` (crop) → free default, Shift = proportional. Konva's native Shift-XOR handles the inversion; no extra key listener needed. The `keepRatio` arg passed to `computeSnapResize` in `boundBoxFunc` is updated to match, so snap axis-derivation aligns with the visual behavior. `cmdHeldRef`/Cmd+Shift frame+content proportional path and side-handle uni-directional behavior are unchanged. Shapes and text already use `keepRatio={false}`; group transformer stays `keepRatio={true}`.

## Upcoming (rough roadmap)
- AI features: background removal UI, SAM segmentation, LaMa inpainting
- Typography: font picker, Google Fonts integration
- Templates / presets
- Publish/share flow
- Windows packaging + auto-update
