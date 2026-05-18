import type Konva from 'konva'

/**
 * Exports each carousel frame as a PNG Blob at 2x pixel ratio.
 *
 * NOTE: The "guides" layer (FrameGuides) is hidden before export and restored
 * afterwards so that divider lines and frame labels do not appear in the output.
 */
export async function exportFrames(
  stage: Konva.Stage,
  frameCount: number,
  frameWidth: number,
  frameHeight: number,
): Promise<Blob[]> {
  // Hide the guides layer for clean export
  const guidesLayer = stage.findOne<Konva.Layer>('.guides')
  if (guidesLayer) guidesLayer.hide()

  const blobs: Blob[] = []

  try {
    for (let i = 0; i < frameCount; i++) {
      const nativeCanvas = stage.toCanvas({
        x: i * frameWidth,
        y: 0,
        width: frameWidth,
        height: frameHeight,
        pixelRatio: 2,
      })

      const blob = await new Promise<Blob | null>((resolve) => {
        nativeCanvas.toBlob((b) => resolve(b), 'image/png')
      })

      if (blob) blobs.push(blob)
    }
  } finally {
    // Always restore guides layer visibility
    if (guidesLayer) guidesLayer.show()
  }

  return blobs
}
