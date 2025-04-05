import { useState, useCallback } from "react";
import { AiProvider, ChatOptions } from "../types";

export function useAiCompletion(provider: AiProvider) {
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const complete = useCallback(
    async (prompt: string, options?: ChatOptions) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await provider.complete(prompt, options);
        setCompletion(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to complete text"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [provider]
  );

  return { completion, complete, isLoading, error };
}
