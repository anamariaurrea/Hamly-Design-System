// ListItem.tsx
import * as React from 'react';
import { List } from 'react-native-paper';

export const ListItem = (props: React.ComponentProps<typeof List.Item>) => (
  <List.Item {...props} />
);
