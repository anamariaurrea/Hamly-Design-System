// TextField.tsx
import * as React from 'react';
import { TextInput } from 'react-native-paper';

export const TextField = (props: React.ComponentProps<typeof TextInput>) => (
  <TextInput {...props} />
);
