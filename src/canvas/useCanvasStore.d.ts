import type { CanvasObject, ShapeKind } from '@/types/canvas';
import type { Frame, FrameRatio, Platform, CarouselProject } from '@/types/project';
export declare const PLATFORM_PRESETS: Record<Platform, Array<{
    ratio: FrameRatio;
    label: string;
    width: number;
    height: number;
}>>;
type HistorySnapshot = Pick<CanvasState, 'objects' | 'objectOrder' | 'ratio' | 'frameWidth' | 'frameHeight' | 'frames' | 'backgroundColor' | 'frameCount'>;
interface CanvasState {
    objects: Record<string, CanvasObject>;
    objectOrder: string[];
    selectedId: string | null;
    selectedIds: string[];
    frameCount: number;
    platform: Platform;
    ratio: FrameRatio;
    frameWidth: number;
    frameHeight: number;
    frames: Frame[];
    backgroundColor: string;
    activeTool: 'select' | 'text' | 'shape' | 'pen';
    resizeMode: 'advanced' | 'auto';
    setResizeMode: (mode: 'advanced' | 'auto') => void;
    snapEnabled: boolean;
    toggleSnap: () => void;
    past: HistorySnapshot[];
    future: HistorySnapshot[];
    contextMenu: {
        x: number;
        y: number;
        targetId: string | null;
    } | null;
    activeShapeKind: ShapeKind;
    /** Id of the TextObject currently open for inline rich-text editing */
    textEditingId: string | null;
    /** Character-index selection range within the editing text ([start, end) half-open) */
    textSelection: {
        start: number;
        end: number;
    } | null;
    /** Callback set by the active CanvasTextNode; PropertiesPanel calls it on mousedown
     *  to snapshot the live browser selection before focus can move away. */
    captureTextSelection: (() => void) | null;
    setActiveShapeKind: (kind: ShapeKind) => void;
    setTextEditing: (id: string | null) => void;
    setTextSelection: (range: {
        start: number;
        end: number;
    } | null) => void;
    setCaptureTextSelection: (fn: (() => void) | null) => void;
    loadProject: (project: CarouselProject) => void;
    addObject: (obj: CanvasObject) => void;
    updateObject: (id: string, patch: Partial<CanvasObject>) => void;
    commitUpdate: (id: string, patch: Partial<CanvasObject>) => void;
    removeObject: (id: string) => void;
    setSelected: (id: string | null) => void;
    addToSelection: (id: string) => void;
    setSelectedIds: (ids: string[]) => void;
    setFrameCount: (n: number) => void;
    setActiveTool: (tool: 'select' | 'text' | 'shape' | 'pen') => void;
    reorderObjects: (fromId: string, toId: string, side: 'before' | 'after') => void;
    toggleLock: (id: string) => void;
    alignObjects: (anchor: 'left' | 'right' | 'top' | 'bottom' | 'centerH' | 'centerV') => void;
    distributeObjects: (axis: 'horizontal' | 'vertical') => void;
    setRatio: (r: FrameRatio, width: number, height: number) => void;
    setPlatform: (p: Platform) => void;
    setFrameBackground: (frameIndex: number, color: string | null) => void;
    setCanvasBackground: (color: string) => void;
    undo: () => void;
    redo: () => void;
    clearContentEditMode: () => void;
    clearPathEditMode: () => void;
    clearMaskEditMode: () => void;
    enterMaskEditMode: (id: string) => void;
    maskDrawMode: {
        id: string;
        tool: 'pen' | 'rect' | 'ellipse';
    } | null;
    enterMaskDrawMode: (id: string, tool: 'pen' | 'rect' | 'ellipse') => void;
    clearMaskDrawMode: () => void;
    moveObject: (id: string, dx: number, dy: number) => void;
    setContextMenu: (state: {
        x: number;
        y: number;
        targetId: string | null;
    } | null) => void;
    selectAll: () => void;
    bringForward: (id: string) => void;
    sendBackward: (id: string) => void;
    bringToFront: (id: string) => void;
    sendToBack: (id: string) => void;
    duplicateObject: (id: string, offsetX?: number, offsetY?: number) => void;
    duplicateObjectAtOrigin: (id: string, originPos: {
        x: number;
        y: number;
    } | {
        frameX: number;
        frameY: number;
    }, finalPos: {
        x: number;
        y: number;
    } | {
        frameX: number;
        frameY: number;
    }) => void;
}
export declare const useCanvasStore: import("zustand").UseBoundStore<import("zustand").StoreApi<CanvasState>>;
export {};
