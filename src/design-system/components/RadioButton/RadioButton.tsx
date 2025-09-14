// RadioButton.tsx
import * as React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

export interface RadioButtonProps {
  value: string;
  status: 'checked' | 'unchecked';
  onPress?: () => void;
  disabled?: boolean;
  label?: string;
  style?: ViewStyle;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  status,
  onPress,
  disabled = false,
  label,
  style,
}) => {
  const theme = useTheme();
  // Tokens de color MD3
  const primary = theme.colors.primary;
  const onSurface = theme.colors.onSurface;
  const surfaceVariant = theme.colors.surfaceVariant;
  const outline = theme.colors.outline;

  // Estados visuales
  const checkedColor = disabled ? outline : primary;
  const uncheckedColor = disabled ? outline : outline;
  const dotColor = disabled ? outline : primary;
  const borderColor = status === 'checked' ? checkedColor : uncheckedColor;
  const backgroundColor = surfaceVariant;
  const opacity = disabled ? 0.38 : 1;

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={[styles.root, style, { opacity }]}
      accessibilityRole="radio"
      accessibilityState={{ checked: status === 'checked', disabled }}
      accessibilityLabel={label}
    >
      <View style={[styles.radio, { borderColor, backgroundColor }]}>
        {status === 'checked' && (
          <View style={[styles.dot, { backgroundColor: dotColor }]} />
        )}
      </View>
      {label ? (
        <Text
          variant="bodyMedium"
          style={{ color: disabled ? outline : onSurface, marginLeft: 8 }}
          numberOfLines={1}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
};

const RADIO_SIZE = 24;
const DOT_SIZE = 12;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  radio: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: RADIO_SIZE / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'black',
  },
});

export default RadioButton;
