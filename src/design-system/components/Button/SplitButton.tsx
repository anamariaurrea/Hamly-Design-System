import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle, Text, Platform } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { MD3Theme } from 'react-native-paper';
import { radius, getPillRadius } from '../../tokens/radius';

export interface SplitButtonProps {
  label: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const SIZE_MAP = {
  sm: 36,
  md: 40,
  lg: 48,
};

const ICON_SIZE_MAP = {
  sm: 20,
  md: 24,
  lg: 28,
};

const SplitButton: React.FC<SplitButtonProps> = ({
  label,
  onPrimaryPress,
  onSecondaryPress,
  icon = 'arrow-down', // Cambiado a arrow-down
  disabled = false,
  loading = false,
  fullWidth = false,
  size = 'md',
  style,
  accessibilityLabel,
}) => {
  const theme = useTheme<MD3Theme>();
  const height = SIZE_MAP[size] || SIZE_MAP.md;
  const iconSize = ICON_SIZE_MAP[size] || ICON_SIZE_MAP.md;
  const borderRadius = getPillRadius(height);
  const outlineColor = theme.colors.outlineVariant;
  const surfaceDisabled = theme.colors.surfaceDisabled ?? theme.colors.surface;
  const textColor = disabled ? theme.colors.onSurface + '61' : theme.colors.onSurface;
  const opacity = disabled ? 0.38 : 1;

  return (
    <View
      style={[
        styles.root,
        {
          borderColor: outlineColor,
          borderRadius,
          height,
          opacity,
          backgroundColor: 'transparent',
          width: fullWidth ? '100%' : 'auto',
          alignSelf: 'flex-start',
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ disabled, busy: loading }}
    >
      <Pressable
        style={[
          styles.primary,
          {
            height,
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            borderRightWidth: 0,
            paddingHorizontal: 0, // Eliminamos padding para que el texto esté a 24px del borde
            justifyContent: 'flex-start', // Cambiamos a flex-start para alinear con otros títulos
            backgroundColor: 'transparent',
            minWidth: 80,
          },
        ]}
        android_ripple={{ color: outlineColor + '22' }}
        disabled={disabled || loading}
        onPress={onPrimaryPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled, busy: loading }}
      >
        <View style={[styles.labelRow, { justifyContent: 'center' }]}>
          {loading && (
            <ActivityIndicator
              size={16}
              color={textColor}
              style={{ marginRight: 8 }}
            />
          )}
          <Text
            style={[
              theme.fonts.labelLarge,
              {
                color: textColor,
              },
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          width: 1,
          backgroundColor: outlineColor,
          alignSelf: 'stretch',
        }}
      />
      <Pressable
        style={[
          styles.secondary,
          {
            height,
            width: height,
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
            borderLeftWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          },
        ]}
        android_ripple={{ color: outlineColor + '22' }}
        disabled={disabled || loading}
        onPress={onSecondaryPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ? accessibilityLabel + ' acciones' : label + ' acciones'}
        accessibilityHint="abre acciones"
        accessibilityState={{ disabled, busy: loading }}
      >
        <MaterialCommunityIcons
          name={icon}
          size={iconSize}
          color={textColor}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  primary: {
    borderRightWidth: 0,
  },
  secondary: {
    borderLeftWidth: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplitButton;
export { SplitButton };
