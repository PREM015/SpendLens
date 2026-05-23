// ─── Tool Names ─────────────────────────────────────────────────────────────
export const TOOL_NAMES = [
  'chatgpt',
  'claude',
  'github_copilot',
  'cursor',
  'midjourney',
  'jasper',
  'notion_ai',
  'perplexity',
] as const;

export type ToolName = (typeof TOOL_NAMES)[number];

export const TOOL_DISPLAY_NAMES: Record<ToolName, string> = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  github_copilot: 'GitHub Copilot',
  cursor: 'Cursor',
  midjourney: 'Midjourney',
  jasper: 'Jasper AI',
  notion_ai: 'Notion AI',
  perplexity: 'Perplexity',
};

export const TOOL_COLORS: Record<ToolName, string> = {
  chatgpt: '#10a37f',
  claude: '#d4a574',
  github_copilot: '#6e40c9',
  cursor: '#00e5a0',
  midjourney: '#2a52be',
  jasper: '#ff5c35',
  notion_ai: '#000000',
  perplexity: '#20808d',
};

// ─── Plan Names ─────────────────────────────────────────────────────────────
export const PLAN_NAMES = [
  'free',
  'pro',
  'team',
  'enterprise',
  'business',
  'plus',
  'standard',
  'basic',
] as const;

export type PlanName = (typeof PLAN_NAMES)[number];

export const PLAN_DISPLAY_NAMES: Record<PlanName, string> = {
  free: 'Free',
  pro: 'Pro',
  team: 'Team',
  enterprise: 'Enterprise',
  business: 'Business',
  plus: 'Plus',
  standard: 'Standard',
  basic: 'Basic',
};

/** Plans available for each tool */
export const TOOL_PLANS: Record<ToolName, PlanName[]> = {
  chatgpt: ['free', 'plus', 'team', 'enterprise'],
  claude: ['free', 'pro', 'team', 'enterprise'],
  github_copilot: ['free', 'pro', 'business', 'enterprise'],
  cursor: ['free', 'pro', 'business'],
  midjourney: ['basic', 'standard', 'pro'],
  jasper: ['pro', 'business', 'enterprise'],
  notion_ai: ['plus', 'business', 'enterprise'],
  perplexity: ['free', 'pro', 'enterprise'],
};

// ─── Use Cases ──────────────────────────────────────────────────────────────
export const USE_CASES = [
  'coding',
  'writing',
  'data',
  'research',
  'mixed',
] as const;

export type UseCase = (typeof USE_CASES)[number];

export const USE_CASE_DISPLAY_NAMES: Record<UseCase, string> = {
  coding: 'Software Development',
  writing: 'Content & Writing',
  data: 'Data Analysis',
  research: 'Research',
  mixed: 'Mixed / General',
};

export const USE_CASE_DESCRIPTIONS: Record<UseCase, string> = {
  coding: 'Building software, writing code, code review',
  writing: 'Content creation, copywriting, documentation',
  data: 'Data analysis, visualization, reporting',
  research: 'Market research, competitive analysis, learning',
  mixed: 'Multiple use cases across the team',
};

// ─── Recommendation Actions ────────────────────────────────────────────────
export const RECOMMENDATION_ACTIONS = [
  'keep',
  'downgrade',
  'switch',
  'drop',
] as const;

export type RecommendationAction = (typeof RECOMMENDATION_ACTIONS)[number];

export const ACTION_DISPLAY_NAMES: Record<RecommendationAction, string> = {
  keep: 'Keep Current Plan',
  downgrade: 'Downgrade Plan',
  switch: 'Switch Tool',
  drop: 'Drop Tool',
};

export const ACTION_COLORS: Record<RecommendationAction, string> = {
  keep: 'text-emerald-400',
  downgrade: 'text-amber-400',
  switch: 'text-violet-400',
  drop: 'text-red-400',
};

// ─── App Constants ──────────────────────────────────────────────────────────
export const APP_NAME = 'SpendLens';
export const APP_DESCRIPTION =
  'Find out exactly where your AI budget is leaking. Free AI spend audit in 2 minutes.';
export const CREDEX_URL = 'https://credex.co';
export const CREDEX_SAVINGS_THRESHOLD = 500; // $500/mo threshold for CTA
