import React from 'react'
import { useCanvasStore } from '@/canvas/useCanvasStore'
import { useAI } from '@/ai'
import { useAIStore } from '@/ai'
import type { BackgroundRemovalOperation } from '@/types/ai'
import type { ImageObject, TextObject } from '@/types/canvas'

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
  const isText = selectedObj?.type === 'text'

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

        {selectedObj !== null && !isImage && !isText && (
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

        {selectedObj !== null && isText && (() => {
          const textObj = selectedObj as TextObject
          return (
            <div style={{ padding: '12px 12px 0' }}>
              <NumberField label="X" value={textObj.x} onChange={(val) => patch({ x: val })} />
              <NumberField label="Y" value={textObj.y} onChange={(val) => patch({ y: val })} />
              <NumberField label="Width" value={textObj.width} min={1} onChange={(val) => patch({ width: val })} />
              <NumberField label="Rotation" value={textObj.rotation} onChange={(val) => patch({ rotation: val })} />
              <NumberField label="Opacity" value={textObj.opacity} step={0.01} min={0} max={1} onChange={(val) => patch({ opacity: val })} />

              <div style={{ color: '#aaa', fontSize: 11, fontWeight: 'bold', letterSpacing: '0.08em',
                textTransform: 'uppercase' as const, marginTop: 12, marginBottom: 6 }}>Text</div>
              <textarea
                rows={3}
                value={textObj.text}
                onChange={(e) => patch({ text: e.target.value })}
                style={{ width: '100%', background: '#1a1a1a', border: '1px solid #444', borderRadius: 4,
                  color: '#fff', fontSize: 13, padding: '4px 6px', boxSizing: 'border-box',
                  resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
              />

              <div style={{ color: '#aaa', fontSize: 11, fontWeight: 'bold', letterSpacing: '0.08em',
                textTransform: 'uppercase' as const, marginTop: 12, marginBottom: 6 }}>Font</div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                <label style={{ color: '#aaa', fontSize: 12, width: 64, flexShrink: 0 }}>Family</label>
                <select value={textObj.fontFamily} onChange={(e) => patch({ fontFamily: e.target.value })}
                  style={{ flex: 1, background: '#1a1a1a', border: '1px solid #444', borderRadius: 4,
                    color: '#fff', fontSize: 13, padding: '3px 6px', outline: 'none' }}>
                  {['sans-serif', 'serif', 'monospace', 'Georgia', 'Helvetica', 'Arial', 'Courier New', 'Times New Roman', 'Impact', 'Verdana'].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <NumberField label="Size" value={textObj.fontSize} min={8} max={400} onChange={(val) => patch({ fontSize: val })} />

              <div style={{ color: '#aaa', fontSize: 11, fontWeight: 'bold', letterSpacing: '0.08em',
                textTransform: 'uppercase' as const, marginTop: 12, marginBottom: 6 }}>Style</div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                {(['bold', 'italic'] as const).map((style) => {
                  const active = textObj.fontStyle.includes(style)
                  return (
                    <button key={style} onClick={() => {
                      const hasBold = textObj.fontStyle.includes('bold')
                      const hasItalic = textObj.fontStyle.includes('italic')
                      let next: TextObject['fontStyle']
                      if (style === 'bold') {
                        next = hasBold
                          ? (hasItalic ? 'italic' : 'normal')
                          : (hasItalic ? 'bold italic' : 'bold')
                      } else {
                        next = hasItalic
                          ? (hasBold ? 'bold' : 'normal')
                          : (hasBold ? 'bold italic' : 'italic')
                      }
                      patch({ fontStyle: next })
                    }}
                    style={{ padding: '3px 10px', height: 28, background: active ? '#0af' : '#333',
                      color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13,
                      fontWeight: style === 'bold' ? 'bold' : 'normal',
                      fontStyle: style === 'italic' ? 'italic' : 'normal' }}>
                      {style === 'bold' ? 'B' : 'I'}
                    </button>
                  )
                })}
              </div>

              <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                {(['left', 'center', 'right'] as const).map((a) => (
                  <button key={a} onClick={() => patch({ align: a })}
                    style={{ padding: '3px 10px', height: 28, flex: 1,
                      background: textObj.align === a ? '#0af' : '#333',
                      color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
                    {a === 'left' ? '←' : a === 'center' ? '↔' : '→'}
                  </button>
                ))}
              </div>

              <div style={{ color: '#aaa', fontSize: 11, fontWeight: 'bold', letterSpacing: '0.08em',
                textTransform: 'uppercase' as const, marginTop: 12, marginBottom: 6 }}>Color</div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                <label style={{ color: '#aaa', fontSize: 12, width: 64, flexShrink: 0 }}>Fill</label>
                <input type="color" value={textObj.fill} onChange={(e) => patch({ fill: e.target.value })}
                  style={{ width: 40, height: 28, border: 'none', borderRadius: 4, cursor: 'pointer',
                    background: 'none', padding: 0 }} />
              </div>

              <div style={{ color: '#aaa', fontSize: 11, fontWeight: 'bold', letterSpacing: '0.08em',
                textTransform: 'uppercase' as const, marginTop: 12, marginBottom: 6 }}>Spacing</div>
              <NumberField label="Letter Sp." value={textObj.letterSpacing} step={0.5} onChange={(val) => patch({ letterSpacing: val })} />
              <NumberField label="Line H." value={textObj.lineHeight} step={0.1} min={0.5} max={4} onChange={(val) => patch({ lineHeight: val })} />
            </div>
          )
        })()}

        {selectedObj !== null && isImage && (() => {
          const imgObj = selectedObj as ImageObject
          const isContentMode = imgObj.contentEditMode === true

          if (!isContentMode) {
            // FRAME MODE
            return (
              <div style={{ padding: '12px 12px 0' }}>
                <div style={{ color: '#aaa', fontSize: 11, fontWeight: 'bold', letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const, marginBottom: 6 }}>Frame</div>
                <NumberField
                  label="X"
                  value={imgObj.frameX}
                  onChange={(val) => patch({ frameX: val, x: val })}
                />
                <NumberField
                  label="Y"
                  value={imgObj.frameY}
                  onChange={(val) => patch({ frameY: val, y: val })}
                />
                <NumberField
                  label="W"
                  value={imgObj.frameWidth}
                  min={1}
                  onChange={(val) => patch({ frameWidth: val, width: val })}
                />
                <NumberField
                  label="H"
                  value={imgObj.frameHeight}
                  min={1}
                  onChange={(val) => patch({ frameHeight: val, height: val })}
                />
                <NumberField
                  label="Rotation"
                  value={imgObj.rotation}
                  onChange={(val) => patch({ rotation: val })}
                />
                <NumberField
                  label="Opacity"
                  value={imgObj.opacity}
                  step={0.01}
                  min={0}
                  max={1}
                  onChange={(val) => patch({ opacity: val })}
                />
                <div style={{ color: '#555', fontSize: 11, marginTop: 8, marginBottom: 8 }}>
                  ↩ Double-click image to edit content
                </div>
              </div>
            )
          }

          // CONTENT EDIT MODE
          return (
            <div style={{ padding: '12px 12px 0' }}>
              {/* Orange banner — full bleed */}
              <div style={{
                marginLeft: -12,
                marginRight: -12,
                marginTop: -12,
                marginBottom: 12,
                padding: '6px 12px',
                background: '#ff7043',
                color: '#fff',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
                Content Edit Mode
              </div>

              <div style={{ color: '#aaa', fontSize: 11, fontWeight: 'bold', letterSpacing: '0.08em',
                textTransform: 'uppercase' as const, marginBottom: 6 }}>Content</div>
              <NumberField
                label="Offset X"
                value={imgObj.contentOffsetX}
                onChange={(val) => patch({ contentOffsetX: val })}
              />
              <NumberField
                label="Offset Y"
                value={imgObj.contentOffsetY}
                onChange={(val) => patch({ contentOffsetY: val })}
              />
              <NumberField
                label="Width"
                value={imgObj.contentWidth}
                min={1}
                onChange={(val) => patch({ contentWidth: val })}
              />
              <NumberField
                label="Height"
                value={imgObj.contentHeight}
                min={1}
                onChange={(val) => patch({ contentHeight: val })}
              />

              <button
                onClick={() => patch({
                  frameWidth: imgObj.contentWidth,
                  frameHeight: imgObj.contentHeight,
                  width: imgObj.contentWidth,
                  height: imgObj.contentHeight,
                  contentOffsetX: 0,
                  contentOffsetY: 0,
                })}
                style={{
                  width: '100%',
                  height: 30,
                  background: '#333',
                  color: '#fff',
                  border: '1px solid #555',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                Fit frame to content
              </button>

              <button
                onClick={() => {
                  const scale = Math.max(
                    imgObj.frameWidth / imgObj.contentWidth,
                    imgObj.frameHeight / imgObj.contentHeight
                  )
                  const newW = imgObj.contentWidth * scale
                  const newH = imgObj.contentHeight * scale
                  patch({
                    contentWidth: newW,
                    contentHeight: newH,
                    contentOffsetX: (imgObj.frameWidth - newW) / 2,
                    contentOffsetY: (imgObj.frameHeight - newH) / 2,
                  })
                }}
                style={{
                  width: '100%',
                  height: 30,
                  background: '#333',
                  color: '#fff',
                  border: '1px solid #555',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                Fill frame with content
              </button>

              <div style={{ color: '#888', fontSize: 11, marginTop: 8, marginBottom: 8 }}>
                Click outside to exit content mode
              </div>
            </div>
          )
        })()}

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
