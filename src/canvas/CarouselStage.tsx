import React, { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Rect as KonvaRect, Line as KonvaLine, Circle as KonvaCircle, Path as KonvaPath } from 'react-konva'
import type Konva from 'konva'
import type { ImageObject, TextObject, ShapeObject, PathObject, AnchorPoint, CanvasObject } from '@/types/canvas'
import type { ShapeKind } from '@/types/canvas'
import { FRAME_WIDTH, CANVAS_SCALE } from './constants'
import { useCanvasStore } from './useCanvasStore'
import { FrameGuides } from './FrameGuides'
import { CanvasImageNode } from './CanvasImageNode'
import { CanvasTextNode } from './CanvasTextNode'
import { CanvasShapeNode } from './CanvasShapeNode'
import { CanvasPathNode, computePathBBox, anchorsToPathData } from './CanvasPathNode'
import { SnapGuides } from './SnapGuides'
import type { SnapGuide } from './useSnapGuides'
import { useImageDrop } from './useImageDrop'
import { useAutosave } from './useAutosave'
import { useKeyboardShortcuts } from './useKeyboardShortcuts'
import { useThumbnailGenerator } from './useThumbnailStore'
export { exportFrames } from './exportFrames'

// Module-level mutable reference so external callers can access the stage
// instance without prop drilling (used by useCarouselExport / getStageInstance).
let _stageInstance: Konva.Stage | null = null

export function getStageInstance(): Konva.Stage | null {
  return _stageInstance
}

