import React from 'react'
import { useBackgroundRemoval } from './useBackgroundRemoval'
import { AIContext } from './AIContext'

export function AIProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const { removeBg, getOperation } = useBackgroundRemoval()
  return (
    <AIContext.Provider value={{ removeBg, getOperation }}>
      {children}
    </AIContext.Provider>
  )
}
