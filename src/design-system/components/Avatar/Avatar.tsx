// Avatar.tsx
import * as React from 'react';
import { Avatar as PaperAvatar } from 'react-native-paper';

export const Avatar = ({ icon }: { icon: string }) => (
  <PaperAvatar.Icon size={40} icon={icon} />
);
