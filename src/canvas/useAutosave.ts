import { useEffect, useRef, useState } from 'react'
import { useCanvasStore } from './useCanvasStore'
import type { CarouselProject } from '@/types/project'
import { useSaveStatusStore, type SaveStatus } from '@/ui/useSaveStatusStore'

export function useAutosave(): { status: SaveStatus; lastSavedAt: string | null } {
  const setStoreStatus = useSaveStatusStore((s) => s.setStatus)
  const setStoreLastSavedAt = useSaveStatusStore((s) => s.setLastSavedAt)

  // Local mirror for the return value (kept in sync with the store)
  const [status, setStatus] = useState<SaveStatus>('idle')
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)

  // versionRef is a local increment counter — stays in the hook
  const versionRef = useRef<number>(0)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Keep local state in sync with the shared store so callers of this hook
  // see the same values without an extra store subscription.
  function applyStatus(next: SaveStatus): void {
    setStatus(next)
    setStoreStatus(next)
  }

  function applyLastSavedAt(at: string): void {
    setLastSavedAt(at)
    setStoreLastSavedAt(at)
  }

  useEffect(() => {
    const unsubscribe = useCanvasStore.subscribe(() => {
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(() => {
        debounceRef.current = null

        applyStatus('saving')

        const state = useCanvasStore.getState()
        const { frameCount, objects, objectOrder } = state

        const saveStore = useSaveStatusStore.getState()

        versionRef.current += 1

        const project: CarouselProject = {
          id: saveStore.projectId,
          name: saveStore.projectName,
          ratio: state.ratio,
          dimensions: { width: 1080, height: state.frameHeight as 1080 | 1350 },
          frameCount,
          frames: state.frames,
          backgroundColor: state.backgroundColor,
          objects,
          objectOrder,
          createdAt: saveStore.createdAt,
          updatedAt: new Date().toISOString(),
          version: versionRef.current,
        }

        const savePromise = window.electronAPI.autosaveProject(saveStore.projectFilename, JSON.stringify(project))

        savePromise
          .then(() => {
            applyStatus('saved')
            const savedAt = new Date().toISOString()
            applyLastSavedAt(savedAt)

            setTimeout(() => {
              applyStatus('idle')
            }, 3000)
          })
          .catch(() => {
            applyStatus('error')
          })
      }, 2000)
    })

    return () => {
      unsubscribe()
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { status, lastSavedAt }
}
