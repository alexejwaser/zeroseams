// CanvasObject — every element that lives on the carousel canvas.
// Agents must use this interface; never use `any` for canvas objects.

export type CanvasObjectType = 'image' | 'text' | 'shape' | 'group'

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
}

export interface TextObject extends BaseCanvasObject {
  type: 'text'
  text: string
  fontFamily: string
  fontSize: number
  fontStyle: 'normal' | 'bold' | 'italic' | 'bold italic'
  align: 'left' | 'center' | 'right'
  fill: string
  letterSpacing: number
  lineHeight: number
}

export type ShapeKind = 'rect' | 'ellipse' | 'line' | 'arrow'

export interface ShapeObject extends BaseCanvasObject {
  type: 'shape'
  kind: ShapeKind
  fill: string
  stroke: string
  strokeWidth: number
  cornerRadius?: number   // rect only
}

export interface GroupObject extends BaseCanvasObject {
  type: 'group'
  childIds: string[]
}

export type CanvasObject = ImageObject | TextObject | ShapeObject | GroupObject
