import React from 'react'
import { Rect, Line, Text, Group } from 'react-konva'
import { FRAME_WIDTH } from './constants'
import type { Frame } from '@/types/project'

interface FrameGuidesProps {
  frameCount: number
  frames: Frame[]
  frameHeight: number
  backgroundColor: string
}

export function FrameGuides({ frameCount, frames, frameHeight, backgroundColor }: FrameGuidesProps): React.ReactElement {
  const totalWidth = frameCount * FRAME_WIDTH

  return (
    <Group>
      {/* Per-frame background rects (use frame override if set, else canvas default) */}
      {Array.from({ length: frameCount }, (_, i) => {
        const frame = frames[i]
        const fill = frame?.backgroundColor ?? backgroundColor
        return (
          <Rect
            key={`bg-${i}`}
            x={i * FRAME_WIDTH}
            y={0}
            width={FRAME_WIDTH}
            height={frameHeight}
            fill={fill}
          />
        )
      })}

      {/* Vertical dashed divider lines at frame boundaries (not outer edges) */}
      {Array.from({ length: frameCount - 1 }, (_, i) => {
        const x = (i + 1) * FRAME_WIDTH
        return (
          <Line
            key={`divider-${i}`}
            points={[x, 0, x, frameHeight]}
            stroke="red"
            strokeWidth={2}
            dash={[10, 6]}
          />
        )
      })}

      {/* Frame number labels centered at top of each frame */}
      {Array.from({ length: frameCount }, (_, i) => {
        const centerX = i * FRAME_WIDTH + FRAME_WIDTH / 2
        return (
          <Text
            key={`label-${i}`}
            text={String(i + 1)}
            x={centerX - 12}
            y={16}
            fontSize={24}
            fontFamily="sans-serif"
            fill="red"
            align="center"
            width={24}
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
