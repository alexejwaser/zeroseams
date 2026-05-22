import { createContext, useContext } from 'react';
export const AIContext = createContext(null);
export function useAI() {
    const ctx = useContext(AIContext);
    if (!ctx)
        throw new Error('useAI must be used inside AIProvider');
    return ctx;
}
