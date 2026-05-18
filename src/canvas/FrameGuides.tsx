import React from 'react'
import { Rect, Line, Text, Group } from 'react-konva'
import { FRAME_WIDTH, FRAME_HEIGHT } from './constants'

interface FrameGuidesProps {
  frameCount: number
}

export function FrameGuides({ frameCount }: FrameGuidesProps): React.ReactElement {
  const totalWidth = frameCount * FRAME_WIDTH

  return (
    <Group>
      {/* Full canvas white background */}
      <Rect x={0} y={0} width={totalWidth} height={FRAME_HEIGHT} fill="white" />

      {/* Vertical dashed divider lines at frame boundaries (not outer edges) */}
      {Array.from({ length: frameCount - 1 }, (_, i) => {
        const x = (i + 1) * FRAME_WIDTH
        return (
          <Line
            key={`divider-${i}`}
            points={[x, 0, x, FRAME_HEIGHT]}
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
    </Group>
  )
}
