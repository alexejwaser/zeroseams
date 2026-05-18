import React, { useRef, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import type Konva from 'konva'
import type { ImageObject } from '@/types/canvas'
import { FRAME_WIDTH, FRAME_HEIGHT, CANVAS_SCALE } from './constants'
import { useCanvasStore } from './useCanvasStore'
import { FrameGuides } from './FrameGuides'
import { CanvasImageNode } from './CanvasImageNode'
import { useImageDrop } from './useImageDrop'
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

  useImageDrop(containerRef)

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
      }}
    >
      <Stage
        ref={stageRef}
        width={canvasWidth}
        height={canvasHeight}
        scaleX={CANVAS_SCALE}
        scaleY={CANVAS_SCALE}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) setSelected(null)
        }}
      >
        {/* Layer 1: background + guides */}
        <Layer name="guides">
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
            return null // other types TBD
          })}
        </Layer>
      </Stage>
    </div>
  )
}
