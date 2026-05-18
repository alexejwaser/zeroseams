import React, { useRef, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import type Konva from 'konva'
import type { ImageObject, TextObject } from '@/types/canvas'
import { FRAME_WIDTH, FRAME_HEIGHT, CANVAS_SCALE } from './constants'
import { useCanvasStore } from './useCanvasStore'
import { FrameGuides } from './FrameGuides'
import { CanvasImageNode } from './CanvasImageNode'
import { CanvasTextNode } from './CanvasTextNode'
import { useImageDrop } from './useImageDrop'
import { useUndoRedoShortcuts } from './useUndoRedoShortcuts'
import { useAutosave } from './useAutosave'
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
  const frameCount = useCanvasStore((s) => s.frameCount)
  const addObject = useCanvasStore((s) => s.addObject)
  const activeTool = useCanvasStore((s) => s.activeTool)
  const setActiveTool = useCanvasStore((s) => s.setActiveTool)
  const clearContentEditMode = useCanvasStore((s) => s.clearContentEditMode)

  useImageDrop(containerRef)
  useUndoRedoShortcuts()
  useAutosave()

  useEffect(() => {
    _stageInstance = stageRef.current
    return () => {
      _stageInstance = null
    }
  }, [])

  const canvasWidth = frameCount * FRAME_WIDTH * CANVAS_SCALE
  const canvasHeight = FRAME_HEIGHT * CANVAS_SCALE

  return (
    <div
      ref={containerRef}
      style={{
        width: canvasWidth,
        height: canvasHeight,
        background: '#1a1a1a',
        cursor: activeTool === 'text' ? 'text' : 'default',
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
          } else {
            setSelected(null)
            clearContentEditMode()
          }
        }}
      >
        {/* Layer 1: background + guides */}
        <Layer name="guides" listening={false}>
          <FrameGuides frameCount={frameCount} />
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
                />
              )
            }
            return null // other types TBD
          })}
        </Layer>
      </Stage>
    </div>
  )
}
