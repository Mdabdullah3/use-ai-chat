import { AiProvider, ChatOptions } from "../types";
export declare function useAiCompletion(provider: AiProvider): {
    completion: string;
    complete: (prompt: string, options?: ChatOptions) => Promise<void>;
    isLoading: boolean;
    error: string | null;
};
