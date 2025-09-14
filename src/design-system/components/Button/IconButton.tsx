// IconButton.tsx
import * as React from 'react';
import { IconButton as PaperIconButton, useTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { tokens } from '../../theme';
import { ViewStyle } from 'react-native';

export type IconButtonVariant = 'standard' | 'filled' | 'tonal' | 'outlined';
export type IconButtonSize = 'sm' | 'md' | 'lg' | number;

export interface IconButtonProps {
  icon: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

const sizeMap = { sm: 24, md: 32, lg: 40 } as const;

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'standard',
  size = 'md',
  selected = false,
  disabled = false,
  onPress,
  accessibilityLabel,
  style,
}) => {
  const theme = useTheme<MD3Theme>();
  const { colors } = theme;
  const iconSize = typeof size === 'number' ? size : sizeMap[size] ?? sizeMap.md;

  let mode: 'contained' | 'contained-tonal' | 'outlined' | undefined = undefined;
  let backgroundColor = 'transparent';
  let iconColor = colors.primary;

  if (variant === 'filled') {
    mode = 'contained';
    backgroundColor = colors.primary ?? tokens.palettes.primary['40'];
    iconColor = colors.onPrimary ?? tokens.palettes.primary['100'];
  } else if (variant === 'tonal') {
    mode = 'contained-tonal';
    backgroundColor = colors.secondaryContainer ?? tokens.palettes.secondary['90'];
    iconColor = colors.onSecondaryContainer ?? tokens.palettes.secondary['10'];
  } else if (variant === 'outlined') {
    mode = 'outlined';
    backgroundColor = 'transparent';
    iconColor = colors.primary ?? tokens.palettes.primary['40'];
  }

  if (selected) {
    backgroundColor = colors.secondaryContainer ?? tokens.palettes.secondary['90'];
    iconColor = colors.onSecondaryContainer ?? tokens.palettes.secondary['10'];
  }

  return (
    <PaperIconButton
      icon={icon}
      {...(mode ? { mode } : {})}
      size={iconSize}
      disabled={disabled}
      onPress={onPress}
      style={[{ backgroundColor }, style]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || icon}
      iconColor={iconColor}
    />
  );
};

export default IconButton;
