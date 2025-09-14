// Avatar.tsx
import * as React from 'react';
import { View, Image, ImageSourcePropType, StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { spacing, getRadius, tokens, typographyScale } from '../../theme';

export type AvatarSize = 'sm' | 'md' | 'lg' | number;
export type AvatarVariant = 'image' | 'icon' | 'text';

export interface AvatarProps {
  size?: AvatarSize;
  variant?: AvatarVariant;
  source?: ImageSourcePropType;
  icon?: string;
  label?: string;
  checked?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function getAvatarSize(size: AvatarSize = 'md'): number {
  if (typeof size === 'number') return size;
  switch (size) {
    case 'sm': return spacing(4); // 32px
    case 'md': return spacing(5); // 40px
    case 'lg': return spacing(7); // 56px
    default: return spacing(5);
  }
}

const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  variant = 'image',
  source,
  icon,
  label,
  checked = false,
  style,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const avatarSize = getAvatarSize(size);
  const radius = avatarSize / 2;
  const bgColor = theme.colors.primaryContainer ?? tokens.palettes.primary['90'] ?? '#e0e0e0';
  const fgColor = theme.colors.onPrimaryContainer ?? tokens.palettes.primary['10'] ?? '#222';
  const fontStyle = theme.fonts?.labelLarge ?? typographyScale('lg');
  const labelText = label ? label[0].toUpperCase() : '';

  return (
    <View
      style={[
        styles.root,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: radius,
          backgroundColor: bgColor,
          overflow: 'hidden',
        },
        style,
      ]}
      accessible={true}
      accessibilityLabel={accessibilityLabel || 'Avatar'}
    >
      {variant === 'image' && source ? (
        <Image
          source={source}
          style={{ width: avatarSize, height: avatarSize, borderRadius: radius }}
          resizeMode="cover"
        />
      ) : variant === 'icon' && icon ? (
        <MaterialCommunityIcons
          name={icon}
          size={avatarSize * 0.6}
          color={fgColor}
          style={{ alignSelf: 'center' }}
        />
      ) : variant === 'text' && labelText ? (
        <Text style={[{ color: fgColor, textAlign: 'center' }, fontStyle]}>{labelText}</Text>
      ) : null}
      {checked && (
        <View style={[
          styles.checkBadge,
          {
            backgroundColor: theme.colors.primary,
            borderColor: bgColor,
            width: avatarSize * 0.35,
            height: avatarSize * 0.35,
            borderRadius: avatarSize * 0.175,
            right: -avatarSize * 0.08,
            bottom: -avatarSize * 0.08,
          },
        ]}>
          <MaterialCommunityIcons
            name="check"
            size={avatarSize * 0.18}
            color="#fff"
            style={{ alignSelf: 'center' }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Avatar;

/**
 * Usage example:
 *
 * <Avatar variant="image" source={{ uri: 'https://...' }} size="md" checked />
 * <Avatar variant="icon" icon="account" size={48} />
 * <Avatar variant="text" label="A" size="lg" />
 */
