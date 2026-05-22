interface ViewportState {
    zoom: number;
    panX: number;
    panY: number;
    setZoom: (zoom: number) => void;
    setPan: (x: number, y: number) => void;
    resetViewport: () => void;
}
export declare const useViewportStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ViewportState>>;
export {};
