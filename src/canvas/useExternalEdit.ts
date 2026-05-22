import { useEffect, useState } from 'react'
import { useCanvasStore } from './useCanvasStore'
import type { ImageObject } from '@/types/canvas'

export function useExternalEdit() {
  const commitUpdate = useCanvasStore((s) => s.commitUpdate)
  const objects = useCanvasStore((s) => s.objects)
  const [activeObjectId, setActiveObjectId] = useState<string | null>(null)

  useEffect(() => {
    return window.electronAPI.onExternalImageChanged(({ objectId, base64 }) => {
      const obj = useCanvasStore.getState().objects[objectId] as ImageObject | undefined
      if (!obj) return
      const mimeMatch = obj.src.match(/data:([^;]+)/)
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/png'
      const patch: Partial<ImageObject> = { src: `data:${mimeType};base64,${base64}` }
      if (!obj.originalSrc) patch.originalSrc = obj.src
      commitUpdate(objectId, patch)
    })
  }, [commitUpdate])

  async function editExternally(
    objectId: string,
    projectFilePath: string | null,
  ): Promise<void> {
    const obj = objects[objectId]
    if (!obj || obj.type !== 'image') return
    const imgObj = obj as ImageObject

    let editor = await window.electronAPI.getExternalEditor()
    if (!editor) {
      editor = await window.electronAPI.setExternalEditor()
      if (!editor) return
    }

    const commaIdx = imgObj.src.indexOf(',')
    const header = imgObj.src.slice(0, commaIdx)
    const base64 = imgObj.src.slice(commaIdx + 1)
    const mimeMatch = header.match(/data:([^;]+)/)
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png'

    const result = await window.electronAPI.editInExternalApp(
      objectId,
      base64,
      mimeType,
      projectFilePath,
    )
    if (result.success) setActiveObjectId(objectId)
  }

  async function stopEditing(objectId: string): Promise<void> {
    await window.electronAPI.stopExternalEdit(objectId)
    setActiveObjectId(null)
  }

  return { editExternally, stopEditing, activeObjectId }
}
