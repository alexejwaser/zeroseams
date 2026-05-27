# Graph Report - .  (2026-05-27)

## Corpus Check
- 15 files · ~50,735 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 516 nodes · 842 edges · 37 communities (23 shown, 14 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Canvas Node Components|Canvas Node Components]]
- [[_COMMUNITY_E2E Test Infrastructure|E2E Test Infrastructure]]
- [[_COMMUNITY_Type System|Type System]]
- [[_COMMUNITY_Electron IPC & Save System|Electron IPC & Save System]]
- [[_COMMUNITY_Build Config & Debug Scripts|Build Config & Debug Scripts]]
- [[_COMMUNITY_UI Architecture & Properties Panel|UI Architecture & Properties Panel]]
- [[_COMMUNITY_Agent Definitions|Agent Definitions]]
- [[_COMMUNITY_Photo Filter Pipeline|Photo Filter Pipeline]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Text Spans & Styling|Text Spans & Styling]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Layer Effects Framework|Layer Effects Framework]]
- [[_COMMUNITY_Save Path Tests|Save Path Tests]]
- [[_COMMUNITY_AI Subsystem|AI Subsystem]]
- [[_COMMUNITY_Canvas Type Definitions|Canvas Type Definitions]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]

## God Nodes (most connected - your core abstractions)
1. `buildFilterPipeline()` - 18 edges
2. `CanvasObject` - 17 edges
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

## Communities (37 total, 14 thin omitted)

### Community 0 - "Canvas Node Components"
Cohesion: 0.07
Nodes (32): removeBg, CanvasImageNodeProps, anchorsToPathData(), computePathBBox(), CanvasShapeNode(), CanvasShapeNodeProps, getStageInstance(), axisLock() (+24 more)

### Community 1 - "E2E Test Infrastructure"
Cohesion: 0.06
Nodes (39): clearAll(), clickKonvaCenter(), consoleLogs, drag(), drawRect(), ELECTRON_BIN, escape(), failures (+31 more)

### Community 2 - "Type System"
Cohesion: 0.16
Nodes (33): AIOperation, AIOperationBase, AIOperationStatus, BackgroundRemovalOperation, InpaintingOperation, SegmentationOperation, AnchorPoint, BaseCanvasObject (+25 more)

### Community 3 - "Electron IPC & Save System"
Cohesion: 0.08
Nodes (33): currentFilePath in useSaveStatusStore, addRecentFile(), IPC: autosave-project, createWindow(), dir, editDir, IPC: edit-in-external-app, editor (+25 more)

### Community 4 - "Build Config & Debug Scripts"
Cohesion: 0.06
Nodes (31): Electron-Vite Three-Target Build (main/preload/renderer), Electron Vite Config, allInputs, dblLogs, div, firstText, inp, labels (+23 more)

### Community 5 - "UI Architecture & Properties Panel"
Cohesion: 0.09
Nodes (19): Photo Adjustments Bypass Toggle (hold-to-compare \ key + persistent Power button), rotateAroundCenter: Konva Rect/Text rotate around top-left not center; ellipse exempt, MAC_SYSTEM_FONTS, AdjustmentsSection(), AdjustmentsSectionProps, alignButtonStyle(), AlignDistributeSection(), distributeButtonStyle() (+11 more)

### Community 6 - "Agent Definitions"
Cohesion: 0.10
Nodes (25): Agent Domain Isolation (no cross-domain edits), Rationale: Agents must not cross domain boundaries (ui/canvas/ai separation), Agent: ai-engineer, src/ai/ (ai-engineer domain), Agent: canvas-engineer, src/canvas/ (canvas-engineer domain), Agent: qa-reviewer, Agent: ui-engineer (+17 more)

### Community 7 - "Photo Filter Pipeline"
Cohesion: 0.17
Nodes (21): adjFingerprint(), buildFilterPipeline(), buildLUT(), isAllDefault(), lutCache, makeBlacksFilter(), makeClarityFilter(), makeContrastFilter() (+13 more)

