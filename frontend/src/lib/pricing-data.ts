import type { ToolId } from '@/types/form';

export interface PlanInfo {
  name: string;
  monthly_usd_per_seat: number;
  min_seats?: number;
  is_custom?: boolean;
  is_pay_per_token?: boolean;
  source_url: string;
}

export interface ToolPricing {
  display_name: string;
  plans: PlanInfo[];
}

export const PRICING: Record<ToolId, ToolPricing> = {
  cursor: {
    display_name: 'Cursor',
    plans: [
      {
        name: 'Hobby',
        monthly_usd_per_seat: 0,
        source_url: 'https://www.cursor.com/pricing',
      },
      {
        name: 'Pro',
        monthly_usd_per_seat: 20,
        source_url: 'https://www.cursor.com/pricing',
      },
      {
        name: 'Business',
        monthly_usd_per_seat: 40,
        source_url: 'https://www.cursor.com/pricing',
      },
    ],
  },
  copilot: {
    display_name: 'GitHub Copilot',
    plans: [
      {
        name: 'Individual',
        monthly_usd_per_seat: 10,
        source_url: 'https://github.com/features/copilot#pricing',
      },
      {
        name: 'Business',
        monthly_usd_per_seat: 19,
        source_url: 'https://github.com/features/copilot#pricing',
      },
      {
        name: 'Enterprise',
        monthly_usd_per_seat: 39,
        source_url: 'https://github.com/features/copilot#pricing',
      },
    ],
  },
  claude: {
    display_name: 'Claude',
    plans: [
      {
        name: 'Free',
        monthly_usd_per_seat: 0,
        source_url: 'https://www.anthropic.com/pricing',
      },
      {
        name: 'Pro',
        monthly_usd_per_seat: 20,
        source_url: 'https://www.anthropic.com/pricing',
      },
      {
        name: 'Max',
        monthly_usd_per_seat: 100,
        source_url: 'https://www.anthropic.com/pricing',
      },
      {
        name: 'Team',
        monthly_usd_per_seat: 30,
        min_seats: 5,
        source_url: 'https://www.anthropic.com/pricing',
      },
    ],
  },
  chatgpt: {
    display_name: 'ChatGPT',
    plans: [
      {
        name: 'Free',
        monthly_usd_per_seat: 0,
        source_url: 'https://openai.com/chatgpt/pricing/',
      },
      {
        name: 'Plus',
        monthly_usd_per_seat: 20,
        source_url: 'https://openai.com/chatgpt/pricing/',
      },
      {
        name: 'Team',
        monthly_usd_per_seat: 30,
        min_seats: 2,
        source_url: 'https://openai.com/chatgpt/pricing/',
      },
      {
        name: 'Enterprise',
        monthly_usd_per_seat: 0,
        is_custom: true,
        source_url: 'https://openai.com/chatgpt/pricing/',
      },
    ],
  },
  anthropic_api: {
    display_name: 'Anthropic API',
    plans: [
      {
        name: 'Pay-per-token',
        monthly_usd_per_seat: 0,
        is_pay_per_token: true,
        source_url: 'https://www.anthropic.com/pricing#702702',
      },
    ],
  },
  openai_api: {
    display_name: 'OpenAI API',
    plans: [
      {
        name: 'Pay-per-token',
        monthly_usd_per_seat: 0,
        is_pay_per_token: true,
        source_url: 'https://openai.com/api/pricing/',
      },
    ],
  },
  gemini: {
    display_name: 'Google Gemini',
    plans: [
      {
        name: 'Free',
        monthly_usd_per_seat: 0,
        source_url: 'https://gemini.google.com/',
      },
      {
        name: 'Advanced',
        monthly_usd_per_seat: 19.99,
        source_url: 'https://one.google.com/about/ai-premium',
      },
    ],
  },
  windsurf: {
    display_name: 'Windsurf',
    plans: [
      {
        name: 'Free',
        monthly_usd_per_seat: 0,
        source_url: 'https://windsurf.com/pricing',
      },
      {
        name: 'Pro',
        monthly_usd_per_seat: 15,
        source_url: 'https://windsurf.com/pricing',
      },
      {
        name: 'Teams',
        monthly_usd_per_seat: 35,
        source_url: 'https://windsurf.com/pricing',
      },
    ],
  },
};

/**
 * Get all plan information for a given tool.
 */
export function getToolPlans(toolId: ToolId): PlanInfo[] {
  return PRICING[toolId].plans;
}

/**
 * Get the monthly USD per-seat price for a specific tool + plan combo.
 * Returns null if the plan is not found.
 */
export function getPlanPrice(toolId: ToolId, planName: string): number | null {
  const plan = PRICING[toolId].plans.find(
    (p) => p.name.toLowerCase() === planName.toLowerCase()
  );
  return plan ? plan.monthly_usd_per_seat : null;
}

/**
 * Get the human-friendly display name for a tool.
 */
export function getToolDisplayName(toolId: ToolId): string {
  return PRICING[toolId].display_name;
}
