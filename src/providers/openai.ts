import OpenAI from "openai";
import { AiProvider, ChatOptions, Message } from "../types";

export class OpenAIProvider implements AiProvider {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async chat(messages: Message[], options?: ChatOptions): Promise<Message> {
    // Handle streaming vs non-streaming differently
    if (options?.stream) {
      throw new Error("Streaming responses not implemented in this example");
    }

    const response = await this.openai.chat.completions.create({
      model: options?.model || "gpt-3.5-turbo",
      messages: messages.map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
      temperature: options?.temperature || 0.7,
      max_tokens: options?.maxTokens,
      stream: false, // Explicitly disable streaming for this implementation
    });

    return {
      role: "assistant",
      content: response.choices[0]?.message?.content || "",
    };
  }

  async complete(prompt: string, options?: ChatOptions): Promise<string> {
    const response = await this.openai.completions.create({
      model: options?.model || "text-davinci-003",
      prompt,
      temperature: options?.temperature || 0.7,
      max_tokens: options?.maxTokens,
    });

    return response.choices[0]?.text || "";
  }
}
