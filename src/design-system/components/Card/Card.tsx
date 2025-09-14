// Card.tsx
import * as React from 'react';
import { Card as PaperCard } from 'react-native-paper';

export const Card = (props: React.ComponentProps<typeof PaperCard>) => (
  <PaperCard {...props} />
);
