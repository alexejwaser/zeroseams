import React, { useState } from 'react'
import { useCanvasStore } from '@/canvas/useCanvasStore'
import { useSaveStatusStore, type SaveStatus } from './useSaveStatusStore'

type ActiveTool = 'select' | 'text' | 'shape'

const TOOL_LABELS: Record<ActiveTool, string> = {
  select: 'Select',
  text: 'Text',
  shape: 'Shape',
}

const TOOLS: ActiveTool[] = ['select', 'text', 'shape']

function SaveStatusPill({ status }: { status: SaveStatus }): React.ReactElement | null {
  if (status === 'idle') return null

  const config: Record<Exclude<SaveStatus, 'idle'>, { text: string; color: string }> = {
    saving: { text: 'Saving…', color: '#aaa' },
    saved: { text: '✓ Saved', color: '#4c4' },
    error: { text: '⚠ Save failed', color: '#f55' },
  }

  const { text, color } = config[status as Exclude<SaveStatus, 'idle'>]

  return (
    <span
      style={{
        fontSize: 12,
        color,
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      {text}
    </span>
  )
}

export function Toolbar(): React.ReactElement {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select')
  const frameCount = useCanvasStore((s) => s.frameCount)
  const setFrameCount = useCanvasStore((s) => s.setFrameCount)
  const past = useCanvasStore((s) => s.past)
  const future = useCanvasStore((s) => s.future)
  const undo = useCanvasStore((s) => s.undo)
  const redo = useCanvasStore((s) => s.redo)
  const saveStatus = useSaveStatusStore((s) => s.status)

  function handleToolClick(tool: ActiveTool): void {
    setActiveTool(tool)
  }

  function handleMinus(): void {
    setFrameCount(frameCount - 1)
  }

  function handlePlus(): void {
    setFrameCount(frameCount + 1)
  }

  const undoDisabled = past.length === 0
  const redoDisabled = future.length === 0

  const historyButtonStyle = (disabled: boolean): React.CSSProperties => ({
    padding: '4px 14px',
    height: 30,
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: disabled ? 'default' : 'pointer',
    fontSize: 13,
    fontWeight: 'normal',
    opacity: disabled ? 0.35 : 1,
    transition: 'opacity 0.15s',
  })

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

      {/* Center: undo/redo + tool buttons */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <button
          onClick={undo}
          disabled={undoDisabled}
          style={historyButtonStyle(undoDisabled)}
        >
          ↩ Undo
        </button>
        <button
          onClick={redo}
          disabled={redoDisabled}
          style={historyButtonStyle(redoDisabled)}
        >
          ↪ Redo
        </button>

        <div style={{ width: 8 }} />

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

      {/* Right: frame count control + save status */}
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

        {/* Save status pill */}
        <div
          style={{
            minWidth: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <SaveStatusPill status={saveStatus} />
        </div>
      </div>
    </div>
  )
}
