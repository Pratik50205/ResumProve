import { AIProvider } from "@/types/ai";
import { GeminiAIProvider } from "./geminiProvider";

let globalProvider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (!globalProvider) {
    globalProvider = new GeminiAIProvider();
  }
  return globalProvider;
}

export * from "./factLockGuardrails";
export * from "./mockProvider";
export * from "./geminiProvider";

