import React from 'react'
import { useCanvasStore } from '@/canvas/useCanvasStore'
import { useAI } from '@/ai'
import { useAIStore } from '@/ai'
import type { BackgroundRemovalOperation } from '@/types/ai'
import type { ImageObject, TextObject, ShapeObject, PathObject, FontStyle } from '@/types/canvas'
import type { Frame } from '@/types/project'
import {
  getSelectionStyle,
  applyStyleToRange,
  applyStyleToAll,
} from '@/canvas/textSpans'

// ---------------------------------------------------------------------------
// NumberField — normal (always has a value)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// MixedNumberField — for per-span properties that may be mixed across selection
// ---------------------------------------------------------------------------

interface MixedNumberFieldProps {
  label: string
  value: number | undefined   // undefined = mixed
  step?: number
  min?: number
  max?: number
  onChange: (val: number) => void
}

function MixedNumberField({
  label,
  value,
  step = 1,
  min,
  max,
  onChange,
}: MixedNumberFieldProps): React.ReactElement {
  const isMixed = value === undefined

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
        value={isMixed ? '' : value}
        placeholder={isMixed ? '—' : undefined}
        step={step}
        min={min}
        max={max}
        onChange={handleChange}
        style={{
          flex: 1,
          background: '#1a1a1a',
          border: '1px solid #444',
          borderRadius: 4,
          color: isMixed ? '#666' : '#fff',
          fontSize: 13,
          padding: '3px 6px',
          boxSizing: 'border-box',
          outline: 'none',
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// ColorInput — normal
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// MixedColorInput — for per-span fill that may be mixed
// ---------------------------------------------------------------------------

interface MixedColorInputProps {
  value: string | undefined   // undefined = mixed
  onChange: (color: string) => void
}

function MixedColorInput({ value, onChange }: MixedColorInputProps): React.ReactElement {
  const isMixed = value === undefined
  const displayValue = isMixed ? '#808080' : value

  const [hexText, setHexText] = React.useState(displayValue)

  React.useEffect(() => {
    setHexText(isMixed ? '' : (value ?? '#000000'))
  }, [value, isMixed])

  function handleSwatchChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange(e.target.value)
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setHexText(e.target.value)
  }

  function handleTextBlur(): void {
    const cleaned = hexText.trim()
    if (/^#?[0-9a-fA-F]{6}$/.test(cleaned)) {
      const normalized = cleaned.startsWith('#') ? cleaned : `#${cleaned}`
      onChange(normalized)
      setHexText(normalized)
    } else {
      setHexText(isMixed ? '' : (value ?? '#000000'))
    }
  }

  function handleTextKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <input
          type="color"
          value={displayValue}
          onChange={handleSwatchChange}
          style={{
            width: 32,
            height: 24,
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            padding: 0,
            background: 'none',
            opacity: isMixed ? 0.4 : 1,
          }}
        />
        {isMixed && (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontSize: 10,
              pointerEvents: 'none',
              fontWeight: 'bold',
            }}
          >
            —
          </span>
        )}
      </div>
      <input
        type="text"
        value={hexText}
        placeholder={isMixed ? '—' : undefined}
        onChange={handleTextChange}
        onBlur={handleTextBlur}
        onKeyDown={handleTextKeyDown}
        style={{
          flex: 1,
          background: '#1a1a1a',
          border: '1px solid #444',
          borderRadius: 4,
          color: isMixed ? '#666' : '#fff',
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

// ---------------------------------------------------------------------------
// Shared style constants
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// AlignDistributeSection
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// CanvasSection
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Font families list
// ---------------------------------------------------------------------------

const FONT_FAMILIES = [
  'sans-serif',
  'serif',
  'monospace',
  'Georgia',
  'Helvetica',
  'Arial',
  'Courier New',
  'Times New Roman',
  'Impact',
  'Verdana',
]

// ---------------------------------------------------------------------------
// TextSection — the main per-character formatting panel for text objects
// ---------------------------------------------------------------------------

interface TextSectionProps {
  textObj: TextObject
  selectedId: string
  textEditingId: string | null
  textSelection: { start: number; end: number } | null
  onCommit: (id: string, patch: Partial<TextObject>) => void
}

function TextSection({
  textObj,
  selectedId,
  textEditingId,
  textSelection,
  onCommit,
}: TextSectionProps): React.ReactElement {
  // Determine whether we are in span-selection mode:
  // editing this object AND a non-collapsed range is selected.
  const isInEditMode = textEditingId === selectedId
  const hasRangeSelection =
    isInEditMode &&
    textSelection !== null &&
    textSelection.start !== textSelection.end

  // Resolve the style to display. In span-selection mode: getSelectionStyle().
  // Otherwise: layer-level defaults.
  const selStyle = hasRangeSelection
    ? getSelectionStyle(textObj, textSelection!.start, textSelection!.end)
    : null

  // Helpers that return the effective value for span-selectable fields.
  // Returns `undefined` when mixed (only possible in span-selection mode).
  function effectiveFontFamily(): string | undefined {
    return hasRangeSelection ? selStyle!.fontFamily : textObj.fontFamily
  }

  function effectiveFontSize(): number | undefined {
    return hasRangeSelection ? selStyle!.fontSize : textObj.fontSize
  }

  function effectiveFontStyle(): FontStyle | undefined {
    return hasRangeSelection ? selStyle!.fontStyle : textObj.fontStyle
  }

  function effectiveFill(): string | undefined {
    return hasRangeSelection ? selStyle!.fill : textObj.fill
  }

  function effectiveLetterSpacing(): number | undefined {
    return hasRangeSelection ? selStyle!.letterSpacing : textObj.letterSpacing
  }

  // Apply a style change for a span-selectable field.
  function applySpanField(style: { fontFamily?: string; fontSize?: number; fontStyle?: FontStyle; fill?: string; letterSpacing?: number }): void {
    if (hasRangeSelection) {
      // Span-range mode: only update spans, do NOT touch layer defaults.
      const newSpans = applyStyleToRange(textObj, textSelection!.start, textSelection!.end, style)
      onCommit(selectedId, { spans: newSpans } as Partial<TextObject>)
    } else {
      // Whole-layer mode: update both layer default and all spans.
      const newSpans = applyStyleToAll(textObj, style)
      onCommit(selectedId, { ...style, spans: newSpans } as Partial<TextObject>)
    }
  }

  // Toggle bold/italic, accounting for mixed state when hasRangeSelection.
  function toggleFontStyleBit(bit: 'bold' | 'italic'): void {
    const current = effectiveFontStyle()
    // When mixed, treat as "not active" — so toggling adds the bit.
    const hasBold = current !== undefined && current.includes('bold')
    const hasItalic = current !== undefined && current.includes('italic')

    let next: FontStyle
    if (bit === 'bold') {
      next = hasBold
        ? (hasItalic ? 'italic' : 'normal')
        : (hasItalic ? 'bold italic' : 'bold')
    } else {
      next = hasItalic
        ? (hasBold ? 'bold' : 'normal')
        : (hasBold ? 'bold italic' : 'italic')
    }
    applySpanField({ fontStyle: next })
  }

  const currentFontFamily = effectiveFontFamily()
  const currentFontSize = effectiveFontSize()
  const currentFontStyle = effectiveFontStyle()
  const currentFill = effectiveFill()
  const currentLetterSpacing = effectiveLetterSpacing()

  // Bold/italic active state — false when mixed (undefined).
  const boldActive = currentFontStyle !== undefined && currentFontStyle.includes('bold')
  const italicActive = currentFontStyle !== undefined && currentFontStyle.includes('italic')

  return (
    <div style={{ padding: '12px 12px 0' }}>
      {/* Transform fields — always layer-level */}
      <NumberField label="X" value={textObj.x} onChange={(val) => onCommit(selectedId, { x: val } as Partial<TextObject>)} />
      <NumberField label="Y" value={textObj.y} onChange={(val) => onCommit(selectedId, { y: val } as Partial<TextObject>)} />
      <NumberField label="Width" value={textObj.width} min={1} onChange={(val) => onCommit(selectedId, { width: val } as Partial<TextObject>)} />
      <NumberField label="Rotation" value={textObj.rotation} onChange={(val) => onCommit(selectedId, { rotation: val } as Partial<TextObject>)} />
      <NumberField label="Opacity" value={textObj.opacity} step={0.01} min={0} max={1} onChange={(val) => onCommit(selectedId, { opacity: val } as Partial<TextObject>)} />

      {/* Inline edit mode banner / hint */}
      {isInEditMode ? (
        <div
          style={{
            background: 'rgba(0,170,255,0.12)',
            border: '1px solid #0af',
            borderRadius: 4,
            padding: '5px 8px',
            marginTop: 10,
            marginBottom: 4,
            color: '#0af',
            fontSize: 11,
          }}
        >
          {hasRangeSelection
            ? `Editing selection (chars ${textSelection!.start}–${textSelection!.end})`
            : 'Text edit mode — select characters to style them'}
        </div>
      ) : (
        <div
          style={{
            color: '#555',
            fontSize: 12,
            marginTop: 10,
            marginBottom: 4,
            fontStyle: 'italic',
          }}
        >
          Double-click the text layer on the canvas to edit content.
        </div>
      )}

      {/* Font family */}
      <div style={{ ...sectionLabelStyle }}>Font</div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
        <label style={{ color: '#aaa', fontSize: 12, width: 64, flexShrink: 0 }}>Family</label>
        <select
          value={currentFontFamily ?? ''}
          onChange={(e) => {
            if (e.target.value !== '') applySpanField({ fontFamily: e.target.value })
          }}
          style={{
            flex: 1,
            background: '#1a1a1a',
            border: '1px solid #444',
            borderRadius: 4,
            color: currentFontFamily === undefined ? '#666' : '#fff',
            fontSize: 13,
            padding: '3px 6px',
            outline: 'none',
          }}
        >
          {/* Mixed placeholder option — only shown/selected when value is undefined */}
          {currentFontFamily === undefined && (
            <option value="" disabled>
              —
            </option>
          )}
          {FONT_FAMILIES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Font size */}
      <MixedNumberField
        label="Size"
        value={currentFontSize}
        min={8}
        max={400}
        onChange={(val) => applySpanField({ fontSize: val })}
      />

      {/* Bold / Italic toggle */}
      <div style={{ ...sectionLabelStyle }}>Style</div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        {(['bold', 'italic'] as const).map((bit) => {
          const active = bit === 'bold' ? boldActive : italicActive
          return (
            <button
              key={bit}
              onClick={() => toggleFontStyleBit(bit)}
              style={{
                padding: '3px 10px',
                height: 28,
                background: active ? '#0af' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: bit === 'bold' ? 'bold' : 'normal',
                fontStyle: bit === 'italic' ? 'italic' : 'normal',
              }}
            >
              {bit === 'bold' ? 'B' : 'I'}
            </button>
          )
        })}
      </div>

      {/* Alignment — always layer-level */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        {(['left', 'center', 'right'] as const).map((a) => (
          <button
            key={a}
            onClick={() => onCommit(selectedId, { align: a } as Partial<TextObject>)}
            style={{
              padding: '3px 10px',
              height: 28,
              flex: 1,
              background: textObj.align === a ? '#0af' : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            {a === 'left' ? '←' : a === 'center' ? '↔' : '→'}
          </button>
        ))}
      </div>

      {/* Fill color */}
      <div style={{ ...sectionLabelStyle }}>Color</div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
        <label style={{ color: '#aaa', fontSize: 12, width: 64, flexShrink: 0 }}>Fill</label>
        <div style={{ flex: 1 }}>
          <MixedColorInput
            value={currentFill}
            onChange={(color) => applySpanField({ fill: color })}
          />
        </div>
      </div>

      {/* Spacing */}
      <div style={{ ...sectionLabelStyle }}>Spacing</div>
      <MixedNumberField
        label="Letter Sp."
        value={currentLetterSpacing}
        step={0.5}
        onChange={(val) => applySpanField({ letterSpacing: val })}
      />
      {/* Line height is always layer-level */}
      <NumberField
        label="Line H."
        value={textObj.lineHeight}
        step={0.1}
        min={0.5}
        max={4}
        onChange={(val) => onCommit(selectedId, { lineHeight: val } as Partial<TextObject>)}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// PropertiesPanel (root export)
// ---------------------------------------------------------------------------

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
  const textEditingId = useCanvasStore((s) => s.textEditingId)
  const textSelection = useCanvasStore((s) => s.textSelection)
  const captureTextSelection = useCanvasStore((s) => s.captureTextSelection)

  const { removeBg } = useAI()
  const operations = useAIStore((s) => s.operations)
  const clearOperation = useAIStore((s) => s.clearOperation)

  const selectedObj = selectedId !== null ? objects[selectedId] : null
  const isImage = selectedObj?.type === 'image'
  const isText = selectedObj?.type === 'text'
  const isShape = selectedObj?.type === 'shape'
  const isPath = selectedObj?.type === 'path'
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
    return undefined
  }, [activeBgOp?.status, activeBgOp?.id, clearOperation])

  function patch(partial: Parameters<typeof updateObject>[1]): void {
    if (!selectedId) return
    updateObject(selectedId, partial)
  }

  function handleRemoveBg(): void {
    if (selectedId) void removeBg(selectedId)
  }

  // When a text layer is in inline edit mode, prevent non-input mouse clicks in this
  // panel from stealing focus away from the contenteditable. Buttons, toggles, color
  // swatches, and label clicks all go through here. Actual <input> and <select> elements
  // are exempt so they can still receive keyboard focus when needed (e.g. font-size field).
  function handlePanelMouseDown(e: React.MouseEvent): void {
    if (!textEditingId) return
    // Snapshot the live browser selection NOW — before focus can move away
    // from the contenteditable (either via preventDefault below or by focusing an input).
    captureTextSelection?.()
    const target = e.target as HTMLElement
    const needsKeyboardFocus =
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement ||
      target instanceof HTMLTextAreaElement
    if (!needsKeyboardFocus) {
      e.preventDefault()
    }
  }

  return (
    <div
      id="properties-panel"
      onMouseDown={handlePanelMouseDown}
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
        {!isMultiSelect && selectedObj !== null && !isImage && !isText && !isShape && !isPath && (
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

        {/* Text object */}
        {!isMultiSelect && selectedObj !== null && isText && selectedId !== null && (
          <TextSection
            textObj={selectedObj as TextObject}
            selectedId={selectedId}
            textEditingId={textEditingId}
            textSelection={textSelection}
            onCommit={commitUpdate}
          />
        )}

        {/* Shape object */}
        {!isMultiSelect && selectedObj !== null && isShape && (() => {
          const shapeObj = selectedObj as ShapeObject
          return (
            <div style={{ padding: '12px 12px 0' }}>
              <div style={sectionLabelStyle}>Transform</div>
              <NumberField label="X" value={Math.round(shapeObj.x)} onChange={(val) => patch({ x: val })} />
              <NumberField label="Y" value={Math.round(shapeObj.y)} onChange={(val) => patch({ y: val })} />
              <NumberField label="Width" value={Math.round(shapeObj.width)} min={1} onChange={(val) => patch({ width: val })} />
              <NumberField label="Height" value={Math.round(shapeObj.height)} min={1} onChange={(val) => patch({ height: val })} />
              <NumberField label="Rotation" value={shapeObj.rotation} onChange={(val) => patch({ rotation: val })} />
              <NumberField label="Opacity" value={shapeObj.opacity} step={0.01} min={0} max={1} onChange={(val) => patch({ opacity: val })} />
              <div style={sectionLabelStyle}>Fill</div>
              <ColorInput value={shapeObj.fill || '#000000'} onChange={(color) => { commitUpdate(shapeObj.id, { fill: color }) }} />
              <div style={sectionLabelStyle}>Stroke</div>
              <ColorInput value={shapeObj.stroke || '#000000'} onChange={(color) => { commitUpdate(shapeObj.id, { stroke: color }) }} />
              <NumberField label="Stroke W." value={shapeObj.strokeWidth} min={0} step={0.5} onChange={(val) => { commitUpdate(shapeObj.id, { strokeWidth: val }) }} />
              {shapeObj.kind === 'rect' && (
                <NumberField label="Corner R." value={shapeObj.cornerRadius ?? 0} min={0} onChange={(val) => { commitUpdate(shapeObj.id, { cornerRadius: val }) }} />
              )}
            </div>
          )
        })()}

        {/* Path object */}
        {!isMultiSelect && selectedObj !== null && isPath && (() => {
          const pathObj = selectedObj as PathObject
          return (
            <div style={{ padding: '12px 12px 0' }}>
              {pathObj.pathEditMode && (
                <div style={{
                  background: 'rgba(68,136,255,0.15)',
                  border: '1px solid #4488ff',
                  borderRadius: 4,
                  padding: '6px 8px',
                  marginBottom: 8,
                  color: '#4488ff',
                  fontSize: 11,
                }}>
                  Path edit mode — drag anchors and handles
                </div>
              )}
              <div style={{ color: '#888', fontSize: 11, marginBottom: 8 }}>
                X: {Math.round(pathObj.x)} · Y: {Math.round(pathObj.y)} · W: {Math.round(pathObj.width)} · H: {Math.round(pathObj.height)}
              </div>
              <div style={sectionLabelStyle}>Opacity</div>
              <NumberField
                label="Opacity"
                value={pathObj.opacity}
                step={0.01}
                min={0}
                max={1}
                onChange={(val) => patch({ opacity: val })}
              />
              <div style={sectionLabelStyle}>Fill</div>
              <ColorInput
                value={pathObj.fill || '#000000'}
                onChange={(color) => { commitUpdate(pathObj.id, { fill: color }) }}
              />
              <div style={sectionLabelStyle}>Stroke</div>
              <ColorInput
                value={pathObj.stroke || '#000000'}
                onChange={(color) => { commitUpdate(pathObj.id, { stroke: color }) }}
              />
              <NumberField
                label="Stroke W."
                value={pathObj.strokeWidth}
                min={0}
                step={0.5}
                onChange={(val) => { commitUpdate(pathObj.id, { strokeWidth: val }) }}
              />
            </div>
          )
        })()}

        {/* Image object */}
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
                  Double-click image to edit content
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
                  const theta = imgObj.rotation * (Math.PI / 180)
                  const cosTheta = Math.cos(theta)
                  const sinTheta = Math.sin(theta)
                  const newFrameX =
                    imgObj.frameX +
                    imgObj.contentOffsetX * cosTheta -
                    imgObj.contentOffsetY * sinTheta
                  const newFrameY =
                    imgObj.frameY +
                    imgObj.contentOffsetX * sinTheta +
                    imgObj.contentOffsetY * cosTheta
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
