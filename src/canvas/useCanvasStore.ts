import { create } from 'zustand'
import type { CanvasObject } from '@/types/canvas'

type HistorySnapshot = Pick<CanvasState, 'objects' | 'objectOrder'>

const MAX_HISTORY = 50

interface CanvasState {
  objects: Record<string, CanvasObject>
  objectOrder: string[] // render order bottom→top
  selectedId: string | null
  frameCount: number
  past: HistorySnapshot[]
  future: HistorySnapshot[]
  // actions
  addObject: (obj: CanvasObject) => void
  updateObject: (id: string, patch: Partial<CanvasObject>) => void
  commitUpdate: (id: string, patch: Partial<CanvasObject>) => void
  removeObject: (id: string) => void
  setSelected: (id: string | null) => void
  setFrameCount: (n: number) => void
  reorderObjects: (fromId: string, toId: string, side: 'before' | 'after') => void
  undo: () => void
  redo: () => void
}

export const useCanvasStore = create<CanvasState>((set, get) => {
  function pushHistory(): HistorySnapshot[] {
    const { objects, objectOrder, past } = get()
    const snapshot: HistorySnapshot = { objects, objectOrder }
    const trimmed = past.length >= MAX_HISTORY ? past.slice(past.length - MAX_HISTORY + 1) : past
    return [...trimmed, snapshot]
  }

  return {
    objects: {},
    objectOrder: [],
    selectedId: null,
    frameCount: 2,
    past: [],
    future: [],

    addObject: (obj) =>
      set((state) => ({
        past: pushHistory(),
        future: [],
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

    commitUpdate: (id, patch) =>
      set((state) => {
        const existing = state.objects[id]
        if (!existing) return state
        return {
          past: pushHistory(),
          future: [],
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
          past: pushHistory(),
          future: [],
          objects: rest,
          objectOrder: state.objectOrder.filter((oid) => oid !== id),
          selectedId: state.selectedId === id ? null : state.selectedId,
        }
      }),

    setSelected: (id) => set({ selectedId: id }),

    setFrameCount: (n) => set({ frameCount: Math.max(1, Math.min(10, n)) }),

    reorderObjects: (fromId, toId, side) =>
      set((state) => {
        const order = [...state.objectOrder]
        const fromIndex = order.indexOf(fromId)
        if (fromIndex === -1) return state
        order.splice(fromIndex, 1)
        const toIndex = order.indexOf(toId)
        if (toIndex === -1) return state
        // Panel is reversed from objectOrder, so:
        // 'before' in panel (insert above target visually) = insert AFTER toId in objectOrder
        // 'after' in panel (insert below target visually) = insert BEFORE toId in objectOrder
        const insertAt = side === 'before' ? toIndex + 1 : toIndex
        order.splice(insertAt, 0, fromId)
        return { objectOrder: order }
      }),

    undo: () =>
      set((state) => {
        if (state.past.length === 0) return state
        const previous = state.past[state.past.length - 1]
        const newPast = state.past.slice(0, state.past.length - 1)
        const currentSnapshot: HistorySnapshot = {
          objects: state.objects,
          objectOrder: state.objectOrder,
        }
        return {
          past: newPast,
          future: [currentSnapshot, ...state.future],
          objects: previous.objects,
          objectOrder: previous.objectOrder,
        }
      }),

    redo: () =>
      set((state) => {
        if (state.future.length === 0) return state
        const next = state.future[0]
        const newFuture = state.future.slice(1)
        const currentSnapshot: HistorySnapshot = {
          objects: state.objects,
          objectOrder: state.objectOrder,
        }
        return {
          past: [...state.past, currentSnapshot],
          future: newFuture,
          objects: next.objects,
          objectOrder: next.objectOrder,
        }
      }),
  }
})
