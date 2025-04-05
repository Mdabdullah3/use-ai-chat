import { AiProvider, ChatOptions, Message } from "../types";
export declare class OpenAIProvider implements AiProvider {
    private openai;
    constructor(apiKey: string);
    chat(messages: Message[], options?: ChatOptions): Promise<Message>;
    complete(prompt: string, options?: ChatOptions): Promise<string>;
}
