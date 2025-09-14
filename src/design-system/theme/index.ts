/**
 * Generated from /Users/amus/Desktop/TFE/tokens/Hamly.json
 * Theme builder for React Native Paper using design-system tokens.
 *
 * Example:
 * import { buildLightTheme, buildDarkTheme, spacing, getRadius, typographyScale, tokens } from './theme';
 */

import { palettes, schemes } from '../tokens/color';
import { spacing as spacingTokens } from '../tokens/spacing';
import { typography } from '../tokens/typography';
import { radius as radiusTokens, getPillRadius } from '../tokens/radius';
import { motion } from '../tokens/motion';
import { MD3LightTheme, configureFonts, type MD3Theme } from 'react-native-paper';
import { buildThemeFromTokens } from './fromMaterialBuilder';

export const tokens = {
  palettes,
  schemes,
  spacing: spacingTokens,
  typography,
  radius: radiusTokens,
  motion
} as const;

export type DesignSystemTheme = MD3Theme;

export function buildLightTheme(): DesignSystemTheme {
  return buildThemeFromTokens(tokens, 'light');
}

export function buildDarkTheme(): DesignSystemTheme {
  return buildThemeFromTokens(tokens, 'dark');
}

// Exporto un theme por defecto (light) para uso rápido en Provider.
// Si prefieres no exportar un theme por defecto, quita esta línea y modifica DesignSystemProvider.
export const paperTheme = buildLightTheme();

// Hereda todos los fonts MD3 y permite overrides
const fonts = configureFonts({
  config: {
    ...MD3LightTheme.fonts,
    // Ejemplo de override:
    // labelMedium: { ...MD3LightTheme.fonts.labelMedium, fontWeight: '600' },
  },
});

// Construye el theme con tus tokens y combina los fonts MD3
const baseTheme = buildLightTheme();

export const theme: MD3Theme = {
  ...baseTheme,
  fonts,
};

export function spacing(multiplier: number = 1): number {
  // Usa spacing.base si existe, sino fallback a 8
  const base = spacingTokens.sm ?? 8;
  return base * multiplier;
}

export function getRadius(size: 'sm' | 'md' | 'lg' | number = 'md'): number {
  if (typeof size === 'number') return size;
  return radiusTokens[size] ?? 8;
}

export function typographyScale(key: string) {
  return typography[key as keyof typeof typography] ?? typography.md;
}

export { getPillRadius } from '../tokens/radius';
