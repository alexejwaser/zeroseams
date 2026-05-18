import React from 'react'
import { useBackgroundRemoval } from './useBackgroundRemoval'

export function AIProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  useBackgroundRemoval()
  return <>{children}</>
}
