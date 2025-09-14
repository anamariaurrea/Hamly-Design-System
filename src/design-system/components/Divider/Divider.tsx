// Divider.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

export interface DividerProps {
  inset?: boolean;
  bold?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const Divider: React.FC<DividerProps> = ({
  inset = false,
  bold = false,
  style,
  accessibilityLabel,
}) => {
  const theme = useTheme<MD3Theme>();
  const color = theme.colors.outlineVariant || theme.colors.outline;
  const thickness = bold ? 2 : StyleSheet.hairlineWidth;

  return (
    <View
      style={[
        {
          height: thickness,
          backgroundColor: color,
          width: '100%',
          marginLeft: inset ? 16 : 0,
          marginRight: 0,
        },
        style,
      ]}
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel}
    />
  );
};

export default Divider;
export { Divider };
