// Button.tsx
import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { tokens, spacing } from '../../theme';

export type ButtonVariant = 'filled' | 'tonal' | 'outline' | 'elevated' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface DSButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  label?: string;
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export const Button: React.FC<DSButtonProps> = ({
  variant = 'filled',
  size = 'medium',
  icon,
  label,
  children,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  onPress,
  accessibilityLabel,
  ...rest
}) => {
  const theme = useTheme();
  const roundness = theme.roundness ?? 8;

  // Size mapping
  const sizeStyles: Record<ButtonSize, { height: number; paddingH: number; fontSize: number }> = {
    small: { height: 36, paddingH: spacing(2), fontSize: 13 },
    medium: { height: 44, paddingH: spacing(3), fontSize: 15 },
    large: { height: 52, paddingH: spacing(4), fontSize: 17 },
  };
  const { height, paddingH, fontSize } = sizeStyles[size];

  // Variant mapping
  let backgroundColor = theme.colors.primary;
  let textColor = theme.colors.onPrimary;
  let borderColor: string | undefined;
  let elevation = 0;
  let shadow: ViewStyle = {};

  switch (variant) {
    case 'filled':
      backgroundColor = theme.colors.primary;
      textColor = theme.colors.onPrimary;
      break;
    case 'tonal':
      backgroundColor = theme.colors.secondaryContainer;
      textColor = theme.colors.onSecondaryContainer;
      break;
    case 'outline':
      backgroundColor = 'transparent';
      textColor = theme.colors.primary;
      borderColor = theme.colors.outlineVariant;
      break;
    case 'elevated':
      backgroundColor = theme.colors.surface;
      textColor = theme.colors.primary;
      elevation = 2;
      shadow = {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
      };
      break;
    case 'text':
      backgroundColor = 'transparent';
      textColor = theme.colors.primary;
      break;
  }

  // Icon rendering
  const renderIcon = icon
    ? (props: { color: string; size: number }) => (
      <MaterialCommunityIcons
        name={icon}
        size={fontSize + 5}
        color={textColor}
        style={{ marginRight: 6 }}
      />
    )
    : undefined;

  // Label fallback
  const buttonLabel = label ?? (typeof children === 'string' ? children : undefined);

  return (
    <PaperButton
      mode={
        variant === 'filled'
          ? 'contained'
          : variant === 'tonal'
            ? 'contained-tonal'
            : variant === 'outline'
              ? 'outlined'
              : variant
      }
      icon={renderIcon}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.base,
        {
          height,
          paddingHorizontal: paddingH,
          borderRadius: roundness,
          backgroundColor,
          borderWidth: borderColor ? 1 : 0,
          borderColor,
          width: fullWidth ? '100%' : undefined,
          elevation,
          ...shadow,
        },
        style,
      ]}
      labelStyle={{
        color: textColor,
        fontSize,
        fontWeight: '600',
        textTransform: 'none',
      }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || buttonLabel}
      {...rest}
    >
      {buttonLabel}
      {typeof children !== 'string' ? children : null}
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
