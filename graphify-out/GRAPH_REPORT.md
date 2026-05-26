# Graph Report - .  (2026-05-26)

## Corpus Check
- 75 files · ~57,931 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 549 nodes · 957 edges · 43 communities (26 shown, 17 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Canvas Node Components|Canvas Node Components]]
- [[_COMMUNITY_UI Architecture Concepts|UI Architecture Concepts]]
- [[_COMMUNITY_Multi-Select Test Suite|Multi-Select Test Suite]]
- [[_COMMUNITY_Type System & Text Utilities|Type System & Text Utilities]]
- [[_COMMUNITY_Electron IPC & Save System|Electron IPC & Save System]]
- [[_COMMUNITY_Build Dependencies|Build Dependencies]]
- [[_COMMUNITY_AI Agent Roles|AI Agent Roles]]
- [[_COMMUNITY_AI Subsystem|AI Subsystem]]
- [[_COMMUNITY_Rich Text Spans|Rich Text Spans]]
- [[_COMMUNITY_Photo Filter Pipeline|Photo Filter Pipeline]]
- [[_COMMUNITY_Selection Debug Scripts|Selection Debug Scripts]]
- [[_COMMUNITY_Web TypeScript Config|Web TypeScript Config]]
- [[_COMMUNITY_Save Path Tests|Save Path Tests]]
- [[_COMMUNITY_Canvas Type Declarations|Canvas Type Declarations]]
- [[_COMMUNITY_Axis Lock Tests|Axis Lock Tests]]
- [[_COMMUNITY_Node TypeScript Config|Node TypeScript Config]]
- [[_COMMUNITY_E2E Test Infrastructure|E2E Test Infrastructure]]
- [[_COMMUNITY_Mask Draw Verification|Mask Draw Verification]]
- [[_COMMUNITY_Build Config Root|Build Config Root]]
- [[_COMMUNITY_Claude Dev Settings|Claude Dev Settings]]
- [[_COMMUNITY_Text Span Types|Text Span Types]]
- [[_COMMUNITY_Canvas Store Types|Canvas Store Types]]
- [[_COMMUNITY_TypeScript Project Refs|TypeScript Project Refs]]
- [[_COMMUNITY_Electron API Types|Electron API Types]]
- [[_COMMUNITY_Save Status Store Types|Save Status Store Types]]
- [[_COMMUNITY_Viewport Store Types|Viewport Store Types]]
- [[_COMMUNITY_Frame Labels Architecture|Frame Labels Architecture]]
- [[_COMMUNITY_Frame Ratio System|Frame Ratio System]]
- [[_COMMUNITY_Shape Ellipse Convention|Shape Ellipse Convention]]
- [[_COMMUNITY_On-Device AI Roadmap|On-Device AI Roadmap]]
- [[_COMMUNITY_HTML Entry Point|HTML Entry Point]]
- [[_COMMUNITY_Claude Settings|Claude Settings]]
- [[_COMMUNITY_Text Spans Module|Text Spans Module]]
- [[_COMMUNITY_AI Module Exports|AI Module Exports]]
- [[_COMMUNITY_README Overview|README Overview]]
- [[_COMMUNITY_Carousel File Format|Carousel File Format]]

## God Nodes (most connected - your core abstractions)
1. `useCanvasStore` - 39 edges
2. `buildFilterPipeline()` - 18 edges
3. `useSnapGuides()` - 17 edges
4. `CanvasObject` - 16 edges
5. `CarouselStage()` - 16 edges
6. `PropertiesPanel()` - 15 edges
7. `compilerOptions` - 14 edges
8. `SnapGuide` - 14 edges
9. `CanvasImageNode()` - 13 edges
10. `Main Process (Electron)` - 13 edges

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

