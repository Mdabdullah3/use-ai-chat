import { Message, AiProvider, ChatOptions } from "../types";
export declare function useAiChat(provider: AiProvider, initialMessages?: Message[]): {
    messages: Message[];
    sendMessage: (content: string, options?: ChatOptions) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    clearMessages: () => void;
};
