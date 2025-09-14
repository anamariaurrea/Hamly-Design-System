// Button.tsx
import * as React from 'react';
import { StyleSheet, ViewStyle, Platform } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import { getRadius, tokens, getPillRadius } from '../../theme';

export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'elevated' | 'text';
export type ButtonSize = 'small' | 'medium';

export interface DSButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Button: React.FC<DSButtonProps> = ({
  variant = 'filled',
  size = 'medium',
  icon,
  label,
  disabled = false,
  style,
  onPress,
  ...rest
}) => {
  const theme = useTheme();
  const sizeHeights = { small: 36, medium: 48 };
  const height = sizeHeights[size ?? 'medium'];
  const pillRadius = getPillRadius(height);

  // Variant mapping
  let mode: any = 'contained';
  let backgroundColor = theme.colors.primary;
  let labelColor = theme.colors.onPrimary;
  let borderColor: string | undefined;
  let borderWidth: number | undefined;

  if (variant === 'filled') {
    mode = 'contained';
    backgroundColor = theme.colors.primary;
    labelColor = theme.colors.onPrimary;
  } else if (variant === 'tonal') {
    mode = 'contained-tonal';
    backgroundColor = theme.colors.secondaryContainer;
    labelColor = theme.colors.onSecondaryContainer;
  } else if (variant === 'outlined') {
    mode = 'outlined';
    borderColor = theme.colors.outlineVariant ?? theme.colors.outline;
    borderWidth = 1;
    backgroundColor = 'transparent';
    labelColor = theme.colors.primary;
  } else if (variant === 'elevated') {
    mode = 'elevated';
    backgroundColor = theme.colors.surface;
    labelColor = theme.colors.primary;
  } else if (variant === 'text') {
    mode = 'text';
    backgroundColor = 'transparent';
    labelColor = theme.colors.primary;
  }

  return (
    <PaperButton
      mode={mode}
      icon={icon}
      onPress={onPress}
      disabled={disabled}
      uppercase={false}
      style={[{
        borderRadius: pillRadius,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor,
        ...(variant === 'outlined' ? { borderWidth, borderColor } : {}),
      }, style]}
      contentStyle={[{
        minHeight: height,
        paddingHorizontal: 16,
        borderRadius: pillRadius,
      }]}
      labelStyle={{ fontWeight: '600', color: labelColor }}
      {...rest}
    >
      {label}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  base: {
    minWidth: 64,
    marginVertical: 4,
    alignSelf: 'flex-start',
  },
});
