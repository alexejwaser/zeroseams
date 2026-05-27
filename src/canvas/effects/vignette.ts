import { registerEffect } from './registry'
import type { EffectParams } from './registry'

registerEffect({
  type: 'vignette',
  label: 'Vignette',
  defaultParams: () => ({ strength: 0.5, radius: 0.7, feather: 0.3, invert: false }),
  controls: [
    { key: 'strength', label: 'Strength', type: 'slider', min: 0, max: 1, step: 0.01 },
    { key: 'radius',   label: 'Radius',   type: 'slider', min: 0, max: 1, step: 0.01 },
    { key: 'feather',  label: 'Feather',  type: 'slider', min: 0, max: 1, step: 0.01 },
    { key: 'invert',   label: 'Invert',   type: 'toggle' },
  ],
  buildFilter(params: EffectParams): (imageData: ImageData) => void {
    const strength = params.strength as number
    const radius   = params.radius   as number
    const feather  = Math.max(0.001, params.feather as number)
    const invert   = params.invert   as boolean
    return function vignetteFilter(imageData: ImageData): void {
      const { data, width, height } = imageData
      const cx = width  / 2
      const cy = height / 2
      const innerR = radius * (1 - feather)
      for (let y = 0; y < height; y++) {
        const dy = (y - cy) / cy
        for (let x = 0; x < width; x++) {
          const dx = (x - cx) / cx
          const dist = Math.sqrt(dx * dx + dy * dy)
          let s = 0
          if (dist > innerR) {
            const t = Math.min(1, (dist - innerR) / feather)
            s = t * t * (3 - 2 * t) * strength  // smoothstep × strength
          }
          const i = (y * width + x) * 4
          if (!invert) {
            // Dark vignette — darken edges
            const factor = 1 - s
            data[i]     = data[i]     * factor
            data[i + 1] = data[i + 1] * factor
            data[i + 2] = data[i + 2] * factor
          } else {
            // White vignette — brighten edges toward white
            data[i]     = Math.min(255, data[i]     + (255 - data[i])     * s)
            data[i + 1] = Math.min(255, data[i + 1] + (255 - data[i + 1]) * s)
            data[i + 2] = Math.min(255, data[i + 2] + (255 - data[i + 2]) * s)
          }
        }
      }
    }
  },
})
