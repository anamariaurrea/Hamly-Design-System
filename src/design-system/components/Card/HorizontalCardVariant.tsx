import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import Avatar from "../Avatar/Avatar";
import { radius } from "../../tokens/radius";
import { spacing } from "../../theme";

export interface HorizontalCardVariantProps {
  title: string;
  category?: string;
  valueRight?: string;
  position?: number;
  labelForAvatar?: string;
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export const HorizontalCardVariant: React.FC<HorizontalCardVariantProps> = ({
  title,
  category,
  valueRight,
  position,
  labelForAvatar,
  onPress,
  style,
  accessibilityLabel,
}) => {
  const theme = useTheme<MD3Theme>();
  const cardRadius = radius.lg ?? 16;
  const outline = (theme.colors as any).outlineVariant ?? theme.colors.outline;
  const avatarLabel =
    labelForAvatar?.[0]?.toUpperCase() || title[0]?.toUpperCase() || "";

  return (
    <View style={[styles.card, style]}>
      <View style={styles.row}>
        {/* Avatar de posición (outline) */}
        {typeof position === "number" && (
          <View style={styles.positionAvatarContainer}>
            <Avatar
              variant="text"
              label={String(position)}
              size={28}
              style={{
                borderColor: outline,
                borderWidth: StyleSheet.hairlineWidth,
                backgroundColor: theme.colors.surface,
              }}
              accessibilityLabel={`Posición ${position}`}
            />
          </View>
        )}
        {/* Avatar principal */}
        <View style={styles.mainAvatarContainer}>
          <Avatar
            variant="text"
            label={avatarLabel}
            size={40}
            style={{ backgroundColor: theme.colors.primaryContainer }}
            accessibilityLabel={avatarLabel}
          />
        </View>
        {/* Textos */}
        <View style={styles.textContainer}>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onSurface }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          {!!category && (
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {category}
            </Text>
          )}
        </View>
        {/* Valor a la derecha */}
        {valueRight && (
          <View style={styles.valueRightContainer}>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {valueRight}
            </Text>
          </View>
        )}
      </View>
      {/* Línea inferior sutil */}
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: outline,
          opacity: 0.5,
          marginTop: spacing ? spacing(0.5) : 4,
          borderBottomLeftRadius: cardRadius,
          borderBottomRightRadius: cardRadius,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 72,
    justifyContent: "center",
    paddingVertical: spacing ? spacing(1) : 8,
    paddingHorizontal: spacing ? spacing(2) : 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 72,
    width: "100%",
  },
  positionAvatarContainer: {
    marginRight: spacing ? spacing(1) : 8,
  },
  mainAvatarContainer: {
    marginRight: spacing ? spacing(1) : 8,
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
    gap: 2,
  },
  valueRightContainer: {
    marginLeft: spacing ? spacing(2) : 16,
    minWidth: 0,
    alignItems: "flex-end",
  },
});

// Ejemplo de uso:
// <HorizontalCardVariant
//   title="Nombre"
//   category="Categoría"
//   valueRight="1,500px"
//   position={1}
//   labelForAvatar="Ana"
// />
