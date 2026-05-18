import { create } from 'zustand'
import type { AIOperation } from '@/types/ai'

interface AIStoreState {
  operations: Record<string, AIOperation>
  upsertOperation: (op: AIOperation) => void
  clearOperation: (id: string) => void
}

export const useAIStore = create<AIStoreState>((set) => ({
  operations: {},

  upsertOperation: (op) =>
    set((state) => ({
      operations: { ...state.operations, [op.id]: op },
    })),

  clearOperation: (id) =>
    set((state) => {
      const { [id]: _removed, ...rest } = state.operations
      return { operations: rest }
    }),
}))
