// src/design-system/providers/DesignSystemProvider.tsx
import * as React from 'react';
import { useColorScheme } from 'react-native';
// TODO: Instala '@react-native-async-storage/async-storage' si quieres persistencia
let AsyncStorage: any = undefined;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch {
  // AsyncStorage no disponible, solo memoria
}
import { Provider as PaperProvider } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { buildLightTheme, buildDarkTheme } from '../theme';

export type ThemeMode = 'light' | 'dark';

interface DesignSystemContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  theme: MD3Theme;
}

const DesignSystemContext = React.createContext<DesignSystemContextValue | undefined>(undefined);

export const DesignSystemProvider = ({ children, initialMode, persist = true }: {
  children: React.ReactNode;
  initialMode?: ThemeMode;
  persist?: boolean;
}) => {
  const sys = useColorScheme();
  const defaultMode: ThemeMode = initialMode ?? (sys === 'dark' ? 'dark' : 'light');
  const [mode, setModeState] = React.useState<ThemeMode>(defaultMode);

  React.useEffect(() => {
    let mounted = true;
    if (persist && AsyncStorage) {
      AsyncStorage.getItem('@design-system/theme-mode').then((v: string | null) => {
        if (!mounted) return;
        if (v === 'light' || v === 'dark') setModeState(v);
      }).catch(() => { });
    }
    return () => { mounted = false; };
  }, [persist]);

  const setMode = React.useCallback(async (m: ThemeMode) => {
    setModeState(m);
    if (persist && AsyncStorage) {
      try { await AsyncStorage.setItem('@design-system/theme-mode', m); } catch { }
    }
  }, [persist]);

  const toggleMode = React.useCallback(() => {
    setModeState((prev: ThemeMode) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const theme = React.useMemo(() => (mode === 'dark' ? buildDarkTheme() : buildLightTheme()), [mode]);

  return (
    <DesignSystemContext.Provider value={{ mode, setMode, toggleMode, theme }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </DesignSystemContext.Provider>
  );
};

export function useDesignSystem() {
  const ctx = React.useContext(DesignSystemContext);
  if (!ctx) throw new Error('useDesignSystem must be used within DesignSystemProvider');
  return ctx;
}

