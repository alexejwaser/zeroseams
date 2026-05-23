import React, { useRef, useEffect, useMemo } from 'react'
import { Group, Image as KonvaImage, Rect, Transformer, Shape, Circle, Line } from 'react-konva'
import useImage from 'use-image'
import type Konva from 'konva'
import type { ImageObject } from '@/types/canvas'
import { useCanvasStore } from './useCanvasStore'
import { useSnapGuides } from './useSnapGuides'
import type { SnapGuide } from './useSnapGuides'
import { anchorsToPathData } from './CanvasPathNode'

interface CanvasImageNodeProps {
  obj: ImageObject
  isSelected: boolean
  onSelect: () => void
  onGuidesChange: (guides: SnapGuide[]) => void
  nodeRef?: React.RefObject<Konva.Node>
}

export function CanvasImageNode({ obj, isSelected, onSelect, onGuidesChange, nodeRef }: CanvasImageNodeProps): React.ReactElement | null {
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
  const innerGroupRef = useRef<Konva.Group>(null)
  const imageRef = useRef<Konva.Image>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  // Tracks CMD key only — SHIFT is handled natively by Konva Transformer:
  // with keepRatio=false as base, holding Shift toggles it to true automatically.
  const cmdHeldRef = useRef(false)
  // Guides computed in boundBoxFunc, emitted after syncGroupOnTransform so that
  // the onGuidesChange state update doesn't fire mid-sync and reset the clip.
  const pendingGuidesRef = useRef<SnapGuide[]>([])
  // Tracks mousedown position to distinguish a quick click from a drag in multi-select mode
  const rectMouseDownPosRef = useRef<{ x: number; y: number } | null>(null)

  // Alt (option) key tracking for duplicate-on-drag
  const altHeldRef = useRef(false)
  const dragStartFrameXRef = useRef(0)
  const dragStartFrameYRef = useRef(0)
  const pendingDuplicateRef = useRef(false)

  const commitUpdate = useCanvasStore((s) => s.commitUpdate)
  const updateObject = useCanvasStore((s) => s.updateObject)
  const selectedIds = useCanvasStore((s) => s.selectedIds)
  const maskDrawMode = useCanvasStore((s) => s.maskDrawMode)
  const isDrawTarget = maskDrawMode?.id === obj.id
  const addToSelection = useCanvasStore((s) => s.addToSelection)
  const anchorId = useCanvasStore((s) => s.anchorId)
  const setAnchor = useCanvasStore((s) => s.setAnchor)
  const duplicateObjectAtOrigin = useCanvasStore((s) => s.duplicateObjectAtOrigin)
  const setContextMenu = useCanvasStore((s) => s.setContextMenu)
  const resizeMode = useCanvasStore((s) => s.resizeMode)

  const isInMultiSelectMode = selectedIds.length > 1
  const isAnchor = anchorId === obj.id
  const { computeSnap, computeSnapResize } = useSnapGuides()

  // Memoized so React-Konva sees the same object reference between renders while
  // the frame dimensions are unchanged. Without this, every re-render (e.g. from
  // setActiveGuides state updates) creates a new clip object, React-Konva detects
  // a "change" and resets the Konva clip back to stored dimensions — overwriting
  // the live scaled clip set imperatively in syncGroupOnTransform, causing flicker.
  const groupClip = useMemo(
    () => ({ x: 0, y: 0, width: obj.frameWidth, height: obj.frameHeight }),
    [obj.frameWidth, obj.frameHeight],
  )

  // Build the mask shape's sceneFunc whenever mask data or content dimensions change.
  // The function draws the mask into the inner group's cached canvas using destination-in
  // composite — white pixels = keep image, transparent = erase image.
  const maskSceneFunc = useMemo((): ((ctx: Konva.Context) => void) | undefined => {
    if (!obj.mask || !obj.mask.visible || obj.mask.anchors.length < 3) return undefined
    const { anchors, feather, inverted } = obj.mask
    const ox = obj.contentOffsetX
    const oy = obj.contentOffsetY
    const cw = obj.contentWidth
    const ch = obj.contentHeight
    // Translate anchors from content space to inner-group local space
    const shiftedAnchors = anchors.map((a) => ({ ...a, x: a.x + ox, y: a.y + oy }))
    const pathData = anchorsToPathData(shiftedAnchors, true)

    return (ctx: Konva.Context): void => {
      const native = ctx._context as CanvasRenderingContext2D
      if (!pathData) return
      if (inverted) {
        // Fill content rect white (destination-in keeps image pixels there)
        native.fillStyle = 'white'
        native.fillRect(ox, oy, cw, ch)
        // Cut hole for the mask path using destination-out + optional blur
        const prevGco = native.globalCompositeOperation
        native.globalCompositeOperation = 'destination-out'
        if (feather > 0) native.filter = `blur(${feather}px)`
        native.fillStyle = 'white'
        native.fill(new Path2D(pathData))
        if (feather > 0) native.filter = 'none'
        native.globalCompositeOperation = prevGco
      } else {
        if (feather > 0) native.filter = `blur(${feather}px)`
        native.fillStyle = 'white'
        native.fill(new Path2D(pathData))
        if (feather > 0) native.filter = 'none'
      }
    }
  }, [obj.mask, obj.contentOffsetX, obj.contentOffsetY, obj.contentWidth, obj.contentHeight])

  // Manage the inner group's cache for mask compositing.
  useEffect(() => {
    const inner = innerGroupRef.current
    if (!inner) return
    if (obj.mask && obj.mask.visible && obj.mask.anchors.length >= 3) {
      const feather = obj.mask.feather
      const buf = Math.max(feather, 0) + 2
      inner.cache({
        x: obj.contentOffsetX - buf,
        y: obj.contentOffsetY - buf,
        width: obj.contentWidth + buf * 2,
        height: obj.contentHeight + buf * 2,
      })
      inner.getLayer()?.batchDraw()
    } else {
      inner.clearCache()
      inner.getLayer()?.batchDraw()
    }
  }, [obj.mask, obj.contentOffsetX, obj.contentOffsetY, obj.contentWidth, obj.contentHeight, obj.src])

  // Re-run when image loads so transformer can attach on first select.
  // Sync nodeRef so CarouselStage group transformer can attach to the outer clip group
  useEffect(() => {
    if (nodeRef) {
      (nodeRef as React.MutableRefObject<Konva.Node | null>).current = groupRef.current
    }
  })

  useEffect(() => {
    const tr = transformerRef.current
    const frameRect = frameRectRef.current
    const img = imageRef.current
    if (!tr || !frameRect || !img) return

    if (isInMultiSelectMode && !obj.contentEditMode) {
      tr.nodes([])
      tr.getLayer()?.draw()
      return
    }

    if (isSelected && !obj.maskEditMode && !isDrawTarget) {
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
      tr.getLayer()?.draw()
    }
  }, [isSelected, isInMultiSelectMode, obj.contentEditMode, obj.maskEditMode, obj.locked, loadedImage, isDrawTarget, maskDrawMode])

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

  useEffect(() => {
    const onDown = (e: KeyboardEvent): void => { if (e.altKey) altHeldRef.current = true }
    const onUp = (e: KeyboardEvent): void => { if (!e.altKey) altHeldRef.current = false }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])

  // Syncs clip group during transform (resize/rotate). During resize, the frame
  // origin may shift (top/left handle drag), so compensate to keep the content
  // fixed in canvas space. During pure rotation, no compensation is needed.
  // NOTE: does not call onGuidesChange — guides are emitted by the onTransform
  // handler after this runs, from pendingGuidesRef set by boundBoxFunc.
  function syncGroupOnTransform(): void {
    const rect = frameRectRef.current
    const group = groupRef.current
    const img = imageRef.current
    const inner = innerGroupRef.current
    if (!rect || !group) return

    const newWidth = rect.width() * rect.scaleX()
    const newHeight = rect.height() * rect.scaleY()
    const isPureRotation = Math.abs(rect.scaleX() - 1) < 0.001 && Math.abs(rect.scaleY() - 1) < 0.001

    group.x(rect.x())
    group.y(rect.y())
    group.rotation(rect.rotation())
    group.clip({ x: 0, y: 0, width: newWidth, height: newHeight })

    if (img) {
      if (cmdHeldRef.current && !isPureRotation) {
        // CMD+SHIFT: scale content proportionally alongside the frame (live preview).
        if (inner) { inner.x(0); inner.y(0) }
        const scaleX = newWidth / obj.frameWidth
        const scaleY = newHeight / obj.frameHeight
        const scale = (scaleX + scaleY) / 2
        img.x(obj.contentOffsetX * scale)
        img.y(obj.contentOffsetY * scale)
        img.width(obj.contentWidth * scale)
        img.height(obj.contentHeight * scale)
      } else if (isPureRotation) {
        // Pure rotation: content offset is relative to the group and co-rotates
        // with it — no adjustment needed.
        if (inner) { inner.x(0); inner.y(0) }
        img.x(obj.contentOffsetX)
        img.y(obj.contentOffsetY)
      } else if (resizeMode === 'auto') {
        const aspect = obj.contentWidth / obj.contentHeight
        const fAspect = newWidth / newHeight
        let cW, cH
        if (aspect > fAspect) { cH = newHeight; cW = cH * aspect }
        else { cW = newWidth; cH = cW / aspect }
        if (inner) { inner.x(0); inner.y(0) }
        img.x((newWidth - cW) / 2)
        img.y((newHeight - cH) / 2)
        img.width(cW)
        img.height(cH)
      } else {
        // Normal resize: keep image at its stored offset and shift the inner group
        // instead. When a mask is present the inner group is cached — moving img.x
        // alone would leave the cached bitmap (image + mask) stationary while only
        // the uncached image node moves, causing the mask to drift. Shifting the
        // entire inner group moves the cached bitmap as a unit so both stay fixed
        // in canvas space: group.x + inner.x + img.x = rect.x + (frameX-rect.x) + offsetX = frameX+offsetX ✓
        img.x(obj.contentOffsetX)
        img.y(obj.contentOffsetY)
        if (inner) {
          inner.x(obj.frameX - rect.x())
          inner.y(obj.frameY - rect.y())
        }
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

    if (altHeldRef.current && !pendingDuplicateRef.current) {
      pendingDuplicateRef.current = true
    }
  }

  function handleFrameDragEnd(e: Konva.KonvaEventObject<DragEvent>): void {
    const newX = e.target.x()
    const newY = e.target.y()
    onGuidesChange([])
    if (pendingDuplicateRef.current) {
      const originPos = { frameX: dragStartFrameXRef.current, frameY: dragStartFrameYRef.current }
      const finalPos = { frameX: newX, frameY: newY }
      duplicateObjectAtOrigin(obj.id, originPos, finalPos)
      pendingDuplicateRef.current = false
    } else {
      commitUpdate(obj.id, { frameX: newX, frameY: newY, x: newX, y: newY })
    }
  }

  function handleFrameTransformEnd(e: Konva.KonvaEventObject<Event>): void {
    const rect = frameRectRef.current
    if (!rect) return

    const isPureRotation = Math.abs(rect.scaleX() - 1) < 0.001 && Math.abs(rect.scaleY() - 1) < 0.001

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

    // Reset inner group position (was shifted imperatively during live preview to keep
    // image and mask cache in sync). Pre-apply the compensated image position so Konva
    // draws correctly before the React re-render propagates the new contentOffset prop.
    const inner = innerGroupRef.current
    const img = imageRef.current
    if (inner) { inner.x(0); inner.y(0) }

    onGuidesChange([])

    // Read CMD from both the ref and the native event (belt-and-suspenders:
    // the ref may have been cleared early if the key was released before mouseup).
    const nativeEvent = e.evt as MouseEvent | TouchEvent
    const cmdFromEvent = 'metaKey' in nativeEvent && (nativeEvent as MouseEvent).metaKey
    const isPropMode = cmdHeldRef.current || cmdFromEvent

    if (isPropMode && !isPureRotation) {
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
    } else if (isPureRotation) {
      // Pure rotation: content offsets are relative to the group and co-rotate —
      // they must not be adjusted.
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
        contentOffsetX: obj.contentOffsetX,
        contentOffsetY: obj.contentOffsetY,
      })
    } else if (resizeMode === 'auto') {
      const aspect = obj.contentWidth / obj.contentHeight
      const fAspect = newFrameWidth / newFrameHeight
      let cW, cH
      if (aspect > fAspect) { cH = newFrameHeight; cW = cH * aspect }
      else { cW = newFrameWidth; cH = cW / aspect }
      const offsetX = (newFrameWidth - cW) / 2
      const offsetY = (newFrameHeight - cH) / 2
      if (img) { img.x(offsetX); img.y(offsetY); img.width(cW); img.height(cH) }
      commitUpdate(obj.id, {
        frameX: newFrameX, frameY: newFrameY,
        frameWidth: newFrameWidth, frameHeight: newFrameHeight,
        rotation: newRotation, x: newFrameX, y: newFrameY,
        width: newFrameWidth, height: newFrameHeight,
        contentOffsetX: offsetX, contentOffsetY: offsetY,
        contentWidth: cW, contentHeight: cH,
      })
    } else {
      const newContentOffsetX = obj.contentOffsetX + (obj.frameX - newFrameX)
      const newContentOffsetY = obj.contentOffsetY + (obj.frameY - newFrameY)
      // Pre-apply so Konva renders correctly before the React re-render
      if (img) { img.x(newContentOffsetX); img.y(newContentOffsetY) }
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
        // When the frame origin shifts (top/left handle), contentOffset adjusts
        // so the image stays at the same canvas position after commit.
        contentOffsetX: newContentOffsetX,
        contentOffsetY: newContentOffsetY,
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

  const isInMultiSelect = isInMultiSelectMode && selectedIds.includes(obj.id)

  return (
    <>
      {/* Visual clip container — purely for rendering, not for interaction in frame mode */}
      <Group
        ref={groupRef}
        x={obj.frameX}
        y={obj.frameY}
        clip={groupClip}
        rotation={obj.rotation}
        opacity={(obj.maskEditMode || isDrawTarget) ? obj.opacity * 0.5 : obj.opacity}
        listening={obj.contentEditMode && !isDrawTarget}
      >
        {/* Inner group: cached when a mask is active to enable destination-in compositing */}
        <Group ref={innerGroupRef}>
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
          {maskSceneFunc !== undefined && (
            <Shape
              sceneFunc={maskSceneFunc}
              globalCompositeOperation="destination-in"
              listening={false}
            />
          )}
        </Group>
      </Group>

      {/* Mask anchor overlay — shadow group with same position/rotation but no clip */}
      {obj.maskEditMode && obj.mask && (
        <Group x={obj.frameX} y={obj.frameY} rotation={obj.rotation} listening={true}>
          {obj.mask.anchors.map((anchor, i) => {
            const ax = obj.contentOffsetX + anchor.x
            const ay = obj.contentOffsetY + anchor.y
            const hix = ax + anchor.handleIn.dx
            const hiy = ay + anchor.handleIn.dy
            const hox = ax + anchor.handleOut.dx
            const hoy = ay + anchor.handleOut.dy
            const hasHandleIn = anchor.handleIn.dx !== 0 || anchor.handleIn.dy !== 0
            const hasHandleOut = anchor.handleOut.dx !== 0 || anchor.handleOut.dy !== 0
            const mask = obj.mask!
            return (
              <React.Fragment key={i}>
                {hasHandleIn && (
                  <>
                    <Line points={[ax, ay, hix, hiy]} stroke="#0096ff" strokeWidth={1} listening={false} />
                    <Circle
                      x={hix} y={hiy} radius={4}
                      fill="#fff" stroke="#0096ff" strokeWidth={1}
                      draggable
                      onDragMove={(e) => {
                        const n = e.target as Konva.Circle
                        const newAnchors = mask.anchors.map((a, j) =>
                          j === i ? { ...a, handleIn: { dx: n.x() - ax, dy: n.y() - ay } } : a
                        )
                        updateObject(obj.id, { mask: { ...mask, anchors: newAnchors } })
                      }}
                      onDragEnd={(e) => {
                        const n = e.target as Konva.Circle
                        const newAnchors = mask.anchors.map((a, j) =>
                          j === i ? { ...a, handleIn: { dx: n.x() - ax, dy: n.y() - ay } } : a
                        )
                        commitUpdate(obj.id, { mask: { ...mask, anchors: newAnchors } })
                      }}
                    />
                  </>
                )}
                {hasHandleOut && (
                  <>
                    <Line points={[ax, ay, hox, hoy]} stroke="#0096ff" strokeWidth={1} listening={false} />
                    <Circle
                      x={hox} y={hoy} radius={4}
                      fill="#fff" stroke="#0096ff" strokeWidth={1}
                      draggable
                      onDragMove={(e) => {
                        const n = e.target as Konva.Circle
                        const newAnchors = mask.anchors.map((a, j) =>
                          j === i ? { ...a, handleOut: { dx: n.x() - ax, dy: n.y() - ay } } : a
                        )
                        updateObject(obj.id, { mask: { ...mask, anchors: newAnchors } })
                      }}
                      onDragEnd={(e) => {
                        const n = e.target as Konva.Circle
                        const newAnchors = mask.anchors.map((a, j) =>
                          j === i ? { ...a, handleOut: { dx: n.x() - ax, dy: n.y() - ay } } : a
                        )
                        commitUpdate(obj.id, { mask: { ...mask, anchors: newAnchors } })
                      }}
                    />
                  </>
                )}
                <Circle
                  x={ax} y={ay} radius={5}
                  fill="#0096ff" stroke="#fff" strokeWidth={1.5}
                  draggable
                  onDragMove={(e) => {
                    const n = e.target as Konva.Circle
                    const newAnchors = mask.anchors.map((a, j) =>
                      j === i ? { ...a, x: n.x() - obj.contentOffsetX, y: n.y() - obj.contentOffsetY } : a
                    )
                    updateObject(obj.id, { mask: { ...mask, anchors: newAnchors } })
                  }}
                  onDragEnd={(e) => {
                    const n = e.target as Konva.Circle
                    const newAnchors = mask.anchors.map((a, j) =>
                      j === i ? { ...a, x: n.x() - obj.contentOffsetX, y: n.y() - obj.contentOffsetY } : a
                    )
                    commitUpdate(obj.id, { mask: { ...mask, anchors: newAnchors } })
                  }}
                />
              </React.Fragment>
            )
          })}
        </Group>
      )}

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
        stroke={isAnchor && isInMultiSelect ? '#f5a623' : '#0096ff'}
        strokeWidth={isAnchor && isInMultiSelect ? 2 : 1}
        strokeEnabled={obj.contentEditMode || isInMultiSelect}
        strokeScaleEnabled={false}
        perfectDrawEnabled={false}
        draggable={!obj.locked && !obj.contentEditMode && !obj.maskEditMode && !isDrawTarget && !isInMultiSelectMode}
        listening={!obj.contentEditMode && !obj.maskEditMode && !isDrawTarget}
        onMouseDown={(e) => {
          if (isInMultiSelectMode) {
            rectMouseDownPosRef.current = { x: e.evt.clientX, y: e.evt.clientY }
          }
        }}
        onClick={(e) => {
          if (!obj.contentEditMode && !obj.maskEditMode && !isDrawTarget) {
            if (e.evt.shiftKey) {
              addToSelection(obj.id)
            } else if (isInMultiSelectMode && selectedIds.includes(obj.id)) {
              // Suppress anchor-setting if the mouse moved significantly (was a drag)
              if (rectMouseDownPosRef.current) {
                const dx = e.evt.clientX - rectMouseDownPosRef.current.x
                const dy = e.evt.clientY - rectMouseDownPosRef.current.y
                rectMouseDownPosRef.current = null
                if (Math.sqrt(dx * dx + dy * dy) > 3) return
              }
              setAnchor(anchorId === obj.id ? null : obj.id)
            } else {
              onSelect()
            }
          }
        }}
        onTap={() => { if (!obj.contentEditMode && !obj.maskEditMode) onSelect() }}
        onDblClick={handleDblClick}
        onDblTap={handleDblClick}
        onDragStart={() => {
          dragStartFrameXRef.current = obj.frameX
          dragStartFrameYRef.current = obj.frameY
          pendingDuplicateRef.current = false
        }}
        onDragMove={handleFrameDragMove}
        onDragEnd={handleFrameDragEnd}
        onTransform={() => {
          syncGroupOnTransform()
          onGuidesChange(pendingGuidesRef.current)
        }}
        onTransformEnd={handleFrameTransformEnd}
        onContextMenu={(e) => {
          e.evt.preventDefault()
          e.cancelBubble = true
          if (!isSelected) onSelect()
          setContextMenu({ x: e.evt.clientX, y: e.evt.clientY, targetId: obj.id })
        }}
      />

      <Transformer
        ref={transformerRef}
        keepRatio={false}
        boundBoxFunc={(oldBox, newBox) => {
          if (newBox.width < 5 || newBox.height < 5) return oldBox

          const rotation = newBox.rotation ?? 0
          const anchor = transformerRef.current?.getActiveAnchor() ?? ''

          if (Math.abs(rotation) > 0.01 || !anchor || anchor === 'rotater') {
            pendingGuidesRef.current = []
            return newBox
          }

          const { box: snapped, guides } = computeSnapResize(
            { x: newBox.x, y: newBox.y, width: newBox.width, height: newBox.height },
            anchor,
            obj.id,
          )
          pendingGuidesRef.current = guides
          return { ...snapped, rotation: newBox.rotation }
        }}
      />
    </>
  )
}
