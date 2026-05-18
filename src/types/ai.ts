// AIOperation — tracks the lifecycle of every on-device AI task.
// All AI work is async; consumers must handle every status.

export type AIOperationType =
  | 'background-removal'   // @imgly/background-removal
  | 'segmentation'         // SAM (ONNX)
  | 'inpainting'           // LaMa (ONNX)

export type AIOperationStatus =
  | 'idle'      // not yet started
  | 'pending'   // queued, waiting for worker
  | 'running'   // actively processing
  | 'done'      // completed successfully
  | 'error'     // failed

export interface AIOperationBase {
  id: string
  type: AIOperationType
  status: AIOperationStatus

  /** The canvas object this operation targets */
  targetObjectId: string

  /** 0–100, only meaningful when status === 'running' */
  progress: number

  /** ISO 8601 timestamps */
  startedAt?: string
  completedAt?: string

  error?: string
}

export interface BackgroundRemovalOperation extends AIOperationBase {
  type: 'background-removal'
  /** Data URL of the result PNG (transparent background) */
  resultDataUrl?: string
}

export interface SegmentationOperation extends AIOperationBase {
  type: 'segmentation'
  /** Prompt points used for SAM (image-space coordinates) */
  promptPoints: Array<{ x: number; y: number; label: 0 | 1 }>
  /** RLE or polygon mask data */
  maskData?: string
}

export interface InpaintingOperation extends AIOperationBase {
  type: 'inpainting'
  /** Binary mask marking the region to inpaint */
  maskDataUrl: string
  /** Data URL of the inpainted result */
  resultDataUrl?: string
}

export type AIOperation =
  | BackgroundRemovalOperation
  | SegmentationOperation
  | InpaintingOperation
