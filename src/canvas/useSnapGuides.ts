import type { CanvasObject, ImageObject } from '@/types/canvas'
import { SNAP_THRESHOLD } from './constants'
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

type SnapTarget = { position: number; kind: 'frame' | 'object' }

function buildTargets(
  allObjects: CanvasObject[],
  frameCount: number,
  frameWidth: number,
  frameHeight: number,
): { verticalTargets: SnapTarget[]; horizontalTargets: SnapTarget[] } {
  const verticalTargets: SnapTarget[] = []
  const horizontalTargets: SnapTarget[] = []

  for (let i = 0; i < frameCount; i++) {
    verticalTargets.push({ position: i * frameWidth, kind: 'frame' })
    verticalTargets.push({ position: i * frameWidth + frameWidth / 2, kind: 'frame' })
    verticalTargets.push({ position: (i + 1) * frameWidth, kind: 'frame' })
  }
  horizontalTargets.push({ position: 0, kind: 'frame' })
  horizontalTargets.push({ position: frameHeight / 2, kind: 'frame' })
  horizontalTargets.push({ position: frameHeight, kind: 'frame' })

  for (const obj of allObjects) {
    let objX: number, objY: number, objW: number, objH: number
    if (obj.type === 'image') {
      const img = obj as ImageObject
      objX = img.frameX; objY = img.frameY; objW = img.frameWidth; objH = img.frameHeight
    } else {
      objX = obj.x; objY = obj.y; objW = obj.width; objH = obj.height
    }
    verticalTargets.push({ position: objX, kind: 'object' })
    verticalTargets.push({ position: objX + objW / 2, kind: 'object' })
    verticalTargets.push({ position: objX + objW, kind: 'object' })
    horizontalTargets.push({ position: objY, kind: 'object' })
    horizontalTargets.push({ position: objY + objH / 2, kind: 'object' })
    horizontalTargets.push({ position: objY + objH, kind: 'object' })
  }

  return { verticalTargets, horizontalTargets }
}

export function computeSnap(
  box: DragBox,
  allObjects: CanvasObject[],
  frameCount: number,
  frameWidth: number,
  frameHeight: number,
  threshold: number,
): { x: number; y: number; guides: SnapGuide[] } {
  const { verticalTargets, horizontalTargets } = buildTargets(allObjects, frameCount, frameWidth, frameHeight)

  const boxLeft = box.x
  const boxCenterX = box.x + box.width / 2
  const boxRight = box.x + box.width
  const boxTop = box.y
  const boxCenterY = box.y + box.height / 2
  const boxBottom = box.y + box.height

  let snappedX = box.x
  let snappedY = box.y
  const guides: SnapGuide[] = []

  let bestDist = threshold
  let bestDx = 0
  let bestVertGuide: SnapGuide | null = null

  for (const target of verticalTargets) {
    const pos = target.position
    const distLeft = Math.abs(boxLeft - pos)
    if (distLeft < bestDist) { bestDist = distLeft; bestDx = pos - boxLeft; bestVertGuide = { orientation: 'v', position: pos, kind: target.kind } }
    const distCenter = Math.abs(boxCenterX - pos)
    if (distCenter < bestDist) { bestDist = distCenter; bestDx = pos - boxCenterX; bestVertGuide = { orientation: 'v', position: pos, kind: target.kind } }
    const distRight = Math.abs(boxRight - pos)
    if (distRight < bestDist) { bestDist = distRight; bestDx = pos - boxRight; bestVertGuide = { orientation: 'v', position: pos, kind: target.kind } }
  }
  if (bestVertGuide !== null) { snappedX = box.x + bestDx; guides.push(bestVertGuide) }

  let bestDistY = threshold
  let bestDy = 0
  let bestHorizGuide: SnapGuide | null = null

  for (const target of horizontalTargets) {
    const pos = target.position
    const distTop = Math.abs(boxTop - pos)
    if (distTop < bestDistY) { bestDistY = distTop; bestDy = pos - boxTop; bestHorizGuide = { orientation: 'h', position: pos, kind: target.kind } }
    const distCenter = Math.abs(boxCenterY - pos)
    if (distCenter < bestDistY) { bestDistY = distCenter; bestDy = pos - boxCenterY; bestHorizGuide = { orientation: 'h', position: pos, kind: target.kind } }
    const distBottom = Math.abs(boxBottom - pos)
    if (distBottom < bestDistY) { bestDistY = distBottom; bestDy = pos - boxBottom; bestHorizGuide = { orientation: 'h', position: pos, kind: target.kind } }
  }
  if (bestHorizGuide !== null) { snappedY = box.y + bestDy; guides.push(bestHorizGuide) }

  return { x: snappedX, y: snappedY, guides }
}

