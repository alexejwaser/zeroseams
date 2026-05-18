import { create } from 'zustand'
import type { CanvasObject } from '@/types/canvas'

interface CanvasState {
  objects: Record<string, CanvasObject>
  objectOrder: string[] // render order bottom→top
  selectedId: string | null
  frameCount: number
  // actions
  addObject: (obj: CanvasObject) => void
  updateObject: (id: string, patch: Partial<CanvasObject>) => void
  removeObject: (id: string) => void
  setSelected: (id: string | null) => void
}

export const useCanvasStore = create<CanvasState>((set) => ({
  objects: {},
  objectOrder: [],
  selectedId: null,
  frameCount: 2,

  addObject: (obj) =>
    set((state) => ({
      objects: { ...state.objects, [obj.id]: obj },
      objectOrder: [...state.objectOrder, obj.id],
    })),

  updateObject: (id, patch) =>
    set((state) => {
      const existing = state.objects[id]
      if (!existing) return state
      return {
        objects: {
          ...state.objects,
          [id]: { ...existing, ...patch } as CanvasObject,
        },
      }
    }),

  removeObject: (id) =>
    set((state) => {
      const { [id]: _removed, ...rest } = state.objects
      return {
        objects: rest,
        objectOrder: state.objectOrder.filter((oid) => oid !== id),
        selectedId: state.selectedId === id ? null : state.selectedId,
      }
    }),

  setSelected: (id) => set({ selectedId: id }),
}))
