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
- A "frame" is one Instagram slide (1080x1080 or 1080x1350)
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