import React, { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Rect as KonvaRect } from 'react-konva'
import type Konva from 'konva'
import type { ImageObject, TextObject, ShapeObject } from '@/types/canvas'
import type { ShapeKind } from '@/types/canvas'
import { FRAME_WIDTH, CANVAS_SCALE } from './constants'
import { useCanvasStore } from './useCanvasStore'
import { FrameGuides } from './FrameGuides'
import { CanvasImageNode } from './CanvasImageNode'
import { CanvasTextNode } from './CanvasTextNode'
import { CanvasShapeNode } from './CanvasShapeNode'
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
  const activeTool = useCanvasStore((s) => s.activeTool)
  const setActiveTool = useCanvasStore((s) => s.setActiveTool)
  const clearContentEditMode = useCanvasStore((s) => s.clearContentEditMode)
  const setContextMenu = useCanvasStore((s) => s.setContextMenu)
  const updateObject = useCanvasStore((s) => s.updateObject)
  const activeShapeKind = useCanvasStore((s) => s.activeShapeKind)

  const [activeGuides, setActiveGuides] = useState<SnapGuide[]>([])
  const [previewShape, setPreviewShape] = useState<{
    kind: ShapeKind
    x: number
    y: number
    width: number
    height: number
  } | null>(null)
  const drawStartRef = useRef<{ x: number; y: number; id: string } | null>(null)

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

  const canvasWidth = frameCount * FRAME_WIDTH * CANVAS_SCALE
  const canvasHeight = frameHeight * CANVAS_SCALE

  return (
    <div
      ref={containerRef}
      style={{
        width: canvasWidth,
        height: canvasHeight,
        background: '#1a1a1a',
        cursor: activeTool === 'text' ? 'text' : activeTool === 'shape' ? 'crosshair' : 'default',
      }}
    >
      <Stage
        ref={stageRef}
        width={canvasWidth}
        height={canvasHeight}
        scaleX={CANVAS_SCALE}
        scaleY={CANVAS_SCALE}
        onMouseDown={(e) => {
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
            setActiveGuides([])
          }
        }}
        onMouseMove={(e) => {
          if (!drawStartRef.current || previewShape === null) return
          const stage = e.target.getStage()
          if (!stage) return
          const pos = stage.getPointerPosition()
          if (!pos) return
          const curX = pos.x / CANVAS_SCALE
          const curY = pos.y / CANVAS_SCALE
          const x = Math.min(drawStartRef.current.x, curX)
          const y = Math.min(drawStartRef.current.y, curY)
          const width = Math.max(1, Math.abs(curX - drawStartRef.current.x))
          const height = Math.max(1, Math.abs(curY - drawStartRef.current.y))
          setPreviewShape((prev) => prev === null ? null : { kind: prev.kind, x, y, width, height })
        }}
        onMouseUp={() => {
          const drawStart = drawStartRef.current
          const preview = previewShape
          drawStartRef.current = null
          setPreviewShape(null)
          if (!drawStart || !preview) return
          // Discard misclicks (tiny drag)
          if (preview.width < 5 && preview.height < 5) return
          addObject({
            id: drawStart.id,
            type: 'shape',
            kind: preview.kind,
            scope: 'global',
            x: preview.x,
            y: preview.y,
            width: preview.width,
            height: preview.height,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            visible: true,
            locked: false,
            zIndex: objectOrder.length,
            fill: '#4488ff',
            stroke: 'transparent',
            strokeWidth: 0,
            cornerRadius: 0,
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
            return null // other types TBD
          })}
          {previewShape !== null && (
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
