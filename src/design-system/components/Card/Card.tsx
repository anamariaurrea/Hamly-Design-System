// Card.tsx
import React from 'react';
import { ViewStyle, StyleSheet } from 'react-native';
import { Card as PaperCard, useTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { radius } from '../../tokens/radius';

export interface DSCardProps {
  mode?: 'elevated' | 'outlined' | 'contained';
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
  testID?: string;
  accessibilityLabel?: string;
}

const DSCard: React.FC<DSCardProps> = ({
  mode = 'elevated',
  onPress,
  disabled = false,
  style,
  children,
  testID,
  accessibilityLabel,
}) => {
  const theme = useTheme<MD3Theme>();
  const borderRadius = radius.lg ?? 16;
  const userRadius = style && (typeof style === 'object' && 'borderRadius' in style) ? (style as any).borderRadius : undefined;

  let cardStyle: ViewStyle = {
    borderRadius: userRadius ?? borderRadius,
    overflow: 'hidden',
  };

  if (mode === 'outlined') {
    cardStyle = {
      ...cardStyle,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant ?? theme.colors.outline,
      backgroundColor: theme.colors.surface,
      elevation: 0,
    };
  } else if (mode === 'elevated') {
    cardStyle = {
      ...cardStyle,
      backgroundColor: theme.colors.surface,
      elevation: 1,
    };
  } else if (mode === 'contained') {
    cardStyle = {
      ...cardStyle,
      backgroundColor: theme.colors.surface,
      elevation: 0,
    };
  }

  return (
    <PaperCard
      mode={mode}
      onPress={onPress}
      disabled={disabled}
      style={[cardStyle, style]}
      testID={testID}
      accessible={!!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </PaperCard>
  );
};

const Card = Object.assign(DSCard, {
  Content: PaperCard.Content,
  Actions: PaperCard.Actions,
  Cover: PaperCard.Cover,
});

export default Card;
export { Card };
