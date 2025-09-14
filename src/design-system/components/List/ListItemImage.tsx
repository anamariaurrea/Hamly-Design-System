// ListItemImage.tsx
import * as React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Text, IconButton, Icon, TouchableRipple } from 'react-native-paper';
import { radius } from '../../tokens/radius';
import { spacing } from '../../theme';

export interface ListItemImageProps {
  title: string;
  author?: string;
  date?: string;
  year?: string | number;
  preview?: string;
  imageUri?: string;
  liked?: boolean;
  likesCount?: number;
  onPress?: () => void;
  onLikePress?: () => void;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

const AVATAR = 56;
const BORDER_RADIUS = radius.lg ?? 16;

export const ListItemImage: React.FC<ListItemImageProps> = ({
  title,
  author,
  date,
  year,
  preview,
  imageUri,
  liked = false,
  likesCount = 0,
  onPress,
  onLikePress,
  style,
  testID,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const meta = [author, date, year].filter(Boolean).join(' • ');
  const rippleColor = theme.colors.onSurface + '1F'; // ~0.12 alpha
  const a11yLabel =
    accessibilityLabel || `${title}. ${meta}. ${likesCount ?? 0} likes`;

  return (
    <TouchableRipple
      onPress={onPress}
      style={[
        styles.root,
        { backgroundColor: theme.colors.surface },
        style,
      ]}
      rippleColor={rippleColor}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      testID={testID}
    >
      <View>
        <View style={styles.row}>
          {/* Left image/placeholder */}
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{
                width: AVATAR,
                height: AVATAR,
                borderRadius: BORDER_RADIUS, // image remains rounded
              }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                width: AVATAR,
                height: AVATAR,
                // REMOVE borderRadius from placeholder background
                backgroundColor: theme.colors.surfaceVariant,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon source="image" size={24} color={theme.colors.onSurfaceVariant} />
            </View>
          )}
          {/* Middle text block */}
          <View style={styles.textBlock}>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onSurface }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            {meta ? (
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {meta}
              </Text>
            ) : null}
            {preview ? (
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant, opacity: 0.8 }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {preview}
              </Text>
            ) : null}
          </View>
          {/* Right like column */}
          <View style={styles.likeColumn}>
            <IconButton
              icon={liked ? 'heart' : 'heart-outline'}
              size={20}
              onPress={onLikePress}
              iconColor={liked ? theme.colors.primary : theme.colors.onSurfaceVariant}
              style={{ margin: 0 }}
              accessibilityLabel={liked ? 'Quitar me gusta' : 'Dar me gusta'}
            />
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {likesCount ?? 0}
            </Text>
          </View>
        </View>
        {/* Divider */}
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            backgroundColor: theme.colors.outlineVariant,
            marginTop: spacing(1),
          }}
        />
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1.25),
    minHeight: 76,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.5),
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    gap: 2,
  },
  likeColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: spacing(1),
  },
});

export default ListItemImage;

// Ejemplo de uso:
/*
<ListItemImage
  title="How did you radio..."
  author="VK4HAT"
  date="Aug 11"
  year="2018"
  preview="Hi there and welcome!"
  imageUri="https://picsum.photos/seed/ham/200"
  liked
  likesCount={21}
  onPress={() => {}}
  onLikePress={() => {}}
/>
*/
