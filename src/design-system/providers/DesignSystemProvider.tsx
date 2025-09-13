// DesignSystemProvider.tsx
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperTheme } from '../theme';

export const DesignSystemProvider = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={paperTheme}>{children}</PaperProvider>
);
