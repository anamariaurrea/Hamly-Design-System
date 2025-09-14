import React from "react";
import { View, Image, StyleSheet, ViewStyle, Dimensions } from "react-native";
import { Card as PaperCard, Text, useTheme, Icon } from "react-native-paper";
import { radius } from "../../design-system/tokens/radius";
import { spacing } from "../../design-system/theme";

export interface CardVariantProps {
  title: string;
  rating?: number;
  maxStars?: number;
  image?: { uri: string };
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const IMAGE_HEIGHT = 130;
const IMAGE_RADIUS = 12;
const STAR_SIZE = 22;

export const CardVariant: React.FC<CardVariantProps> = ({
  title,
  rating = 0,
  maxStars = 3,
  image,
  onPress,
  style,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const outline = theme.colors.outlineVariant ?? theme.colors.outline;
  const onSurface = theme.colors.onSurface;
  const cardRadius = radius.lg ?? 16;
  const screenWidth = Dimensions.get("window").width;

  return (
    <PaperCard
      mode="outlined"
      style={[
        styles.card,
        {
          borderRadius: cardRadius,
          borderColor: outline,
          backgroundColor: theme.colors.surface,
          width: "100%",
        },
        style,
      ]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel || title}
    >
      {/* Imagen o placeholder */}
      {image ? (
        <Image
          source={image}
          style={{
            width: "100%",
            height: IMAGE_HEIGHT,
            borderTopLeftRadius: IMAGE_RADIUS,
            borderTopRightRadius: IMAGE_RADIUS,
          }}
          resizeMode="cover"
          accessibilityLabel={title}
        />
      ) : (
        <View
          style={{
            width: "100%",
            height: IMAGE_HEIGHT,
            backgroundColor: theme.colors.surfaceVariant,
            borderTopLeftRadius: IMAGE_RADIUS,
            borderTopRightRadius: IMAGE_RADIUS,
            justifyContent: "center",
            alignItems: "center",
          }}
          accessibilityLabel="Imagen placeholder"
        >
          <Icon source="image-off-outline" size={32} color={outline} />
        </View>
      )}
      {/* Contenido */}
      <View style={styles.content}>
        <Text
          variant="titleMedium"
          style={{ color: onSurface, minWidth: 0 }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        {/* Estrellas */}
        <View style={styles.starsRow}>
          {Array.from({ length: maxStars }).map((_, i) => (
            <Icon
              key={i}
              source={i < rating ? "star" : "star-outline"}
              size={STAR_SIZE}
              color={i < rating ? theme.colors.primary : outline}
            />
          ))}
        </View>
      </View>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
    marginBottom: spacing(2),
  },
  content: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(2),
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing(1),
  },
});

// Ejemplo de uso:
/*
<CardVariant
  title="Fundamentos de la Radio"
  rating={1}
  maxStars={3}
  image={{ uri: 'https://placehold.co/600x400' }}
/>
*/
