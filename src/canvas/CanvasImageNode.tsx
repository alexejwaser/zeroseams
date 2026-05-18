import React, { useRef, useEffect } from 'react'
import { Group, Image as KonvaImage, Rect, Transformer } from 'react-konva'
import useImage from 'use-image'
import type Konva from 'konva'
import type { ImageObject } from '@/types/canvas'
import { useCanvasStore } from './useCanvasStore'

interface CanvasImageNodeProps {
  obj: ImageObject
  isSelected: boolean
  onSelect: () => void
}

export function CanvasImageNode({ obj, isSelected, onSelect }: CanvasImageNodeProps): React.ReactElement | null {
  const [image] = useImage(obj.src)
  const frameRectRef = useRef<Konva.Rect>(null)
  const groupRef = useRef<Konva.Group>(null)
  const imageRef = useRef<Konva.Image>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  // Tracks CMD key only — SHIFT is handled natively by Konva Transformer:
  // with keepRatio=false as base, holding Shift toggles it to true automatically.
  const cmdHeldRef = useRef(false)
  const commitUpdate = useCanvasStore((s) => s.commitUpdate)

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
      } else {
        tr.nodes([frameRect])
        tr.borderStroke('#0096ff')
      }
    } else {
      tr.nodes([])
    }
    tr.getLayer()?.batchDraw()
  }, [isSelected, obj.contentEditMode, image])

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

  // Imperatively syncs the clip group (and optionally image content) to the
  // frame rect during drag/transform — zero React re-renders per pointer event.
  function syncGroupToRect(): void {
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

    // CMD+SHIFT — scale content proportionally alongside the frame (live preview).
    // Shift locks aspect ratio via Konva's native keepRatio toggle, so
    // newWidth/newHeight are already constrained; scaleX ≈ scaleY.
    if (cmdHeldRef.current && img) {
      const scaleX = newWidth / obj.frameWidth
      const scaleY = newHeight / obj.frameHeight
      const scale = (scaleX + scaleY) / 2
      img.x(obj.contentOffsetX * scale)
      img.y(obj.contentOffsetY * scale)
      img.width(obj.contentWidth * scale)
      img.height(obj.contentHeight * scale)
    }

    group.getLayer()?.batchDraw()
  }

  function handleDblClick(): void {
    if (!obj.locked) commitUpdate(obj.id, { contentEditMode: true })
  }

  function handleFrameDragEnd(e: Konva.KonvaEventObject<DragEvent>): void {
    const newX = e.target.x()
    const newY = e.target.y()
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
        strokeEnabled={obj.contentEditMode}
        strokeScaleEnabled={false}
        perfectDrawEnabled={false}
        draggable={!obj.locked && !obj.contentEditMode}
        listening={!obj.contentEditMode}
        onClick={() => { if (!obj.contentEditMode) onSelect() }}
        onTap={() => { if (!obj.contentEditMode) onSelect() }}
        onDblClick={handleDblClick}
        onDblTap={handleDblClick}
        onDragMove={syncGroupToRect}
        onDragEnd={handleFrameDragEnd}
        onTransform={syncGroupToRect}
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
