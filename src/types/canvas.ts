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
