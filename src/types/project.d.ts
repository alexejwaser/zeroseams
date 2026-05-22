import type { CanvasObject } from './canvas';
export type Platform = 'instagram' | 'tiktok' | 'facebook' | 'threads' | 'custom';
export type FrameRatio = 'square' | 'portrait' | 'story' | 'landscape' | 'custom';
/** Pixel dimensions of a single frame */
export interface FrameDimensions {
    width: number;
    height: number;
}
/** One Instagram slide in the carousel */
export interface Frame {
    /** Zero-based index in the carousel sequence */
    index: number;
    /** Human-readable label, e.g. "Slide 1" */
    label: string;
    /** Per-frame background color override (inherits project default if null) */
    backgroundColor: string | null;
}
export interface CarouselProject {
    id: string;
    name: string;
    platform?: Platform;
    ratio: FrameRatio;
    dimensions: FrameDimensions;
    frameCount: number;
    frames: Frame[];
    /** Background color for the entire canvas */
    backgroundColor: string;
    /** All canvas objects keyed by id for O(1) lookup */
    objects: Record<string, CanvasObject>;
    /** Render order (bottom → top) */
    objectOrder: string[];
    createdAt: string;
    updatedAt: string;
    version: number;
}
