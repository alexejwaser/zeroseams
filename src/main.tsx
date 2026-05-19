import React from 'react'
import ReactDOM from 'react-dom/client'
import { CarouselStage } from '@/canvas'
import { Toolbar, LayerPanel, PropertiesPanel, ContextMenu } from '@/ui'
import { AIProvider } from '@/ai'

function App(): React.ReactElement {
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
        </div>

        <PropertiesPanel />
      </div>

      {/* Portal-based context menu — renders to document.body */}
      <ContextMenu />
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
