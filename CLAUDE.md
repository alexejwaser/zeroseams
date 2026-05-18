# Zero Seams - Open Soruce Desktop App for creating seamless Social Media Carousels

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