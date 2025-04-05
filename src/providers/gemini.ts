import { GoogleGenerativeAI } from "@google/generative-ai";
import { AiProvider, ChatOptions, Message } from "../types";

export class GeminiProvider implements AiProvider {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async chat(messages: Message[], options?: ChatOptions): Promise<Message> {
    const model = this.genAI.getGenerativeModel({
      model: options?.model || "gemini-pro",
    });

    const chat = model.startChat({
      history: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : m.role,
        parts: [{ text: m.content }],
      })),
    });

    const result = await chat.sendMessage(
      messages[messages.length - 1].content
    );
    const response = await result.response;
    return {
      role: "assistant",
      content: response.text(),
    };
  }

  async complete(prompt: string, options?: ChatOptions): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: options?.model || "gemini-pro",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }
}
