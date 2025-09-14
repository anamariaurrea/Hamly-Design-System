// Badge.tsx
import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { tokens, spacing } from '../../theme';

// TODO: Temporal. Usar module augmentation para theme.colors en vez de 'as any'.

export interface BadgeProps {
  variant?: 'small' | 'large'; // small = dot, large = number
  value?: string | number;    // only for large
  visible?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

// Badge del design-system: dot (small) o número (large)
const Badge: React.FC<BadgeProps> = ({
  variant = 'large',
  value,
  visible = true,
  style,
  accessibilityLabel,
}) => {
  const theme = useTheme<MD3Theme>();
  const { colors } = theme;
  if (!visible) return null;

  if (variant === 'small') {
    // Dot badge
    return (
      <View
        style={[styles.dot, { backgroundColor: colors.error }, style]}
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel || 'Alerta pequeña'}
      />
    );
  }

  // Large badge with number
  const badgeValue = value != null ? String(value) : '';
  return (
    <View
      style={[
        styles.large,
        {
          backgroundColor: colors.error,
          minWidth: 16,
          maxWidth: 34,
          paddingHorizontal: 4,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel || `Notificaciones${badgeValue ? ': ' + badgeValue : ''}`}
    >
      <Text style={[styles.text, { color: colors.onError }]}>{badgeValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B00020',
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    minHeight: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default Badge;
export { Badge };
