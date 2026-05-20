import { create } from 'zustand'

interface ViewportState {
  zoom: number
  panX: number
  panY: number
  setZoom: (zoom: number) => void
  setPan: (x: number, y: number) => void
  resetViewport: () => void
}

export const useViewportStore = create<ViewportState>((set) => ({
  zoom: 1.0,
  panX: 0,
  panY: 0,
  setZoom: (zoom) => set({ zoom }),
  setPan: (panX, panY) => set({ panX, panY }),
  resetViewport: () => set({ zoom: 1.0, panX: 0, panY: 0 }),
}))
