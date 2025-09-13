import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import type { Theme as PaperTheme } from 'react-native-paper';

// Tokens (ajusta ruta si tu estructura es distinta)
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { color } from '../../tokens/color';
import { motion } from '../../tokens/motion';

export interface AppBarProps {
  title?: string;
  badgeCount?: number;
  onPressLeft?: () => void;
  leftImage?: ImageSourcePropType;
  showDropdown?: boolean;
  style?: ViewStyle;
}

/**
 * AppBar - Design System wrapper
 *
 * Usa tokens (spacing/typography/radius) y react-native-paper theme.
 *
 * Assets: por defecto usará:
 *   require('../../../../assets/icon.png') y require('../../../../assets/bolt.png')
 * Si tus assets están en otra ruta, pásalos vía `leftImage` o ajusta los require.
 *
 * Ejemplo:
 * <AppBar title="Cursos" badgeCount={3} onPressLeft={() => {}} />
 */
export const AppBar: React.FC<AppBarProps> = ({
  title = 'Cursos',
  badgeCount = 0,
  onPressLeft,
  leftImage,
  showDropdown = true,
  style,
}) => {
  const theme: PaperTheme = useTheme();

  // Fallbacks si tokens no contienen algo (comentario: fallback aplicado)
  // spacing.md -> 16, typography.bodyLarge.size -> 16, radius.round -> 9999
  // Si tus tokens difieren, actualiza los imports.
  const horizontalPadding = spacing?.md ?? 16;
  const verticalPadding = spacing?.sm ?? 8;
  const titleFontSize = typography?.md?.fontSize ?? 16;
  const titleFontWeight = typography?.md?.fontWeight ?? '600';
  const pillRadius = radius?.round ?? 9999;
  const outline = theme.colors?.outline ?? color?.neutral?.['30'] ?? '#E0E0E0';

  // default assets (ajusta ruta si hace falta)
  const leftAsset =
    leftImage ?? require('../../../../assets/icon.png'); /* si el require no existe, pásalo por props */
  const boltAsset = require('../../../../assets/bolt.png');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: outline,
          paddingHorizontal: horizontalPadding,
          paddingTop: Platform.OS === 'ios' ? verticalPadding + 4 : verticalPadding,
          height: 80,
        },
        style,
      ]}
    >
      <View style={styles.leftContainer}>
        <TouchableOpacity
          onPress={onPressLeft}
          activeOpacity={0.7}
          accessible
          accessibilityRole="button"
          accessibilityLabel={`${title} menu`}
          style={[
            styles.pill,
            {
              borderRadius: pillRadius,
              borderColor: outline,
              backgroundColor: theme.colors.surface,
              paddingVertical: verticalPadding - 2,
              paddingHorizontal: horizontalPadding / 1.5,
            },
          ]}
        >
          <Image source={leftAsset} style={[styles.icon]} />
          <Text
            variant="bodyLarge"
            style={{
              ...styles.title,
              color: theme.colors.onSurface,
              fontSize: titleFontSize,
              fontWeight: titleFontWeight as any,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>

          {showDropdown && (
            <IconButton
              icon="chevron-down"
              size={18}
              onPress={onPressLeft}
              style={styles.chevBtn}
              iconColor={theme.colors.onSurface}
              accessibilityLabel="Abrir opciones"
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.rightContainer}>
        <Image source={boltAsset} style={styles.boltIcon} />
        <Text
          variant="bodyLarge"
          style={{
            marginLeft: 8,
            fontSize: titleFontSize,
            fontWeight: '700',
            color: theme.colors.onSurface,
          }}
        >
          {badgeCount}
        </Text>
      </View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    // paddingHorizontal and height handled inline to use tokens/fallbacks
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boltIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 6,
  },
  title: {
    maxWidth: 160,
  },
  chevBtn: {
    margin: 0,
  },
});

