/**
 * Generated from /Users/amus/Desktop/TFE/tokens/Hamly.json
 * Contains full MD3 typography scale for font sizes, weights, and line heights.
 * You can override only the values you need.
 */

export const typography = {
  displayLarge: { fontSize: 57, fontWeight: '400', lineHeight: 64, letterSpacing: 0 },
  displayMedium: { fontSize: 45, fontWeight: '400', lineHeight: 52, letterSpacing: 0 },
  displaySmall: { fontSize: 36, fontWeight: '400', lineHeight: 44, letterSpacing: 0 },

  headlineLarge: { fontSize: 32, fontWeight: '400', lineHeight: 40, letterSpacing: 0 },
  headlineMedium: { fontSize: 28, fontWeight: '400', lineHeight: 36, letterSpacing: 0 },
  headlineSmall: { fontSize: 24, fontWeight: '400', lineHeight: 28, letterSpacing: 0 },

  titleLarge: { fontSize: 22, fontWeight: '400', lineHeight: 28, letterSpacing: 0 },
  titleMedium: { fontSize: 16, fontWeight: '500', lineHeight: 24, letterSpacing: 0.15 },
  titleSmall: { fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: 0.1 },

  bodyLarge: { fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: 0.5 },
  bodyMedium: { fontSize: 14, fontWeight: '400', lineHeight: 20, letterSpacing: 0.25 },
  bodySmall: { fontSize: 12, fontWeight: '400', lineHeight: 16, letterSpacing: 0.4 },

  labelLarge: { fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: 0.1 },
  labelMedium: { fontSize: 12, fontWeight: '500', lineHeight: 16, letterSpacing: 0.5 },
  labelSmall: { fontSize: 11, fontWeight: '500', lineHeight: 16, letterSpacing: 0.5 },

  // Puedes agregar tus overrides personalizados aquí
  xs: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  sm: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  md: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  lg: { fontSize: 20, fontWeight: '500', lineHeight: 28 },
  xl: { fontSize: 24, fontWeight: '500', lineHeight: 32 },
  xxl: { fontSize: 32, fontWeight: '600', lineHeight: 40 }
} as const;

export type Typography = typeof typography;
