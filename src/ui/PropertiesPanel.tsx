import React from 'react'
import { useCanvasStore } from '@/canvas/useCanvasStore'
import { useAI } from '@/ai'
import { useAIStore } from '@/ai'
import type { BackgroundRemovalOperation } from '@/types/ai'
import type { ImageObject, TextObject } from '@/types/canvas'
import type { Frame } from '@/types/project'

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

interface ColorInputProps {
  value: string
  onChange: (color: string) => void
}

function ColorInput({ value, onChange }: ColorInputProps): React.ReactElement {
  const [hexText, setHexText] = React.useState(value)

  React.useEffect(() => {
    setHexText(value)
  }, [value])

  function handleSwatchChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange(e.target.value)
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setHexText(e.target.value)
  }

  function handleTextBlur(): void {
    const cleaned = hexText.trim()
    // Accept #rrggbb or rrggbb formats
    if (/^#?[0-9a-fA-F]{6}$/.test(cleaned)) {
      const normalized = cleaned.startsWith('#') ? cleaned : `#${cleaned}`
      onChange(normalized)
      setHexText(normalized)
    } else {
      // Revert to last valid value
      setHexText(value)
    }
  }

  function handleTextKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <input
        type="color"
        value={value}
        onChange={handleSwatchChange}
        style={{
          width: 32,
          height: 24,
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          padding: 0,
          background: 'none',
          flexShrink: 0,
        }}
      />
      <input
        type="text"
        value={hexText}
        onChange={handleTextChange}
        onBlur={handleTextBlur}
        onKeyDown={handleTextKeyDown}
        style={{
          flex: 1,
          background: '#1a1a1a',
          border: '1px solid #444',
          borderRadius: 4,
          color: '#fff',
          fontSize: 12,
          padding: '3px 6px',
          boxSizing: 'border-box',
          outline: 'none',
          fontFamily: 'monospace',
        }}
      />
    </div>
  )
}

const sectionLabelStyle: React.CSSProperties = {
  color: '#aaa',
  fontSize: 11,
  fontWeight: 'bold',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginTop: 12,
  marginBottom: 6,
}

const alignButtonStyle = (active?: boolean): React.CSSProperties => ({
  flex: 1,
  height: 28,
  background: active ? '#0af' : '#333',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 12,
  padding: '0 4px',
})

const distributeButtonStyle = (disabled: boolean): React.CSSProperties => ({
  flex: 1,
  height: 28,
  background: '#333',
  color: disabled ? '#555' : '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: disabled ? 'default' : 'pointer',
  fontSize: 12,
  opacity: disabled ? 0.45 : 1,
})

interface AlignDistributeSectionProps {
  selectedCount: number
  onAlign: (anchor: 'left' | 'right' | 'top' | 'bottom' | 'centerH' | 'centerV') => void
  onDistribute: (axis: 'horizontal' | 'vertical') => void
}

function AlignDistributeSection({
  selectedCount,
  onAlign,
  onDistribute,
}: AlignDistributeSectionProps): React.ReactElement {
  const distributeDisabled = selectedCount < 3

  return (
    <div style={{ padding: '12px 12px 0' }}>
      <div style={sectionLabelStyle}>Align & Distribute</div>

      {/* Row 1: horizontal alignment */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
        <button style={alignButtonStyle()} onClick={() => onAlign('left')} title="Align left edges">
          Left
        </button>
        <button style={alignButtonStyle()} onClick={() => onAlign('centerH')} title="Center horizontally">
          Center H
        </button>
        <button style={alignButtonStyle()} onClick={() => onAlign('right')} title="Align right edges">
          Right
        </button>
      </div>

      {/* Row 2: vertical alignment */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
        <button style={alignButtonStyle()} onClick={() => onAlign('top')} title="Align top edges">
          Top
        </button>
        <button style={alignButtonStyle()} onClick={() => onAlign('centerV')} title="Center vertically">
          Middle V
        </button>
        <button style={alignButtonStyle()} onClick={() => onAlign('bottom')} title="Align bottom edges">
          Bottom
        </button>
      </div>

      {/* Row 3: distribute */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        <button
          style={distributeButtonStyle(distributeDisabled)}
          disabled={distributeDisabled}
          onClick={() => onDistribute('horizontal')}
          title={distributeDisabled ? 'Select 3+ objects to distribute' : 'Distribute horizontally'}
        >
          Distribute H
        </button>
        <button
          style={distributeButtonStyle(distributeDisabled)}
          disabled={distributeDisabled}
          onClick={() => onDistribute('vertical')}
          title={distributeDisabled ? 'Select 3+ objects to distribute' : 'Distribute vertically'}
        >
          Distribute V
        </button>
      </div>

      <div
        style={{
          color: '#555',
          fontSize: 11,
          marginBottom: 12,
          paddingBottom: 12,
          borderBottom: '1px solid #333',
        }}
      >
        {selectedCount} objects selected
      </div>
    </div>
  )
}

interface FrameRowProps {
  frame: Frame
  canvasDefault: string
  onColorChange: (color: string) => void
  onClear: () => void
}

function FrameRow({ frame, canvasDefault, onColorChange, onClear }: FrameRowProps): React.ReactElement {
  const effectiveColor = frame.backgroundColor ?? canvasDefault

  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 4,
          gap: 6,
        }}
      >
        <span style={{ color: '#ddd', fontSize: 12, flex: 1 }}>{frame.label}</span>
        {frame.backgroundColor !== null && (
          <button
            onClick={onClear}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: 11,
              cursor: 'pointer',
              padding: '0 2px',
              textDecoration: 'underline',
            }}
          >
            Clear
          </button>
        )}
        {frame.backgroundColor === null && (
          <span style={{ color: '#555', fontSize: 11 }}>Default</span>
        )}
      </div>
      <ColorInput value={effectiveColor} onChange={onColorChange} />
    </div>
  )
}

