import { createContext, useContext } from 'react'
import type { BackgroundRemovalOperation } from '@/types/ai'

interface AIContextValue {
  removeBg: (targetObjectId: string) => Promise<void>
  getOperation: (targetObjectId: string) => BackgroundRemovalOperation | undefined
}

export const AIContext = createContext<AIContextValue | null>(null)

export function useAI(): AIContextValue {
  const ctx = useContext(AIContext)
  if (!ctx) throw new Error('useAI must be used inside AIProvider')
  return ctx
}
