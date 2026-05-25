export interface ToolSeoData {
  slug: string;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  features: string[];
  pricingTiers: { name: string; price: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const TOOL_SEO_DATA: ToolSeoData[] = [
  {
    slug: 'cursor-pricing-audit',
    name: 'Cursor',
    description: 'Audit and optimize your team\'s Cursor AI editor subscriptions.',
    metaTitle: 'Cursor Pricing Audit & Optimization | SpendLens',
    metaDescription: 'Find out if you are overpaying for Cursor. Audit your team\'s usage, consolidate seats, and optimize your Cursor AI editor spend.',
    features: ['AI Code Completion', 'Codebase Chat', 'Privacy Mode', 'GPT-4 Integration'],
    pricingTiers: [
      { name: 'Basic', price: 'Free', description: 'For hobbyists' },
      { name: 'Pro', price: '$20/mo', description: 'For professional developers' },
      { name: 'Business', price: '$40/user/mo', description: 'For teams with privacy needs' }
    ],
    faqs: [
      { question: 'How can I save on Cursor?', answer: 'Many teams over-provision Business seats for developers who only need Pro, or leave inactive seats provisioned.' }
    ]
  },
  {
    slug: 'github-copilot-pricing-audit',
    name: 'GitHub Copilot',
    description: 'Audit and optimize your GitHub Copilot Business and Enterprise spend.',
    metaTitle: 'GitHub Copilot Pricing Audit & Optimization | SpendLens',
    metaDescription: 'Stop wasting money on inactive GitHub Copilot seats. Run an instant audit to consolidate your Copilot spend.',
    features: ['Code Completion', 'Chat in IDE', 'CLI Assistance', 'Enterprise Security'],
    pricingTiers: [
      { name: 'Individual', price: '$10/mo', description: 'For individual developers' },
      { name: 'Business', price: '$19/user/mo', description: 'For organizations' },
      { name: 'Enterprise', price: '$39/user/mo', description: 'For large enterprises' }
    ],
    faqs: [
      { question: 'Why is my Copilot bill so high?', answer: 'GitHub bills for all assigned seats, even if the user hasn\'t opened their IDE in months. Regular audits are essential.' }
    ]
  },
  {
    slug: 'chatgpt-pricing-audit',
    name: 'ChatGPT',
    description: 'Optimize your OpenAI ChatGPT Plus, Team, and Enterprise subscriptions.',
    metaTitle: 'ChatGPT Pricing Audit & Spend Optimization | SpendLens',
    metaDescription: 'Audit your ChatGPT team usage. Consolidate individual Plus accounts into Team plans or identify unused seats.',
    features: ['GPT-4o Access', 'DALL-E 3', 'Advanced Data Analysis', 'Team Workspaces'],
    pricingTiers: [
      { name: 'Plus', price: '$20/mo', description: 'For individuals' },
      { name: 'Team', price: '$25/user/mo', description: 'For teams (min 2 users)' },
      { name: 'Enterprise', price: 'Custom', description: 'For large scale deployments' }
    ],
    faqs: [
      { question: 'Should we use Team or individual Plus accounts?', answer: 'If you have 2+ users, Team is better for privacy and centralized billing, though slightly more expensive per seat.' }
    ]
  },
  {
    slug: 'claude-pricing-audit',
    name: 'Claude',
    description: 'Audit and optimize your Anthropic Claude Pro and Team spend.',
    metaTitle: 'Claude Pricing Audit & Spend Optimization | SpendLens',
    metaDescription: 'Stop overpaying for Claude subscriptions. Audit your team\'s usage and consolidate seats instantly.',
    features: ['Claude 3.5 Sonnet & Opus', 'Artifacts', '200K Context Window', 'Team Workspaces'],
    pricingTiers: [
      { name: 'Pro', price: '$20/mo', description: 'For individuals' },
      { name: 'Team', price: '$30/user/mo', description: 'For organizations (min 5 users)' },
      { name: 'Enterprise', price: 'Custom', description: 'For large scale deployments' }
    ],
    faqs: [
      { question: 'Should we use Claude Team or individual Pro accounts?', answer: 'Team is better for centralized billing, but has a 5-user minimum. Smaller teams often overpay by using Team instead of reimbursing Pro.' }
    ]
  },
  {
    slug: 'midjourney-pricing-audit',
    name: 'Midjourney',
    description: 'Optimize your Midjourney Basic, Standard, and Pro plan spending.',
    metaTitle: 'Midjourney Pricing Audit & Optimization | SpendLens',
    metaDescription: 'Analyze your team\'s Midjourney image generation usage. Downgrade inactive users and save on your subscription.',
    features: ['High-Quality Image Gen', 'Stealth Mode', 'Fast GPU Time', 'Relaxed GPU Time'],
    pricingTiers: [
      { name: 'Basic', price: '$10/mo', description: 'For hobbyists' },
      { name: 'Standard', price: '$30/mo', description: 'For regular users' },
      { name: 'Pro', price: '$60/mo', description: 'For power users needing stealth' }
    ],
    faqs: [
      { question: 'Why am I paying $60/mo for Midjourney?', answer: 'The Pro plan includes Stealth Mode. If your team doesn\'t require private generations, downgrading to Standard saves 50%.' }
    ]
  },
  {
    slug: 'jasper-pricing-audit',
    name: 'Jasper AI',
    description: 'Audit your Jasper AI marketing and content generation spend.',
    metaTitle: 'Jasper AI Pricing Audit & Optimization | SpendLens',
    metaDescription: 'Identify unused Jasper AI seats and optimize your marketing team\'s AI budget with our free audit tool.',
    features: ['Brand Voice', 'Marketing Campaigns', 'SEO Integration', 'Browser Extension'],
    pricingTiers: [
      { name: 'Creator', price: '$49/mo', description: 'For individual creators' },
      { name: 'Pro', price: '$69/seat/mo', description: 'For small teams' },
      { name: 'Business', price: 'Custom', description: 'For large marketing departments' }
    ],
    faqs: [
      { question: 'Is Jasper Business worth it over Pro?', answer: 'Business includes custom brand voices and API access. If you only use basic templates, Pro is more cost-effective.' }
    ]
  },
  {
    slug: 'notion-ai-pricing-audit',
    name: 'Notion AI',
    description: 'Optimize your Notion AI workspace add-on subscriptions.',
    metaTitle: 'Notion AI Pricing Audit & Spend Optimization | SpendLens',
    metaDescription: 'Notion AI charges per workspace member. Find out if you are paying for members who don\'t use AI features.',
    features: ['Q&A', 'Writing Assistant', 'Autofill Tables', 'Translation'],
    pricingTiers: [
      { name: 'Add-on', price: '$8-$10/user/mo', description: 'Billed per workspace member' }
    ],
    faqs: [
      { question: 'Can I buy Notion AI for only a few team members?', answer: 'No, Notion AI is billed for your entire workspace. If only a few people use it, you might be wasting budget.' }
    ]
  },
  {
    slug: 'perplexity-pricing-audit',
    name: 'Perplexity',
    description: 'Audit your Perplexity Pro and Enterprise Pro spend.',
    metaTitle: 'Perplexity Pricing Audit & Optimization | SpendLens',
    metaDescription: 'Audit your team\'s Perplexity usage to ensure you aren\'t overpaying for unused Pro accounts.',
    features: ['Copilot Search', 'Unlimited File Uploads', 'API Credits', 'Data Privacy'],
    pricingTiers: [
      { name: 'Pro', price: '$20/mo', description: 'For individuals' },
      { name: 'Enterprise Pro', price: '$40/user/mo', description: 'For teams with data privacy needs' }
    ],
    faqs: [
      { question: 'What is the benefit of Enterprise Pro?', answer: 'Enterprise Pro ensures your data isn\'t used for training. If privacy isn\'t a strict concern, reimbursing individual Pro accounts saves 50%.' }
    ]
  }
];
