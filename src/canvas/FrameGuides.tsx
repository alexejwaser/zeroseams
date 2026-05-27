import React from 'react'
import { Rect, Group } from 'react-konva'
import { useCanvasStore } from './useCanvasStore'
import type { Frame } from '@/types/project'

interface FrameGuidesProps {
  frameCount: number
  frames: Frame[]
  frameHeight: number
  backgroundColor: string
}

export function FrameGuides({ frameCount, frames, frameHeight, backgroundColor }: FrameGuidesProps): React.ReactElement {
  const frameWidth = useCanvasStore((s) => s.frameWidth)
  const totalWidth = frameCount * frameWidth

  return (
    <Group>
      {/* Per-frame background rects (use frame override if set, else canvas default) */}
      {Array.from({ length: frameCount }, (_, i) => {
        const frame = frames[i]
        const fill = frame?.backgroundColor ?? backgroundColor
        return (
          <Rect
            key={`bg-${i}`}
            x={i * frameWidth}
            y={0}
            width={frameWidth}
            height={frameHeight}
            fill={fill}
          />
        )
      })}

      {/* Invisible outer border for reference */}
      <Rect
        x={0}
        y={0}
        width={totalWidth}
        height={frameHeight}
        fill="transparent"
        listening={false}
      />
    </Group>
  )
}