// Snaps only the specific edge being dragged (determined by anchor name).
// Used in Transformer boundBoxFunc so each handle snaps its own edge.
export function computeSnapResize(
  box: DragBox,
  anchor: string,
  allObjects: CanvasObject[],
  frameCount: number,
  frameWidth: number,
  frameHeight: number,
  threshold: number,
): { box: DragBox; guides: SnapGuide[] } {
  const { verticalTargets, horizontalTargets } = buildTargets(allObjects, frameCount, frameWidth, frameHeight)

  const guides: SnapGuide[] = []
  let { x, y, width, height } = box

  const leftFree = anchor === 'top-left' || anchor === 'middle-left' || anchor === 'bottom-left'
  const rightFree = anchor === 'top-right' || anchor === 'middle-right' || anchor === 'bottom-right'
  const topFree = anchor === 'top-left' || anchor === 'top-center' || anchor === 'top-right'
  const bottomFree = anchor === 'bottom-left' || anchor === 'bottom-center' || anchor === 'bottom-right'

  if (leftFree) {
    const fixedRight = x + width
    let bestDist = threshold, bestSnap = x
    let bestGuide: SnapGuide | null = null
    for (const t of verticalTargets) {
      const d = Math.abs(x - t.position)
      if (d < bestDist) { bestDist = d; bestSnap = t.position; bestGuide = { orientation: 'v', position: t.position, kind: t.kind } }
    }
    x = bestSnap
    width = Math.max(5, fixedRight - bestSnap)
    if (bestGuide) guides.push(bestGuide)
  } else if (rightFree) {
    const rightEdge = x + width
    let bestDist = threshold, bestSnap = rightEdge
    let bestGuide: SnapGuide | null = null
    for (const t of verticalTargets) {
      const d = Math.abs(rightEdge - t.position)
      if (d < bestDist) { bestDist = d; bestSnap = t.position; bestGuide = { orientation: 'v', position: t.position, kind: t.kind } }
    }
    width = Math.max(5, bestSnap - x)
    if (bestGuide) guides.push(bestGuide)
  }

  if (topFree) {
    const fixedBottom = y + height
    let bestDist = threshold, bestSnap = y
    let bestGuide: SnapGuide | null = null
    for (const t of horizontalTargets) {
      const d = Math.abs(y - t.position)
      if (d < bestDist) { bestDist = d; bestSnap = t.position; bestGuide = { orientation: 'h', position: t.position, kind: t.kind } }
    }
    y = bestSnap
    height = Math.max(5, fixedBottom - bestSnap)
    if (bestGuide) guides.push(bestGuide)
  } else if (bottomFree) {
    const bottomEdge = y + height
    let bestDist = threshold, bestSnap = bottomEdge
    let bestGuide: SnapGuide | null = null
    for (const t of horizontalTargets) {
      const d = Math.abs(bottomEdge - t.position)
      if (d < bestDist) { bestDist = d; bestSnap = t.position; bestGuide = { orientation: 'h', position: t.position, kind: t.kind } }
    }
    height = Math.max(5, bestSnap - y)
    if (bestGuide) guides.push(bestGuide)
  }

  return { box: { x, y, width, height }, guides }
}

const ROTATION_SNAP_ANGLES = [0, 45, 90, 135, 180, -135, -90, -45]
const ROTATION_SNAP_THRESHOLD = 8

export function _snapRotation(degrees: number): number {
  for (const target of ROTATION_SNAP_ANGLES) {
    if (Math.abs(degrees - target) < ROTATION_SNAP_THRESHOLD) return target
  }
  return degrees
}

export function useSnapGuides(): {
  computeSnap: (box: DragBox, excludeId: string) => { x: number; y: number; guides: SnapGuide[] }
  computeSnapResize: (box: DragBox, anchor: string, excludeId: string) => { box: DragBox; guides: SnapGuide[] }
  computeSnapGroup: (box: DragBox, excludeIds: string[]) => { x: number; y: number; guides: SnapGuide[] }
  computeSnapResizeGroup: (box: DragBox, anchor: string, excludeIds: string[]) => { box: DragBox; guides: SnapGuide[] }
  snapRotation: (degrees: number) => number
} {
  const objects = useCanvasStore((s) => s.objects)
  const snapEnabled = useCanvasStore((s) => s.snapEnabled)
  const objectOrder = useCanvasStore((s) => s.objectOrder)
  const frameCount = useCanvasStore((s) => s.frameCount)
  const frameWidth = useCanvasStore((s) => s.frameWidth)
  const frameHeight = useCanvasStore((s) => s.frameHeight)

  function getObjects(excludeId: string | string[]): CanvasObject[] {
    const excludeSet = new Set(Array.isArray(excludeId) ? excludeId : [excludeId])
    return objectOrder
      .filter((id) => !excludeSet.has(id))
      .map((id) => objects[id])
      .filter((obj): obj is CanvasObject => obj !== undefined)
  }

  function boundComputeSnap(box: DragBox, excludeId: string) {
    if (!snapEnabled) return { x: box.x, y: box.y, guides: [] }
    return computeSnap(box, getObjects(excludeId), frameCount, frameWidth, frameHeight, SNAP_THRESHOLD)
  }

  function boundComputeSnapResize(box: DragBox, anchor: string, excludeId: string) {
    if (!snapEnabled) return { box, guides: [] }
    return computeSnapResize(box, anchor, getObjects(excludeId), frameCount, frameWidth, frameHeight, SNAP_THRESHOLD)
  }

  function boundComputeSnapGroup(box: DragBox, excludeIds: string[]) {
    if (!snapEnabled) return { x: box.x, y: box.y, guides: [] }
    return computeSnap(box, getObjects(excludeIds), frameCount, frameWidth, frameHeight, SNAP_THRESHOLD)
  }

  function boundComputeSnapResizeGroup(box: DragBox, anchor: string, excludeIds: string[]) {
    if (!snapEnabled) return { box, guides: [] }
    return computeSnapResize(box, anchor, getObjects(excludeIds), frameCount, frameWidth, frameHeight, SNAP_THRESHOLD)
  }

  return {
    computeSnap: boundComputeSnap,
    computeSnapResize: boundComputeSnapResize,
    computeSnapGroup: boundComputeSnapGroup,
    computeSnapResizeGroup: boundComputeSnapResizeGroup,
    snapRotation: (degrees: number) => !snapEnabled ? degrees : _snapRotation(degrees),
  }
}
