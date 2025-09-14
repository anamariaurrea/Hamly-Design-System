// Checkbox.tsx
import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import {
  Checkbox as PaperCheckbox,

  Text,
  useTheme,
  type MD3Theme,
} from 'react-native-paper';

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

const withAlpha = (hex: string, alpha: number) => {
  if (!hex?.startsWith('#') || hex.length < 7) return hex;
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${a}${hex.slice(1)}`;
};

const DSCheckbox: React.FC<DSCheckboxProps> = ({
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

  // Colores MD3 según estado
  const primary = theme.colors.primary;
  const outline = theme.colors.outline;
  const onSurface = theme.colors.onSurface;
  const errorColor = theme.colors.error;

  const checkedColor = error ? errorColor : primary;          // relleno azul (o error)
  const uncheckedColor = error ? errorColor : outline;        // borde gris
  const labelColor = disabled ? withAlpha(onSurface, 0.38) : onSurface;
  const ripple = withAlpha(checkedColor, 0.12);

  // Accesibilidad
  const a11yState: any = {
    checked: state === 'checked',
    disabled,
    mixed: state === 'indeterminate' ? true : undefined,
  };

  return (
    <Pressable
      style={[styles.row, style]}
      onPress={disabled ? undefined : onPress}
      android_ripple={{ color: ripple, borderless: true }}
      accessibilityRole="checkbox"
      accessibilityState={a11yState}
      accessibilityLabel={accessibilityLabel || label}
      testID={testID}
      disabled={disabled}
      hitSlop={8}
    >
      {/* Usa el checkbox cuadrado de MD3 */}
      <PaperCheckbox.Android
        status={state}
        onPress={onPress}
        disabled={disabled}
        color={checkedColor}            // ✓ y fill
        uncheckedColor={uncheckedColor} // borde gris cuando está off
        theme={{
          colors: {
            // asegura contraste del icono interno (✓ o –)
            onPrimary: theme.colors.onPrimary,
          },
        }}
        // Ajuste de tamaño para verse como la maqueta (~20px)
        style={styles.box}
      />

      {!!label && (
        <Text variant="bodyLarge" style={[styles.label, { color: labelColor }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  // El componente no expone `size`; escalamos suavemente
  box: {
    transform: [{ scale: 1.05 }], // ≈20px visuales
    marginRight: 8,
  },
  label: {
    flexShrink: 1,
  },
});

export default DSCheckbox;
export { DSCheckbox as Checkbox };
