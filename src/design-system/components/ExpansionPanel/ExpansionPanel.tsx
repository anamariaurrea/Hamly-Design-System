// ExpansionPanel.tsx
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  ViewStyle,
  AccessibilityState,
} from "react-native";
import { useTheme, IconButton } from "react-native-paper";
import { CardHorizontal } from "../Card";
import { radius } from "../../tokens/radius";
import { spacing } from "../../tokens/spacing";

export type ExpansionPanelItem = {
  id: string;
  title?: string;
  subtitle?: string;
  card?: {
    title: string;
    meta?: string;
    image: { uri: string };
    completed?: boolean;
    labelForAvatar?: string;
    onPress?: () => void;
  };
};

export interface ExpansionPanelProps {
  levelLabel?: string;
  title: string;
  subtitle?: string;
  items?: ExpansionPanelItem[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (next: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export const ExpansionPanel: React.FC<ExpansionPanelProps> = ({
  levelLabel,
  title,
  subtitle,
  items = [],
  expanded,
  defaultExpanded = false,
  onToggle,
  disabled = false,
  style,
  testID,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const [internalExpanded, setInternalExpanded] =
    React.useState(defaultExpanded);
  const isControlled = typeof expanded === "boolean";
  const isOpen = isControlled ? expanded! : internalExpanded;

  // Animations
  const contentAnim = React.useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  React.useEffect(() => {
    Animated.timing(contentAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen, contentAnim]);

  // Chevron rotation
  const rotate = contentAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  // Height and opacity animation
  const [contentHeight, setContentHeight] = React.useState(0);
  const animatedHeight = contentAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });
  const animatedOpacity = contentAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Toggle handler
  const handleToggle = () => {
    if (disabled) return;
    if (isControlled) {
      onToggle?.(!isOpen);
    } else {
      setInternalExpanded((prev) => !prev);
      onToggle?.(!isOpen);
    }
  };

  // Accessibility
  const accessibilityState: AccessibilityState = {
    expanded: isOpen,
    disabled,
  };

  // Colors
  const outlineVariant = theme.colors.outlineVariant ?? theme.colors.outline;
  const surface = theme.colors.surface;
  const surfaceVariant = theme.colors.surfaceVariant ?? theme.colors.background;
  const onSurface = theme.colors.onSurface;
  const onPrimaryContainer = theme.colors.onPrimaryContainer;
  const onSurfaceVariant =
    theme.colors.onSurfaceVariant ?? theme.colors.onSurface;

  return (
    <View style={[styles.root, style]} testID={testID}>
      {/* Header */}
      <Pressable
        onPress={handleToggle}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={accessibilityState}
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [
          styles.header,
          {
            backgroundColor: surface,
            borderTopLeftRadius: radius.lg,
            borderTopRightRadius: radius.lg,
            borderBottomLeftRadius: isOpen ? 0 : radius.lg,
            borderBottomRightRadius: isOpen ? 0 : radius.lg,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: outlineVariant,
            opacity: disabled ? 0.5 : 1,
          },
          pressed && { backgroundColor: surfaceVariant },
        ]}
      >
        <View style={{ flex: 1 }}>
          {levelLabel ? (
            <Text
              style={{ color: onSurfaceVariant, fontSize: 12, marginBottom: 2 }}
            >
              {levelLabel}
            </Text>
          ) : null}
          <Text style={{ color: onPrimaryContainer, fontSize: 22, fontWeight: "600" }}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={{ color: onSurfaceVariant, fontSize: 14 }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <Animated.View style={{
          transform: [{ rotate }],
          alignSelf: 'flex-start', // Alinea con el inicio del contenedor
          marginTop: 4, // Un poco más abajo
          marginRight: 8 // Un poco más a la izquierda
        }}>
          <IconButton
            icon="chevron-down"
            size={24}
            disabled
            style={{ margin: 0 }}
            accessibilityLabel={isOpen ? "Colapsar" : "Expandir"}
          />
        </Animated.View>
      </Pressable>
      {/* Content */}
      <Animated.View
        style={{
          height: animatedHeight,
          opacity: animatedOpacity,
          overflow: "hidden",
          backgroundColor: surface,
          borderBottomLeftRadius: radius.lg,
          borderBottomRightRadius: radius.lg,
          borderTopWidth: 0,
        }}
      >
        <View
          style={{ padding: spacing.md }}
          onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        >
          {items.map((item, idx) => (
            <View
              key={item.id}
              style={{ marginBottom: idx < items.length - 1 ? spacing.sm : 0 }}
            >
              {item.card && (
                <CardHorizontal
                  title={item.card.title}
                  meta={item.card.meta}
                  image={item.card.image}
                  completed={item.card.completed}
                  labelForAvatar={item.card.labelForAvatar}
                  onPress={item.card.onPress}
                />
              )}
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 56,
  },
});
