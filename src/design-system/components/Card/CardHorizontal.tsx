// CardHorizontal.tsx
import React from 'react';
import { View, Image, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Card as PaperCard, Text, useTheme, IconButton } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { Avatar } from '../Avatar';
import { radius } from '../../tokens/radius';
import { spacing } from '../../theme';

export interface HorizontalCardProps {
  title: string;
  meta?: string;
  image?: { uri: string };             // ahora opcional
  actions?: Array<{
    icon: string;
    onPress?: () => void;
    accessibilityLabel?: string;
  }>;
  completed?: boolean;
  labelForAvatar?: string;
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const CARD_RADIUS = radius.lg ?? 16;
const AVATAR_SIZE = 48;
const RIGHT_PANEL_WIDTH = 96;

const CardHorizontal: React.FC<HorizontalCardProps> = ({
  title,
  meta,
  image,
  actions,
  completed = false,
  labelForAvatar,
  onPress,
  style,
  accessibilityLabel,
}) => {
  const theme = useTheme<MD3Theme>();
  const avatarLabel = labelForAvatar?.[0]?.toUpperCase() || title[0]?.toUpperCase() || '';

  const outline = (theme.colors as any).outlineVariant ?? theme.colors.outline;

  return (
    <PaperCard
      mode="outlined"
      style={[
        styles.card,
        {
          borderRadius: CARD_RADIUS,
          borderColor: outline,
          backgroundColor: (theme.colors as any).surfaceVariant ?? theme.colors.surface, // gris suave exterior
          overflow: 'hidden',
        },
        style,
      ]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel || title}
    >
      <View style={styles.row}>
        {/* CONTENIDO IZQUIERDO */}
        <View
          style={[
            styles.contentContainer,
            {
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            {completed ? (
              <Avatar
                variant="icon"
                icon="check"
                size={AVATAR_SIZE}
                style={{ backgroundColor: theme.colors.primaryContainer }}
                accessibilityLabel="Completado"
              />
            ) : (
              <Avatar
                variant="text"
                label={avatarLabel}
                size={AVATAR_SIZE}
                style={{ backgroundColor: theme.colors.primaryContainer }}
                accessibilityLabel={avatarLabel}
              />
            )}
          </View>

          <View style={styles.textContainer}>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onSurface }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            {!!meta && (
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {meta}
              </Text>
            )}
          </View>
        </View>

        {/* SEPARADOR VERTICAL */}
        <View style={[styles.separator, { backgroundColor: outline }]} />

        {/* PANEL DERECHO: acciones o imagen */}
        <View
          style={[
            styles.rightPanel,
            {
              backgroundColor: (theme.colors as any).surfaceVariant ?? theme.colors.surface,
            },
          ]}
        >
          {image ? (
            <Image
              source={image}
              style={styles.rightImage}
              resizeMode="cover"
              accessibilityLabel={title}
            />
          ) : (
            <View style={styles.actionsRow}>
              {(actions?.length ? actions : [{ icon: 'star-outline' }, { icon: 'cog-outline' }]).map(
                (a, idx) => (
                  <IconButton
                    key={`${a.icon}-${idx}`}
                    icon={a.icon}
                    onPress={a.onPress}
                    accessibilityLabel={a.accessibilityLabel ?? a.icon}
                    size={20}
                  />
                )
              )}
            </View>
          )}
        </View>
      </View>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 72,
    height: 72,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '100%',
    width: '100%',
  },

  // IZQUIERDA
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing ? spacing(2) : 16,
    paddingRight: spacing ? spacing(2) : 16,
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing ? spacing(1.25) : 10,
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    gap: 2,
  },

  // SEPARADOR
  separator: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    opacity: 0.5,
  },

  // DERECHA
  rightPanel: {
    width: RIGHT_PANEL_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: CARD_RADIUS,
    borderBottomRightRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  rightImage: {
    width: RIGHT_PANEL_WIDTH,
    height: '100%',
  },
});

export default CardHorizontal;
export { CardHorizontal };

