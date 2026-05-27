# Graph Report - .  (2026-05-27)

## Corpus Check
- 6 files · ~48,051 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 497 nodes · 798 edges · 33 communities (19 shown, 14 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Canvas Node Components|Canvas Node Components]]
- [[_COMMUNITY_Project Rationale & Docs|Project Rationale & Docs]]
- [[_COMMUNITY_E2E Test Helpers|E2E Test Helpers]]
- [[_COMMUNITY_Electron IPC & Save System|Electron IPC & Save System]]
- [[_COMMUNITY_Save System & Recent Files|Save System & Recent Files]]
- [[_COMMUNITY_Build Config & Test Fixtures|Build Config & Test Fixtures]]
- [[_COMMUNITY_Agent Domain Architecture|Agent Domain Architecture]]
- [[_COMMUNITY_Photo Filter Pipeline|Photo Filter Pipeline]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Text Span Utilities|Text Span Utilities]]
- [[_COMMUNITY_TS Web Config|TS Web Config]]
- [[_COMMUNITY_AI Subsystem|AI Subsystem]]
- [[_COMMUNITY_E2E Test Infrastructure|E2E Test Infrastructure]]
- [[_COMMUNITY_Type System & Canvas Types|Type System & Canvas Types]]
- [[_COMMUNITY_E2E Playwright Helpers|E2E Playwright Helpers]]
- [[_COMMUNITY_TS Node Config|TS Node Config]]
- [[_COMMUNITY_Playwright E2E Patterns|Playwright E2E Patterns]]
- [[_COMMUNITY_Claude Settings|Claude Settings]]
- [[_COMMUNITY_Canvas Store Types|Canvas Store Types]]
- [[_COMMUNITY_Electron Window Types|Electron Window Types]]
- [[_COMMUNITY_TS Root Config|TS Root Config]]
- [[_COMMUNITY_Frame Label Rationale|Frame Label Rationale]]
- [[_COMMUNITY_keepRatio Rationale|keepRatio Rationale]]
- [[_COMMUNITY_Shape Origin Rationale|Shape Origin Rationale]]
- [[_COMMUNITY_HTML Entry Point|HTML Entry Point]]
- [[_COMMUNITY_AI Upcoming Features|AI Upcoming Features]]
- [[_COMMUNITY_Local Settings|Local Settings]]
- [[_COMMUNITY_Text Span Utils|Text Span Utils]]
- [[_COMMUNITY_AI Exports|AI Exports]]
- [[_COMMUNITY_Project README|Project README]]
- [[_COMMUNITY_Project File Format|Project File Format]]

