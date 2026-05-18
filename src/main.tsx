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
        alignItems: 'center',
        padding: 24,
        background: '#111',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: '#fff', marginBottom: 16, fontFamily: 'sans-serif' }}>
        Zero Seams
      </h1>
      <CarouselStage />
      <button
        onClick={() => { void handleExport() }}
        style={{
          marginTop: 16,
          padding: '8px 24px',
          background: '#0af',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Export Frames
      </button>
    </div>
  )
}

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
