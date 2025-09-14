// Circular.tsx
import * as React from "react";
import {
  View,
  ViewStyle,
  AccessibilityRole,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { ActivityIndicator, useTheme } from "react-native-paper";

export interface CircularProgressProps {
  value?: number; // 0..1
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  start: number,
  end: number,
) {
  const startPt = polarToCartesian(cx, cy, r, end);
  const endPt = polarToCartesian(cx, cy, r, start);
  const largeArcFlag = end - start <= 180 ? "0" : "1";
  return [
    "M",
    startPt.x,
    startPt.y,
    "A",
    r,
    r,
    0,
    largeArcFlag,
    0,
    endPt.x,
    endPt.y,
  ].join(" ");
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value = 0,
  size = 32,
  strokeWidth = 4,
  color,
  trackColor,
  style,
  testID,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const progressColor = color ?? theme.colors.primary;
  const trackBg = trackColor ?? theme.colors.primaryContainer;
  const clampedValue = clamp(value);
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const startAngle = 0;
  const endAngle = clampedValue * 360;

  // --- Accessibility ---
  const accessibilityProps = {
    accessibilityRole: "adjustable" as AccessibilityRole,
    accessibilityValue: {
      now: Math.round(clampedValue * 100),
      min: 0,
      max: 100,
    },
    testID,
    accessibilityLabel,
  };

  // --- Render ---
  const svgStyle = { transform: [{ rotate: "-90deg" }] };

  return (
    <View
      style={[{ width: size, height: size }, style]}
      {...accessibilityProps}
    >
      <Svg width={size} height={size} style={svgStyle}>
        {/* Track */}
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={trackBg}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress arc */}
        <Path
          d={describeArc(cx, cy, r, startAngle, endAngle)}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
};

export const Circular = CircularProgress;