export function CarouselStage(): React.ReactElement {
  const stageRef = useRef<Konva.Stage>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const objects = useCanvasStore((s) => s.objects)
  const objectOrder = useCanvasStore((s) => s.objectOrder)
  const selectedId = useCanvasStore((s) => s.selectedId)
  const setSelected = useCanvasStore((s) => s.setSelected)
  const setSelectedIds = useCanvasStore((s) => s.setSelectedIds)
  const frameCount = useCanvasStore((s) => s.frameCount)
  const frameHeight = useCanvasStore((s) => s.frameHeight)
  const frames = useCanvasStore((s) => s.frames)
  const backgroundColor = useCanvasStore((s) => s.backgroundColor)
  const addObject = useCanvasStore((s) => s.addObject)
  const updateObject = useCanvasStore((s) => s.updateObject)
  const commitUpdate = useCanvasStore((s) => s.commitUpdate)
  const removeObject = useCanvasStore((s) => s.removeObject)
  const activeTool = useCanvasStore((s) => s.activeTool)
  const setActiveTool = useCanvasStore((s) => s.setActiveTool)
  const clearContentEditMode = useCanvasStore((s) => s.clearContentEditMode)
  const clearPathEditMode = useCanvasStore((s) => s.clearPathEditMode)
  const setContextMenu = useCanvasStore((s) => s.setContextMenu)
  const activeShapeKind = useCanvasStore((s) => s.activeShapeKind)

  const [activeGuides, setActiveGuides] = useState<SnapGuide[]>([])
  const [previewShape, setPreviewShape] = useState<{
    kind: ShapeKind
    x: number
    y: number
    width: number
    height: number
    x2?: number
    y2?: number
  } | null>(null)
  const drawStartRef = useRef<{ x: number; y: number; id: string } | null>(null)

  // Pen tool state — in-progress path ID is tracked via ref; anchors live in store
  const currentPenPathIdRef = useRef<string | null>(null)
  const [penCursorPos, setPenCursorPos] = useState<{ x: number; y: number } | null>(null)
  const penMouseDownPosRef = useRef<{ x: number; y: number } | null>(null)
  const penDragRef = useRef<{ dx: number; dy: number } | null>(null)

  useImageDrop(containerRef)
  useAutosave()
  useKeyboardShortcuts()
  useThumbnailGenerator()

  useEffect(() => {
    _stageInstance = stageRef.current
    return () => {
      _stageInstance = null
    }
  }, [])

  // Pen tool: Escape commits the open path (not closed)
  useEffect(() => {
    if (activeTool !== 'pen') return
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') commitPenPath(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTool])

  // When switching away from pen tool mid-drawing, commit the in-progress path
  useEffect(() => {
    if (activeTool === 'pen') return
    const pathId = currentPenPathIdRef.current
    if (!pathId) return
    currentPenPathIdRef.current = null
    setPenCursorPos(null)
    const currentPath = useCanvasStore.getState().objects[pathId] as PathObject | undefined
    if (!currentPath) return
    if (currentPath.anchors.length < 2) {
      removeObject(pathId)
      setSelected(null)
      return
    }
    const bbox = computePathBBox(currentPath.anchors)
    commitUpdate(pathId, {
      closed: false, fill: 'transparent', pathEditMode: false,
      x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height,
    } as Partial<PathObject> as Partial<CanvasObject>)
  }, [activeTool]) // intentionally only activeTool in deps

  function commitPenPath(closed: boolean): void {
    const pathId = currentPenPathIdRef.current
    currentPenPathIdRef.current = null
    setPenCursorPos(null)

    if (pathId === null) return

    const currentPath = useCanvasStore.getState().objects[pathId] as PathObject | undefined
    if (!currentPath) return

    if (currentPath.anchors.length < 2) {
      // Not enough anchors — remove the stub path
      removeObject(pathId)
      setSelected(null)
      return
    }

    const bbox = computePathBBox(currentPath.anchors)
    commitUpdate(pathId, {
      closed,
      fill: closed ? 'rgba(68,136,255,0.2)' : 'transparent',
      pathEditMode: closed,   // auto-enter edit mode only when closed (Escape = false)
      x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height,
    } as Partial<PathObject> as Partial<CanvasObject>)

    setActiveTool('select')
  }

  const canvasWidth = frameCount * FRAME_WIDTH * CANVAS_SCALE
  const canvasHeight = frameHeight * CANVAS_SCALE

  return (
    <div
      ref={containerRef}
      style={{
        width: canvasWidth,
        height: canvasHeight,
        background: '#1a1a1a',
        cursor: activeTool === 'text' ? 'text'
          : (activeTool === 'shape' || activeTool === 'pen') ? 'crosshair'
          : 'default',
      }}
    >
      <Stage
        ref={stageRef}
        width={canvasWidth}
        height={canvasHeight}
        scaleX={CANVAS_SCALE}
        scaleY={CANVAS_SCALE}
        onMouseDown={(e) => {
          // --- Pen tool ---
          if (activeTool === 'pen') {
            if (e.target !== e.target.getStage()) return
            const stage = e.target.getStage()
            if (!stage) return
            const pos = stage.getPointerPosition()
            if (!pos) return
            penMouseDownPosRef.current = { x: pos.x / CANVAS_SCALE, y: pos.y / CANVAS_SCALE }
            penDragRef.current = null
            return
          }

          if (e.target !== e.target.getStage()) return

          if (activeTool === 'text') {
            const stage = e.target.getStage()
            if (!stage) return
            const pos = stage.getPointerPosition()
            if (!pos) return
            // pos is in screen pixels, stage is scaled by CANVAS_SCALE, so divide
            const canvasX = pos.x / CANVAS_SCALE
            const canvasY = pos.y / CANVAS_SCALE
            const newId = crypto.randomUUID()
            addObject({
              id: newId,
              type: 'text',
              scope: 'global',
              text: 'Double-click to edit',
              fontFamily: 'sans-serif',
              fontSize: 48,
              fontStyle: 'normal',
              align: 'left',
              fill: '#000000',
              letterSpacing: 0,
              lineHeight: 1.2,
              x: canvasX,
              y: canvasY,
              width: 400,
              height: 60,
              rotation: 0,
              scaleX: 1,
              scaleY: 1,
              opacity: 1,
              visible: true,
              locked: false,
              zIndex: objectOrder.length,
            })
            setSelected(newId)
            setActiveTool('select')
          } else if (activeTool === 'shape') {
            if (e.target !== e.target.getStage()) return
            const stage = e.target.getStage()
            if (!stage) return
            const pos = stage.getPointerPosition()
            if (!pos) return
            const canvasX = pos.x / CANVAS_SCALE
            const canvasY = pos.y / CANVAS_SCALE
            const newId = crypto.randomUUID()
            drawStartRef.current = { x: canvasX, y: canvasY, id: newId }
            setPreviewShape({ kind: activeShapeKind, x: canvasX, y: canvasY, width: 1, height: 1 })
          } else {
            setSelected(null)
            setSelectedIds([])
            clearContentEditMode()
            clearPathEditMode()
            setActiveGuides([])
          }
        }}
        onMouseMove={(e) => {
          // --- Pen tool cursor tracking ---
          if (activeTool === 'pen') {
            const stage = e.target.getStage()
            if (!stage) return
            const pos = stage.getPointerPosition()
            if (!pos) return
            const cx = pos.x / CANVAS_SCALE; const cy = pos.y / CANVAS_SCALE
            setPenCursorPos({ x: cx, y: cy })
            if (penMouseDownPosRef.current) {
              penDragRef.current = {
                dx: cx - penMouseDownPosRef.current.x,
                dy: cy - penMouseDownPosRef.current.y,
              }
            }
            return
          }

          if (!drawStartRef.current || previewShape === null) return
          const stage = e.target.getStage()
          if (!stage) return
          const pos = stage.getPointerPosition()
          if (!pos) return
          const curX = pos.x / CANVAS_SCALE
          const curY = pos.y / CANVAS_SCALE

          // Lines and arrows track both endpoints, not a normalised bounding box
          if (activeShapeKind === 'line' || activeShapeKind === 'arrow') {
            setPreviewShape((prev) =>
              prev === null ? null : {
                kind: prev.kind,
                x: drawStartRef.current!.x,
                y: drawStartRef.current!.y,
                width: curX - drawStartRef.current!.x,
                height: curY - drawStartRef.current!.y,
                x2: curX,
                y2: curY,
              }
            )
          } else {
            const x = Math.min(drawStartRef.current.x, curX)
            const y = Math.min(drawStartRef.current.y, curY)
            const width = Math.max(1, Math.abs(curX - drawStartRef.current.x))
            const height = Math.max(1, Math.abs(curY - drawStartRef.current.y))
            setPreviewShape((prev) => prev === null ? null : { kind: prev.kind, x, y, width, height })
          }
        }}
        onMouseUp={() => {
          // --- Pen tool: place anchor ---
          if (activeTool === 'pen') {
            const pos = stageRef.current?.getPointerPosition()
            const downPos = penMouseDownPosRef.current
            penMouseDownPosRef.current = null
            if (!pos || !downPos) return

            const cx = pos.x / CANVAS_SCALE
            const cy = pos.y / CANVAS_SCALE

            const drag = penDragRef.current
            penDragRef.current = null
            const isDrag = drag !== null && Math.hypot(drag.dx, drag.dy) > 3

            const newAnchor: AnchorPoint = isDrag
              ? {
                  x: downPos.x, y: downPos.y,
                  handleIn: { dx: -drag!.dx, dy: -drag!.dy },
                  handleOut: { dx: drag!.dx, dy: drag!.dy },
                }
              : { x: downPos.x, y: downPos.y, handleIn: { dx: 0, dy: 0 }, handleOut: { dx: 0, dy: 0 } }

            const pathId = currentPenPathIdRef.current

            if (pathId === null) {
              // First anchor — create path in store immediately
              const newId = crypto.randomUUID()
              addObject({
                id: newId, type: 'path', scope: 'global',
                anchors: [newAnchor],
                closed: false,
                fill: 'transparent', stroke: '#4488ff', strokeWidth: 2,
                pathEditMode: false,
                x: newAnchor.x, y: newAnchor.y, width: 0, height: 0,
                rotation: 0, scaleX: 1, scaleY: 1, opacity: 1, visible: true, locked: false,
                zIndex: objectOrder.length,
              } as PathObject as CanvasObject)
              setSelected(newId)
              currentPenPathIdRef.current = newId
            } else {
              // Subsequent anchor — get current path from store and append
              const currentPath = objects[pathId] as PathObject | undefined
              if (!currentPath) { currentPenPathIdRef.current = null; return }

              // Check: clicking near first anchor closes the path
              if (currentPath.anchors.length >= 2) {
                const first = currentPath.anchors[0]
                if (Math.hypot(cx - first.x, cy - first.y) < 12) {
                  commitPenPath(true)
                  return
                }
              }

              const newAnchors = [...currentPath.anchors, newAnchor]
              const bbox = computePathBBox(newAnchors)
              updateObject(pathId, {
                anchors: newAnchors,
                x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height,
              } as Partial<PathObject> as Partial<CanvasObject>)
            }
            return
          }

          const drawStart = drawStartRef.current
          const preview = previewShape
          drawStartRef.current = null
          setPreviewShape(null)
          if (!drawStart || !preview) return
          // Discard misclicks (tiny drag)
          if (preview.width < 5 && preview.height < 5) return

          const isLineKind = preview.kind === 'line' || preview.kind === 'arrow'
          const finalX2 = isLineKind ? (preview.x2 ?? preview.x + preview.width) : undefined
          const finalY2 = isLineKind ? (preview.y2 ?? preview.y + preview.height) : undefined

          addObject({
            id: drawStart.id,
            type: 'shape',
            kind: preview.kind,
            scope: 'global',
            x: preview.x,
            y: preview.y,
            width: isLineKind ? Math.abs((finalX2 ?? 0) - preview.x) : preview.width,
            height: isLineKind ? Math.abs((finalY2 ?? 0) - preview.y) : preview.height,
            ...(isLineKind ? { x2: finalX2, y2: finalY2 } : {}),
            rotation: 0, scaleX: 1, scaleY: 1, opacity: 1, visible: true, locked: false,
            zIndex: objectOrder.length, fill: '#4488ff', stroke: 'transparent', strokeWidth: 0, cornerRadius: 0,
          })
          setSelected(drawStart.id)
          setActiveTool('select')
        }}
        onContextMenu={(e) => {
          e.evt.preventDefault()
          setContextMenu({ x: e.evt.clientX, y: e.evt.clientY, targetId: null })
        }}
      >
        {/* Layer 1: background + guides */}
        <Layer name="guides" listening={false}>
          <FrameGuides
            frameCount={frameCount}
            frames={frames}
            frameHeight={frameHeight}
            backgroundColor={backgroundColor}
          />
        </Layer>

        {/* Layer 2: objects */}
        <Layer name="objects">
          {objectOrder.map((id) => {
            const obj = objects[id]
            if (!obj || !obj.visible) return null
            if (obj.type === 'image') {
              return (
                <CanvasImageNode
                  key={id}
                  obj={obj as ImageObject}
                  isSelected={selectedId === id}
                  onSelect={() => setSelected(id)}
                  onGuidesChange={setActiveGuides}
                />
              )
            }
            if (obj.type === 'text') {
              return (
                <CanvasTextNode
                  key={id}
                  obj={obj as TextObject}
                  isSelected={selectedId === id}
                  onSelect={() => setSelected(id)}
                  onGuidesChange={setActiveGuides}
                />
              )
            }
            if (obj.type === 'shape') {
              return (
                <CanvasShapeNode
                  key={id}
                  obj={obj as ShapeObject}
                  isSelected={selectedId === id}
                  onSelect={() => { setSelected(id) }}
                  onGuidesChange={setActiveGuides}
                />
              )
            }
            if (obj.type === 'path') {
              return (
                <CanvasPathNode
                  key={id}
                  obj={obj as PathObject}
                  isSelected={selectedId === id}
                  onSelect={() => setSelected(id)}
                  onGuidesChange={setActiveGuides}
                />
              )
            }
            return null // other types TBD
          })}

          {/* Shape draw preview */}
          {previewShape !== null && (previewShape.kind === 'line' || previewShape.kind === 'arrow') && (
            <KonvaLine
              points={[
                previewShape.x, previewShape.y,
                previewShape.x2 ?? previewShape.x + previewShape.width,
                previewShape.y2 ?? previewShape.y + previewShape.height,
              ]}
              stroke="#4488ff"
              strokeWidth={2}
              strokeScaleEnabled={false}
              dash={[6, 4]}
              listening={false}
              perfectDrawEnabled={false}
            />
          )}
          {previewShape !== null && previewShape.kind !== 'line' && previewShape.kind !== 'arrow' && (
            <KonvaRect
              x={previewShape.x}
              y={previewShape.y}
              width={previewShape.width}
              height={previewShape.height}
              fill="rgba(68, 136, 255, 0.15)"
              stroke="#4488ff"
              strokeWidth={1}
              strokeScaleEnabled={false}
              dash={[6, 4]}
              listening={false}
              perfectDrawEnabled={false}
            />
          )}

          {/* Pen tool preview overlay */}
          {activeTool === 'pen' && penCursorPos && (() => {
            const pathId = currentPenPathIdRef.current
            const currentPenPath = pathId ? (objects[pathId] as PathObject | undefined) : undefined
            const penAnchors = currentPenPath?.anchors ?? []
            if (penAnchors.length === 0) return null

            const lastAnchor = penAnchors[penAnchors.length - 1]
            // During drag: anchor lands at mousedown pos; cursor is the handle endpoint.
            // During hover: anchor ghost is at cursor with no handles.
            const drag = penDragRef.current
            const downPos = penMouseDownPosRef.current
            const isDragging = downPos !== null && drag !== null && Math.hypot(drag.dx, drag.dy) > 3
            const ghostX = isDragging ? downPos!.x : penCursorPos.x
            const ghostY = isDragging ? downPos!.y : penCursorPos.y
            const ghostAnchor: AnchorPoint = {
              x: ghostX, y: ghostY,
              handleIn: isDragging ? { dx: -drag!.dx, dy: -drag!.dy } : { dx: 0, dy: 0 },
              handleOut: isDragging ? { dx: drag!.dx, dy: drag!.dy } : { dx: 0, dy: 0 },
            }
            const previewData = anchorsToPathData([lastAnchor, ghostAnchor], false)
            const isNearFirst = penAnchors.length >= 2 &&
              Math.hypot(penCursorPos.x - penAnchors[0].x, penCursorPos.y - penAnchors[0].y) < 12

            return (
              <>
                {/* Bezier curve preview from last anchor to ghost anchor */}
                {previewData && (
                  <KonvaPath
                    data={previewData}
                    fill="transparent"
                    stroke="#4488ff"
                    strokeWidth={1}
                    strokeScaleEnabled={false}
                    dash={[4, 3]}
                    listening={false}
                    perfectDrawEnabled={false}
                  />
                )}
                {/* Handle arm: from mirrored handle through anchor to cursor */}
                {isDragging && (
                  <>
                    <KonvaLine
                      points={[
                        ghostX - drag!.dx, ghostY - drag!.dy,
                        ghostX + drag!.dx, ghostY + drag!.dy,
                      ]}
                      stroke="#0096ff" strokeWidth={1} strokeScaleEnabled={false}
                      dash={[3, 2]} listening={false} perfectDrawEnabled={false}
                    />
                    <KonvaCircle
                      x={ghostX - drag!.dx} y={ghostY - drag!.dy}
                      radius={3} fill="#fff" stroke="#0096ff" strokeWidth={1.5} listening={false}
                    />
                    <KonvaCircle
                      x={ghostX + drag!.dx} y={ghostY + drag!.dy}
                      radius={3} fill="#fff" stroke="#0096ff" strokeWidth={1.5} listening={false}
                    />
                  </>
                )}
                {/* Anchor dots for all placed points */}
                {penAnchors.map((a, i) => (
                  <KonvaCircle
                    key={i}
                    x={a.x} y={a.y}
                    radius={i === 0 && penAnchors.length >= 2 ? 7 : 5}
                    fill={i === 0 && isNearFirst ? '#ff4488' : '#4488ff'}
                    stroke="#fff"
                    strokeWidth={1.5}
                    listening={false}
                  />
                ))}
              </>
            )
          })()}
        </Layer>

        {/* Layer 3: snap guide lines (non-listening) */}
        <Layer name="snap-guides" listening={false}>
          <SnapGuides
            guides={activeGuides}
            totalWidth={frameCount * FRAME_WIDTH}
            totalHeight={frameHeight}
          />
        </Layer>
      </Stage>
    </div>
  )
}
