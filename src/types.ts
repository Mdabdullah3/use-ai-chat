export type MessageRole = "user" | "assistant" | "system";

export type Message = {
  role: MessageRole;
  content: string;
};

export type ChatOptions = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
};

export type AiProvider = {
  chat(messages: Message[], options?: ChatOptions): Promise<Message>;
  complete(prompt: string, options?: ChatOptions): Promise<string>;
};
