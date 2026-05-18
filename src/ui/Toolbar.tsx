import React, { useState } from 'react'
import { useCanvasStore } from '@/canvas/useCanvasStore'

type ActiveTool = 'select' | 'text' | 'shape'

const TOOL_LABELS: Record<ActiveTool, string> = {
  select: 'Select',
  text: 'Text',
  shape: 'Shape',
}

const TOOLS: ActiveTool[] = ['select', 'text', 'shape']

export function Toolbar(): React.ReactElement {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select')
  const frameCount = useCanvasStore((s) => s.frameCount)
  const setFrameCount = useCanvasStore((s) => s.setFrameCount)

  function handleToolClick(tool: ActiveTool): void {
    setActiveTool(tool)
  }

  function handleMinus(): void {
    setFrameCount(frameCount - 1)
  }

  function handlePlus(): void {
    setFrameCount(frameCount + 1)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 48,
        background: '#2a2a2a',
        borderBottom: '1px solid #333',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Left: title */}
      <div
        style={{
          paddingLeft: 16,
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          flex: '0 0 auto',
        }}
      >
        Zero Seams
      </div>

      {/* Center: tool buttons */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        {TOOLS.map((tool) => (
          <button
            key={tool}
            onClick={() => handleToolClick(tool)}
            style={{
              padding: '4px 14px',
              height: 30,
              background: activeTool === tool ? '#0af' : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: activeTool === tool ? 'bold' : 'normal',
              transition: 'background 0.15s',
            }}
          >
            {TOOL_LABELS[tool]}
          </button>
        ))}
      </div>

      {/* Right: frame count control */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          paddingRight: 16,
          flex: '0 0 auto',
        }}
      >
        <span style={{ color: '#aaa', fontSize: 13 }}>Frames:</span>
        <button
          onClick={handleMinus}
          disabled={frameCount <= 1}
          style={{
            width: 24,
            height: 24,
            background: '#333',
            color: frameCount <= 1 ? '#555' : '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: frameCount <= 1 ? 'default' : 'pointer',
            fontSize: 14,
            lineHeight: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          −
        </button>
        <span
          style={{
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
            minWidth: 16,
            textAlign: 'center',
          }}
        >
          {frameCount}
        </span>
        <button
          onClick={handlePlus}
          disabled={frameCount >= 10}
          style={{
            width: 24,
            height: 24,
            background: '#333',
            color: frameCount >= 10 ? '#555' : '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: frameCount >= 10 ? 'default' : 'pointer',
            fontSize: 14,
            lineHeight: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          +
        </button>
      </div>
    </div>
  )
}