### Community 8 - "Package Dependencies"
Cohesion: 0.08
Nodes (23): author, dependencies, chokidar, @imgly/background-removal, konva, lucide-react, onnxruntime-web, react (+15 more)

### Community 9 - "Text Spans & Styling"
Cohesion: 0.18
Nodes (17): applyStyleToAll(), applyStyleToRange(), SelectionStyle, getSelectionStyle(), mergeAdjacentSpans(), resolveSpanStyle(), SelectionStyle, spanText() (+9 more)

### Community 10 - "TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, composite, jsx, lib, module, moduleResolution, noEmit, noImplicitReturns (+9 more)

### Community 11 - "Layer Effects Framework"
Cohesion: 0.24
Nodes (10): boxBlurH(), boxBlurV(), buildFilter(), hexToRgb(), EffectControlDescriptor, EffectDefinition, EffectParams, getEffectDefinition() (+2 more)

### Community 12 - "Save Path Tests"
Cohesion: 0.12
Nodes (7): consoleLogs, content, ELECTRON_BIN, existingPath, failures, ROOT, testFile

### Community 13 - "AI Subsystem"
Cohesion: 0.19
Nodes (9): AIContext, AIContextValue, useAI(), AIStoreState, useAIStore, UseBackgroundRemovalReturn, syncGroupOnTransform, Frame/Content Two-Layer Model (+1 more)

### Community 14 - "Canvas Type Definitions"
Cohesion: 0.12
Nodes (15): AnchorPoint, BaseCanvasObject, CanvasObject, CanvasObjectScope, FontStyle, GroupObject, ImageObject, MaskData (+7 more)

### Community 15 - "Community 15"
Cohesion: 0.21
Nodes (10): Autosave Pipeline, Save Split-Button Pattern (Save / Save As / Save a Copy), electronAPI, ActiveTool, SaveStatusPill(), Toolbar(), SaveStatus, SaveStatusState (+2 more)

### Community 16 - "Community 16"
Cohesion: 0.20
Nodes (7): clickAt(), drag(), failures, getStageInfo(), k2p(), ROOT, wait()

### Community 17 - "Community 17"
Cohesion: 0.15
Nodes (12): compilerOptions, composite, module, moduleResolution, noEmit, noImplicitReturns, noUnusedLocals, noUnusedParameters (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.27
Nodes (9): Playwright Electron Integration Testing Pattern, Window Store Exposure for E2E Tests (__canvasStore__, __viewportStore__, __saveStatusStore__), debug-selection Playwright Script, test-axis-lock Playwright Script, test-multiselect-transform Playwright Script, test-save-path Playwright Script, verify-mask-draw Playwright Script, App() (+1 more)

### Community 19 - "Community 19"
Cohesion: 0.29
Nodes (6): FrameSettingsPopoverProps, labelStyle, numberInputStyle, PLATFORM_LABELS, PLATFORMS, segmentButtonStyle()

### Community 20 - "Community 20"
Cohesion: 0.33
Nodes (3): Module-level activeTooltipCount (instant tooltip on hover when any tooltip is visible), Tooltip(), TooltipProps

## Knowledge Gaps
- **209 isolated node(s):** `composite`, `noEmit`, `module`, `moduleResolution`, `target` (+204 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Snap Guide System` connect `Canvas Node Components` to `Agent Definitions`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `CanvasObject` connect `Type System` to `Canvas Node Components`, `Canvas Type Definitions`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `CLAUDE.md AI Dev Guide` connect `Agent Definitions` to `Canvas Node Components`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `composite`, `noEmit`, `module` to the rest of the system?**
  _219 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Canvas Node Components` be split into smaller, more focused modules?**
  _Cohesion score 0.07377049180327869 - nodes in this community are weakly interconnected._
- **Should `E2E Test Infrastructure` be split into smaller, more focused modules?**
  _Cohesion score 0.058279370952821465 - nodes in this community are weakly interconnected._
- **Should `Electron IPC & Save System` be split into smaller, more focused modules?**
  _Cohesion score 0.08403361344537816 - nodes in this community are weakly interconnected._