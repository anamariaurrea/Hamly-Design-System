// Circular.tsx
import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';

export const Circular = (props: React.ComponentProps<typeof ActivityIndicator>) => (
  <ActivityIndicator {...props} />
);
