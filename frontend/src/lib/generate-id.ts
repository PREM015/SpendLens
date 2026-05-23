import { nanoid } from 'nanoid';

/**
 * Generate a URL-safe, unique audit ID (12 characters).
 * Uses nanoid for collision-resistant random IDs.
 */
export function generateAuditId(): string {
  return nanoid(12);
}
