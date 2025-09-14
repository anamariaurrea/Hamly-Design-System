/**
 * Generated from /Users/amus/Desktop/TFE/tokens/Hamly.json
 * Contains border radius tokens for UI elements.
 *
 * Example:
 * import { radius } from './radius';
 */

// No radii found in Hamly.json, using fallback values.
export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  round: 9999, // óvalo según alto
  // Nota: 'pill' es una intención; el valor real depende del alto
} as const;

export type Radius = typeof radius;

export const getPillRadius = (height: number) => Math.round(height / 2);
