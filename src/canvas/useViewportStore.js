import { create } from 'zustand';
export const useViewportStore = create((set) => ({
    zoom: 1.0,
    panX: 0,
    panY: 0,
    setZoom: (zoom) => set({ zoom }),
    setPan: (panX, panY) => set({ panX, panY }),
    resetViewport: () => set({ zoom: 1.0, panX: 0, panY: 0 }),
}));
