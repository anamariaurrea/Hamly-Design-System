// Badge.tsx
import * as React from 'react';
import { Badge as PaperBadge } from 'react-native-paper';

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <PaperBadge>{children}</PaperBadge>
);
