import type Konva from 'konva'

/**
 * Exports each carousel frame as a PNG Blob at 2x pixel ratio (2160×2160 for
 * 1080×1080 frames).
 *
 * Konva v9 stage.toCanvas() does not support cropping via { x, y, width, height }
 * — it always outputs the full stage canvas. The workaround:
 *   1. Temporarily set stage scale to 1 and resize to full logical dimensions.
 *   2. Call stage.toCanvas({ pixelRatio: 2 }) to get the full canvas at 2x.
 *   3. Crop each frame manually using Canvas 2D drawImage.
 *   4. Restore stage to its display state in the finally block.
 */
export async function exportFrames(
  stage: Konva.Stage,
  frameCount: number,
  frameWidth: number,
  frameHeight: number,
  startFrame = 0,
  endFrame = frameCount - 1,
): Promise<Blob[]> {
  // 1. Hide Transformer handles so selection UI is absent from export
  const transformers = stage.find<Konva.Transformer>('Transformer')
  transformers.forEach((t) => t.hide())

  // Restore text node opacity for export (nodes are kept at 0 during normal display
  // because a persistent HTML overlay handles rich-text rendering instead).
  const textNodes = stage.find<Konva.Text>('Text')
  textNodes.forEach((n) => {
    const userOpacity = n.getAttr('userOpacity') as number | undefined
    n.opacity(userOpacity ?? 1)
  })

  // 2. Hide frame guides (divider lines + labels)
  const guidesLayer = stage.findOne<Konva.Layer>('.guides')
  if (guidesLayer) guidesLayer.hide()

  // 3. Save current stage dimensions/scale and switch to full 1:1 resolution
  const origWidth = stage.width()
  const origHeight = stage.height()
  const origScaleX = stage.scaleX()
  const origScaleY = stage.scaleY()

  stage.width(frameCount * frameWidth)
  stage.height(frameHeight)
  stage.scaleX(1)
  stage.scaleY(1)
  stage.draw()

  const blobs: Blob[] = []

  try {
    // Render the full canvas once at 2x. stage.toCanvas({ x, y, width, height })
    // in Konva v9 does NOT crop — it always outputs the full stage dimensions.
    // Instead we export the whole thing and crop each frame manually via drawImage.
    const PIXEL_RATIO = 2
    const fullCanvas = stage.toCanvas({ pixelRatio: PIXEL_RATIO })
    // fullCanvas is now (frameCount * frameWidth * PIXEL_RATIO) × (frameHeight * PIXEL_RATIO)
    console.log('[export] fullCanvas:', fullCanvas.width, '×', fullCanvas.height)

    for (let i = startFrame; i <= endFrame; i++) {
      const cropCanvas = document.createElement('canvas')
      cropCanvas.width = frameWidth * PIXEL_RATIO
      cropCanvas.height = frameHeight * PIXEL_RATIO

      const ctx = cropCanvas.getContext('2d')
      if (!ctx) throw new Error(`Failed to get 2d context for frame ${i}`)

      ctx.drawImage(
        fullCanvas,
        i * frameWidth * PIXEL_RATIO, 0,             // source origin
        frameWidth * PIXEL_RATIO, frameHeight * PIXEL_RATIO, // source size
        0, 0,                                         // dest origin
        frameWidth * PIXEL_RATIO, frameHeight * PIXEL_RATIO, // dest size
      )

      const blob = await new Promise<Blob | null>((resolve) => {
        cropCanvas.toBlob((b) => resolve(b), 'image/png')
      })

      console.log(`[export] frame ${i}: src x=${i * frameWidth * PIXEL_RATIO} blob=${blob ? blob.size : 'NULL'}`)
      if (blob) blobs.push(blob)
    }
  } finally {
    // Restore stage to display state
    stage.width(origWidth)
    stage.height(origHeight)
    stage.scaleX(origScaleX)
    stage.scaleY(origScaleY)
    stage.draw()

    if (guidesLayer) guidesLayer.show()
    transformers.forEach((t) => t.show())
    textNodes.forEach((n) => n.opacity(0))
  }

  return blobs
}

/**
 * Saves each frame PNG to ~/Downloads via Electron IPC.
 * Anchor-click downloads are blocked by Electron's Chromium for multi-file
 * sequences — IPC + fs.writeFile is the reliable alternative.
 */
export async function downloadFrames(blobs: Blob[]): Promise<void> {
  for (let i = 0; i < blobs.length; i++) {
    const filename = `frame-${i + 1}.png`

    // Convert Blob → base64 via FileReader (handles large files safely)
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        resolve(dataUrl.split(',')[1])
      }
      reader.onerror = () => reject(new Error('FileReader failed'))
      reader.readAsDataURL(blobs[i])
    })

    const result = await window.electronAPI.saveFile(filename, base64)
    console.log(
      `[download] ${filename}: ${result.success ? 'saved to ~/Downloads' : 'ERROR: ' + result.error}`,
    )
  }
}
