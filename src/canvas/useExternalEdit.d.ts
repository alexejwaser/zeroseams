export declare function useExternalEdit(): {
    editExternally: (objectId: string, projectFilePath: string | null) => Promise<void>;
    stopEditing: (objectId: string) => Promise<void>;
    activeObjectId: string | null;
};
