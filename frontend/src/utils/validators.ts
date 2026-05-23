import { z } from 'zod';

/** Email validation */
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(254, 'Email is too long');

/** Monthly spend validation */
export const spendSchema = z
  .number({ message: 'Enter a valid amount' })
  .min(0, 'Spend cannot be negative')
  .max(1_000_000, 'Spend seems too high — double-check the amount');

/** Seat count validation */
export const seatsSchema = z
  .number({ message: 'Enter a valid number' })
  .int('Seats must be a whole number')
  .min(1, 'At least 1 seat required')
  .max(100_000, 'Seat count seems too high');

/** Team size validation */
export const teamSizeSchema = z
  .number({ message: 'Enter a valid number' })
  .int('Team size must be a whole number')
  .min(1, 'At least 1 team member required')
  .max(100_000, 'Team size seems too high');

/** Company name validation */
export const companySchema = z
  .string()
  .max(200, 'Company name is too long')
  .optional();

/** Role validation */
export const roleSchema = z
  .string()
  .max(200, 'Role is too long')
  .optional();

/**
 * Validate an email address string.
 * Returns { valid: true } or { valid: false, error: string }
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const result = emailSchema.safeParse(email);
  if (result.success) return { valid: true };
  return { valid: false, error: result.error.issues[0]?.message ?? 'Invalid email' };
}

/**
 * Validate spend amount.
 */
export function validateSpend(amount: number): { valid: boolean; error?: string } {
  const result = spendSchema.safeParse(amount);
  if (result.success) return { valid: true };
  return { valid: false, error: result.error.issues[0]?.message ?? 'Invalid amount' };
}

/**
 * Validate seat count.
 */
export function validateSeats(seats: number): { valid: boolean; error?: string } {
  const result = seatsSchema.safeParse(seats);
  if (result.success) return { valid: true };
  return { valid: false, error: result.error.issues[0]?.message ?? 'Invalid seat count' };
}