## Hyperedges (group relationships)
- **ZeroSeams Three-Panel UI Layout (Toolbar + LayerPanel + PropertiesPanel)** — ui_toolbar_toolbar, ui_layerpanel_layerpanel, ui_propertiespanel_propertiespanel [EXTRACTED 1.00]
- **Shared UI Primitives (Tooltip + iconBtnStyle used by Toolbar and PropertiesPanel)** — ui_tooltip_tooltip, ui_iconbtnstyle_iconbtnstyle, ui_toolbar_toolbar, ui_propertiespanel_propertiespanel [EXTRACTED 1.00]
- **Playwright Electron E2E Test Suite (all test scripts)** — scripts_debug_selection, scripts_test_multiselect_transform, scripts_test_axis_lock, scripts_test_save_path, scripts_verify_mask_draw [EXTRACTED 1.00]
- **Canvas Object Type Hierarchy (BaseCanvasObject + all subtypes + union)** — types_canvas_basecanvasobject, types_canvas_imageobject, types_canvas_textobject, types_canvas_shapeobject, types_canvas_pathobject, types_canvas_groupobject, types_canvas_canvasobject [EXTRACTED 1.00]
- **Snap System: useSnapGuides + SnapGuides component + CarouselStage integration** — canvas_usesnapguides_usesnapguides, canvas_snapguides_snapguides, canvas_carouselstage_carouselstage, canvas_canvasshapenode_canvasshapenode [INFERRED 0.95]
- **Autosave Pipeline: useAutosave + useSaveStatusStore + electronAPI** — canvas_useautosave_useautosave, ui_usesavestatusstore_usesavestatusstore, types_electron_d_electronapi [EXTRACTED 1.00]
- **Canvas Node Types share Snap Guides system** — canvas_canvasimagenode_canvasimagenode, canvas_canvastextnode_canvastextnode, canvas_canvaspathnode_canvaspathnode, concept_snap_guides [EXTRACTED 1.00]
- **Electron IPC bridge: preload exposes electronAPI; useExternalEdit + useKeyboardShortcuts + downloadFrames call it** — electron_preload_electronapi, canvas_useexternaledit_useexternaledit, canvas_usekeyboardshortcuts_buildprojectsnapshot, canvas_exportframes_downloadframes [EXTRACTED 1.00]
- **AI Background Removal: AIProvider wraps useBackgroundRemoval which calls useCanvasStore** — ai_aiprovider_aiprovider, ai_usebackgroundremoval_usebackgroundremoval, ai_useaistore_useaistore, canvas_usecanvasstore_usecanvasstore [EXTRACTED 1.00]
- **IPC Project Save Pipeline (save/save-as/save-copy/autosave → addRecentFile → recentFiles.json)** — electron_index_saveproject, electron_index_saveprojectas, electron_index_saveprojectcopy, electron_index_autosaveproject, electron_index_addrecentfile, electron_index_recentfilesjson [EXTRACTED 1.00]
- **External Edit Lifecycle (edit-in-external-app, chokidar watcher, external-image-changed push)** — electron_index_editinexternalapp, electron_index_watchers, electron_index_externalimagechanged, electron_index_stopexternaledit [EXTRACTED 1.00]
- **Agent Domain Isolation System (ui/canvas/ai engineers + qa-reviewer + store boundary)** — agents_uiengineer, agents_canvasengineer, agents_aiengineer, agents_qareviewer, store_index_zustandstore, agents_agentisolation [EXTRACTED 1.00]

## Communities (43 total, 17 thin omitted)

### Community 0 - "Canvas Node Components"
Cohesion: 0.08
Nodes (51): removeBg, CanvasImageNode(), CanvasImageNodeProps, anchorsToPathData(), CanvasPathNode(), CanvasPathNodeProps, computePathBBox(), CanvasShapeNode() (+43 more)

### Community 1 - "UI Architecture Concepts"
Cohesion: 0.05
Nodes (46): useAutosave(), Photo Adjustments Bypass Toggle (hold-to-compare \ key + persistent Power button), Autosave Pipeline, rotateAroundCenter: Konva Rect/Text rotate around top-left not center; ellipse exempt, Save Split-Button Pattern (Save / Save As / Save a Copy), Module-level activeTooltipCount (instant tooltip on hover when any tooltip is visible), App(), rootEl (+38 more)

### Community 2 - "Multi-Select Test Suite"
Cohesion: 0.06
Nodes (39): clearAll(), clickKonvaCenter(), consoleLogs, drag(), drawRect(), ELECTRON_BIN, escape(), failures (+31 more)

### Community 3 - "Type System & Text Utilities"
Cohesion: 0.14
Nodes (38): fontStyleToCSS, resolveSpanStyle, Non-Destructive Photo Adjustments Pipeline, AIOperation, AIOperationBase, AIOperationStatus, AIOperationType, BackgroundRemovalOperation (+30 more)

### Community 4 - "Electron IPC & Save System"
Cohesion: 0.07
Nodes (37): currentFilePath in useSaveStatusStore, addRecentFile(), IPC: autosave-project, createWindow(), dir, editDir, IPC: edit-in-external-app, editor (+29 more)

### Community 5 - "Build Dependencies"
Cohesion: 0.06
Nodes (33): author, dependencies, chokidar, @imgly/background-removal, konva, lucide-react, onnxruntime-web, react (+25 more)

