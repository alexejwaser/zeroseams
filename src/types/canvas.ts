// CanvasObject — every element that lives on the carousel canvas.
// Agents must use this interface; never use `any` for canvas objects.

export type CanvasObjectType = 'image' | 'text' | 'shape' | 'group' | 'path'

export type CanvasObjectScope =
  | 'global'   // spans the full canvas freely
  | 'pinned'   // locked to a specific frame index

export interface BaseCanvasObject {
  /** Unique stable identifier (nanoid / uuid) */
  id: string
  type: CanvasObjectType
  scope: CanvasObjectScope

  /** Only set when scope === 'pinned'. Zero-based frame index. */
  pinnedFrame?: number

  // --- Transform ---
  x: number
  y: number
  width: number
  height: number
  rotation: number   // degrees
  scaleX: number
  scaleY: number

  // --- Appearance ---
  opacity: number    // 0–1
  visible: boolean
  locked: boolean
  zIndex: number

  // --- Metadata ---
  name?: string
}

export interface ImageObject extends BaseCanvasObject {
  type: 'image'
  /** Data URL or resolved file path (after IPC load) */
  src: string
  /** True when background has been removed (AI-processed copy) */
  backgroundRemoved: boolean
  /** Original src before any AI processing */
  originalSrc?: string

  // Note: x/y/width/height from BaseCanvasObject are kept in sync with
  // frameX/frameY/frameWidth/frameHeight for compatibility with shared code
  // (export, layer panel, etc.). Always read/write the frame fields below
  // when working with image-specific layout logic.

  // --- Frame (clipping viewport — single-click selects/moves this) ---
  frameX: number
  frameY: number
  frameWidth: number
  frameHeight: number

  // --- Content (image inside the frame) ---
  contentOffsetX: number
  contentOffsetY: number
  contentWidth: number
  contentHeight: number

  // --- Edit mode ---
  /** When true, transformer targets the image content rather than the frame */
  contentEditMode: boolean
  /** When true, mask anchor overlay is shown and editable */
  maskEditMode: boolean

  // --- Vector mask ---
  mask?: MaskData
}

/** Closed bezier path that clips the visible area of an image. Anchors are in content space. */
export interface MaskData {
  /** Closed bezier path — anchors in content space (0,0 = image bitmap top-left) */
  anchors: AnchorPoint[]
  /** Soft edge blur in canvas pixels; 0 = hard edge */
  feather: number
  /** false = hide outside path, true = hide inside path */
  inverted: boolean
  /** Toggle mask on/off without deleting it */
  visible: boolean
}

export type FontStyle = 'normal' | 'bold' | 'italic' | 'bold italic'

/** Per-character style overrides — undefined fields inherit from TextObject layer defaults */
export interface TextSpanStyle {
  fontFamily?: string
  fontSize?: number
  fontStyle?: FontStyle
  fill?: string
  letterSpacing?: number
}

/** A contiguous run of text with optional style overrides */
export interface TextSpan {
  text: string
  style?: TextSpanStyle
}

export interface TextObject extends BaseCanvasObject {
  type: 'text'
  // Layer-level defaults — apply when a span has no override for that property
  fontFamily: string
  fontSize: number
  fontStyle: FontStyle
  align: 'left' | 'center' | 'right'
  fill: string
  letterSpacing: number
  lineHeight: number
  // Span model — replaces the old flat `text` string.
  // Full text = spans.map(s => s.text).join('')
  // Old projects saved with a flat `text` field load as a single span (migration in store).
  spans: TextSpan[]
}

export type ShapeKind = 'rect' | 'ellipse' | 'line' | 'arrow'

export interface ShapeObject extends BaseCanvasObject {
  type: 'shape'
  kind: ShapeKind
  fill: string
  stroke: string
  strokeWidth: number
  cornerRadius?: number   // rect only
  x2?: number             // second endpoint, absolute canvas x (line/arrow only)
  y2?: number             // second endpoint, absolute canvas y (line/arrow only)
}

export interface AnchorPoint {
  x: number
  y: number
  handleIn: { dx: number; dy: number }   // relative to anchor; (0,0) = sharp corner
  handleOut: { dx: number; dy: number }  // relative to anchor; (0,0) = sharp corner
}

export interface PathObject extends BaseCanvasObject {
  type: 'path'
  anchors: AnchorPoint[]
  closed: boolean
  fill: string
  stroke: string
  strokeWidth: number
  pathEditMode: boolean
}

export interface GroupObject extends BaseCanvasObject {
  type: 'group'
  childIds: string[]
}

export type CanvasObject = ImageObject | TextObject | ShapeObject | GroupObject | PathObject
