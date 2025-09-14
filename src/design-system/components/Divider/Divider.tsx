// Divider.tsx
import * as React from 'react';
import { Divider as PaperDivider } from 'react-native-paper';

export const Divider = (props: React.ComponentProps<typeof PaperDivider>) => (
  <PaperDivider {...props} />
);
