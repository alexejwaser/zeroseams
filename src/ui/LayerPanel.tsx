import React, { useRef, useState } from 'react'
import { useCanvasStore } from '@/canvas/useCanvasStore'
import { useThumbnailStore } from '@/canvas/useThumbnailStore'
import type { CanvasObject, CanvasObjectType, ImageObject } from '@/types/canvas'
import Tooltip from './Tooltip'

function typeLabel(type: CanvasObjectType): string {
  switch (type) {
    case 'image': return 'Image'
    case 'text': return 'Text'
    case 'shape': return 'Shape'
    case 'group': return 'Group'
    case 'path': return 'Path'
  }
}

export function LayerPanel(): React.ReactElement {
  const objects = useCanvasStore((s) => s.objects)
  const objectOrder = useCanvasStore((s) => s.objectOrder)
  const selectedId = useCanvasStore((s) => s.selectedId)
  const selectedIds = useCanvasStore((s) => s.selectedIds)
  const anchorId = useCanvasStore((s) => s.anchorId)
  const setSelected = useCanvasStore((s) => s.setSelected)
  const addToSelection = useCanvasStore((s) => s.addToSelection)
  const setAnchor = useCanvasStore((s) => s.setAnchor)
  const updateObject = useCanvasStore((s) => s.updateObject)
  const reorderObjects = useCanvasStore((s) => s.reorderObjects)
  const toggleLock = useCanvasStore((s) => s.toggleLock)
  const enterMaskEditMode = useCanvasStore((s) => s.enterMaskEditMode)

  const thumbnails = useThumbnailStore((s) => s.thumbnails)

  const dragId = useRef<string | null>(null)
  const [dropPos, setDropPos] = useState<{ id: string; side: 'before' | 'after' } | null>(null)

  // Reversed: top layer (last in objectOrder) appears first in list
  const reversedOrder = [...objectOrder].reverse()

  function handleRowClick(e: React.MouseEvent<HTMLDivElement>, id: string): void {
    if (e.shiftKey) {
      e.stopPropagation()
      addToSelection(id)
    } else {
      setSelected(id)
    }
  }

  function handleEyeClick(e: React.MouseEvent<HTMLButtonElement>, obj: CanvasObject): void {
    e.stopPropagation()
    updateObject(obj.id, { visible: !obj.visible })
  }

  function handleLockClick(e: React.MouseEvent<HTMLButtonElement>, id: string): void {
    e.stopPropagation()
    toggleLock(id)
  }

  function getDisplayName(id: string, originalIndex: number): string {
    const obj = objects[id]
    if (!obj) return 'Unknown'
    if (obj.name) return obj.name
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
          const isSelected = selectedIds.includes(id) || selectedId === id
          const isAnchor = anchorId === id
          const isDropBefore = dropPos?.id === id && dropPos.side === 'before'
          const isDropAfter = dropPos?.id === id && dropPos.side === 'after'
          const canBeAnchor = selectedIds.length > 1 && selectedIds.includes(id)

          return (
            <div
              key={id}
              draggable={true}
              onClick={(e) => handleRowClick(e, id)}
              onDragStart={(e) => {
                dragId.current = id
                e.dataTransfer.setData('text/plain', id)
                e.dataTransfer.effectAllowed = 'move'
              }}
              onDragOver={(e) => {
                e.preventDefault()
                e.dataTransfer.dropEffect = 'move'
                const rect = e.currentTarget.getBoundingClientRect()
                const side = e.clientY < rect.top + rect.height / 2 ? 'before' : 'after'
                setDropPos({ id, side })
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropPos(null)
              }}
              onDrop={(e) => {
                e.preventDefault()
                const fromId = dragId.current ?? e.dataTransfer.getData('text/plain')
                const side = dropPos?.id === id ? dropPos.side : 'before'
                if (fromId && fromId !== id) reorderObjects(fromId, id, side)
                dragId.current = null
                setDropPos(null)
              }}
              onDragEnd={() => { dragId.current = null; setDropPos(null) }}
              style={{
                height: 48,
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
                background: isSelected ? 'rgba(0,170,255,0.15)' : 'transparent',
                cursor: 'pointer',
                userSelect: 'none',
                gap: 6,
                borderLeft: isAnchor ? '3px solid #f5a623' : isSelected ? '2px solid #0af' : '2px solid transparent',
                borderTop: isDropBefore ? '2px solid #0af' : '2px solid transparent',
                borderBottom: isDropAfter ? '2px solid #0af' : '2px solid transparent',
                boxSizing: 'border-box',
              }}
            >
              {/* Thumbnail(s) — dual if image has a mask */}
              {obj.type === 'image' && (obj as ImageObject).mask != null ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                  {/* Image thumbnail */}
                  <div
                    onClick={(e) => { e.stopPropagation(); setSelected(id) }}
                    style={{
                      width: 30, height: 30, borderRadius: 3, overflow: 'hidden',
                      background: '#111', border: '1px solid #3a3a3a', cursor: 'pointer', flexShrink: 0,
                    }}
                  >
                    {thumbnails[id] != null ? (
                      <img src={thumbnails[id]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt="" draggable={false} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#222' }} />
                    )}
                  </div>
                  <span style={{ color: '#555', fontSize: 10, flexShrink: 0 }}>⛓</span>
                  {/* Mask thumbnail */}
                  <div
                    onClick={(e) => { e.stopPropagation(); enterMaskEditMode(id) }}
                    title="Click to edit mask"
                    style={{
                      width: 30, height: 30, borderRadius: 3, overflow: 'hidden',
                      background: '#000', border: '1px solid #3a3a3a', cursor: 'pointer', flexShrink: 0,
                    }}
                  >
                    {thumbnails[`${id}__mask`] != null ? (
                      <img src={thumbnails[`${id}__mask`]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt="mask" draggable={false} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#111' }} />
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: 44, height: 44, flexShrink: 0, borderRadius: 3,
                    overflow: 'hidden', background: '#111', border: '1px solid #3a3a3a',
                  }}
                >
                  {thumbnails[id] != null ? (
                    <img src={thumbnails[id]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt="" draggable={false} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#222' }} />
                  )}
                </div>
              )}

              {/* Name */}
              <span
                style={{
                  flex: 1,
                  color: obj.visible ? '#ddd' : '#555',
                  fontSize: 13,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {getDisplayName(id, originalIndex)}
              </span>

              {/* Anchor button — visible only in multi-select mode */}
              {canBeAnchor && (
                <Tooltip label="Set as reference">
                  <button
                    draggable={false}
                    onClick={(e) => {
                      e.stopPropagation()
                      setAnchor(isAnchor ? null : id)
                    }}
                    style={{
                      flexShrink: 0,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0 2px',
                      fontSize: 12,
                      lineHeight: '1',
                      color: isAnchor ? '#f5a623' : '#666',
                    }}
                  >
                    ★
                  </button>
                </Tooltip>
              )}

              {/* Lock toggle */}
              <Tooltip label={obj.locked ? 'Unlock' : 'Lock'}>
                <button
                  draggable={false}
                  onClick={(e) => handleLockClick(e, id)}
                  style={{
                    flexShrink: 0,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 2px',
                    fontSize: 13,
                    lineHeight: '1',
                    opacity: obj.locked ? 1 : 0.3,
                  }}
                >
                  {obj.locked ? '🔒' : '🔓'}
                </button>
              </Tooltip>

              {/* Eye toggle */}
              <Tooltip label={obj.visible ? 'Hide layer' : 'Show layer'}>
                <button
                  draggable={false}
                  onClick={(e) => handleEyeClick(e, obj)}
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
              </Tooltip>
            </div>
          )
        })}
      </div>
    </div>
  )
}
