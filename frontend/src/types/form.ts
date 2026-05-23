export type ToolId =
  | 'cursor'
  | 'copilot'
  | 'claude'
  | 'chatgpt'
  | 'anthropic_api'
  | 'openai_api'
  | 'gemini'
  | 'windsurf';

export type UseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed';

export interface ToolEntry {
  id: string;
  tool: ToolId;
  plan: string;
  seats: number;
  monthlySpend: number;
  useCase: UseCase;
}

export interface FormState {
  tools: ToolEntry[];
  teamSize: number;
  primaryUseCase: UseCase;
}
