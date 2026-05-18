import React from 'react'
import { useCanvasStore } from '@/canvas/useCanvasStore'
import type { CanvasObject, CanvasObjectType } from '@/types/canvas'

function typeIcon(type: CanvasObjectType): string {
  switch (type) {
    case 'image': return '🖼'
    case 'text': return 'T'
    case 'shape': return '◻'
    case 'group': return '📦'
  }
}

function typeLabel(type: CanvasObjectType): string {
  switch (type) {
    case 'image': return 'Image'
    case 'text': return 'Text'
    case 'shape': return 'Shape'
    case 'group': return 'Group'
  }
}

export function LayerPanel(): React.ReactElement {
  const objects = useCanvasStore((s) => s.objects)
  const objectOrder = useCanvasStore((s) => s.objectOrder)
  const selectedId = useCanvasStore((s) => s.selectedId)
  const setSelected = useCanvasStore((s) => s.setSelected)
  const updateObject = useCanvasStore((s) => s.updateObject)

  // Reversed: top layer (last in objectOrder) appears first in list
  const reversedOrder = [...objectOrder].reverse()

  function handleRowClick(id: string): void {
    setSelected(id)
  }

  function handleEyeClick(e: React.MouseEvent<HTMLButtonElement>, obj: CanvasObject): void {
    e.stopPropagation()
    updateObject(obj.id, { visible: !obj.visible })
  }

  function getDisplayName(id: string, originalIndex: number): string {
    const obj = objects[id]
    if (!obj) return 'Unknown'
    if (obj.name) return obj.name
    // 1-based index from objectOrder (not reversed)
    return `${typeLabel(obj.type)} ${originalIndex + 1}`
  }

  return (
    <div
      style={{
        width: 240,
        flexShrink: 0,
        height: '100%',
        background: '#2a2a2a',
        borderRight: '1px solid #333',
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
        Layers
      </div>

      {/* Scrollable list */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        {reversedOrder.length === 0 && (
          <div
            style={{
              padding: '16px 12px',
              color: '#555',
              fontSize: 12,
            }}
          >
            No layers yet
          </div>
        )}
        {reversedOrder.map((id) => {
          const obj = objects[id]
          if (!obj) return null
          const originalIndex = objectOrder.indexOf(id)
          const isSelected = selectedId === id

          return (
            <div
              key={id}
              onClick={() => handleRowClick(id)}
              style={{
                height: 32,
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
                background: isSelected ? 'rgba(0,170,255,0.15)' : 'transparent',
                cursor: 'pointer',
                userSelect: 'none',
                gap: 6,
                borderLeft: isSelected ? '2px solid #0af' : '2px solid transparent',
                boxSizing: 'border-box',
              }}
            >
              {/* Type icon */}
              <span
                style={{
                  fontSize: obj.type === 'text' ? 13 : 14,
                  flexShrink: 0,
                  width: 18,
                  textAlign: 'center',
                  color: obj.type === 'text' ? '#0af' : undefined,
                  fontWeight: obj.type === 'text' ? 'bold' : 'normal',
                }}
              >
                {typeIcon(obj.type)}
              </span>

              {/* Name */}
              <span
                style={{
                  flex: 1,
                  color: obj.visible ? '#ddd' : '#555',
                  fontSize: 13,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {getDisplayName(id, originalIndex)}
              </span>

              {/* Eye toggle */}
              <button
                onClick={(e) => handleEyeClick(e, obj)}
                title={obj.visible ? 'Hide layer' : 'Show layer'}
                style={{
                  flexShrink: 0,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 2px',
                  fontSize: 14,
                  lineHeight: '1',
                  opacity: 0.7,
                }}
              >
                {obj.visible ? '👁' : '🚫'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
