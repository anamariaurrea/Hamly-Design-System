import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Pressable,
  Platform,
} from "react-native";
import { useTheme, Icon, TouchableRipple } from "react-native-paper";
import { radius } from "../../tokens/radius";
import { spacing } from "../../theme";

function withAlpha(hex: string, alpha: number) {
  if (hex.startsWith("#")) hex = hex.slice(1);
  if (hex.length === 6) {
    return `#${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0")}${hex}`;
  }
  if (hex.length === 8) {
    return `#${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0")}${hex.slice(2)}`;
  }
  return hex;
}

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (next: boolean) => void;
  disabled?: boolean;
  elevated?: boolean;
  leadingIcon?: string;
  showCaret?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected,
  defaultSelected,
  onSelectedChange,
  disabled = false,
  elevated = false,
  leadingIcon,
  showCaret = false,
  onPress,
  onLongPress,
  style,
  testID,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const outline = theme.colors.outlineVariant ?? theme.colors.outline;
  const primaryContainer = theme.colors.primaryContainer;
  const onPrimaryContainer = theme.colors.onPrimaryContainer;
  const surface = theme.colors.surface;
  const onSurface = theme.colors.onSurface;
  const onSurfaceVariant = theme.colors.onSurfaceVariant;
  const borderRadius = radius.round ?? 9999;

  const [isSelected, setIsSelected] = React.useState(defaultSelected ?? false);
  const effectiveSelected = selected ?? isSelected;

  // Disabled colors
  const disabledBg = surface;
  const disabledBorder = withAlpha(outline, 0.12);
  const disabledText = withAlpha(onSurface, 0.38);
  const disabledIcon = withAlpha(onSurface, 0.38);

  // Selected colors
  const selectedBg = primaryContainer;
  const selectedText = onPrimaryContainer;
  const selectedCheck = onPrimaryContainer;

  // Default colors
  const defaultBg = surface;
  const defaultText = onSurface;
  const defaultIcon = onSurfaceVariant;

  // Elevation
  const elevation = elevated ? 2 : 0;

  // Ripple / state layer
  const rippleColor = effectiveSelected
    ? withAlpha(onPrimaryContainer, 0.12)
    : withAlpha(onSurface, 0.12);

  // States
  let bgColor = defaultBg;
  let borderColor = outline;
  let textColor = defaultText;
  let iconColor = defaultIcon;
  let checkColor = selectedCheck;
  let caretColor = defaultIcon;
  let opacity = 1;
  let borderWidth = StyleSheet.hairlineWidth;

  if (disabled) {
    bgColor = disabledBg;
    borderColor = disabledBorder;
    textColor = disabledText;
    iconColor = disabledIcon;
    caretColor = disabledIcon;
    opacity = 1;
  } else if (effectiveSelected) {
    bgColor = selectedBg;
    borderColor = selectedBg;
    textColor = selectedText;
    iconColor = selectedText;
    caretColor = selectedText;
    checkColor = selectedCheck;
    borderWidth = 0;
  }

  const handlePress = () => {
    if (!disabled) {
      if (selected === undefined) setIsSelected((prev) => !prev);
      onSelectedChange?.(selected === undefined ? !isSelected : !selected);
      onPress?.();
    }
  };

  return (
    <TouchableRipple
      onPress={handlePress}
      onLongPress={disabled ? undefined : onLongPress}
      style={[
        styles.chip,
        {
          backgroundColor: bgColor,
          borderColor,
          borderRadius,
          opacity,
          elevation,
          borderWidth,
          alignSelf: "flex-start",
        },
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: effectiveSelected }}
      rippleColor={rippleColor}
      disabled={disabled}
    >
      <View style={styles.row}>
        {/* Leading check if selected */}
        {effectiveSelected && <Icon source="check" size={18} color={checkColor} />}
        {/* Leading icon */}
        {leadingIcon && <Icon source={leadingIcon} size={18} color={iconColor} />}
        {/* Label */}
        <Text
          style={[
            styles.label,
            {
              color: textColor,
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {label}
        </Text>
        {/* Caret icon */}
        {showCaret && <Icon source="chevron-down" size={18} color={caretColor} />}
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  chip: {
    minHeight: 32,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 0,
    margin: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 0,
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    flexShrink: 1,
    minWidth: 0,
  },
});

// Showcase:
/*
<FilterChip label="Standalone" defaultSelected />
<FilterChip label="Label" />
<FilterChip label="Label" showCaret />
<FilterChip label="Label" leadingIcon="briefcase" />
<FilterChip label="Label" selected />
<FilterChip label="Label" selected elevated />
<FilterChip label="Label" disabled />
<FilterChip label="Label" selected showCaret />
<FilterChip label="Label" selected leadingIcon="briefcase" />
*/
