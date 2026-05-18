import React, { useRef, useEffect } from 'react'
import { Group, Image as KonvaImage, Rect, Transformer } from 'react-konva'
import useImage from 'use-image'
import type Konva from 'konva'
import type { ImageObject } from '@/types/canvas'
import { useCanvasStore } from './useCanvasStore'
import { useSnapGuides } from './useSnapGuides'
import type { SnapGuide } from './useSnapGuides'

interface CanvasImageNodeProps {
  obj: ImageObject
  isSelected: boolean
  onSelect: () => void
  onGuidesChange: (guides: SnapGuide[]) => void
}

export function CanvasImageNode({ obj, isSelected, onSelect, onGuidesChange }: CanvasImageNodeProps): React.ReactElement | null {
  const [loadedImage] = useImage(obj.src)

  // Hold the last successfully loaded HTMLImageElement so the component never
  // returns null during the brief loading gap when src changes (e.g. after
  // background removal). Without this, useImage briefly returns undefined →
  // component unmounts → Konva destroys and recreates the node → visible
  // position/size jump even though the store values are untouched.
  const stableImageRef = useRef<HTMLImageElement | undefined>(undefined)
  if (loadedImage !== undefined) {
    stableImageRef.current = loadedImage
  }
  const image = stableImageRef.current

  const frameRectRef = useRef<Konva.Rect>(null)
  const groupRef = useRef<Konva.Group>(null)
  const imageRef = useRef<Konva.Image>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  // Tracks CMD key only — SHIFT is handled natively by Konva Transformer:
  // with keepRatio=false as base, holding Shift toggles it to true automatically.
  const cmdHeldRef = useRef(false)
  const commitUpdate = useCanvasStore((s) => s.commitUpdate)
  const selectedIds = useCanvasStore((s) => s.selectedIds)
  const addToSelection = useCanvasStore((s) => s.addToSelection)
  const { computeSnap } = useSnapGuides()

  // Re-run when image loads so transformer can attach on first select.
  useEffect(() => {
    const tr = transformerRef.current
    const frameRect = frameRectRef.current
    const img = imageRef.current
    if (!tr || !frameRect || !img) return

    if (isSelected) {
      if (obj.contentEditMode) {
        tr.nodes([img])
        tr.borderStroke('#ff7043')
        tr.enabledAnchors(['top-left', 'top-center', 'top-right', 'middle-right', 'bottom-right', 'bottom-center', 'bottom-left', 'middle-left'])
        tr.rotateEnabled(true)
      } else if (obj.locked) {
        tr.nodes([frameRect])
        tr.borderStroke('#0096ff')
        tr.enabledAnchors([])
        tr.rotateEnabled(false)
      } else {
        tr.nodes([frameRect])
        tr.borderStroke('#0096ff')
        tr.enabledAnchors(['top-left', 'top-center', 'top-right', 'middle-right', 'bottom-right', 'bottom-center', 'bottom-left', 'middle-left'])
        tr.rotateEnabled(true)
      }
      tr.getLayer()?.batchDraw()
    } else {
      tr.nodes([])
      // Use synchronous draw() when detaching so the old transformer box is
      // cleared immediately — before the newly selected transformer paints.
      // batchDraw() is deferred (rAF) and can leave the ghost box visible if
      // the two deferred repaints coalesce or resolve in the wrong order.
      tr.getLayer()?.draw()
    }
  }, [isSelected, obj.contentEditMode, obj.locked, loadedImage])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Meta') cmdHeldRef.current = true
    }
    function onKeyUp(e: KeyboardEvent): void {
      if (e.key === 'Meta') cmdHeldRef.current = false
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  // Syncs clip group during transform (resize). The frame origin may shift (e.g.
  // top/left handle drag), so compensate the image position to keep it fixed in
  // canvas space — only the clip boundary should change, not the content position.
  function syncGroupOnTransform(): void {
    const rect = frameRectRef.current
    const group = groupRef.current
    const img = imageRef.current
    if (!rect || !group) return

    const newWidth = rect.width() * rect.scaleX()
    const newHeight = rect.height() * rect.scaleY()

    group.x(rect.x())
    group.y(rect.y())
    group.rotation(rect.rotation())
    group.clip({ x: 0, y: 0, width: newWidth, height: newHeight })

    if (img) {
      if (cmdHeldRef.current) {
        // CMD+SHIFT: scale content proportionally alongside the frame (live preview).
        const scaleX = newWidth / obj.frameWidth
        const scaleY = newHeight / obj.frameHeight
        const scale = (scaleX + scaleY) / 2
        img.x(obj.contentOffsetX * scale)
        img.y(obj.contentOffsetY * scale)
        img.width(obj.contentWidth * scale)
        img.height(obj.contentHeight * scale)
      } else {
        // Compensate for frame-origin movement so the image stays at the same
        // canvas position. Without this, top/left handle drags shift the group
        // origin and drag the image content along with it.
        img.x(obj.contentOffsetX + (obj.frameX - rect.x()))
        img.y(obj.contentOffsetY + (obj.frameY - rect.y()))
      }
    }

    group.getLayer()?.batchDraw()
  }

  function handleDblClick(): void {
    if (!obj.locked) commitUpdate(obj.id, { contentEditMode: true })
  }

  function handleFrameDragMove(e: Konva.KonvaEventObject<DragEvent>): void {
    const rect = e.target as Konva.Rect
    const rawX = rect.x()
    const rawY = rect.y()

    const { x: snappedX, y: snappedY, guides } = computeSnap(
      { x: rawX, y: rawY, width: obj.frameWidth, height: obj.frameHeight },
      obj.id,
    )

    rect.x(snappedX)
    rect.y(snappedY)
    onGuidesChange(guides)

    // Sync group to snapped position
    const group = groupRef.current
    if (group) {
      group.x(snappedX)
      group.y(snappedY)
      group.rotation(rect.rotation())
      group.clip({ x: 0, y: 0, width: obj.frameWidth, height: obj.frameHeight })
      group.getLayer()?.batchDraw()
    }
  }

  function handleFrameDragEnd(e: Konva.KonvaEventObject<DragEvent>): void {
    const newX = e.target.x()
    const newY = e.target.y()
    onGuidesChange([])
    commitUpdate(obj.id, { frameX: newX, frameY: newY, x: newX, y: newY })
  }

  function handleFrameTransformEnd(e: Konva.KonvaEventObject<Event>): void {
    const rect = frameRectRef.current
    if (!rect) return

    const newFrameX = rect.x()
    const newFrameY = rect.y()
    const newFrameWidth = rect.width() * rect.scaleX()
    const newFrameHeight = rect.height() * rect.scaleY()
    const newRotation = rect.rotation()

    // Bake scale back into width/height so future transforms start clean.
    rect.width(newFrameWidth)
    rect.height(newFrameHeight)
    rect.scaleX(1)
    rect.scaleY(1)

    const group = groupRef.current
    if (group) {
      group.clip({ x: 0, y: 0, width: newFrameWidth, height: newFrameHeight })
    }

    // Read CMD from both the ref and the native event (belt-and-suspenders:
    // the ref may have been cleared early if the key was released before mouseup).
    const nativeEvent = e.evt as MouseEvent | TouchEvent
    const cmdFromEvent = 'metaKey' in nativeEvent && (nativeEvent as MouseEvent).metaKey
    const isPropMode = cmdHeldRef.current || cmdFromEvent

    if (isPropMode) {
      const scaleX = newFrameWidth / obj.frameWidth
      const scaleY = newFrameHeight / obj.frameHeight
      const scale = (scaleX + scaleY) / 2
      commitUpdate(obj.id, {
        frameX: newFrameX,
        frameY: newFrameY,
        frameWidth: newFrameWidth,
        frameHeight: newFrameHeight,
        rotation: newRotation,
        x: newFrameX,
        y: newFrameY,
        width: newFrameWidth,
        height: newFrameHeight,
        contentOffsetX: obj.contentOffsetX * scale,
        contentOffsetY: obj.contentOffsetY * scale,
        contentWidth: obj.contentWidth * scale,
        contentHeight: obj.contentHeight * scale,
      })
    } else {
      commitUpdate(obj.id, {
        frameX: newFrameX,
        frameY: newFrameY,
        frameWidth: newFrameWidth,
        frameHeight: newFrameHeight,
        rotation: newRotation,
        x: newFrameX,
        y: newFrameY,
        width: newFrameWidth,
        height: newFrameHeight,
        // Persist the canvas-position compensation applied during live preview.
        // When the frame origin shifts (top/left handle), contentOffset adjusts
        // so the image stays at the same canvas position after commit.
        contentOffsetX: obj.contentOffsetX + (obj.frameX - newFrameX),
        contentOffsetY: obj.contentOffsetY + (obj.frameY - newFrameY),
      })
    }
  }

  function handleContentDragEnd(e: Konva.KonvaEventObject<DragEvent>): void {
    commitUpdate(obj.id, {
      contentOffsetX: e.target.x(),
      contentOffsetY: e.target.y(),
    })
  }

  function handleContentTransformEnd(): void {
    const img = imageRef.current
    if (!img) return
    const newContentOffsetX = img.x()
    const newContentOffsetY = img.y()
    const newContentWidth = obj.contentWidth * img.scaleX()
    const newContentHeight = obj.contentHeight * img.scaleY()
    img.scaleX(1)
    img.scaleY(1)
    commitUpdate(obj.id, {
      contentOffsetX: newContentOffsetX,
      contentOffsetY: newContentOffsetY,
      contentWidth: newContentWidth,
      contentHeight: newContentHeight,
    })
  }

  if (!image) return null

  // Show multi-select highlight outline when in selectedIds but not the primary selected
  const isInMultiSelect = selectedIds.includes(obj.id) && !isSelected

  return (
    <>
      {/* Visual clip container — purely for rendering, not for interaction in frame mode */}
      <Group
        ref={groupRef}
        x={obj.frameX}
        y={obj.frameY}
        clip={{ x: 0, y: 0, width: obj.frameWidth, height: obj.frameHeight }}
        rotation={obj.rotation}
        opacity={obj.opacity}
        listening={obj.contentEditMode}
      >
        <KonvaImage
          ref={imageRef}
          image={image}
          x={obj.contentOffsetX}
          y={obj.contentOffsetY}
          width={obj.contentWidth}
          height={obj.contentHeight}
          draggable={obj.contentEditMode && !obj.locked}
          onClick={() => { if (obj.contentEditMode) onSelect() }}
          onTap={() => { if (obj.contentEditMode) onSelect() }}
          onDragEnd={handleContentDragEnd}
          onTransformEnd={handleContentTransformEnd}
        />
      </Group>

      {/* Invisible frame rect — sole interaction/transform target in frame mode.
          keepRatio=false lets the user resize freely; holding Shift toggles
          keepRatio to true via Konva's native XOR behaviour. */}
      <Rect
        ref={frameRectRef}
        x={obj.frameX}
        y={obj.frameY}
        width={obj.frameWidth}
        height={obj.frameHeight}
        rotation={obj.rotation}
        fill="transparent"
        stroke="#0096ff"
        strokeWidth={1}
        strokeEnabled={obj.contentEditMode || isInMultiSelect}
        strokeScaleEnabled={false}
        perfectDrawEnabled={false}
        draggable={!obj.locked && !obj.contentEditMode}
        listening={!obj.contentEditMode}
        onClick={(e) => {
          if (!obj.contentEditMode) {
            if (e.evt.shiftKey) {
              addToSelection(obj.id)
            } else {
              onSelect()
            }
          }
        }}
        onTap={() => { if (!obj.contentEditMode) onSelect() }}
        onDblClick={handleDblClick}
        onDblTap={handleDblClick}
        onDragMove={handleFrameDragMove}
        onDragEnd={handleFrameDragEnd}
        onTransform={syncGroupOnTransform}
        onTransformEnd={handleFrameTransformEnd}
      />

      <Transformer
        ref={transformerRef}
        keepRatio={false}
        boundBoxFunc={(oldBox, newBox) => {
          if (newBox.width < 5 || newBox.height < 5) return oldBox
          return newBox
        }}
      />
    </>
  )
}
