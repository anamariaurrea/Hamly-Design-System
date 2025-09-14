// Checkbox.tsx
import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Checkbox as PaperCheckbox, Text, useTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate';
export interface DSCheckboxProps {
  state?: CheckboxState;
  error?: boolean;
  disabled?: boolean;
  label?: string;
  onPress?: () => void;
  testID?: string;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

function withAlpha(color: string, alpha: number) {
  // color: #RRGGBB or #AARRGGBB
  if (color.length === 7) {
    // #RRGGBB
    const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return `#${a}${color.slice(1)}`;
  }
  return color;
}

const Checkbox: React.FC<DSCheckboxProps> = ({
  state = 'unchecked',
  error = false,
  disabled = false,
  label,
  onPress,
  testID,
  style,
  accessibilityLabel,
}) => {
  const theme = useTheme<MD3Theme>();
  const checkedColor = error ? theme.colors.error : theme.colors.primary;
  const uncheckedColor = error ? theme.colors.error : theme.colors.outline;
  const labelColor = error ? theme.colors.error : theme.colors.onSurface;
  const disabledLabelColor = withAlpha(theme.colors.onSurface, 0.38);

  const status: 'checked' | 'unchecked' | 'indeterminate' = state;

  const accessibilityState: any = {
    checked: state === 'checked',
    disabled,
    mixed: state === 'indeterminate' ? true : undefined,
  };

  const labelStyle = [
    {
      color: disabled ? disabledLabelColor : labelColor,
      marginLeft: 8,
      fontSize: theme.fonts.bodyLarge?.fontSize ?? 16,
    },
  ];

  return (
    <Pressable
      style={[styles.container, style, { minHeight: 44 }]}
      onPress={disabled ? undefined : onPress}
      accessibilityRole="checkbox"
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel || label}
      testID={testID}
      disabled={disabled}
    >
      <PaperCheckbox
        status={status}
        onPress={onPress}
        disabled={disabled}
        color={checkedColor}
        uncheckedColor={uncheckedColor}
        testID={testID}
      />
      {label ? (
        <Text style={labelStyle} numberOfLines={1}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
});

export default Checkbox;
export { Checkbox };
