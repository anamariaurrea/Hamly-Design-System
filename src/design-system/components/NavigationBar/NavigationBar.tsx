// NavigationBar.tsx
import * as React from 'react';
import { View, StyleSheet, Platform, Pressable, ViewStyle } from 'react-native';
import { useTheme, Text, Icon, TouchableRipple } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../theme';
import { radius } from '../../tokens/radius';

export type NavItem = {
  key: string;
  label: string;
  icon: string;
  badge?: number;
  disabled?: boolean;
};

export interface NavigationBarProps {
  items: NavItem[];
  selectedKey: string;
  onChange: (key: string) => void;
  style?: ViewStyle;
  testID?: string;
}

const ICON_SIZE = 22;
const PILL_HEIGHT = 32;
const PILL_RADIUS = radius.round ?? 9999;
const BADGE_SIZE = 18;
const VERTICAL_GAP = 6;
const BAR_HEIGHT = 56;

// Helper to add alpha to hex color
const withAlpha = (hex: string, alpha: number) => {
  if (hex.startsWith('#')) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return hex;
};

export const NavigationBar: React.FC<NavigationBarProps> = ({
  items,
  selectedKey,
  onChange,
  style,
  testID,
}) => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const surfaceVariant = theme.colors.surfaceVariant;
  const onSurfaceVariant = theme.colors.onSurfaceVariant;
  const primary = theme.colors.primary;
  const primaryContainer = theme.colors.primaryContainer;
  const onPrimaryContainer = theme.colors.onPrimaryContainer;

  const renderItem = (item: NavItem) => {
    const selected = item.key === selectedKey;
    const disabled = !!item.disabled;
    const rippleColor = selected
      ? withAlpha(onPrimaryContainer, 0.12)
      : withAlpha(onSurfaceVariant, 0.12);
    const iconColor = selected ? onPrimaryContainer : onSurfaceVariant;
    const labelColor = selected ? primary : onSurfaceVariant;
    const opacity = disabled ? 0.38 : 1;

    return (
      <TouchableRipple
        key={item.key}
        borderless
        rippleColor={rippleColor}
        onPress={disabled ? undefined : () => onChange(item.key)}
        disabled={disabled}
        style={styles.item}
        accessibilityRole="tab"
        accessibilityState={{ selected, disabled }}
        accessibilityLabel={item.label}
        testID={item.key}
      >
        <View style={{ alignItems: 'center', opacity }}>
          <View style={[styles.pill, selected && { backgroundColor: primaryContainer }]}>
            <Icon source={item.icon} size={ICON_SIZE} color={iconColor} />
            {typeof item.badge === 'number' && item.badge > 0 && (
              <View style={[styles.badge, { backgroundColor: primary }]}>
                <Text variant="labelSmall" style={{ color: theme.colors.onPrimary }} numberOfLines={1}>
                  {item.badge > 99 ? '99+' : item.badge}
                </Text>
              </View>
            )}
          </View>
          <Text
            variant="labelSmall"
            style={{ color: labelColor, marginTop: VERTICAL_GAP, fontWeight: selected ? '600' : '400', opacity }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.label}
          </Text>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(bottom, 0), backgroundColor: surfaceVariant, height: BAR_HEIGHT + Math.max(bottom, 0) },
        style,
      ]}
      testID={testID}
    >
      {items.map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center', // Centra horizontalmente
    alignItems: 'center', // Centra verticalmente
    height: BAR_HEIGHT, // Alto fijo
    paddingHorizontal: spacing(2),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
  },
  item: {
    flex: 1, // Estira cada item a lo ancho
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0, // Elimina padding extra
  },
  pill: {
    minWidth: 32,
    height: PILL_HEIGHT,
    borderRadius: PILL_RADIUS,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
});

export default NavigationBar;
