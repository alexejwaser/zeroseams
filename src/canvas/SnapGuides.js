import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Line } from 'react-konva';
export function SnapGuides({ guides, totalWidth, totalHeight }) {
    return (_jsx(_Fragment, { children: guides.map((guide, index) => {
            const color = guide.kind === 'frame' ? '#ff3b5c' : '#0096ff';
            if (guide.orientation === 'h') {
                return (_jsx(Line, { points: [0, guide.position, totalWidth, guide.position], stroke: color, strokeWidth: 1, strokeScaleEnabled: false, perfectDrawEnabled: false, listening: false }, `guide-h-${index}`));
            }
            return (_jsx(Line, { points: [guide.position, 0, guide.position, totalHeight], stroke: color, strokeWidth: 1, strokeScaleEnabled: false, perfectDrawEnabled: false, listening: false }, `guide-v-${index}`));
        }) }));
}
