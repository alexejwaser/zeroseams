import React, { useEffect, useRef, useState } from 'react'
import { useCanvasStore, PLATFORM_PRESETS } from '@/canvas/useCanvasStore'
import type { FrameRatio, Platform } from '@/types/project'

interface FrameSettingsPopoverProps {
  onClose: () => void
}

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  threads: 'Threads',
  custom: 'Custom',
}

const PLATFORMS: Platform[] = ['instagram', 'tiktok', 'facebook', 'threads', 'custom']

function segmentButtonStyle(active: boolean): React.CSSProperties {
  return {
    padding: '3px 10px',
    height: 24,
    background: active ? '#0af' : 'transparent',
    color: active ? '#fff' : '#aaa',
    border: 'none',
    borderRadius: 3,
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: active ? 'bold' : 'normal',
    transition: 'background 0.15s, color 0.15s',
    whiteSpace: 'nowrap' as const,
  }
}

const numberInputStyle: React.CSSProperties = {
  width: 56,
  height: 24,
  background: '#333',
  color: '#fff',
  border: '1px solid #444',
  borderRadius: 3,
  fontSize: 12,
  textAlign: 'center',
  padding: '0 4px',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  color: '#aaa',
  fontSize: 11,
  fontWeight: 'bold',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom: 6,
  marginTop: 12,
}

export function FrameSettingsPopover({ onClose }: FrameSettingsPopoverProps): React.ReactElement {
  const platform = useCanvasStore((s) => s.platform)
  const setPlatform = useCanvasStore((s) => s.setPlatform)
  const ratio = useCanvasStore((s) => s.ratio)
  const setRatio = useCanvasStore((s) => s.setRatio)
  const frameWidth = useCanvasStore((s) => s.frameWidth)
  const frameHeight = useCanvasStore((s) => s.frameHeight)
  const backgroundColor = useCanvasStore((s) => s.backgroundColor)
  const setCanvasBackground = useCanvasStore((s) => s.setCanvasBackground)

  const [customW, setCustomW] = useState(frameWidth)
  const [customH, setCustomH] = useState(frameHeight)

  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCustomW(frameWidth)
    setCustomH(frameHeight)
  }, [frameWidth, frameHeight])

  useEffect(() => {
    function handleMouseDown(e: MouseEvent): void {
      if (popoverRef.current != null && !popoverRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => { document.removeEventListener('mousedown', handleMouseDown) }
  }, [onClose])

  function commitCustomDimensions(): void {
    const w = Math.max(100, Math.min(8000, customW))
    const h = Math.max(100, Math.min(8000, customH))
    setCustomW(w)
    setCustomH(h)
    setRatio('custom', w, h)
  }

  function handleCustomKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      commitCustomDimensions()
    }
  }

  const presets = PLATFORM_PRESETS[platform]

  return (
    <div
      ref={popoverRef}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 1000,
        marginTop: 6,
        background: '#1c1c1e',
        border: '1px solid #3a3a3a',
        borderRadius: 8,
        padding: 16,
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        minWidth: 240,
      }}
    >
      <div style={{ ...labelStyle, marginTop: 0 }}>Platform</div>
      <select
        value={platform}
        onChange={(e) => { setPlatform(e.target.value as Platform) }}
        style={{
          width: '100%',
          height: 28,
          background: '#222',
          color: '#aaa',
          border: '1px solid #444',
          borderRadius: 4,
          fontSize: 12,
          padding: '0 6px',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {PLATFORMS.map((p) => (
          <option key={p} value={p}>
            {PLATFORM_LABELS[p]}
          </option>
        ))}
      </select>

      <div style={labelStyle}>Ratio</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          background: '#222',
          borderRadius: 4,
          padding: '2px',
          border: '1px solid #444',
        }}
      >
        {presets.map((preset) => (
          <button
            key={preset.ratio}
            onClick={() => { setRatio(preset.ratio as FrameRatio, preset.width, preset.height) }}
            style={segmentButtonStyle(ratio === preset.ratio)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {platform === 'custom' && (
        <>
          <div style={labelStyle}>Dimensions</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="number"
              min={100}
              max={8000}
              value={customW}
              onChange={(e) => { setCustomW(Number(e.target.value)) }}
              onBlur={commitCustomDimensions}
              onKeyDown={handleCustomKeyDown}
              style={numberInputStyle}
              title="Width"
            />
            <span style={{ color: '#666', fontSize: 12 }}>×</span>
            <input
              type="number"
              min={100}
              max={8000}
              value={customH}
              onChange={(e) => { setCustomH(Number(e.target.value)) }}
              onBlur={commitCustomDimensions}
              onKeyDown={handleCustomKeyDown}
              style={numberInputStyle}
              title="Height"
            />
          </div>
        </>
      )}

      <div style={labelStyle}>Background</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => { setCanvasBackground(e.target.value) }}
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
        <span style={{ color: '#aaa', fontSize: 12, fontFamily: 'monospace' }}>{backgroundColor}</span>
      </div>
    </div>
  )
}
