/**
 * Generated from /Users/amus/Desktop/TFE/tokens/Hamly.json
 * Contains typography scale for font sizes, weights, and line heights.
 *
 * Example:
 * import { typography } from './typography';
 */

// No typography scale found in Hamly.json, using fallback values.
export const typography = {
  xs: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  sm: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  md: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  lg: { fontSize: 20, fontWeight: '500', lineHeight: 28 },
  xl: { fontSize: 24, fontWeight: '500', lineHeight: 32 },
  xxl: { fontSize: 32, fontWeight: '600', lineHeight: 40 }
} as const;

export type Typography = typeof typography;
