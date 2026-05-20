# Zero Seams

**A free, open-source desktop app for creating seamless Instagram carousels.**

Zero Seams gives you one long canvas that you slice into frames — perfect for those multi-slide Instagram posts where the image flows continuously across slides. No subscriptions, no cloud, no complexity.

> Built as a side project, primarily using AI tools (Claude Code). A free and approachable alternative to expensive tools like Photoshop or InDesign that are simply overkill for making social media carousels.

![Zero Seams screenshot](docs/screenshot.png)

---

## Features

- **Seamless canvas** — one infinite horizontal surface, automatically divided into Instagram-sized frames (1:1 or 4:5)
- **Full design toolkit** — images, text, shapes, bezier paths, lines
- **InDesign-style image cropping** — click to select the frame, double-click to reposition the image inside it
- **Layers panel** — reorder, lock, hide, rename objects
- **Snap & align** — smart snap guides + multi-select align/distribute
- **Export** — exports all frames (or a range) as PNGs, ready to post
- **Project save/load** — save your work as a `.carousel` file and pick up where you left off
- **On-device AI** *(in progress)* — background removal, object segmentation, inpainting — all running locally, no data leaves your machine

## Download

> Releases coming soon. For now, clone and run locally (see below).

## Running Locally

Requires Node.js 18+.

```bash
git clone https://github.com/alexejwaser/zeroseams.git
cd zeroseams
npm install
npm run dev
```

## Tech Stack

- **Electron** — desktop shell
- **React + TypeScript** — UI
- **Konva.js** — canvas engine
- **Zustand** — state management
- **@imgly/background-removal** — on-device AI background removal

## Contributing

This is an early-stage side project. Issues and PRs are welcome — just open a discussion first if you're planning something large.

## License

MIT
