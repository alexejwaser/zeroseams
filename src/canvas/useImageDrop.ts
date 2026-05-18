import { useEffect } from 'react'
import type React from 'react'
import { useCanvasStore } from './useCanvasStore'
import { FRAME_WIDTH, FRAME_HEIGHT } from './constants'

export function useImageDrop(containerRef: React.RefObject<HTMLDivElement>): void {
  const addObject = useCanvasStore((s) => s.addObject)
  const objectOrder = useCanvasStore((s) => s.objectOrder)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function handleDragOver(e: DragEvent): void {
      e.preventDefault()
      e.stopPropagation()
    }

    function handleDrop(e: DragEvent): void {
      e.preventDefault()
      e.stopPropagation()

      const file = Array.from(e.dataTransfer?.files ?? []).find((f) =>
        f.type.startsWith('image/'),
      )
      if (!file) return

      const reader = new FileReader()
      reader.onload = (readerEvent) => {
        const dataUrl = readerEvent.target?.result
        if (typeof dataUrl !== 'string') return

        // Load image to get natural dimensions before creating the object
        const img = new Image()
        img.onload = () => {
          const MAX_SIZE = 600
          const scale = Math.min(1, MAX_SIZE / Math.max(img.naturalWidth, img.naturalHeight))
          const w = Math.round(img.naturalWidth * scale)
          const h = Math.round(img.naturalHeight * scale)

          addObject({
            id: crypto.randomUUID(),
            type: 'image',
            scope: 'global',
            src: dataUrl,
            backgroundRemoved: false,
            x: FRAME_WIDTH / 2 - w / 2,
            y: FRAME_HEIGHT / 2 - h / 2,
            width: w,
            height: h,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            visible: true,
            locked: false,
            zIndex: objectOrder.length,
          })
        }
        img.src = dataUrl
      }
      reader.readAsDataURL(file)
    }

    container.addEventListener('dragover', handleDragOver)
    container.addEventListener('drop', handleDrop)

    return () => {
      container.removeEventListener('dragover', handleDragOver)
      container.removeEventListener('drop', handleDrop)
    }
    // objectOrder.length changes as objects are added; re-register to capture latest zIndex
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, addObject, objectOrder.length])
}
