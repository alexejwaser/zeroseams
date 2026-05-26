import type { PhotoAdjustments } from '../../types/canvas'
import { DEFAULT_ADJUSTMENTS } from '../../types/canvas'

// ---------------------------------------------------------------------------
// LUT cache
// ---------------------------------------------------------------------------

const lutCache = new Map<string, Uint8ClampedArray>()

function buildLUT(key: string, fn: (i: number) => number): Uint8ClampedArray {
  if (lutCache.has(key)) return lutCache.get(key)!
  const lut = new Uint8ClampedArray(256)
  for (let i = 0; i < 256; i++) lut[i] = Math.max(0, Math.min(255, Math.round(fn(i))))
  lutCache.set(key, lut)
  return lut
}

// ---------------------------------------------------------------------------
// HSL helpers
// ---------------------------------------------------------------------------

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h: number
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
  else if (max === gn) h = ((bn - rn) / d + 2) / 6
  else h = ((rn - gn) / d + 4) / 6
  return [h, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    const v = Math.round(l * 255)
    return [v, v, v]
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  function hue(t: number): number {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  return [
    Math.round(hue(h + 1 / 3) * 255),
    Math.round(hue(h) * 255),
    Math.round(hue(h - 1 / 3) * 255),
  ]
}

// ---------------------------------------------------------------------------
// isAllDefault
// ---------------------------------------------------------------------------

function isAllDefault(adj: PhotoAdjustments): boolean {
  return (Object.keys(DEFAULT_ADJUSTMENTS) as Array<keyof PhotoAdjustments>).every(
    (k) => adj[k] === 0,
  )
}

// ---------------------------------------------------------------------------
// Individual filter makers
// ---------------------------------------------------------------------------

function makeExposureFilter(exposure: number): (imageData: ImageData) => void {
  // Decode sRGB gamma, apply EV gain in linear light, re-encode.
  // This matches Lightroom's perceptual exposure response — highlights are
  // protected by the gamma shoulder rather than hard-clipping.
  const gain = Math.pow(2, exposure)
  const lut = buildLUT(`exposure:${exposure}`, (i) => {
    const linear = Math.pow(i / 255, 2.2)
    const gained = Math.min(1, Math.max(0, linear * gain))
    return Math.pow(gained, 1 / 2.2) * 255
  })
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      d[j]     = lut[d[j]]
      d[j + 1] = lut[d[j + 1]]
      d[j + 2] = lut[d[j + 2]]
    }
  }
}

function makeContrastFilter(contrast: number): (imageData: ImageData) => void {
  // Halved factor keeps Lightroom parity — at +100 the S-curve factor is 1.5×
  // rather than 2×, matching Lightroom's more restrained contrast response.
  const lut = buildLUT(`contrast:${contrast}`, (i) =>
    Math.round(((i / 255 - 0.5) * (1 + contrast / 200) + 0.5) * 255),
  )
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      d[j]     = lut[d[j]]
      d[j + 1] = lut[d[j + 1]]
      d[j + 2] = lut[d[j + 2]]
    }
  }
}

function makeWhitesFilter(whites: number): (imageData: ImageData) => void {
  // Only affects pixels above 75% luminance; effect tapers to zero at midtones.
  const lut = buildLUT(`whites:${whites}`, (i) => {
    const t = i / 255
    if (t < 0.75) return Math.round(t * 255)
    const zone = (t - 0.75) / 0.25   // 0 at t=0.75, 1 at t=1.0
    const out = t + (whites / 100) * zone * (1 - t) * 0.7
    return Math.round(out * 255)
  })
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      d[j]     = lut[d[j]]
      d[j + 1] = lut[d[j + 1]]
      d[j + 2] = lut[d[j + 2]]
    }
  }
}

function makeBlacksFilter(blacks: number): (imageData: ImageData) => void {
  // Only affects pixels below 25% luminance; effect tapers to zero at midtones.
  const lut = buildLUT(`blacks:${blacks}`, (i) => {
    const t = i / 255
    if (t > 0.25) return Math.round(t * 255)
    const zone = (0.25 - t) / 0.25   // 1 at t=0, 0 at t=0.25
    const out = t + (blacks / 100) * zone * t * 0.7
    return Math.round(out * 255)
  })
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      d[j]     = lut[d[j]]
      d[j + 1] = lut[d[j + 1]]
      d[j + 2] = lut[d[j + 2]]
    }
  }
}

function makeHighlightsFilter(highlights: number): (imageData: ImageData) => void {
  // 0.5 scale factor: at +100 a pure-white pixel gets 1.5× scale — matches
  // Lightroom's gentle highlights recovery/boost feel.
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      const r = d[j]
      const g = d[j + 1]
      const b = d[j + 2]
      const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      const scale = 1 + (highlights / 100) * L * 0.5
      d[j]     = Math.max(0, Math.min(255, Math.round(r * scale)))
      d[j + 1] = Math.max(0, Math.min(255, Math.round(g * scale)))
      d[j + 2] = Math.max(0, Math.min(255, Math.round(b * scale)))
    }
  }
}

