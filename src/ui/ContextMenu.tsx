import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useCanvasStore } from '@/canvas/useCanvasStore'

interface MenuItemProps {
  label: string
  kbd?: string
  disabled?: boolean
  onClick: () => void
}

function MenuItem({ label, kbd, disabled = false, onClick }: MenuItemProps): React.ReactElement {
  const [hovered, setHovered] = useState(false)

  function handleClick(): void {
    if (disabled) return
    onClick()
  }

  return (
    <div
      role="menuitem"
      onClick={handleClick}
      onMouseEnter={() => { if (!disabled) setHovered(true) }}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 14px',
        fontSize: 13,
        color: disabled ? '#555' : '#e0e0e0',
        cursor: disabled ? 'default' : 'pointer',
        background: hovered && !disabled ? '#2a2a2a' : 'transparent',
        userSelect: 'none',
      }}
    >
      <span>{label}</span>
      {kbd != null && (
        <span
          style={{
            fontSize: 11,
            color: '#666',
            marginLeft: 24,
          }}
        >
          {kbd}
        </span>
      )}
    </div>
  )
}

function Divider(): React.ReactElement {
  return (
    <div
      style={{
        height: 1,
        background: '#333',
        margin: '4px 0',
      }}
    />
  )
}

export function ContextMenu(): React.ReactElement | null {
  const contextMenu = useCanvasStore((s) => s.contextMenu)
  const setContextMenu = useCanvasStore((s) => s.setContextMenu)
  const objects = useCanvasStore((s) => s.objects)
  const frameCount = useCanvasStore((s) => s.frameCount)
  const duplicateObject = useCanvasStore((s) => s.duplicateObject)
  const bringToFront = useCanvasStore((s) => s.bringToFront)
  const bringForward = useCanvasStore((s) => s.bringForward)
  const sendBackward = useCanvasStore((s) => s.sendBackward)
  const sendToBack = useCanvasStore((s) => s.sendToBack)
  const toggleLock = useCanvasStore((s) => s.toggleLock)
  const removeObject = useCanvasStore((s) => s.removeObject)
  const setFrameCount = useCanvasStore((s) => s.setFrameCount)

  const menuRef = useRef<HTMLDivElement>(null)
  const [clampedPos, setClampedPos] = useState<{ left: number; top: number } | null>(null)

  // Clamp position to viewport after mount
  useLayoutEffect(() => {
    if (contextMenu == null || menuRef.current == null) {
      setClampedPos(null)
      return
    }
    const { clientWidth, clientHeight } = menuRef.current
    const vw = window.innerWidth
    const vh = window.innerHeight
    const left = Math.min(contextMenu.x, vw - clientWidth - 4)
    const top = Math.min(contextMenu.y, vh - clientHeight - 4)
    setClampedPos({ left: Math.max(0, left), top: Math.max(0, top) })
  }, [contextMenu])

  // Dismiss on outside mousedown
  useEffect(() => {
    if (contextMenu == null) return

    function handleMouseDown(e: MouseEvent): void {
      if (menuRef.current != null && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null)
      }
    }

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        setContextMenu(null)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [contextMenu, setContextMenu])

  if (contextMenu == null) return null

  const { targetId } = contextMenu

  // Use the clamped position once available, otherwise use the raw position
  // (the menu renders at raw position on first paint, then snaps — imperceptible)
  const left = clampedPos != null ? clampedPos.left : contextMenu.x
  const top = clampedPos != null ? clampedPos.top : contextMenu.y

  function dismiss(): void {
    setContextMenu(null)
  }

  const content = (
    <div
      ref={menuRef}
      role="menu"
      style={{
        position: 'fixed',
        left,
        top,
        background: '#1e1e1e',
        border: '1px solid #3a3a3a',
        borderRadius: 8,
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        padding: '4px 0',
        minWidth: 200,
        zIndex: 9999,
      }}
    >
      {targetId != null ? (
        (() => {
          const obj = objects[targetId]
          const locked = obj?.locked ?? false
          return (
            <>
              <MenuItem
                label="Duplicate"
                kbd="⌘D"
                disabled={locked}
                onClick={() => { duplicateObject(targetId); dismiss() }}
              />
              <Divider />
              <MenuItem
                label="Bring to Front"
                kbd="⌘⇧]"
                disabled={locked}
                onClick={() => { bringToFront(targetId); dismiss() }}
              />
              <MenuItem
                label="Bring Forward"
                kbd="⌘]"
                disabled={locked}
                onClick={() => { bringForward(targetId); dismiss() }}
              />
              <MenuItem
                label="Send Backward"
                kbd="⌘["
                disabled={locked}
                onClick={() => { sendBackward(targetId); dismiss() }}
              />
              <MenuItem
                label="Send to Back"
                kbd="⌘⇧["
                disabled={locked}
                onClick={() => { sendToBack(targetId); dismiss() }}
              />
              <Divider />
              <MenuItem
                label={locked ? 'Unlock' : 'Lock'}
                kbd="⌘L"
                onClick={() => { toggleLock(targetId); dismiss() }}
              />
              <MenuItem
                label="Delete"
                kbd="⌫"
                onClick={() => { removeObject(targetId); dismiss() }}
              />
            </>
          )
        })()
      ) : (
        <>
          <MenuItem
            label="Add Frame"
            disabled={frameCount >= 10}
            onClick={() => { setFrameCount(frameCount + 1); dismiss() }}
          />
          <MenuItem
            label="Remove Frame"
            disabled={frameCount <= 1}
            onClick={() => { setFrameCount(frameCount - 1); dismiss() }}
          />
        </>
      )}
    </div>
  )

  return ReactDOM.createPortal(content, document.body)
}
