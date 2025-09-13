// Checkbox.tsx
import * as React from 'react';
import { Checkbox as PaperCheckbox } from 'react-native-paper';

export const Checkbox = (props: React.ComponentProps<typeof PaperCheckbox>) => (
  <PaperCheckbox {...props} />
);
