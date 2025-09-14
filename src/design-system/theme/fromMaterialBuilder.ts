// src/design-system/theme/fromMaterialBuilder.ts
import type { MD3Theme, MD3Colors } from 'react-native-paper';

/**
 * buildThemeFromTokens: Genera un objeto MD3Theme para react-native-paper
 * a partir de los tokens exportados por Material Theme Builder.
 */
export function normalizeColor(value: string | undefined): string {
  if (!value) return '#000000';
  if (/^#([A-Fa-f0-9]{3,8})$/.test(value)) return value;
  if (/rgba?\(/.test(value)) return value;
  return value;
}

type TokensShape = any; // ajusta si tipas tus tokens

function toRgba(hex: string, opacity: number): string {
  // Simple hex to rgba converter, fallback to black if invalid
  if (!hex || typeof hex !== 'string') return `rgba(0,0,0,${opacity})`;
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  if (c.length !== 6) return `rgba(0,0,0,${opacity})`;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

export function buildThemeFromTokens(tokens: TokensShape, mode: 'light' | 'dark'): MD3Theme {
  const scheme = tokens.schemes?.[mode] ?? tokens.schemes?.light ?? {};

  // --- Colors: cubrir todas las keys que MD3 espera ---
  const surfaceBase = scheme.surface ?? '#FFFFFF';
  const onSurfaceBase = scheme.onSurface ?? '#1C1B1F';
  const colors = {
    primary: normalizeColor(scheme.primary ?? '#6750A4'),
    onPrimary: normalizeColor(scheme.onPrimary ?? '#FFFFFF'),
    primaryContainer: normalizeColor(scheme.primaryContainer ?? '#EADDFF'),
    onPrimaryContainer: normalizeColor(scheme.onPrimaryContainer ?? '#21005D'),

    secondary: normalizeColor(scheme.secondary ?? '#625B71'),
    onSecondary: normalizeColor(scheme.onSecondary ?? '#FFFFFF'),
    secondaryContainer: normalizeColor(scheme.secondaryContainer ?? '#E8DEF8'),
    onSecondaryContainer: normalizeColor(scheme.onSecondaryContainer ?? '#1D192B'),

    tertiary: normalizeColor(scheme.tertiary ?? '#7D5260'),
    onTertiary: normalizeColor(scheme.onTertiary ?? '#FFFFFF'),
    tertiaryContainer: normalizeColor(scheme.tertiaryContainer ?? '#FFD8E4'),
    onTertiaryContainer: normalizeColor(scheme.onTertiaryContainer ?? '#31111D'),

    error: normalizeColor(scheme.error ?? '#B3261E'),
    onError: normalizeColor(scheme.onError ?? '#FFFFFF'),
    errorContainer: normalizeColor(scheme.errorContainer ?? '#F9DEDC'),
    onErrorContainer: normalizeColor(scheme.onErrorContainer ?? '#410E0B'),

    background: normalizeColor(scheme.background ?? '#FFFFFF'),
    onBackground: normalizeColor(scheme.onBackground ?? '#1C1B1F'),

    surface: normalizeColor(surfaceBase),
    onSurface: normalizeColor(onSurfaceBase),
    surfaceVariant: normalizeColor(scheme.surfaceVariant ?? '#E7E0EC'),
    onSurfaceVariant: normalizeColor(scheme.onSurfaceVariant ?? '#49454F'),

    outline: normalizeColor(scheme.outline ?? '#79747E'),
    outlineVariant: normalizeColor(scheme.outlineVariant ?? '#CAC4D0'),
    inverseSurface: normalizeColor(scheme.inverseSurface ?? '#313033'),
    inverseOnSurface: normalizeColor(scheme.inverseOnSurface ?? '#F6EFF4'),
    inversePrimary: normalizeColor(scheme.inversePrimary ?? '#D0BCFF'),

    shadow: normalizeColor(scheme.shadow ?? '#000000'),
    scrim: normalizeColor(scheme.scrim ?? '#000000'),
    surfaceDisabled: toRgba(surfaceBase, 0.12),
    onSurfaceDisabled: toRgba(onSurfaceBase, 0.38),
    backdrop: normalizeColor(scheme.backdrop ?? 'rgba(0,0,0,0.5)'),

    // elevation: aseguramos que exista, aunque sea con valor por defecto
    elevation: {
      level0: normalizeColor(scheme.elevation?.level0 ?? surfaceBase),
      level1: normalizeColor(scheme.elevation?.level1 ?? surfaceBase),
      level2: normalizeColor(scheme.elevation?.level2 ?? surfaceBase),
      level3: normalizeColor(scheme.elevation?.level3 ?? surfaceBase),
      level4: normalizeColor(scheme.elevation?.level4 ?? surfaceBase),
      level5: normalizeColor(scheme.elevation?.level5 ?? surfaceBase),
    },
  };

  // --- Fonts: MD3 requiere varias escalas con fontSize, lineHeight y letterSpacing ---
  // Trata de leer de tokens.typography si existe, sino usa fallbacks.
  const tp = tokens.typography ?? {};
  const makeType = (cfg: any) => {
    // cfg puede venir con fontSize, lineHeight, letterSpacing, fontFamily, fontWeight
    return {
      fontFamily: cfg?.fontFamily ?? 'System',
      fontWeight: cfg?.fontWeight ?? '400',
      fontSize: typeof cfg?.fontSize === 'number' ? cfg.fontSize : (cfg?.size ?? 16),
      lineHeight: typeof cfg?.lineHeight === 'number' ? cfg.lineHeight : Math.round((cfg?.size ?? 16) * 1.25),
      letterSpacing: typeof cfg?.letterSpacing === 'number' ? cfg.letterSpacing : 0,
    };
  };

  const fonts = {
    displayLarge: makeType(tp.displayLarge ?? { size: 57, lineHeight: 64, letterSpacing: 0 }),
    displayMedium: makeType(tp.displayMedium ?? { size: 45, lineHeight: 52, letterSpacing: 0 }),
    displaySmall: makeType(tp.displaySmall ?? { size: 36, lineHeight: 44, letterSpacing: 0 }),

    headlineLarge: makeType(tp.headlineLarge ?? { size: 32, lineHeight: 40, letterSpacing: 0 }),
    headlineMedium: makeType(tp.headlineMedium ?? { size: 28, lineHeight: 36, letterSpacing: 0 }),
    headlineSmall: makeType(tp.headlineSmall ?? { size: 24, lineHeight: 28, letterSpacing: 0 }),

    titleLarge: makeType(tp.titleLarge ?? { size: 22, lineHeight: 28, letterSpacing: 0 }),
    titleMedium: makeType(tp.titleMedium ?? { size: 16, lineHeight: 24, letterSpacing: 0.15 }),
    titleSmall: makeType(tp.titleSmall ?? { size: 14, lineHeight: 20, letterSpacing: 0.1 }),

    bodyLarge: makeType(tp.bodyLarge ?? { size: 16, lineHeight: 24, letterSpacing: 0.5 }),
    bodyMedium: makeType(tp.bodyMedium ?? { size: 14, lineHeight: 20, letterSpacing: 0.25 }),
    bodySmall: makeType(tp.bodySmall ?? { size: 12, lineHeight: 16, letterSpacing: 0.4 }),

    labelLarge: makeType(tp.labelLarge ?? { size: 14, lineHeight: 20, letterSpacing: 0.1 }),
    labelSmall: makeType(tp.labelSmall ?? { size: 11, lineHeight: 16, letterSpacing: 0.5 }),
  };

  // --- Motion / animation / roundness ---
  const animation = {
    scale: tokens.motion?.scale ?? 1,
    // react-native-paper MD3 theme has animation property with scale
  };

  const theme: MD3Theme = {
    dark: mode === 'dark',
    isV3: true,
    version: 3,
    roundness: tokens.radius?.md ?? 8,
    colors,
    fonts: fonts as any, // MD3Theme espera MD3Typescale; aseguramos shape correcta arriba
    animation,
    // Paper MD3Theme tiene más propiedades opcionales; keep defaults for the rest
  };

  return theme;
}

