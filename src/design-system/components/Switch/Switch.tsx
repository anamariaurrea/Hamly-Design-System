// Switch.tsx
import * as React from 'react';
import { Switch as PaperSwitch } from 'react-native-paper';

export const Switch = (props: React.ComponentProps<typeof PaperSwitch>) => (
  <PaperSwitch {...props} />
);