### Community 6 - "AI Agent Roles"
Cohesion: 0.09
Nodes (27): Agent Domain Isolation (no cross-domain edits), Rationale: Agents must not cross domain boundaries (ui/canvas/ai separation), Agent: ai-engineer, src/ai/ (ai-engineer domain), Agent: canvas-engineer, src/canvas/ (canvas-engineer domain), Agent: qa-reviewer, Agent: ui-engineer (+19 more)

### Community 7 - "AI Subsystem"
Cohesion: 0.19
Nodes (15): AIContext, AIContextValue, useAI(), AIProvider(), AIStoreState, useAIStore, useBackgroundRemoval(), UseBackgroundRemovalReturn (+7 more)

### Community 8 - "Rich Text Spans"
Cohesion: 0.17
Nodes (19): applyStyleToAll(), applyStyleToRange(), fontStyleToCSS(), getSelectionStyle(), mergeAdjacentSpans(), ResolvedSpanStyle, resolveSpanStyle(), SelectionStyle (+11 more)

### Community 9 - "Photo Filter Pipeline"
Cohesion: 0.23
Nodes (16): buildFilterPipeline(), buildLUT(), isAllDefault(), lutCache, makeBlacksFilter(), makeClarityFilter(), makeContrastFilter(), makeDehazeFilter() (+8 more)

### Community 10 - "Selection Debug Scripts"
Cohesion: 0.11
Nodes (15): allInputs, dblLogs, div, ELECTRON_BIN, firstText, inp, labels, lbl (+7 more)

### Community 11 - "Web TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, composite, jsx, lib, module, moduleResolution, noEmit, noImplicitReturns (+9 more)

### Community 12 - "Save Path Tests"
Cohesion: 0.12
Nodes (7): consoleLogs, content, ELECTRON_BIN, existingPath, failures, ROOT, testFile

### Community 13 - "Canvas Type Declarations"
Cohesion: 0.12
Nodes (16): AnchorPoint, BaseCanvasObject, CanvasObject, CanvasObjectScope, CanvasObjectType, FontStyle, GroupObject, ImageObject (+8 more)

### Community 14 - "Axis Lock Tests"
Cohesion: 0.18
Nodes (8): clickAt(), drag(), ELECTRON_BIN, failures, getStageInfo(), k2p(), ROOT, wait()

### Community 15 - "Node TypeScript Config"
Cohesion: 0.15
Nodes (12): compilerOptions, composite, module, moduleResolution, noEmit, noImplicitReturns, noUnusedLocals, noUnusedParameters (+4 more)

### Community 16 - "E2E Test Infrastructure"
Cohesion: 0.43
Nodes (7): Playwright Electron Integration Testing Pattern, Window Store Exposure for E2E Tests (__canvasStore__, __viewportStore__, __saveStatusStore__), debug-selection Playwright Script, test-axis-lock Playwright Script, test-multiselect-transform Playwright Script, test-save-path Playwright Script, verify-mask-draw Playwright Script

### Community 17 - "Mask Draw Verification"
Cohesion: 0.33
Nodes (6): electronBin, fixtureJson, fixturePath, main(), ROOT, shot()

### Community 18 - "Build Config Root"
Cohesion: 0.40
Nodes (5): Electron-Vite Three-Target Build (main/preload/renderer), Electron Vite Config, TypeScript Node Config, TypeScript Root Config, TypeScript Web Config

## Knowledge Gaps
- **219 isolated node(s):** `composite`, `noEmit`, `module`, `moduleResolution`, `target` (+214 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useCanvasStore` connect `Canvas Node Components` to `Rich Text Spans`, `UI Architecture Concepts`, `AI Subsystem`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `PropertiesPanel()` connect `UI Architecture Concepts` to `Canvas Node Components`, `Rich Text Spans`, `AI Subsystem`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `Toolbar()` connect `UI Architecture Concepts` to `Canvas Node Components`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `useCanvasStore` (e.g. with `FrameSettingsPopover()` and `PropertiesPanel()`) actually correct?**
  _`useCanvasStore` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `useSnapGuides()` (e.g. with `useUndoRedoShortcuts()` and `Snap Guide System`) actually correct?**
  _`useSnapGuides()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `composite`, `noEmit`, `module` to the rest of the system?**
  _229 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Canvas Node Components` be split into smaller, more focused modules?**
  _Cohesion score 0.08295281582952815 - nodes in this community are weakly interconnected._