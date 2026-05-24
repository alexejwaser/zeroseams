import type React from 'react'

/**
 * Shared icon-button style helper used by Toolbar and PropertiesPanel.
 * Produces a 30×30 dark pill button; active state highlights in #0af.
 */
export function iconBtnStyle(active = false, disabled = false): React.CSSProperties {
  return {
    width: 30,
    height: 30,
    background: active ? '#0af' : '#333',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: disabled ? 'default' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.35 : 1,
    transition: 'background 0.15s',
  }
}
