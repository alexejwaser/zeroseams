import type { TextObject, TextSpan, TextSpanStyle, FontStyle } from '@/types/canvas';
/** Convert a FontStyle value to CSS fontWeight + fontStyle pair */
export declare function fontStyleToCSS(fontStyle: FontStyle): {
    fontWeight: string;
    fontStyle: string;
};
/** Full text string derived from spans */
export declare function spanText(obj: TextObject): string;
/** Merged style for a single span: layer defaults overridden by span-level style */
export interface ResolvedSpanStyle {
    fontFamily: string;
    fontSize: number;
    fontStyle: FontStyle;
    fill: string;
    letterSpacing: number;
}
export declare function resolveSpanStyle(obj: TextObject, spanIdx: number): ResolvedSpanStyle;
/**
 * Returns the style for a character selection range [start, end).
 * Fields that differ across spans covered by the range are returned as undefined (mixed).
 */
export interface SelectionStyle {
    fontFamily: string | undefined;
    fontSize: number | undefined;
    fontStyle: FontStyle | undefined;
    fill: string | undefined;
    letterSpacing: number | undefined;
}
export declare function getSelectionStyle(obj: TextObject, start: number, end: number): SelectionStyle;
/**
 * Apply a style override to a character range [start, end).
 * Splits spans at boundaries, applies style, then merges adjacent identical spans.
 * No-op when start === end.
 */
export declare function applyStyleToRange(obj: TextObject, start: number, end: number, style: TextSpanStyle): TextSpan[];
/**
 * Clear per-span overrides for the properties being updated, so the new layer-level
 * default becomes the single source of truth. Avoids every span accumulating a pinned
 * override identical to the layer default, which would make mixed-state detection wrong.
 */
export declare function applyStyleToAll(obj: TextObject, style: TextSpanStyle): TextSpan[];
