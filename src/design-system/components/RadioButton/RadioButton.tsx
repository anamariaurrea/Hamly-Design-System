// RadioButton.tsx
import * as React from 'react';
import { RadioButton as PaperRadioButton } from 'react-native-paper';

export const RadioButton = (props: React.ComponentProps<typeof PaperRadioButton>) => (
  <PaperRadioButton {...props} />
);
