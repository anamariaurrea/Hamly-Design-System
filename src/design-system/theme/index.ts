/**
 * Generated from /Users/amus/Desktop/TFE/tokens/Hamly.json
 * Theme builder for React Native Paper using design-system tokens.
 *
 * Example:
 * import { buildLightTheme, buildDarkTheme, tokens } from './theme';
 */

import { palettes, schemes } from '../tokens/color';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';
import { radius } from '../tokens/radius';
import { motion } from '../tokens/motion';

export const tokens = {
  palettes,
  schemes,
  spacing,
  typography,
  radius,
  motion
} as const;

function buildTheme(scheme: typeof schemes.light, dark: boolean) {
  return {
    dark,
    roundness: radius.md,
    colors: {
      primary: scheme.primary,
      accent: scheme.secondary,
      background: scheme.background,
      surface: scheme.surface,
      text: scheme.onSurface,
      disabled: scheme.outline,
      placeholder: scheme.outlineVariant,
      backdrop: scheme.scrim,
      notification: scheme.error,
      error: scheme.error
    },
    fonts: {
      regular: typography.md,
      medium: typography.lg,
      light: typography.sm,
      thin: typography.xs
    },
    animation: {
      scale: 1,
      ...motion.duration
    },
    tokens
  };
}

export function buildLightTheme() {
  return buildTheme(schemes.light, false);
}

export function buildDarkTheme() {
  return buildTheme(schemes.dark, true);
}

export default tokens;
