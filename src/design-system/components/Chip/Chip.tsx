// Chip.tsx
import * as React from 'react';
import { Chip as PaperChip } from 'react-native-paper';

export const Chip = (props: React.ComponentProps<typeof PaperChip>) => (
  <PaperChip {...props} />
);
