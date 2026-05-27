export type EffectParams = Record<string, number | string | boolean>

export interface EffectControlDescriptor {
  key: string
  label: string
  type: 'slider' | 'toggle' | 'color'
  min?: number
  max?: number
  step?: number
}

export interface EffectDefinition {
  type: string
  label: string
  defaultParams(): EffectParams
  buildFilter(params: EffectParams): (imageData: ImageData) => void
  controls: EffectControlDescriptor[]
}

const registry = new Map<string, EffectDefinition>()

export function registerEffect(def: EffectDefinition): void {
  registry.set(def.type, def)
}

export function getEffectDefinition(type: string): EffectDefinition | undefined {
  return registry.get(type)
}

export function getAllEffectDefinitions(): EffectDefinition[] {
  return [...registry.values()]
}
