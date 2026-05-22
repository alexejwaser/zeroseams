import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Rect, Line, Text, Group } from 'react-konva';
import { useCanvasStore } from './useCanvasStore';
export function FrameGuides({ frameCount, frames, frameHeight, backgroundColor }) {
    const frameWidth = useCanvasStore((s) => s.frameWidth);
    const totalWidth = frameCount * frameWidth;
    return (_jsxs(Group, { children: [Array.from({ length: frameCount }, (_, i) => {
                const frame = frames[i];
                const fill = frame?.backgroundColor ?? backgroundColor;
                return (_jsx(Rect, { x: i * frameWidth, y: 0, width: frameWidth, height: frameHeight, fill: fill }, `bg-${i}`));
            }), Array.from({ length: frameCount - 1 }, (_, i) => {
                const x = (i + 1) * frameWidth;
                return (_jsx(Line, { points: [x, 0, x, frameHeight], stroke: "red", strokeWidth: 2, dash: [10, 6] }, `divider-${i}`));
            }), Array.from({ length: frameCount }, (_, i) => {
                const centerX = i * frameWidth + frameWidth / 2;
                return (_jsx(Text, { text: String(i + 1), x: centerX - 12, y: 16, fontSize: 24, fontFamily: "sans-serif", fill: "red", align: "center", width: 24 }, `label-${i}`));
            }), _jsx(Rect, { x: 0, y: 0, width: totalWidth, height: frameHeight, fill: "transparent", listening: false })] }));
}
