import { registerEffect } from './registry'
import type { EffectParams } from './registry'

registerEffect({
  type: 'filmGrain',
  label: 'Film Grain',
  defaultParams: () => ({ intensity: 0.4, size: 2, irregularity: 0.3, opacity: 1.0 }),
  controls: [
    { key: 'intensity',    label: 'Intensity',    type: 'slider', min: 0, max: 1, step: 0.01 },
    { key: 'size',         label: 'Size',         type: 'slider', min: 1, max: 8, step: 1 },
    { key: 'irregularity', label: 'Irregularity', type: 'slider', min: 0, max: 1, step: 0.01 },
    { key: 'opacity',      label: 'Opacity',      type: 'slider', min: 0, max: 1, step: 0.01 },
  ],
  buildFilter(params: EffectParams): (imageData: ImageData) => void {
    const intensity    = params.intensity    as number
    const size         = Math.max(1, Math.round(params.size as number))
    const irregularity = params.irregularity as number
    const opacity      = params.opacity      as number
    return function filmGrainFilter(imageData: ImageData): void {
      const { data, width, height } = imageData
      const range = intensity * 255
      for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
          const blockNoise = (Math.random() - 0.5) * 2 * range
          const yEnd = Math.min(y + size, height)
          const xEnd = Math.min(x + size, width)
          for (let dy = y; dy < yEnd; dy++) {
            for (let dx = x; dx < xEnd; dx++) {
              const perPixelNoise = (Math.random() - 0.5) * 2 * range
              const noise = (blockNoise * (1 - irregularity) + perPixelNoise * irregularity) * opacity
              const i = (dy * width + dx) * 4
              data[i]     = Math.max(0, Math.min(255, data[i]     + noise))
              data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
              data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
            }
          }
        }
      }
    }
  },
})
