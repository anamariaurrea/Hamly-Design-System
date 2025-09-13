/**
 * Generated from /Users/amus/Desktop/TFE/tokens/Hamly.json
 * Contains motion tokens for animation durations and easings.
 *
 * Example:
 * import { motion } from './motion';
 */

// No motion tokens found in Hamly.json, using fallback values.
export const motion = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 600
  },
  easing: {
    standard: 'ease-in-out',
    decelerate: 'cubic-bezier(0.0,0.0,0.2,1)',
    accelerate: 'cubic-bezier(0.4,0.0,1,1)'
  }
} as const;

export type Motion = typeof motion;
