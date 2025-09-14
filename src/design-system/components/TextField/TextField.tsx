// TextField.tsx
import * as React from 'react';
import { ViewStyle } from 'react-native';
import { TextInput, useTheme, HelperText } from 'react-native-paper';
import { radius } from '../../tokens/radius';

export interface TextFieldProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  onChangeText?: (t: string) => void;
  onSubmitEditing?: () => void;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  defaultValue,
  placeholder,
  helperText,
  error = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  onChangeText,
  onSubmitEditing,
  style,
  testID,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const [inner, setInner] = React.useState(defaultValue ?? '');
  const effectiveValue = value !== undefined ? value : inner;

  const handleChangeText = (t: string) => {
    if (value === undefined) setInner(t);
    onChangeText?.(t);
  };

  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        value={effectiveValue}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        left={leadingIcon ? <TextInput.Icon icon={leadingIcon} /> : undefined}
        right={trailingIcon ? <TextInput.Icon icon={trailingIcon} /> : undefined}
        outlineStyle={{ borderRadius: radius.lg ?? 12 }}
        activeOutlineColor={theme.colors.primary}
        outlineColor={theme.colors.outline}
        textColor={theme.colors.onSurface}
        placeholderTextColor={theme.colors.onSurfaceVariant}
        style={style}
        testID={testID}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityRole="text"
        onSubmitEditing={onSubmitEditing}
      />
      {helperText && (
        <HelperText type={error ? 'error' : 'info'} visible>
          {helperText}
        </HelperText>
      )}
    </>
  );
};

export default TextField;
