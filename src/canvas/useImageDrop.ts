import { useEffect } from 'react'
import type React from 'react'
import type Konva from 'konva'
import { useCanvasStore } from './useCanvasStore'
import { FRAME_WIDTH, FRAME_HEIGHT } from './constants'

export function useImageDrop(stageRef: React.RefObject<Konva.Stage>): void {
  const addObject = useCanvasStore((s) => s.addObject)
  const objectOrder = useCanvasStore((s) => s.objectOrder)

  useEffect(() => {
    const container = stageRef.current?.container()
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

        // Calculate drop position in stage (unscaled) coordinates
        const stage = stageRef.current
        let dropX = FRAME_WIDTH / 2
        let dropY = FRAME_HEIGHT / 2

        if (stage) {
          const pos = stage.getPointerPosition()
          if (pos) {
            // pos is already in stage content coordinates (accounts for scale)
            dropX = pos.x / stage.scaleX()
            dropY = pos.y / stage.scaleY()
          }
        }

        addObject({
          id: crypto.randomUUID(),
          type: 'image',
          scope: 'global',
          src: dataUrl,
          backgroundRemoved: false,
          x: dropX,
          y: dropY,
          width: 400,
          height: 400,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          visible: true,
          locked: false,
          zIndex: objectOrder.length,
        })
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
  }, [stageRef, addObject, objectOrder.length])
}
