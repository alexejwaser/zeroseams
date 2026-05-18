import React from 'react'
import { useCanvasStore } from '@/canvas/useCanvasStore'
import { useAI } from '@/ai'
import { useAIStore } from '@/ai'
import type { BackgroundRemovalOperation } from '@/types/ai'

interface NumberFieldProps {
  label: string
  value: number
  step?: number
  min?: number
  max?: number
  onChange: (val: number) => void
}

function NumberField({
  label,
  value,
  step = 1,
  min,
  max,
  onChange,
}: NumberFieldProps): React.ReactElement {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const parsed = parseFloat(e.target.value)
    if (!isNaN(parsed)) {
      onChange(parsed)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
      }}
    >
      <label
        style={{
          color: '#aaa',
          fontSize: 12,
          width: 64,
          flexShrink: 0,
        }}
      >
        {label}
      </label>
      <input
        type="number"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={handleChange}
        style={{
          flex: 1,
          background: '#1a1a1a',
          border: '1px solid #444',
          borderRadius: 4,
          color: '#fff',
          fontSize: 13,
          padding: '3px 6px',
          boxSizing: 'border-box',
          outline: 'none',
        }}
      />
    </div>
  )
}

export function PropertiesPanel(): React.ReactElement {
  const objects = useCanvasStore((s) => s.objects)
  const selectedId = useCanvasStore((s) => s.selectedId)
  const updateObject = useCanvasStore((s) => s.updateObject)

  const { removeBg } = useAI()
  const operations = useAIStore((s) => s.operations)
  const clearOperation = useAIStore((s) => s.clearOperation)

  const selectedObj = selectedId !== null ? objects[selectedId] : null
  const isImage = selectedObj?.type === 'image'

  const activeBgOp: BackgroundRemovalOperation | undefined = selectedId
    ? (Object.values(operations).find(
        (op) => op.type === 'background-removal' && op.targetObjectId === selectedId
      ) as BackgroundRemovalOperation | undefined)
    : undefined

  React.useEffect(() => {
    if (activeBgOp?.status === 'done') {
      const t = setTimeout(() => clearOperation(activeBgOp.id), 2000)
      return () => clearTimeout(t)
    }
  }, [activeBgOp?.status, activeBgOp?.id, clearOperation])

  function patch(partial: Parameters<typeof updateObject>[1]): void {
    if (!selectedId) return
    updateObject(selectedId, partial)
  }

  function handleRemoveBg(): void {
    if (selectedId) void removeBg(selectedId)
  }

  return (
    <div
      style={{
        width: 260,
        flexShrink: 0,
        height: '100%',
        background: '#2a2a2a',
        borderLeft: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Title */}
      <div
        style={{
          padding: '12px 12px 8px',
          color: '#fff',
          fontSize: 13,
          fontWeight: 'bold',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          borderBottom: '1px solid #333',
          flexShrink: 0,
        }}
      >
        Properties
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {selectedObj === null && (
          <div
            style={{
              padding: '20px 12px',
              color: '#555',
              fontSize: 13,
            }}
          >
            Select an object
          </div>
        )}

        {selectedObj !== null && !isImage && (
          <div
            style={{
              padding: '20px 12px',
              color: '#555',
              fontSize: 13,
            }}
          >
            No properties
          </div>
        )}

        {selectedObj !== null && isImage && (
          <div style={{ padding: '12px 12px 0' }}>
            <NumberField
              label="X"
              value={selectedObj.x}
              onChange={(val) => patch({ x: val })}
            />
            <NumberField
              label="Y"
              value={selectedObj.y}
              onChange={(val) => patch({ y: val })}
            />
            <NumberField
              label="Width"
              value={selectedObj.width}
              min={1}
              onChange={(val) => patch({ width: val })}
            />
            <NumberField
              label="Height"
              value={selectedObj.height}
              min={1}
              onChange={(val) => patch({ height: val })}
            />
            <NumberField
              label="Rotation"
              value={selectedObj.rotation}
              onChange={(val) => patch({ rotation: val })}
            />
            <NumberField
              label="Opacity"
              value={selectedObj.opacity}
              step={0.01}
              min={0}
              max={1}
              onChange={(val) => patch({ opacity: val })}
            />
          </div>
        )}

        {/* Spacer pushes AI Tools to bottom */}
        <div style={{ flex: 1 }} />

        {/* AI Tools section — only when an image is selected */}
        {isImage && selectedObj !== null && (
          <div
            style={{
              padding: 12,
              borderTop: '1px solid #333',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                color: '#aaa',
                fontSize: 11,
                fontWeight: 'bold',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              AI Tools
            </div>
            {activeBgOp?.status === 'running' && (
              <div style={{ background: '#1a1a1a', borderRadius: 6, padding: '8px 10px' }}>
                <div style={{ color: '#aaa', fontSize: 12, marginBottom: 6 }}>
                  Removing background… {activeBgOp.progress}%
                </div>
                <div style={{ background: '#333', borderRadius: 3, height: 6, overflow: 'hidden' }}>
                  <div
                    style={{
                      background: '#0af',
                      width: `${activeBgOp.progress}%`,
                      height: '100%',
                      transition: 'width 0.2s',
                    }}
                  />
                </div>
              </div>
            )}
            {activeBgOp?.status === 'done' && (
              <div style={{ color: '#4f4', fontSize: 13 }}>Background removed</div>
            )}
            {activeBgOp?.status === 'error' && (
              <div style={{ color: '#f44', fontSize: 12 }}>{activeBgOp.error}</div>
            )}
            {(!activeBgOp || activeBgOp.status === 'idle') && (
              <button
                onClick={handleRemoveBg}
                style={{
                  width: '100%',
                  height: 32,
                  background: '#0af',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}
              >
                Remove BG
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
