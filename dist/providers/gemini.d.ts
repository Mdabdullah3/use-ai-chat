import { AiProvider, ChatOptions, Message } from "../types";
export declare class GeminiProvider implements AiProvider {
    private genAI;
    constructor(apiKey: string);
    chat(messages: Message[], options?: ChatOptions): Promise<Message>;
    complete(prompt: string, options?: ChatOptions): Promise<string>;
}
