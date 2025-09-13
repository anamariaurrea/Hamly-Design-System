// Button.tsx
import * as React from 'react';
import { Button as PaperButton } from 'react-native-paper';

export const Button = (props: React.ComponentProps<typeof PaperButton>) => (
  <PaperButton {...props} />
);
