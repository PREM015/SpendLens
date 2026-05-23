import { z } from 'zod';

const VALID_TOOL_IDS = [
  'cursor',
  'copilot',
  'claude',
  'chatgpt',
  'anthropic_api',
  'openai_api',
  'gemini',
  'windsurf',
] as const;

const VALID_USE_CASES = ['coding', 'writing', 'data', 'research', 'mixed'] as const;

/**
 * Schema for a single tool entry in the audit form.
 */
export const ToolEntrySchema = z.object({
  id: z.string().min(1, 'Tool entry ID is required'),
  tool: z.enum(VALID_TOOL_IDS, {
    message: `Tool must be one of: ${VALID_TOOL_IDS.join(', ')}`,
  }),
  plan: z.string().min(1, 'Plan name is required'),
  seats: z
    .number()
    .int('Seats must be a whole number')
    .min(1, 'At least 1 seat is required')
    .max(10_000, 'Seats cannot exceed 10,000'),
  monthlySpend: z
    .number()
    .min(0, 'Monthly spend cannot be negative')
    .max(1_000_000, 'Monthly spend cannot exceed $1,000,000'),
  useCase: z.enum(VALID_USE_CASES, {
    message: `Use case must be one of: ${VALID_USE_CASES.join(', ')}`,
  }),
});

/**
 * Schema for the complete form state submitted for audit.
 */
export const FormStateSchema = z.object({
  tools: z
    .array(ToolEntrySchema)
    .min(1, 'At least one tool is required')
    .max(20, 'Maximum 20 tools allowed'),
  teamSize: z
    .number()
    .int('Team size must be a whole number')
    .min(1, 'Team size must be at least 1')
    .max(100_000, 'Team size cannot exceed 100,000'),
  primaryUseCase: z.enum(VALID_USE_CASES, {
    message: `Primary use case must be one of: ${VALID_USE_CASES.join(', ')}`,
  }),
});

/**
 * Schema for lead capture form submission.
 */
export const LeadFormSchema = z.object({
  auditId: z.string().min(1, 'Audit ID is required'),
  email: z
    .string()
    .email('A valid email address is required')
    .max(320, 'Email address is too long'),
  company: z
    .string()
    .max(200, 'Company name is too long')
    .optional(),
  role: z
    .string()
    .max(100, 'Role is too long')
    .optional(),
  teamSize: z
    .number()
    .int()
    .min(1)
    .max(100_000)
    .optional(),
  website: z
    .string()
    .url('Website must be a valid URL')
    .max(500, 'Website URL is too long')
    .optional()
    .or(z.literal('')),
});

export type ValidatedToolEntry = z.infer<typeof ToolEntrySchema>;
export type ValidatedFormState = z.infer<typeof FormStateSchema>;
export type ValidatedLeadForm = z.infer<typeof LeadFormSchema>;