function makeShadowsFilter(shadows: number): (imageData: ImageData) => void {
  // 0.5 scale factor mirrors highlights — at +100 a pure-black pixel gets 1.5×.
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      const r = d[j]
      const g = d[j + 1]
      const b = d[j + 2]
      const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      const scale = 1 + (shadows / 100) * (1 - L) * 0.5
      d[j]     = Math.max(0, Math.min(255, Math.round(r * scale)))
      d[j + 1] = Math.max(0, Math.min(255, Math.round(g * scale)))
      d[j + 2] = Math.max(0, Math.min(255, Math.round(b * scale)))
    }
  }
}

function makeTemperatureFilter(temperature: number): (imageData: ImageData) => void {
  const rLUT = buildLUT(`temp_r:${temperature}`, (i) => i + temperature * 0.5)
  const bLUT = buildLUT(`temp_b:${temperature}`, (i) => i - temperature * 0.5)
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      d[j]     = rLUT[d[j]]
      d[j + 2] = bLUT[d[j + 2]]
    }
  }
}

function makeTintFilter(tint: number): (imageData: ImageData) => void {
  const rLUT = buildLUT(`tint_r:${tint}`, (i) => i + tint * 0.15)
  const gLUT = buildLUT(`tint_g:${tint}`, (i) => i - tint * 0.3)
  const bLUT = buildLUT(`tint_b:${tint}`, (i) => i + tint * 0.15)
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      d[j]     = rLUT[d[j]]
      d[j + 1] = gLUT[d[j + 1]]
      d[j + 2] = bLUT[d[j + 2]]
    }
  }
}

function makeSaturationFilter(saturation: number): (imageData: ImageData) => void {
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      const [h, s, l] = rgbToHsl(d[j], d[j + 1], d[j + 2])
      const sNew = Math.max(0, Math.min(1, s * (1 + saturation / 100)))
      const [r, g, b] = hslToRgb(h, sNew, l)
      d[j]     = r
      d[j + 1] = g
      d[j + 2] = b
    }
  }
}

function makeVibranceFilter(vibrance: number): (imageData: ImageData) => void {
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      const [h, s, l] = rgbToHsl(d[j], d[j + 1], d[j + 2])
      const sNew = Math.max(0, Math.min(1, s + (vibrance / 100) * (1 - s) * (1 - s)))
      const [r, g, b] = hslToRgb(h, sNew, l)
      d[j]     = r
      d[j + 1] = g
      d[j + 2] = b
    }
  }
}

function makeClarityFilter(clarity: number): (imageData: ImageData) => void {
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      const r = d[j]
      const g = d[j + 1]
      const b = d[j + 2]
      const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      const scale = L > 0.2 && L < 0.8 ? 1 + clarity * 0.003 : 1
      d[j]     = Math.max(0, Math.min(255, Math.round(r * scale)))
      d[j + 1] = Math.max(0, Math.min(255, Math.round(g * scale)))
      d[j + 2] = Math.max(0, Math.min(255, Math.round(b * scale)))
    }
  }
}

function makeDehazeFilter(dehaze: number): (imageData: ImageData) => void {
  // Precompute a contrast LUT at 50% weight of dehaze for the S-curve component
  const contrastWeight = dehaze * 0.5
  const contrastLUT = buildLUT(`dehaze_contrast:${dehaze}`, (i) =>
    Math.round(((i / 255 - 0.5) * (1 + contrastWeight / 100) + 0.5) * 255),
  )
  const satWeight = dehaze * 0.5
  return (imageData: ImageData): void => {
    const d = imageData.data
    for (let j = 0; j < d.length; j += 4) {
      // Apply contrast S-curve (50% weight)
      let r = contrastLUT[d[j]]
      let g = contrastLUT[d[j + 1]]
      let b = contrastLUT[d[j + 2]]
      // Apply saturation boost (50% weight) via HSL
      const [h, s, l] = rgbToHsl(r, g, b)
      const sNew = Math.max(0, Math.min(1, s * (1 + satWeight / 100)));
      [r, g, b] = hslToRgb(h, sNew, l)
      d[j]     = r
      d[j + 1] = g
      d[j + 2] = b
    }
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function buildFilterPipeline(adj: PhotoAdjustments): Array<(imageData: ImageData) => void> {
  if (isAllDefault(adj)) return []
  const filters: Array<(imageData: ImageData) => void> = []
  if (adj.exposure !== 0)     filters.push(makeExposureFilter(adj.exposure))
  if (adj.contrast !== 0)     filters.push(makeContrastFilter(adj.contrast))
  if (adj.whites !== 0)       filters.push(makeWhitesFilter(adj.whites))
  if (adj.blacks !== 0)       filters.push(makeBlacksFilter(adj.blacks))
  if (adj.highlights !== 0)   filters.push(makeHighlightsFilter(adj.highlights))
  if (adj.shadows !== 0)      filters.push(makeShadowsFilter(adj.shadows))
  if (adj.temperature !== 0)  filters.push(makeTemperatureFilter(adj.temperature))
  if (adj.tint !== 0)         filters.push(makeTintFilter(adj.tint))
  if (adj.saturation !== 0)   filters.push(makeSaturationFilter(adj.saturation))
  if (adj.vibrance !== 0)     filters.push(makeVibranceFilter(adj.vibrance))
  if (adj.clarity !== 0)      filters.push(makeClarityFilter(adj.clarity))
  if (adj.dehaze !== 0)       filters.push(makeDehazeFilter(adj.dehaze))
  return filters
}
