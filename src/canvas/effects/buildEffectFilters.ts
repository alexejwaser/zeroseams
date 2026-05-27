import type { LayerEffect } from '@/types/canvas'
import { getEffectDefinition } from './registry'

export function buildEffectFilters(
  effects: LayerEffect[] | undefined,
): Array<(imageData: ImageData) => void> {
  if (!effects?.length) return []
  const filters: Array<(imageData: ImageData) => void> = []
  for (const effect of effects) {
    if (!effect.enabled) continue
    const def = getEffectDefinition(effect.type)
    if (!def) continue
    filters.push(def.buildFilter(effect.params))
  }
  return filters
}
