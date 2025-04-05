import { useState, useCallback } from "react";
import { Message, AiProvider, ChatOptions } from "../types";

export function useAiChat(
  provider: AiProvider,
  initialMessages: Message[] = []
) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string, options?: ChatOptions) => {
      setIsLoading(true);
      setError(null);

      try {
        // Add user message
        const userMessage: Message = { role: "user", content };
        setMessages((prev) => [...prev, userMessage]);

        // Get AI response
        const aiResponse = await provider.chat(
          [...messages, userMessage],
          options
        );
        setMessages((prev) => [...prev, aiResponse]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send message");
      } finally {
        setIsLoading(false);
      }
    },
    [messages, provider]
  );

  const clearMessages = useCallback(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  return { messages, sendMessage, isLoading, error, clearMessages };
}
