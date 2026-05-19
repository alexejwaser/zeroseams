import React, { useEffect, useRef, useState } from 'react'
import { useCanvasStore } from '@/canvas/useCanvasStore'
import { FRAME_WIDTH } from '@/canvas/constants'
import { getStageInstance } from '@/canvas/CarouselStage'
import { exportFrames, downloadFrames } from '@/canvas/exportFrames'
import { useSaveStatusStore, type SaveStatus } from './useSaveStatusStore'
import type { FrameRatio } from '@/types/project'
import type { CarouselProject } from '@/types/project'
import type { ShapeKind } from '@/types/canvas'

type ActiveTool = 'select' | 'text' | 'shape' | 'pen'

const TOOL_LABELS: Record<ActiveTool, string> = {
  select: 'Select',
  text: 'Text',
  shape: 'Shape',
  pen: 'Pen',
}

const TOOLS: ActiveTool[] = ['select', 'text', 'shape', 'pen']

// Pen icon SVG for Pen tool button
const PEN_ICON = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
    <path d="M9 1L11 3L4 10L1 11L2 8L9 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
)

const RATIO_LABELS: Record<FrameRatio, string> = {
  square: '1:1',
  portrait: '4:5',
}

const RATIOS: FrameRatio[] = ['square', 'portrait']

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
  const activeTool = useCanvasStore((s) => s.activeTool)
  const setActiveTool = useCanvasStore((s) => s.setActiveTool)
  const frameCount = useCanvasStore((s) => s.frameCount)
  const setFrameCount = useCanvasStore((s) => s.setFrameCount)
  const past = useCanvasStore((s) => s.past)
  const future = useCanvasStore((s) => s.future)
  const undo = useCanvasStore((s) => s.undo)
  const redo = useCanvasStore((s) => s.redo)
  const saveStatus = useSaveStatusStore((s) => s.status)
  const ratio = useCanvasStore((s) => s.ratio)
  const setRatio = useCanvasStore((s) => s.setRatio)
  const frameHeight = useCanvasStore((s) => s.frameHeight)
  const loadProject = useCanvasStore((s) => s.loadProject)
  const activeShapeKind = useCanvasStore((s) => s.activeShapeKind)
  const setActiveShapeKind = useCanvasStore((s) => s.setActiveShapeKind)
  const setProjectMeta = useSaveStatusStore((s) => s.setProjectMeta)
  const projectName = useSaveStatusStore((s) => s.projectName)

  const [exportOpen, setExportOpen] = useState(false)
  const [exportMode, setExportMode] = useState<'all' | 'single' | 'range'>('all')
  const [exportSingle, setExportSingle] = useState(1)
  const [exportFrom, setExportFrom] = useState(1)
  const [exportTo, setExportTo] = useState(frameCount)
  const [exporting, setExporting] = useState(false)
  const [recentOpen, setRecentOpen] = useState(false)
  const [recentFiles, setRecentFiles] = useState<Array<{ name: string; path: string; modifiedAt: string }>>([])
  const [loadingProject, setLoadingProject] = useState(false)

  const exportWrapperRef = useRef<HTMLDivElement>(null)
  const recentWrapperRef = useRef<HTMLDivElement>(null)

  // Keep exportTo in sync when frameCount changes
  useEffect(() => {
    setExportTo(frameCount)
  }, [frameCount])

  // Dismiss export panel on outside click
  useEffect(() => {
    if (!exportOpen) return

    function handleMouseDown(e: MouseEvent): void {
      if (exportWrapperRef.current != null && !exportWrapperRef.current.contains(e.target as Node)) {
        setExportOpen(false)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => { document.removeEventListener('mousedown', handleMouseDown) }
  }, [exportOpen])

  // Dismiss recent panel on outside click
  useEffect(() => {
    if (!recentOpen) return
    function handleMouseDown(e: MouseEvent): void {
      if (recentWrapperRef.current != null && !recentWrapperRef.current.contains(e.target as Node)) {
        setRecentOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => { document.removeEventListener('mousedown', handleMouseDown) }
  }, [recentOpen])

  async function handleExportAction(): Promise<void> {
    const stage = getStageInstance()
    if (!stage) return

    let start: number
    let end: number

    if (exportMode === 'all') {
      start = 0
      end = frameCount - 1
    } else if (exportMode === 'single') {
      start = exportSingle - 1
      end = exportSingle - 1
    } else {
      start = exportFrom - 1
      end = exportTo - 1
    }

    setExporting(true)
    try {
      const blobs = await exportFrames(stage, frameCount, FRAME_WIDTH, frameHeight, start, end)
      await downloadFrames(blobs)
    } catch (err) {
      console.error('[export] failed:', err)
      alert(`Export failed: ${String(err)}`)
    } finally {
      setExporting(false)
      setExportOpen(false)
    }
  }

  async function handleOpen(): Promise<void> {
    setLoadingProject(true)
    try {
      const result = await window.electronAPI.openProject()
      if (!result.success || result.json == null) return
      const project = JSON.parse(result.json) as CarouselProject
      loadProject(project)
      const filename = project.name.toLowerCase().replace(/\s+/g, '-')
      setProjectMeta(project.id, project.name, filename, project.createdAt)
    } catch (err) {
      console.error('[open]', err)
    } finally {
      setLoadingProject(false)
      setRecentOpen(false)
    }
  }

  async function handleRecentToggle(): Promise<void> {
    if (!recentOpen) {
      const result = await window.electronAPI.listRecentProjects()
      setRecentFiles(result.files)
    }
    setRecentOpen((v) => !v)
  }

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

  const segmentButtonStyle = (active: boolean): React.CSSProperties => ({
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
  })

  const numberInputStyle: React.CSSProperties = {
    width: 48,
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
        {`Zero Seams${projectName !== 'Untitled Project' ? ` — ${projectName}` : ''}`}
      </div>

      {/* Open button + recent projects */}
      <div ref={recentWrapperRef} style={{ position: 'relative', display: 'flex', marginLeft: 12, flex: '0 0 auto' }}>
        <button
          onClick={() => { void handleOpen() }}
          disabled={loadingProject}
          style={{
            padding: '4px 10px',
            height: 30,
            background: '#333',
            color: loadingProject ? '#777' : '#fff',
            border: 'none',
            borderRadius: '4px 0 0 4px',
            cursor: loadingProject ? 'default' : 'pointer',
            fontSize: 13,
            borderRight: '1px solid #555',
            whiteSpace: 'nowrap' as const,
          }}
        >
          {loadingProject ? 'Opening…' : 'Open'}
        </button>
        <button
          onClick={() => { void handleRecentToggle() }}
          style={{
            padding: '4px 6px',
            height: 30,
            background: recentOpen ? '#555' : '#333',
            color: '#aaa',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer',
            fontSize: 11,
          }}
          title="Recent projects"
        >
          ▾
        </button>

        {recentOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              zIndex: 1000,
              marginTop: 6,
              background: '#1e1e1e',
              border: '1px solid #3a3a3a',
              borderRadius: 8,
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
              padding: '4px 0',
              minWidth: 260,
            }}
          >
            {recentFiles.length === 0 ? (
              <div style={{ padding: '8px 14px', color: '#555', fontSize: 12 }}>No recent projects</div>
            ) : (
              recentFiles.map((file) => (
                <div
                  key={file.path}
                  title={file.path}
                  onClick={() => { void handleOpen() }}
                  style={{
                    padding: '7px 14px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #2a2a2a',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#2a2a2a' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
                >
                  <div style={{ color: '#e0e0e0', fontSize: 13, fontWeight: 'bold' }}>{file.name}</div>
                  <div style={{ color: '#666', fontSize: 11 }}>
                    {new Date(file.modifiedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
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
              display: 'flex',
              alignItems: 'center',
              gap: tool === 'pen' ? 5 : 0,
            }}
          >
            {tool === 'pen' && PEN_ICON}
            {TOOL_LABELS[tool]}
          </button>
        ))}

        {activeTool === 'shape' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              background: '#222',
              borderRadius: 4,
              padding: '2px',
              border: '1px solid #444',
              marginLeft: 4,
            }}
          >
            {(['rect', 'ellipse', 'line'] as ShapeKind[]).map((kind) => (
              <button
                key={kind}
                onClick={() => { setActiveShapeKind(kind) }}
                title={kind}
                style={segmentButtonStyle(activeShapeKind === kind)}
              >
                {kind === 'rect' ? '▭' : kind === 'ellipse' ? '⬭' : '╱'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: ratio toggle + frame count control + export + save status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          paddingRight: 16,
          flex: '0 0 auto',
        }}
      >
        {/* Ratio toggle */}
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
          {RATIOS.map((r) => (
            <button
              key={r}
              onClick={() => setRatio(r)}
              title={r === 'square' ? 'Square (1080×1080)' : 'Portrait (1080×1350)'}
              style={{
                padding: '3px 10px',
                height: 24,
                background: ratio === r ? '#0af' : 'transparent',
                color: ratio === r ? '#fff' : '#aaa',
                border: 'none',
                borderRadius: 3,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: ratio === r ? 'bold' : 'normal',
                transition: 'background 0.15s, color 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {RATIO_LABELS[r]}
            </button>
          ))}
        </div>

        <div style={{ width: 8 }} />

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

        <div style={{ width: 8 }} />

        {/* Export button + panel */}
        <div ref={exportWrapperRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setExportOpen((v) => !v) }}
            style={{
              padding: '4px 14px',
              height: 30,
              background: exportOpen ? '#0af' : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 'normal',
              transition: 'background 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            Export
          </button>

          {exportOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                zIndex: 1000,
                marginTop: 6,
                background: '#1e1e1e',
                border: '1px solid #3a3a3a',
                borderRadius: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                padding: '12px',
                minWidth: 220,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {/* Mode segmented control */}
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
                {(['all', 'single', 'range'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => { setExportMode(mode) }}
                    style={segmentButtonStyle(exportMode === mode)}
                  >
                    {mode === 'all' ? 'All frames' : mode === 'single' ? 'Single' : 'Range'}
                  </button>
                ))}
              </div>

              {/* Mode-specific inputs */}
              {exportMode === 'single' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#aaa', fontSize: 12 }}>Frame</span>
                  <input
                    type="number"
                    min={1}
                    max={frameCount}
                    value={exportSingle}
                    onChange={(e) => {
                      const v = Math.max(1, Math.min(frameCount, Number(e.target.value)))
                      setExportSingle(v)
                    }}
                    style={numberInputStyle}
                  />
                </div>
              )}

              {exportMode === 'range' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#aaa', fontSize: 12 }}>From</span>
                  <input
                    type="number"
                    min={1}
                    max={frameCount}
                    value={exportFrom}
                    onChange={(e) => {
                      const v = Math.max(1, Math.min(frameCount, Number(e.target.value)))
                      setExportFrom(v)
                    }}
                    style={numberInputStyle}
                  />
                  <span style={{ color: '#aaa', fontSize: 12 }}>To</span>
                  <input
                    type="number"
                    min={1}
                    max={frameCount}
                    value={exportTo}
                    onChange={(e) => {
                      const v = Math.max(1, Math.min(frameCount, Number(e.target.value)))
                      setExportTo(v)
                    }}
                    style={numberInputStyle}
                  />
                </div>
              )}

              {/* Export action button */}
              <button
                onClick={() => { void handleExportAction() }}
                disabled={exporting}
                style={{
                  padding: '6px 0',
                  background: exporting ? '#555' : '#0af',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: exporting ? 'default' : 'pointer',
                  fontSize: 13,
                  fontWeight: 'bold',
                  transition: 'background 0.15s',
                }}
              >
                {exporting ? 'Exporting…' : 'Export'}
              </button>
            </div>
          )}
        </div>

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