## God Nodes (most connected - your core abstractions)
1. `buildFilterPipeline()` - 18 edges
2. `CanvasObject` - 16 edges
3. `compilerOptions` - 14 edges
4. `compilerOptions` - 11 edges
5. `Toolbar()` - 11 edges
6. `ImageObject` - 11 edges
7. `SnapGuide` - 11 edges
8. `CarouselProject` - 10 edges
9. `TextObject` - 10 edges
10. `Main Process (Electron)` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Agent: qa-reviewer` --references--> `Zustand Store (src/store/index.ts)`  [INFERRED]
  .claude/agents/qa-reviewer.md → src/store/index.ts
- `Zustand Store (src/store/index.ts)` --shares_data_with--> `Multi-Select Architecture`  [INFERRED]
  src/store/index.ts → CLAUDE.md
- `Zustand Store (src/store/index.ts)` --shares_data_with--> `Adjustments Bypass Toggle`  [INFERRED]
  src/store/index.ts → CLAUDE.md
- `Zustand Store (src/store/index.ts)` --shares_data_with--> `Masking System (pen/rect/ellipse)`  [INFERRED]
  src/store/index.ts → CLAUDE.md
- `Zustand Store (src/store/index.ts)` --shares_data_with--> `History (past/future snapshots)`  [INFERRED]
  src/store/index.ts → CLAUDE.md

## Communities (33 total, 14 thin omitted)

### Community 0 - "Canvas Node Components"
Cohesion: 0.08
Nodes (31): removeBg, CanvasImageNodeProps, anchorsToPathData(), computePathBBox(), CanvasShapeNode(), CanvasShapeNodeProps, getStageInstance(), axisLock() (+23 more)

### Community 1 - "Project Rationale & Docs"
Cohesion: 0.05
Nodes (38): Photo Adjustments Bypass Toggle (hold-to-compare \ key + persistent Power button), Autosave Pipeline, rotateAroundCenter: Konva Rect/Text rotate around top-left not center; ellipse exempt, Save Split-Button Pattern (Save / Save As / Save a Copy), Module-level activeTooltipCount (instant tooltip on hover when any tooltip is visible), App(), rootEl, electronAPI (+30 more)

### Community 2 - "E2E Test Helpers"
Cohesion: 0.06
Nodes (39): clearAll(), clickKonvaCenter(), consoleLogs, drag(), drawRect(), ELECTRON_BIN, escape(), failures (+31 more)

### Community 3 - "Electron IPC & Save System"
Cohesion: 0.18
Nodes (31): AIOperation, AIOperationBase, AIOperationStatus, BackgroundRemovalOperation, InpaintingOperation, SegmentationOperation, AnchorPoint, BaseCanvasObject (+23 more)

### Community 4 - "Save System & Recent Files"
Cohesion: 0.08
Nodes (33): currentFilePath in useSaveStatusStore, addRecentFile(), IPC: autosave-project, createWindow(), dir, editDir, IPC: edit-in-external-app, editor (+25 more)

### Community 5 - "Build Config & Test Fixtures"
Cohesion: 0.06
Nodes (31): Electron-Vite Three-Target Build (main/preload/renderer), Electron Vite Config, allInputs, dblLogs, div, firstText, inp, labels (+23 more)

### Community 6 - "Agent Domain Architecture"
Cohesion: 0.09
Nodes (27): Agent Domain Isolation (no cross-domain edits), Rationale: Agents must not cross domain boundaries (ui/canvas/ai separation), Agent: ai-engineer, src/ai/ (ai-engineer domain), Agent: canvas-engineer, src/canvas/ (canvas-engineer domain), Agent: qa-reviewer, Agent: ui-engineer (+19 more)

### Community 7 - "Photo Filter Pipeline"
Cohesion: 0.17
Nodes (21): adjFingerprint(), buildFilterPipeline(), buildLUT(), isAllDefault(), lutCache, makeBlacksFilter(), makeClarityFilter(), makeContrastFilter() (+13 more)

### Community 8 - "Package Dependencies"
Cohesion: 0.08
Nodes (23): author, dependencies, chokidar, @imgly/background-removal, konva, lucide-react, onnxruntime-web, react (+15 more)

### Community 9 - "Text Span Utilities"
Cohesion: 0.17
Nodes (18): applyStyleToAll(), applyStyleToRange(), ResolvedSpanStyle, SelectionStyle, getSelectionStyle(), mergeAdjacentSpans(), resolveSpanStyle(), SelectionStyle (+10 more)

### Community 10 - "TS Web Config"
Cohesion: 0.11
Nodes (17): compilerOptions, composite, jsx, lib, module, moduleResolution, noEmit, noImplicitReturns (+9 more)

### Community 11 - "AI Subsystem"
Cohesion: 0.19
Nodes (9): AIContext, AIContextValue, useAI(), AIStoreState, useAIStore, UseBackgroundRemovalReturn, syncGroupOnTransform, Frame/Content Two-Layer Model (+1 more)

### Community 12 - "E2E Test Infrastructure"
Cohesion: 0.12
Nodes (7): consoleLogs, content, ELECTRON_BIN, existingPath, failures, ROOT, testFile

### Community 13 - "Type System & Canvas Types"
Cohesion: 0.12
Nodes (16): AnchorPoint, BaseCanvasObject, CanvasObject, CanvasObjectScope, CanvasObjectType, FontStyle, GroupObject, ImageObject (+8 more)

### Community 14 - "E2E Playwright Helpers"
Cohesion: 0.20
Nodes (7): clickAt(), drag(), failures, getStageInfo(), k2p(), ROOT, wait()

### Community 15 - "TS Node Config"
Cohesion: 0.15
Nodes (12): compilerOptions, composite, module, moduleResolution, noEmit, noImplicitReturns, noUnusedLocals, noUnusedParameters (+4 more)

### Community 16 - "Playwright E2E Patterns"
Cohesion: 0.43
Nodes (7): Playwright Electron Integration Testing Pattern, Window Store Exposure for E2E Tests (__canvasStore__, __viewportStore__, __saveStatusStore__), debug-selection Playwright Script, test-axis-lock Playwright Script, test-multiselect-transform Playwright Script, test-save-path Playwright Script, verify-mask-draw Playwright Script

## Knowledge Gaps
- **207 isolated node(s):** `composite`, `noEmit`, `module`, `moduleResolution`, `target` (+202 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Electron Vite Config` connect `Build Config & Test Fixtures` to `E2E Playwright Helpers`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `App()` connect `Project Rationale & Docs` to `Playwright E2E Patterns`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `Toolbar()` connect `Project Rationale & Docs` to `Canvas Node Components`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `composite`, `noEmit`, `module` to the rest of the system?**
  _217 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Canvas Node Components` be split into smaller, more focused modules?**
  _Cohesion score 0.07597895967270601 - nodes in this community are weakly interconnected._
- **Should `Project Rationale & Docs` be split into smaller, more focused modules?**
  _Cohesion score 0.052597402597402594 - nodes in this community are weakly interconnected._
- **Should `E2E Test Helpers` be split into smaller, more focused modules?**
  _Cohesion score 0.058279370952821465 - nodes in this community are weakly interconnected._