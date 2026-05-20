import { create } from 'zustand'
import type { CanvasObject, ImageObject, ShapeObject, PathObject, ShapeKind, TextObject } from '@/types/canvas'
import type { Frame, FrameRatio, CarouselProject } from '@/types/project'

type HistorySnapshot = Pick<
  CanvasState,
  'objects' | 'objectOrder' | 'ratio' | 'frameHeight' | 'frames' | 'backgroundColor' | 'frameCount'
>

const MAX_HISTORY = 50

function makeFrames(count: number): Frame[] {
  return Array.from({ length: count }, (_, i) => ({
    index: i,
    label: `Slide ${i + 1}`,
    backgroundColor: null,
  }))
}

function getObjectBBox(obj: CanvasObject): { x: number; y: number; width: number; height: number } {
  if (obj.type === 'image') {
    const img = obj as ImageObject
    return { x: img.frameX, y: img.frameY, width: img.frameWidth, height: img.frameHeight }
  }
  return { x: obj.x, y: obj.y, width: obj.width, height: obj.height }
}

interface CanvasState {
  objects: Record<string, CanvasObject>
  objectOrder: string[]
  selectedId: string | null
  selectedIds: string[]
  frameCount: number
  ratio: FrameRatio
  frameHeight: number
  frames: Frame[]
  backgroundColor: string
  activeTool: 'select' | 'text' | 'shape' | 'pen'
  past: HistorySnapshot[]
  future: HistorySnapshot[]
  // Volatile UI state — NOT in HistorySnapshot
  contextMenu: { x: number; y: number; targetId: string | null } | null
  activeShapeKind: ShapeKind
  /** Id of the TextObject currently open for inline rich-text editing */
  textEditingId: string | null
  /** Character-index selection range within the editing text ([start, end) half-open) */
  textSelection: { start: number; end: number } | null
  /** Callback set by the active CanvasTextNode; PropertiesPanel calls it on mousedown
   *  to snapshot the live browser selection before focus can move away. */
  captureTextSelection: (() => void) | null
  setActiveShapeKind: (kind: ShapeKind) => void
  setTextEditing: (id: string | null) => void
  setTextSelection: (range: { start: number; end: number } | null) => void
  setCaptureTextSelection: (fn: (() => void) | null) => void
  loadProject: (project: CarouselProject) => void
  // actions
  addObject: (obj: CanvasObject) => void
  updateObject: (id: string, patch: Partial<CanvasObject>) => void
  commitUpdate: (id: string, patch: Partial<CanvasObject>) => void
  removeObject: (id: string) => void
  setSelected: (id: string | null) => void
  addToSelection: (id: string) => void
  setSelectedIds: (ids: string[]) => void
  setFrameCount: (n: number) => void
  setActiveTool: (tool: 'select' | 'text' | 'shape' | 'pen') => void
  reorderObjects: (fromId: string, toId: string, side: 'before' | 'after') => void
  toggleLock: (id: string) => void
  alignObjects: (anchor: 'left' | 'right' | 'top' | 'bottom' | 'centerH' | 'centerV') => void
  distributeObjects: (axis: 'horizontal' | 'vertical') => void
  setRatio: (r: FrameRatio) => void
  setFrameBackground: (frameIndex: number, color: string | null) => void
  setCanvasBackground: (color: string) => void
  undo: () => void
  redo: () => void
  clearContentEditMode: () => void
  clearPathEditMode: () => void
  moveObject: (id: string, dx: number, dy: number) => void
  setContextMenu: (state: { x: number; y: number; targetId: string | null } | null) => void
  selectAll: () => void
  bringForward: (id: string) => void
  sendBackward: (id: string) => void
  bringToFront: (id: string) => void
  sendToBack: (id: string) => void
  duplicateObject: (id: string, offsetX?: number, offsetY?: number) => void
  duplicateObjectAtOrigin: (
    id: string,
    originPos: { x: number; y: number } | { frameX: number; frameY: number },
    finalPos: { x: number; y: number } | { frameX: number; frameY: number },
  ) => void
}

