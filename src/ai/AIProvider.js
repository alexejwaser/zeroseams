import { jsx as _jsx } from "react/jsx-runtime";
import { useBackgroundRemoval } from './useBackgroundRemoval';
import { AIContext } from './AIContext';
export function AIProvider({ children }) {
    const { removeBg, getOperation } = useBackgroundRemoval();
    return (_jsx(AIContext.Provider, { value: { removeBg, getOperation }, children: children }));
}
