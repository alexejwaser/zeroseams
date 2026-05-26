# Zero Seams — AI Dev Guide

## Knowledge Graph (`graphify-out/`)
A queryable knowledge graph of the codebase lives in `graphify-out/`. Use it before exploring code manually.

- **Query:** `graphify query "<question>"` — BFS traversal, no re-extraction, answers from graph structure
- **Update after code changes:** `graphify update ./src` — incremental, only re-extracts changed files
- **Rebuild from scratch:** `/graphify` in Claude Code

Key god nodes (highest edge count — touch these carefully):
- `useCanvasStore` (39 edges) — owns all canvas state; every node, panel, and AI hook reads/writes it
- `buildFilterPipeline` (18 edges) — called on every image node render; LUT-cached but closure refs are new per call (see issue #37)
- `CarouselStage` (16 edges) — canvas composition root; mounts all node components

Main communities: Canvas Node Components · UI Architecture Concepts · Electron IPC & Save System · Photo Filter Pipeline · AI Subsystem · Type System & Text Utilities · E2E Test Infrastructure

## What this is
Desktop Electron app for seamless Instagram carousels. One long horizontal canvas sliced into Instagram frames.

## Tech Stack
Electron + React + TypeScript · Konva.js/react-konva · Zustand · @imgly/background-removal (WASM) · ONNX Runtime (SAM/LaMa)

## Core Concepts — never break these
- Canvas = one long surface, N frames wide
- Frame = one Instagram slide — 1080×1080 or 1080×1350; controlled by `ratio` in store
- `frameHeight` is dynamic — always read from store, never hardcode it
- Objects are `global` (span canvas freely) or `pinned` (locked to a frame)
- Export = slice canvas at frame boundaries → array of PNGs via Electron IPC

## File Ownership
- `src/canvas/` — canvas-agent · `src/ui/` — ui-agent · `src/ai/` — ai-agent
- `src/electron/` — electron-agent · `src/store/` — shared, coordinate before editing

## Key Architecture

**Image Frame/Content Model** — two-layer, never collapse:
- Frame (`frameX/Y`, `frameWidth/Height`) = visible crop viewport; `x/y/width/height` kept in sync
- Content (`contentOffsetX/Y`, `contentWidth/Height`) = bitmap floating inside frame
- `naturalWidth/naturalHeight` = intrinsic bitmap dims, set at drop time, never changes
- `contentEditMode: boolean` — false = frame transformer (blue); true = content mode (orange #ff7043)
- Transformer is always a sibling of the Group, never inside it; Rect (not Group) is the transform target in frame mode
- `resizeMode` in store (`'advanced'|'auto'`): advanced = frame resize crops; auto = cover-fits content to new frame

**Multi-Select:**
- `selectedId` — Properties Panel; `selectedIds[]` — group transformer + align/distribute; `anchorId` — alignment reference (gold #f5a623 border)
- `setSelected(id)` sets both; `addToSelection(id)` shift+click appends; clicking selected object → promotes to `anchorId`
- When `selectedIds.length > 1`: group `<Transformer>` active; individual transformers/draggable suppressed; marquee on empty canvas selects by overlap
- `commitMultipleUpdates(patches)` / `removeMultipleObjects(ids)` — atomic batch ops, single history entry

**Snap** (`useSnapGuides.ts`): snaps to frame edges/centers + objects' edges/centers, 8px threshold.
- Single: `computeSnap`/`computeSnapResize`; Group: `computeSnapGroup`/`computeSnapResizeGroup`
- `boundBoxFunc` receives absolute screen coords — always convert absolute→logical before snapping, back to absolute before returning. `logicalThreshold = 8 / scale`.
- `snapEnabled: boolean` in store; `snapRotation` + position/resize methods all gate on it; `rotationSnaps=[0,45,90,135,180,225,270,315]` on all Transformers

**Other invariants:**
- Shape/Ellipse: store uses bounding-box top-left `(x,y)` for ALL types; Konva Ellipse uses center — convert at render time
- Text: handles resize the textbox, text reflows; `scaleX/Y` always 1 after transform
- Pen: `PathObject` with `anchors: AnchorPoint[]`; `CanvasPathNode.tsx` renders SVG; `anchorsToPathData()` exported for CarouselStage; transform bakes full affine matrix into anchors, resets node to identity
- `keepRatio` on image Transformer mirrors `resizeMode`: auto → proportional default (Shift=free); advanced → free default (Shift=proportional); group transformer always `keepRatio={true}`
- Shift+drag axis-locks to nearest 0/45/90/135° axis via `axisLock(dx,dy)` in `constants.ts`
- `locked: boolean` on every object — no handles, no drag, no double-click
- History: `past[]`/`future[]` snapshots; `commitUpdate` = push snapshot; load project resets history
- Thumbnails: `useThumbnailStore`, HTML Canvas 2D, triggered on `past.length` changes + mount
- `iconBtnStyle` shared helper in `src/ui/iconBtnStyle.ts`; `Tooltip` component in `src/ui/Tooltip.tsx`
- Frame labels: HTML div strip absolutely positioned at `top: Math.max(4, panY - 22)` in CarouselStage (not Konva Text)
- Masking: `MaskData.kind: 'pen'|'rect'|'ellipse'`; rect/ellipse masks use Konva Transformer in edit mode; `maskModeActive` in store (transient, not in history)
- Save: `currentFilePath` in `useSaveStatusStore`; autosave forks on it; `recentFiles.json` tracks all opened/saved locations

**Photo Adjustments** (`src/canvas/adjustments/pipeline.ts`):
- `PhotoAdjustments` on `ImageObject` (optional, backward-compatible); `DEFAULT_ADJUSTMENTS` exported from `src/types/canvas.ts`
- `buildFilterPipeline(adj)` → `Array<(ImageData) => void>` Konva custom filters; returns `[]` when all values are 0 (zero cost for unedited images)
- Exposure uses gamma decode → linear EV gain → re-encode (matches Lightroom's perceptual response, no harsh clipping). Contrast S-curve halved (`/200`). Highlights/shadows scaled 0.5×. Whites/blacks zones narrowed to top/bottom 25% of tonal range.
- LUT cache: module-level `Map<string, Uint8ClampedArray>` keyed by `"param:value"` — LUTs rebuilt only when value changes
- `CanvasImageNode` caches `imageRef` (not `innerGroupRef`) via `useEffect` whenever `filterPipeline` or image changes; mask cache on `innerGroupRef` is an independent layer — no conflict
- `adjustmentsBypass: boolean` in store (transient, not in history) — `\` hold-to-compare (keydown=true, keyup=false); `Power` button in Adjustments header toggles persistently; sliders dim + `pointerEvents: none` when bypassed
- Sliders: Lightroom Classic gradient tracks via `adjustments.css` (`::-webkit-slider-runnable-track`); double-click label, number input, or slider handle resets that param to 0; one undo step per drag (`updateObject` on drag, `commitUpdate` on mouseUp)

## Keyboard Shortcuts
`useKeyboardShortcuts.ts`, mounted once in CarouselStage. No-op in input/textarea.
`V` select · `T` text · `R` shape · `P` pen · `L` line · `S` snap toggle · `\` bypass adjustments (hold) · `Esc` deselect · `⌘A` all · `⌘D` dupe · `⌘Z/⇧Z` undo/redo · `⌘]/[` layers · `⌘L` lock · arrows nudge · `⌫` delete

## Features Implemented (sprints 1–37)
Canvas scaffold + Electron shell · Image frame/content model (InDesign crop/zoom) · Multi-select + snap guides + locking · Text tool + undo/redo · Context menu + layer thumbnails · Export panel (all/single/range) · Shape tool (rect/ellipse/line/arrow) + project load/save · Pen/bezier tool · Platform picker + aspect ratio (`PLATFORM_PRESETS`, `frameWidth` from store) · Frame resize modes (advanced/auto) · Trackpad pan/zoom · External photo editing (chokidar, Edit in X) · Save split-button (Save/Save As/Save a Copy) · Multi-select group transformer + marquee + anchor alignment · Image node multi-select bbox fix (frameRectRef not groupRef) · Rotation snapping + unified snap toggle · Pen anchor corner↔curve double-click toggle · Icon-first toolbar (lucide-react, 6 groups) + FrameSettingsPopover · Multi-object transform fixes (isGroupTransform, RAF re-wire) · Resize-snap coordinate space fix (absolute↔logical) · Masking system (pen/rect/ellipse, quick-mask Scissors button) · Mode-aware keepRatio · Shift+drag axis lock · UI compactness overhaul + FrameSettingsPopover · File save path fix (open-project returns filePath, autosave respects currentFilePath) · Pen path transforms + rotation center fix (rotateAroundCenter helper) · Photo adjustments slice 1 — 12 scalar sliders (exposure/contrast/highlights/shadows/whites/blacks/temperature/tint/saturation/vibrance/clarity/dehaze), gamma-correct pipeline, LUT cache, bypass toggle + `\` shortcut (issue #34)

## Upcoming
AI: background removal UI, SAM segmentation, LaMa inpainting · Font picker + Google Fonts · Templates/presets · Publish/share · Windows packaging + auto-update
