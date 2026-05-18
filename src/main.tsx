import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  CarouselStage,
  exportFrames,
  downloadFrames,
  getStageInstance,
  useCanvasStore,
  FRAME_WIDTH,
  FRAME_HEIGHT,
} from '@/canvas'
import { Toolbar, LayerPanel, PropertiesPanel } from '@/ui'
import { AIProvider } from '@/ai'

function App(): React.ReactElement {
  const frameCount = useCanvasStore((s) => s.frameCount)

  async function handleExport(): Promise<void> {
    try {
      const stage = getStageInstance()
      if (!stage) return
      const blobs = await exportFrames(stage, frameCount, FRAME_WIDTH, FRAME_HEIGHT)
      await downloadFrames(blobs)
    } catch (err) {
      console.error('[export] failed:', err)
      alert(`Export failed: ${String(err)}`)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#1a1a1a',
        fontFamily: 'system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Top toolbar */}
      <Toolbar />

      {/* Middle row: sidebar + canvas + properties */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <LayerPanel />

        {/* Canvas area */}
        <div
          style={{
            flex: 1,
            overflowX: 'auto',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: 24,
            background: '#111',
            boxSizing: 'border-box',
          }}
        >
          <CarouselStage />
          <button
            onClick={() => { void handleExport() }}
            style={{
              marginTop: 16,
              padding: '8px 24px',
              background: '#0af',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            Export Frames
          </button>
        </div>

        <PropertiesPanel />
      </div>
    </div>
  )
}

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <AIProvider>
      <App />
    </AIProvider>
  </React.StrictMode>,
)