interface CanvasSectionProps {
  backgroundColor: string
  frames: Frame[]
  ratio: 'square' | 'portrait'
  onCanvasBgChange: (color: string) => void
  onFrameBgChange: (frameIndex: number, color: string) => void
  onFrameBgClear: (frameIndex: number) => void
}

function CanvasSection({
  backgroundColor,
  frames,
  ratio,
  onCanvasBgChange,
  onFrameBgChange,
  onFrameBgClear,
}: CanvasSectionProps): React.ReactElement {
  const formatLabel = ratio === 'portrait' ? '4:5 (Portrait)' : '1:1 (Square)'

  return (
    <div style={{ padding: '12px 12px 0' }}>
      <div style={{ ...sectionLabelStyle, marginTop: 0 }}>Canvas</div>

      <div
        style={{
          color: '#aaa',
          fontSize: 12,
          marginBottom: 10,
        }}
      >
        Format: {formatLabel}
      </div>

      <div style={sectionLabelStyle}>Background</div>
      <div style={{ marginBottom: 12 }}>
        <ColorInput value={backgroundColor} onChange={onCanvasBgChange} />
      </div>

      <div style={sectionLabelStyle}>Per-Frame Colors</div>
      {frames.map((frame) => (
        <FrameRow
          key={frame.index}
          frame={frame}
          canvasDefault={backgroundColor}
          onColorChange={(color) => onFrameBgChange(frame.index, color)}
          onClear={() => onFrameBgClear(frame.index)}
        />
      ))}
    </div>
  )
}

export function PropertiesPanel(): React.ReactElement {
  const objects = useCanvasStore((s) => s.objects)
  const selectedId = useCanvasStore((s) => s.selectedId)
  const selectedIds = useCanvasStore((s) => s.selectedIds)
  const updateObject = useCanvasStore((s) => s.updateObject)
  const commitUpdate = useCanvasStore((s) => s.commitUpdate)
  const alignObjects = useCanvasStore((s) => s.alignObjects)
  const distributeObjects = useCanvasStore((s) => s.distributeObjects)
  const backgroundColor = useCanvasStore((s) => s.backgroundColor)
  const frames = useCanvasStore((s) => s.frames)
  const ratio = useCanvasStore((s) => s.ratio)
  const setCanvasBackground = useCanvasStore((s) => s.setCanvasBackground)
  const setFrameBackground = useCanvasStore((s) => s.setFrameBackground)

  const { removeBg } = useAI()
  const operations = useAIStore((s) => s.operations)
  const clearOperation = useAIStore((s) => s.clearOperation)

  const selectedObj = selectedId !== null ? objects[selectedId] : null
  const isImage = selectedObj?.type === 'image'
  const isText = selectedObj?.type === 'text'
  const isMultiSelect = selectedIds.length > 1
  const isNoneSelected = selectedId === null && selectedIds.length === 0

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
        {/* Multi-select: align/distribute */}
        {isMultiSelect && (
          <AlignDistributeSection
            selectedCount={selectedIds.length}
            onAlign={alignObjects}
            onDistribute={distributeObjects}
          />
        )}

        {/* Nothing selected: canvas properties */}
        {isNoneSelected && (
          <CanvasSection
            backgroundColor={backgroundColor}
            frames={frames}
            ratio={ratio}
            onCanvasBgChange={setCanvasBackground}
            onFrameBgChange={setFrameBackground}
            onFrameBgClear={(frameIndex) => setFrameBackground(frameIndex, null)}
          />
        )}

        {/* Single object selected: per-object properties */}
        {!isMultiSelect && selectedObj !== null && !isImage && !isText && (
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

        {!isMultiSelect && selectedObj !== null && isText && (() => {
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

        {!isMultiSelect && selectedObj !== null && isImage && (() => {
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
                onClick={() => {
                  if (!selectedId) return
                  // Rotate the content offset vector by the frame's rotation angle so
                  // the new frame origin lands exactly at the content's canvas-space
                  // top-left, regardless of rotation. When rotation is 0 this reduces
                  // to frameX + contentOffsetX / frameY + contentOffsetY.
                  const θ = imgObj.rotation * (Math.PI / 180)
                  const cosθ = Math.cos(θ)
                  const sinθ = Math.sin(θ)
                  const newFrameX =
                    imgObj.frameX +
                    imgObj.contentOffsetX * cosθ -
                    imgObj.contentOffsetY * sinθ
                  const newFrameY =
                    imgObj.frameY +
                    imgObj.contentOffsetX * sinθ +
                    imgObj.contentOffsetY * cosθ
                  commitUpdate(selectedId, {
                    frameX: newFrameX,
                    frameY: newFrameY,
                    x: newFrameX,
                    y: newFrameY,
                    frameWidth: imgObj.contentWidth,
                    frameHeight: imgObj.contentHeight,
                    width: imgObj.contentWidth,
                    height: imgObj.contentHeight,
                    contentOffsetX: 0,
                    contentOffsetY: 0,
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

        {/* AI Tools section — only when an image is selected (not multi-select) */}
        {!isMultiSelect && isImage && selectedObj !== null && (
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
