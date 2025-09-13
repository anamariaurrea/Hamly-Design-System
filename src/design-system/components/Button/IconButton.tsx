// IconButton.tsx
import * as React from 'react';
import { IconButton as PaperIconButton } from 'react-native-paper';

export const IconButton = (props: React.ComponentProps<typeof PaperIconButton>) => (
  <PaperIconButton {...props} />
);
