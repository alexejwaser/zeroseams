import { create } from 'zustand'
import { useEffect, useRef } from 'react'
import type { CanvasObject, ImageObject, ShapeObject, TextObject } from '@/types/canvas'
import { useCanvasStore } from './useCanvasStore'

interface ThumbnailState {
  thumbnails: Record<string, string>
  pendingIds: Set<string>
  markDirty: (id: string) => void
  clearDirty: (id: string) => void
  setThumbnail: (id: string, url: string) => void
  removeThumbnail: (id: string) => void
}

export const useThumbnailStore = create<ThumbnailState>((set) => ({
  thumbnails: {},
  pendingIds: new Set<string>(),

  markDirty: (id) =>
    set((state) => {
      const next = new Set(state.pendingIds)
      next.add(id)
      return { pendingIds: next }
    }),

  clearDirty: (id) =>
    set((state) => {
      const next = new Set(state.pendingIds)
      next.delete(id)
      return { pendingIds: next }
    }),

  setThumbnail: (id, url) =>
    set((state) => ({
      thumbnails: { ...state.thumbnails, [id]: url },
    })),

  removeThumbnail: (id) =>
    set((state) => {
      const { [id]: _removed, ...rest } = state.thumbnails
      return { thumbnails: rest }
    }),
}))

// ---------------------------------------------------------------------------
// generateThumbnail — pure HTML Canvas 2D, no Konva dependency
// ---------------------------------------------------------------------------

export async function generateThumbnail(obj: CanvasObject): Promise<string> {
  const SIZE = 40
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  if (obj.type === 'image') {
    const img = obj as ImageObject
    return await new Promise<string>((resolve) => {
      const el = new Image()
      el.onload = () => {
        // Determine scale to fit the frame (proportional) into 40x40
        const frameAspect = img.frameWidth / img.frameHeight
        let drawW = SIZE
        let drawH = SIZE
        if (frameAspect > 1) {
          drawH = SIZE / frameAspect
        } else {
          drawW = SIZE * frameAspect
        }
        const offsetX = (SIZE - drawW) / 2
        const offsetY = (SIZE - drawH) / 2

        // Scale factors from frame space to thumbnail draw space
        const scaleX = drawW / img.frameWidth
        const scaleY = drawH / img.frameHeight

        ctx.save()
        // Clip to the frame area within the thumbnail
        ctx.beginPath()
        ctx.rect(offsetX, offsetY, drawW, drawH)
        ctx.clip()

        // Draw the content image offset into the clipped region
        const contentX = offsetX + img.contentOffsetX * scaleX
        const contentY = offsetY + img.contentOffsetY * scaleY
        const contentW = img.contentWidth * scaleX
        const contentH = img.contentHeight * scaleY
        ctx.drawImage(el, contentX, contentY, contentW, contentH)
        ctx.restore()

        resolve(canvas.toDataURL('image/png'))
      }
      el.onerror = () => resolve('')
      el.src = obj.src
    })
  }

  if (obj.type === 'text') {
    const txt = obj as TextObject
    ctx.fillStyle = '#2a2a2a'
    ctx.fillRect(0, 0, SIZE, SIZE)

    const sample = txt.text.slice(0, 20)
    // Scale font to fit 40px wide
    const maxFontSize = Math.min(txt.fontSize, SIZE * 0.4)
    ctx.fillStyle = txt.fill
    ctx.font = `${maxFontSize}px ${txt.fontFamily}`
    ctx.textBaseline = 'middle'
    ctx.fillText(sample, 2, SIZE / 2, SIZE - 4)
    return canvas.toDataURL('image/png')
  }

  if (obj.type === 'shape') {
    const shape = obj as ShapeObject
    ctx.fillStyle = shape.fill || '#888888'
    ctx.strokeStyle = shape.stroke || 'transparent'
    ctx.lineWidth = Math.min(shape.strokeWidth || 0, 2)

    if (shape.kind === 'ellipse') {
      ctx.beginPath()
      ctx.ellipse(SIZE / 2, SIZE / 2, SIZE / 2 - 2, SIZE / 2 - 2, 0, 0, Math.PI * 2)
      ctx.fill()
      if (ctx.lineWidth > 0) ctx.stroke()
    } else if (shape.kind === 'line' || shape.kind === 'arrow') {
      ctx.strokeStyle = shape.fill || '#888888'
      ctx.lineWidth = Math.max(ctx.lineWidth, 2)
      ctx.beginPath()
      ctx.moveTo(2, SIZE / 2)
      ctx.lineTo(SIZE - 2, SIZE / 2)
      ctx.stroke()
    } else {
      // rect (default)
      const r = Math.min(shape.cornerRadius ?? 0, SIZE / 4)
      ctx.beginPath()
      ctx.roundRect(2, 2, SIZE - 4, SIZE - 4, r)
      ctx.fill()
      if (ctx.lineWidth > 0) ctx.stroke()
    }
    return canvas.toDataURL('image/png')
  }

  if (obj.type === 'group') {
    ctx.fillStyle = '#333333'
    ctx.fillRect(0, 0, SIZE, SIZE)
    ctx.font = `${SIZE * 0.55}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('📦', SIZE / 2, SIZE / 2)
    return canvas.toDataURL('image/png')
  }

  return canvas.toDataURL('image/png')
}

// ---------------------------------------------------------------------------
// useThumbnailGenerator — call once in CarouselStage
// ---------------------------------------------------------------------------

export function useThumbnailGenerator(): void {
  const markDirty = useThumbnailStore((s) => s.markDirty)
  const clearDirty = useThumbnailStore((s) => s.clearDirty)
  const setThumbnail = useThumbnailStore((s) => s.setThumbnail)
  const removeThumbnail = useThumbnailStore((s) => s.removeThumbnail)
  const prevObjectsRef = useRef<Record<string, CanvasObject>>({})
  // Initialise to -1 so the first subscription event always triggers an initial
  // diff — this ensures thumbnails are generated for objects loaded from autosave
  // (which may not push history entries before the hook mounts).
  const prevPastLengthRef = useRef<number>(-1)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const unsubscribe = useCanvasStore.subscribe((state) => {
      const pastLength = state.past.length
      const objects = state.objects

      // Only trigger on a new commit (past grew), not on every live-drag updateObject
      if (pastLength === prevPastLengthRef.current) return

      prevPastLengthRef.current = pastLength

      const prev = prevObjectsRef.current
      const dirtyIds: string[] = []

      // Detect added or changed objects
      for (const id of Object.keys(objects)) {
        if (prev[id] !== objects[id]) {
          dirtyIds.push(id)
        }
      }

      // Detect removed objects
      for (const id of Object.keys(prev)) {
        if (!objects[id]) {
          removeThumbnail(id)
        }
      }

      prevObjectsRef.current = objects

      if (dirtyIds.length === 0) return

      for (const id of dirtyIds) {
        markDirty(id)
      }

      // Debounced generation
      if (timerRef.current !== null) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        timerRef.current = null
        const currentObjects = useCanvasStore.getState().objects
        const pending = useThumbnailStore.getState().pendingIds
        for (const id of Array.from(pending)) {
          const obj = currentObjects[id]
          if (!obj) {
            clearDirty(id)
            continue
          }
          generateThumbnail(obj)
            .then((url) => {
              if (url) setThumbnail(id, url)
              clearDirty(id)
            })
            .catch(() => clearDirty(id))
        }
      }, 150)
    })

    return () => {
      unsubscribe()
      if (timerRef.current !== null) clearTimeout(timerRef.current)
    }
  }, [markDirty, clearDirty, setThumbnail, removeThumbnail])
}
