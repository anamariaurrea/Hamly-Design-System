// SegmentedButtons.tsx
import * as React from 'react';
import { SegmentedButtons as PaperSegmentedButtons } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { tokens } from '../../theme';
import type { ViewStyle, StyleProp, TextStyle } from 'react-native';

export type SegmentedOption = {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
};

export interface SegmentedButtonsProps {
  options: SegmentedOption[];
  value: string;
  onChange: (val: string) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const sizeMap = { sm: 32, md: 40, lg: 48 } as const;

const SegmentedButtons: React.FC<SegmentedButtonsProps> = ({
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  style,
  accessibilityLabel,
}) => {
  const theme = useTheme<MD3Theme>();
  const { colors } = theme;
  const height = sizeMap[size] ?? sizeMap.md;
  const pillRadius = tokens.radius.round;
  const borderClr = colors.outline || colors.outline;

  // Map options to Paper buttons with custom styles
  const buttons = options.map((opt, idx) => {
    const selected = value === opt.value;
    const isFirst = idx === 0;
    const isLast = idx === options.length - 1;
    const isSolo = options.length === 1;
    let radii: ViewStyle = {};
    if (isSolo) {
      radii = {
        borderTopLeftRadius: pillRadius,
        borderBottomLeftRadius: pillRadius,
        borderTopRightRadius: pillRadius,
        borderBottomRightRadius: pillRadius,
      };
    } else if (isFirst) {
      radii = {
        borderTopLeftRadius: pillRadius,
        borderBottomLeftRadius: pillRadius,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      };
    } else if (isLast) {
      radii = {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: pillRadius,
        borderBottomRightRadius: pillRadius,
      };
    } else {
      radii = {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      };
    }
    return {
      ...opt,
      style: [
        {
          flex: fullWidth ? 1 : undefined,
          borderWidth: 1,
          borderColor: borderClr,
          backgroundColor: selected ? colors.secondaryContainer : 'transparent',
          height,
          ...radii,
        },
      ],
      labelStyle: {
        color: selected ? colors.onSecondaryContainer : colors.onSurface,
        fontWeight: '600' as TextStyle['fontWeight'],
        fontSize: 14, // tamaño de letra ajustado
      } as StyleProp<TextStyle>,
      iconColor: selected ? colors.onSecondaryContainer : colors.onSurface,
      accessibilityState: { selected },
    };
  });

  return (
    <PaperSegmentedButtons
      buttons={buttons}
      value={value}
      onValueChange={onChange}
      density={size === 'sm' ? 'small' : 'regular'}
      style={[{ height }, style]}
    />
  );
};

export default SegmentedButtons;
