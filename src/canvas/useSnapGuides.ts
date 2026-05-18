import type { CanvasObject, ImageObject } from '@/types/canvas'
import { FRAME_WIDTH, SNAP_THRESHOLD } from './constants'
import { useCanvasStore } from './useCanvasStore'

export interface SnapGuide {
  orientation: 'h' | 'v'
  position: number
  kind: 'frame' | 'object'
}

interface DragBox {
  x: number
  y: number
  width: number
  height: number
}

export function computeSnap(
  box: DragBox,
  allObjects: CanvasObject[],
  frameCount: number,
  frameWidth: number,
  frameHeight: number,
  threshold: number,
): { x: number; y: number; guides: SnapGuide[] } {
  // Collect vertical snap targets (x positions) from frame boundaries
  const verticalTargets: { position: number; kind: 'frame' | 'object' }[] = []
  const horizontalTargets: { position: number; kind: 'frame' | 'object' }[] = []

  // Frame vertical targets: left, center, right of each frame
  for (let i = 0; i < frameCount; i++) {
    verticalTargets.push({ position: i * frameWidth, kind: 'frame' })
    verticalTargets.push({ position: i * frameWidth + frameWidth / 2, kind: 'frame' })
    verticalTargets.push({ position: (i + 1) * frameWidth, kind: 'frame' })
  }

  // Frame horizontal targets: top, center, bottom
  horizontalTargets.push({ position: 0, kind: 'frame' })
  horizontalTargets.push({ position: frameHeight / 2, kind: 'frame' })
  horizontalTargets.push({ position: frameHeight, kind: 'frame' })

  // Object snap targets from other objects
  for (const obj of allObjects) {
    let objX: number
    let objY: number
    let objW: number
    let objH: number

    if (obj.type === 'image') {
      const img = obj as ImageObject
      objX = img.frameX
      objY = img.frameY
      objW = img.frameWidth
      objH = img.frameHeight
    } else {
      objX = obj.x
      objY = obj.y
      objW = obj.width
      objH = obj.height
    }

    // Vertical: left, centerX, right
    verticalTargets.push({ position: objX, kind: 'object' })
    verticalTargets.push({ position: objX + objW / 2, kind: 'object' })
    verticalTargets.push({ position: objX + objW, kind: 'object' })

    // Horizontal: top, centerY, bottom
    horizontalTargets.push({ position: objY, kind: 'object' })
    horizontalTargets.push({ position: objY + objH / 2, kind: 'object' })
    horizontalTargets.push({ position: objY + objH, kind: 'object' })
  }

  // Box edges and centers we try to snap
  const boxLeft = box.x
  const boxCenterX = box.x + box.width / 2
  const boxRight = box.x + box.width

  const boxTop = box.y
  const boxCenterY = box.y + box.height / 2
  const boxBottom = box.y + box.height

  let snappedX = box.x
  let snappedY = box.y
  const guides: SnapGuide[] = []

  // --- Horizontal snap (vertical guide lines, x-axis) ---
  let bestDist = threshold
  let bestDx = 0
  let bestVertGuide: SnapGuide | null = null

  for (const target of verticalTargets) {
    const pos = target.position

    const distLeft = Math.abs(boxLeft - pos)
    if (distLeft < bestDist) {
      bestDist = distLeft
      bestDx = pos - boxLeft
      bestVertGuide = { orientation: 'v', position: pos, kind: target.kind }
    }

    const distCenter = Math.abs(boxCenterX - pos)
    if (distCenter < bestDist) {
      bestDist = distCenter
      bestDx = pos - boxCenterX
      bestVertGuide = { orientation: 'v', position: pos, kind: target.kind }
    }

    const distRight = Math.abs(boxRight - pos)
    if (distRight < bestDist) {
      bestDist = distRight
      bestDx = pos - boxRight
      bestVertGuide = { orientation: 'v', position: pos, kind: target.kind }
    }
  }

  if (bestVertGuide !== null) {
    snappedX = box.x + bestDx
    guides.push(bestVertGuide)
  }

  // --- Vertical snap (horizontal guide lines, y-axis) ---
  let bestDistY = threshold
  let bestDy = 0
  let bestHorizGuide: SnapGuide | null = null

  for (const target of horizontalTargets) {
    const pos = target.position

    const distTop = Math.abs(boxTop - pos)
    if (distTop < bestDistY) {
      bestDistY = distTop
      bestDy = pos - boxTop
      bestHorizGuide = { orientation: 'h', position: pos, kind: target.kind }
    }

    const distCenter = Math.abs(boxCenterY - pos)
    if (distCenter < bestDistY) {
      bestDistY = distCenter
      bestDy = pos - boxCenterY
      bestHorizGuide = { orientation: 'h', position: pos, kind: target.kind }
    }

    const distBottom = Math.abs(boxBottom - pos)
    if (distBottom < bestDistY) {
      bestDistY = distBottom
      bestDy = pos - boxBottom
      bestHorizGuide = { orientation: 'h', position: pos, kind: target.kind }
    }
  }

  if (bestHorizGuide !== null) {
    snappedY = box.y + bestDy
    guides.push(bestHorizGuide)
  }

  return { x: snappedX, y: snappedY, guides }
}

export function useSnapGuides(): {
  computeSnap: (box: DragBox, excludeId: string) => { x: number; y: number; guides: SnapGuide[] }
} {
  const objects = useCanvasStore((s) => s.objects)
  const objectOrder = useCanvasStore((s) => s.objectOrder)
  const frameCount = useCanvasStore((s) => s.frameCount)
  const frameHeight = useCanvasStore((s) => s.frameHeight)

  function boundComputeSnap(
    box: DragBox,
    excludeId: string,
  ): { x: number; y: number; guides: SnapGuide[] } {
    const allObjects = objectOrder
      .filter((id) => id !== excludeId)
      .map((id) => objects[id])
      .filter((obj): obj is CanvasObject => obj !== undefined)

    return computeSnap(box, allObjects, frameCount, FRAME_WIDTH, frameHeight, SNAP_THRESHOLD)
  }

  return { computeSnap: boundComputeSnap }
}
