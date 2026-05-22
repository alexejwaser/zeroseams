import { create } from 'zustand';
export const useAIStore = create((set) => ({
    operations: {},
    upsertOperation: (op) => set((state) => ({
        operations: { ...state.operations, [op.id]: op },
    })),
    clearOperation: (id) => set((state) => {
        const { [id]: _removed, ...rest } = state.operations;
        return { operations: rest };
    }),
}));