export const useCanvasStore = create<CanvasState>((set) => {
  function pushHistoryFrom(
    state: Pick<CanvasState, 'objects' | 'objectOrder' | 'ratio' | 'frameHeight' | 'frames' | 'backgroundColor' | 'frameCount' | 'past'>
  ): HistorySnapshot[] {
    const snapshot: HistorySnapshot = {
      objects: state.objects,
      objectOrder: state.objectOrder,
      ratio: state.ratio,
      frameHeight: state.frameHeight,
      frames: state.frames,
      backgroundColor: state.backgroundColor,
      frameCount: state.frameCount,
    }
    const trimmed =
      state.past.length >= MAX_HISTORY
        ? state.past.slice(state.past.length - MAX_HISTORY + 1)
        : state.past
    return [...trimmed, snapshot]
  }

  return {
    objects: {},
    objectOrder: [],
    selectedId: null,
    selectedIds: [],
    frameCount: 2,
    ratio: 'square',
    frameHeight: 1080,
    frames: makeFrames(2),
    backgroundColor: '#ffffff',
    activeTool: 'select',
    past: [],
    future: [],
    contextMenu: null,
    activeShapeKind: 'rect',
    textEditingId: null,
    textSelection: null,
    captureTextSelection: null,

    addObject: (obj) => {
      let normalized = obj
      if (obj.type === 'shape') {
        const s = obj as ShapeObject
        if ((s.kind === 'line' || s.kind === 'arrow') && s.x2 === undefined) {
          normalized = { ...s, x2: s.x + s.width, y2: s.y + s.height } as CanvasObject
        }
      }
      return set((state) => ({
        past: pushHistoryFrom(state),
        future: [],
        objects: { ...state.objects, [normalized.id]: normalized },
        objectOrder: [...state.objectOrder, normalized.id],
      }))
    },

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
          past: pushHistoryFrom(state),
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
          past: pushHistoryFrom(state),
          future: [],
          objects: rest,
          objectOrder: state.objectOrder.filter((oid) => oid !== id),
          selectedId: state.selectedId === id ? null : state.selectedId,
          selectedIds: state.selectedIds.filter((sid) => sid !== id),
        }
      }),

    setSelected: (id) =>
      set({
        selectedId: id,
        selectedIds: id !== null ? [id] : [],
      }),

    addToSelection: (id) =>
      set((state) => {
        const already = state.selectedIds.includes(id)
        if (already) {
          const newIds = state.selectedIds.filter((sid) => sid !== id)
          return {
            selectedIds: newIds,
            selectedId: newIds.length > 0 ? newIds[newIds.length - 1] : null,
          }
        }
        return {
          selectedIds: [...state.selectedIds, id],
          // Set selectedId when coming from empty selection so properties panel shows something
          selectedId: state.selectedId ?? id,
        }
      }),

    setSelectedIds: (ids) =>
      set({
        selectedIds: ids,
        selectedId: ids.length > 0 ? ids[ids.length - 1] : null,
      }),

    setFrameCount: (n) =>
      set((state) => {
        const clamped = Math.max(1, Math.min(10, n))
        const current = state.frames
        let frames: Frame[]
        if (clamped > current.length) {
          frames = [
            ...current,
            ...Array.from({ length: clamped - current.length }, (_, i) => ({
              index: current.length + i,
              label: `Slide ${current.length + i + 1}`,
              backgroundColor: null,
            })),
          ]
        } else {
          frames = current.slice(0, clamped)
        }
        return { past: pushHistoryFrom(state), future: [], frameCount: clamped, frames }
      }),

    setActiveTool: (tool) => set({ activeTool: tool }),

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

    toggleLock: (id) =>
      set((state) => {
        const obj = state.objects[id]
        if (!obj) return state
        return {
          past: pushHistoryFrom(state),
          future: [],
          objects: {
            ...state.objects,
            [id]: { ...obj, locked: !obj.locked } as CanvasObject,
          },
        }
      }),

    alignObjects: (anchor) =>
      set((state) => {
        const ids = state.selectedIds
        if (ids.length < 2) return state

        const bboxes = ids
          .map((id) => state.objects[id])
          .filter((obj): obj is CanvasObject => obj !== undefined)
          .map((obj) => getObjectBBox(obj))

        if (bboxes.length < 2) return state

        const minX = Math.min(...bboxes.map((b) => b.x))
        const minY = Math.min(...bboxes.map((b) => b.y))
        const maxX = Math.max(...bboxes.map((b) => b.x + b.width))
        const maxY = Math.max(...bboxes.map((b) => b.y + b.height))
        const centerX = (minX + maxX) / 2
        const centerY = (minY + maxY) / 2

        const updatedObjects = { ...state.objects }
        for (const id of ids) {
          const obj = state.objects[id]
          if (!obj) continue
          const bbox = getObjectBBox(obj)

          let dx = 0
          let dy = 0
          switch (anchor) {
            case 'left':
              dx = minX - bbox.x
              break
            case 'right':
              dx = maxX - (bbox.x + bbox.width)
              break
            case 'top':
              dy = minY - bbox.y
              break
            case 'bottom':
              dy = maxY - (bbox.y + bbox.height)
              break
            case 'centerH':
              dx = centerX - (bbox.x + bbox.width / 2)
              break
            case 'centerV':
              dy = centerY - (bbox.y + bbox.height / 2)
              break
          }

          if (dx === 0 && dy === 0) continue

          if (obj.type === 'image') {
            const img = obj as ImageObject
            updatedObjects[id] = {
              ...img,
              frameX: img.frameX + dx,
              frameY: img.frameY + dy,
              x: img.x + dx,
              y: img.y + dy,
            }
          } else {
            updatedObjects[id] = { ...obj, x: obj.x + dx, y: obj.y + dy }
          }
        }

        return {
          past: pushHistoryFrom(state),
          future: [],
          objects: updatedObjects,
        }
      }),

    distributeObjects: (axis) =>
      set((state) => {
        const ids = state.selectedIds
        if (ids.length < 2) return state

        const items = ids
          .map((id) => {
            const obj = state.objects[id]
            if (!obj) return null
            return { id, obj, bbox: getObjectBBox(obj) }
          })
          .filter((item): item is { id: string; obj: CanvasObject; bbox: ReturnType<typeof getObjectBBox> } => item !== null)

        if (items.length < 2) return state

        const updatedObjects = { ...state.objects }

        if (axis === 'horizontal') {
          items.sort((a, b) => a.bbox.x + a.bbox.width / 2 - (b.bbox.x + b.bbox.width / 2))
          const firstCenter = items[0].bbox.x + items[0].bbox.width / 2
          const lastCenter = items[items.length - 1].bbox.x + items[items.length - 1].bbox.width / 2
          const spacing = (lastCenter - firstCenter) / (items.length - 1)

          for (let i = 1; i < items.length - 1; i++) {
            const { id, obj, bbox } = items[i]
            const targetCenterX = firstCenter + spacing * i
            const dx = targetCenterX - (bbox.x + bbox.width / 2)
            if (obj.type === 'image') {
              const img = obj as ImageObject
              updatedObjects[id] = { ...img, frameX: img.frameX + dx, x: img.x + dx }
            } else {
              updatedObjects[id] = { ...obj, x: obj.x + dx }
            }
          }
        } else {
          items.sort((a, b) => a.bbox.y + a.bbox.height / 2 - (b.bbox.y + b.bbox.height / 2))
          const firstCenter = items[0].bbox.y + items[0].bbox.height / 2
          const lastCenter = items[items.length - 1].bbox.y + items[items.length - 1].bbox.height / 2
          const spacing = (lastCenter - firstCenter) / (items.length - 1)

          for (let i = 1; i < items.length - 1; i++) {
            const { id, obj, bbox } = items[i]
            const targetCenterY = firstCenter + spacing * i
            const dy = targetCenterY - (bbox.y + bbox.height / 2)
            if (obj.type === 'image') {
              const img = obj as ImageObject
              updatedObjects[id] = { ...img, frameY: img.frameY + dy, y: img.y + dy }
            } else {
              updatedObjects[id] = { ...obj, y: obj.y + dy }
            }
          }
        }

        return {
          past: pushHistoryFrom(state),
          future: [],
          objects: updatedObjects,
        }
      }),

    setRatio: (r) =>
      set((state) => ({
        past: pushHistoryFrom(state),
        future: [],
        ratio: r,
        frameHeight: r === 'portrait' ? 1350 : 1080,
      })),

    setFrameBackground: (frameIndex, color) =>
      set((state) => {
        const frames = state.frames.map((f) =>
          f.index === frameIndex ? { ...f, backgroundColor: color } : f
        )
        return {
          past: pushHistoryFrom(state),
          future: [],
          frames,
        }
      }),

    setCanvasBackground: (color) =>
      set((state) => ({
        past: pushHistoryFrom(state),
        future: [],
        backgroundColor: color,
      })),

    undo: () =>
      set((state) => {
        if (state.past.length === 0) return state
        const previous = state.past[state.past.length - 1]
        const newPast = state.past.slice(0, state.past.length - 1)
        const currentSnapshot: HistorySnapshot = {
          objects: state.objects,
          objectOrder: state.objectOrder,
          ratio: state.ratio,
          frameHeight: state.frameHeight,
          frames: state.frames,
          backgroundColor: state.backgroundColor,
          frameCount: state.frameCount,
        }
        return {
          past: newPast,
          future: [currentSnapshot, ...state.future],
          objects: previous.objects,
          objectOrder: previous.objectOrder,
          ratio: previous.ratio,
          frameHeight: previous.frameHeight,
          frames: previous.frames,
          backgroundColor: previous.backgroundColor,
          frameCount: previous.frameCount,
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
          ratio: state.ratio,
          frameHeight: state.frameHeight,
          frames: state.frames,
          backgroundColor: state.backgroundColor,
          frameCount: state.frameCount,
        }
        return {
          past: [...state.past, currentSnapshot],
          future: newFuture,
          objects: next.objects,
          objectOrder: next.objectOrder,
          ratio: next.ratio,
          frameHeight: next.frameHeight,
          frames: next.frames,
          backgroundColor: next.backgroundColor,
          frameCount: next.frameCount,
        }
      }),

    clearContentEditMode: () =>
      set((state) => {
        const updated: Record<string, CanvasObject> = {}
        let changed = false
        for (const [id, obj] of Object.entries(state.objects)) {
          if (obj.type === 'image' && obj.contentEditMode) {
            updated[id] = { ...obj, contentEditMode: false }
            changed = true
          } else {
            updated[id] = obj
          }
        }
        if (!changed) return state
        return { objects: updated }
      }),

    clearPathEditMode: () =>
      set((state) => {
        const updated: Record<string, CanvasObject> = {}
        let changed = false
        for (const [id, obj] of Object.entries(state.objects)) {
          if (obj.type === 'path' && (obj as PathObject).pathEditMode) {
            updated[id] = { ...obj, pathEditMode: false } as CanvasObject
            changed = true
          } else {
            updated[id] = obj
          }
        }
        if (!changed) return state
        return { objects: updated }
      }),

    moveObject: (id, dx, dy) =>
      set((state) => {
        const obj = state.objects[id]
        if (!obj) return state
        let moved: CanvasObject
        if (obj.type === 'shape') {
          const s = obj as ShapeObject
          moved = { ...s, x: s.x + dx, y: s.y + dy,
            ...(s.x2 !== undefined ? { x2: s.x2 + dx, y2: (s.y2 ?? s.y) + dy } : {}) } as CanvasObject
        } else if (obj.type === 'path') {
          const p = obj as PathObject
          moved = { ...p, x: p.x + dx, y: p.y + dy,
            anchors: p.anchors.map((a) => ({ ...a, x: a.x + dx, y: a.y + dy })) } as CanvasObject
        } else if (obj.type === 'image') {
          const img = obj as ImageObject
          moved = { ...img, x: img.x + dx, y: img.y + dy,
            frameX: img.frameX + dx, frameY: img.frameY + dy } as CanvasObject
        } else {
          moved = { ...obj, x: obj.x + dx, y: obj.y + dy } as CanvasObject
        }
        return {
          past: pushHistoryFrom(state),
          future: [],
          objects: { ...state.objects, [id]: moved },
        }
      }),

    setContextMenu: (menuState) => set({ contextMenu: menuState }),

    setActiveShapeKind: (kind) => set({ activeShapeKind: kind }),

    setTextEditing: (id) => set({ textEditingId: id, textSelection: null }),

    setTextSelection: (range) => set({ textSelection: range }),

    setCaptureTextSelection: (fn) => set({ captureTextSelection: fn }),

    loadProject: (project) =>
      set(() => {
        // Migrate old TextObjects that used a flat `text` field instead of `spans`
        const migratedObjects: Record<string, CanvasObject> = {}
        for (const [id, obj] of Object.entries(project.objects)) {
          if (obj.type === 'text') {
            const t = obj as TextObject & { text?: string }
            if (!t.spans || t.spans.length === 0) {
              migratedObjects[id] = {
                ...t,
                spans: [{ text: t.text ?? '' }],
              } as TextObject
            } else {
              migratedObjects[id] = obj
            }
          } else {
            migratedObjects[id] = obj
          }
        }
        return {
          objects: migratedObjects,
          objectOrder: project.objectOrder,
          frameCount: project.frameCount,
          ratio: project.ratio,
          frameHeight: project.dimensions.height,
          frames: project.frames,
          backgroundColor: project.backgroundColor,
          selectedId: null,
          selectedIds: [],
          contextMenu: null,
          activeTool: 'select',
          textEditingId: null,
          textSelection: null,
          past: [],
          future: [],
        }
      }),

    selectAll: () =>
      set((state) => {
        const ids = state.objectOrder.filter((id) => {
          const obj = state.objects[id]
          return obj && obj.visible && !obj.locked
        })
        return {
          selectedIds: ids,
          selectedId: ids.length > 0 ? ids[ids.length - 1] : null,
        }
      }),

    bringForward: (id) =>
      set((state) => {
        const order = [...state.objectOrder]
        const idx = order.indexOf(id)
        if (idx === -1 || idx === order.length - 1) return state
        // Swap with next
        const temp = order[idx + 1]
        order[idx + 1] = order[idx]
        order[idx] = temp
        return {
          past: pushHistoryFrom(state),
          future: [],
          objectOrder: order,
        }
      }),

    sendBackward: (id) =>
      set((state) => {
        const order = [...state.objectOrder]
        const idx = order.indexOf(id)
        if (idx === -1 || idx === 0) return state
        // Swap with previous
        const temp = order[idx - 1]
        order[idx - 1] = order[idx]
        order[idx] = temp
        return {
          past: pushHistoryFrom(state),
          future: [],
          objectOrder: order,
        }
      }),

    bringToFront: (id) =>
      set((state) => {
        const order = [...state.objectOrder]
        const idx = order.indexOf(id)
        if (idx === -1 || idx === order.length - 1) return state
        order.splice(idx, 1)
        order.push(id)
        return {
          past: pushHistoryFrom(state),
          future: [],
          objectOrder: order,
        }
      }),

    sendToBack: (id) =>
      set((state) => {
        const order = [...state.objectOrder]
        const idx = order.indexOf(id)
        if (idx === -1 || idx === 0) return state
        order.splice(idx, 1)
        order.unshift(id)
        return {
          past: pushHistoryFrom(state),
          future: [],
          objectOrder: order,
        }
      }),

    duplicateObject: (id, offsetX = 10, offsetY = 10) =>
      set((state) => {
        const obj = state.objects[id]
        if (!obj) return state
        const newId = crypto.randomUUID()
        let duplicate: CanvasObject
        if (obj.type === 'image') {
          const img = obj as ImageObject
          duplicate = {
            ...img,
            id: newId,
            name: undefined,
            contentEditMode: false,
            frameX: img.frameX + offsetX,
            frameY: img.frameY + offsetY,
            x: img.x + offsetX,
            y: img.y + offsetY,
          }
        } else {
          duplicate = {
            ...obj,
            id: newId,
            name: undefined,
            x: obj.x + offsetX,
            y: obj.y + offsetY,
          } as CanvasObject
          if (obj.type === 'shape') {
            const s = obj as ShapeObject
            if ((s.kind === 'line' || s.kind === 'arrow') && s.x2 !== undefined) {
              duplicate = { ...duplicate, x2: s.x2 + offsetX, y2: (s.y2 ?? s.y) + offsetY } as CanvasObject
            }
          }
        }
        // Insert duplicate right after the source in objectOrder
        const srcIdx = state.objectOrder.indexOf(id)
        const newOrder = [...state.objectOrder]
        newOrder.splice(srcIdx + 1, 0, newId)
        return {
          past: pushHistoryFrom(state),
          future: [],
          objects: { ...state.objects, [newId]: duplicate },
          objectOrder: newOrder,
        }
      }),

    duplicateObjectAtOrigin: (id, originPos, finalPos) =>
      set((state) => {
        const obj = state.objects[id]
        if (!obj) return state
        const newId = crypto.randomUUID()

        // Build the clone that stays at originPos
        let clone: CanvasObject
        if (obj.type === 'image') {
          const img = obj as ImageObject
          const op = originPos as { frameX: number; frameY: number }
          clone = {
            ...img,
            id: newId,
            name: undefined,
            contentEditMode: false,
            frameX: op.frameX,
            frameY: op.frameY,
            x: op.frameX,
            y: op.frameY,
          }
        } else {
          const op = originPos as { x: number; y: number }
          clone = {
            ...obj,
            id: newId,
            name: undefined,
            x: op.x,
            y: op.y,
          } as CanvasObject
        }

        // Update the source object to finalPos
        let updatedSource: CanvasObject
        if (obj.type === 'image') {
          const img = obj as ImageObject
          const fp = finalPos as { frameX: number; frameY: number }
          updatedSource = {
            ...img,
            frameX: fp.frameX,
            frameY: fp.frameY,
            x: fp.frameX,
            y: fp.frameY,
          }
        } else {
          const fp = finalPos as { x: number; y: number }
          updatedSource = {
            ...obj,
            x: fp.x,
            y: fp.y,
          } as CanvasObject
        }

        // Insert clone right before the source in objectOrder
        const srcIdx = state.objectOrder.indexOf(id)
        const newOrder = [...state.objectOrder]
        newOrder.splice(srcIdx, 0, newId)

        return {
          past: pushHistoryFrom(state),
          future: [],
          objects: {
            ...state.objects,
            [id]: updatedSource,
            [newId]: clone,
          },
          objectOrder: newOrder,
        }
      }),
  }
})
