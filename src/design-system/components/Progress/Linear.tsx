// Linear.tsx
import * as React from 'react';
import { View, StyleSheet, ViewStyle, LayoutChangeEvent, Animated, Image } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { ProgressBar, useTheme } from 'react-native-paper';

export interface LinearProgressProps {
  value?: number;
  variant?: 'md3' | 'wave';
  indeterminate?: boolean;
  color?: string;
  trackColor?: string;
  height?: number;
  radius?: number;
  waveAmplitude?: number;
  waveWavelength?: number;
  waveSpeedMs?: number;
  transitionMs?: number; // duración de animación de la onda en cambios de progreso
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value = 0,
  variant = 'md3',
  indeterminate = false,
  color,
  trackColor,
  height,
  radius,
  waveAmplitude,
  waveWavelength,
  waveSpeedMs,
  transitionMs = 800,
  style,
  testID,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const progressColor = color ?? theme.colors.primary;
  const trackBg = trackColor ?? theme.colors.primaryContainer;
  const isWave = variant === 'wave';
  const h = height ?? (isWave ? 12 : 4);
  // Grosor visual de línea (onda + track)
  const waveStroke = Math.max(4, Math.round(h * 0.6)); // más ancho
  const amp = waveAmplitude ?? 4;
  const λ = waveWavelength ?? 40;
  const speed = waveSpeedMs ?? 2000;
  const clampedValue = Math.max(0, Math.min(1, value));

  // Configuración de layout
  const iconSize = 32;
  const iconMargin = 0;
  const iconGap = 0;
  const rowHeight = Math.max(h, iconSize);
  // const trackEnd = containerWidth - iconSize / 2 - iconMargin - iconGap;

  // --- Wave Animation ---
  const [containerWidth, setContainerWidth] = React.useState(0);
  const anim = React.useRef(new Animated.Value(0)).current;
  const [offset, setOffset] = React.useState(0);
  const prevValue = React.useRef(clampedValue);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (!isWave) return;
    if (clampedValue !== prevValue.current) {
      setIsAnimating(true);
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: transitionMs,
        useNativeDriver: false,
      }).start(() => {
        setIsAnimating(false);
        anim.setValue(0);
        setOffset(0);
        prevValue.current = clampedValue;
      });
      const id = anim.addListener(({ value }) => {
        setOffset(value * 2 * Math.PI);
      });
      return () => {
        anim.removeListener(id);
      };
    } else {
      setOffset(0);
    }
  }, [clampedValue, isWave, transitionMs, anim]);

  // --- Path Generators ---
  const centerY = h / 2;
  function wavePath(progressWidth: number, trackEnd?: number) {
    if (progressWidth <= 0) return '';
    let d = `M 0 ${centerY}`;
    for (let x = 0; x <= progressWidth; x += 2) {
      const y = centerY + Math.sin((x / λ) * 2 * Math.PI + offset) * amp;
      d += ` L ${x} ${y}`;
    }
    return d;
  }
  function restPath(progressWidth: number, trackEnd?: number) {
    const end = typeof trackEnd === 'number' ? trackEnd : progressWidth;
    if (progressWidth >= end) return '';
    const start = Math.min(end, progressWidth + waveStroke * 0.5);
    return `M ${start} ${centerY} L ${end} ${centerY}`;
  }

  // --- Render ---
  if (isWave) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: rowHeight,
          width: '100%',
          ...style,
        }}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="progressbar"
        accessibilityValue={{ now: Math.round(clampedValue * 100), min: 0, max: 100 }}
      >
        {/* Track SVG */}
        <View
          style={{ flex: 1, height: h, justifyContent: 'center' }}
          onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        >
          {containerWidth > 0 && (() => {
            const progressWidth = containerWidth * clampedValue;
            const trackEnd = containerWidth - iconSize / 2 - iconMargin - iconGap;
            return (
              <>
                {/* Onda (solo hasta progress) */}
                <Svg height={h} width={containerWidth}>
                  <Path
                    d={wavePath(progressWidth, trackEnd)}
                    stroke={progressColor}
                    strokeWidth={waveStroke}
                    strokeLinecap="butt"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </Svg>
                {/* Resto del track (delgado, termina antes del icono) */}
                <Svg height={h} width={containerWidth}>
                  <Path
                    d={restPath(progressWidth, trackEnd)}
                    stroke={trackBg}
                    strokeWidth={waveStroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </Svg>
                {/* Stop dot */}
                {progressWidth > 0 && progressWidth < trackEnd && (
                  <Circle
                    cx={progressWidth}
                    cy={centerY}
                    r={waveStroke / 2}
                    fill={progressColor}
                    stroke={progressColor}
                    strokeWidth={2}
                  />
                )}
              </>
            );
          })()}
        </View>
        {/* Icono Vector */}
        <View style={{ width: iconSize, height: iconSize, marginLeft: iconGap, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../../../assets/Vector.png')}
            style={{ width: iconSize, height: iconSize, zIndex: 2 }}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }

  // --- MD3 variant ---
  if (!isWave) {
    const borderRadiusValue = typeof radius !== 'undefined' ? radius : 999;
    return (
      <View
        style={{
          overflow: 'hidden',
          borderRadius: borderRadiusValue,
          height: h,
          backgroundColor: trackBg,
        }}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="progressbar"
        accessibilityValue={
          indeterminate ? undefined : { now: Math.round(clampedValue * 100) }
        }
      >
        <ProgressBar
          progress={indeterminate ? undefined : clampedValue}
          indeterminate={indeterminate}
          color={progressColor}
          style={[{ height: h, borderRadius: borderRadiusValue }, style]}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    overflow: 'visible',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export interface LinearProgressWaveProps {
  progress?: number;
  height?: number;
  waveColor?: string;
  trackColor?: string;
  showStopDot?: boolean;
  showVectorIcon?: boolean;
  animated?: boolean;
  waveAmplitude?: number;
  waveWavelength?: number;
  waveSpeedMs?: number;
  transitionMs?: number;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

// PATCH LinearProgressWave igual que LinearProgress variante wave
export const LinearProgressWave: React.FC<LinearProgressWaveProps> = ({
  progress = 0.7,
  height = 12,
  waveColor,
  trackColor,
  showStopDot = true,
  showVectorIcon = true,
  animated = true,
  waveAmplitude = 4,
  waveWavelength = 40,
  waveSpeedMs = 2000,
  transitionMs = 800,
  style,
  testID,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const progressColor = waveColor ?? theme.colors.primary;
  const trackBg = trackColor ?? theme.colors.primaryContainer;
  const h = height;
  const waveStroke = Math.max(4, Math.round(h * 0.6));
  const amp = waveAmplitude;
  const λ = waveWavelength;
  const speed = waveSpeedMs;
  const clampedValue = Math.max(0, Math.min(1, progress));

  // --- Wave Animation ---
  const [containerWidth, setContainerWidth] = React.useState(0);
  const anim = React.useRef(new Animated.Value(0)).current;
  const [offset, setOffset] = React.useState(0);
  const prevValue = React.useRef(clampedValue);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (!animated) return;
    if (clampedValue !== prevValue.current) {
      setIsAnimating(true);
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: transitionMs,
        useNativeDriver: false,
      }).start(() => {
        setIsAnimating(false);
        anim.setValue(0);
        setOffset(0);
        prevValue.current = clampedValue;
      });
      const id = anim.addListener(({ value }) => {
        setOffset(value * 2 * Math.PI);
      });
      return () => {
        anim.removeListener(id);
      };
    } else {
      setOffset(0);
    }
  }, [clampedValue, animated, transitionMs, anim]);

  // --- Path Generators ---
  // Ajusta la altura del SVG y el contenedor para que la onda no se corte
  const svgHeight = h + waveStroke * 2; // espacio extra arriba y abajo
  const centerY = svgHeight / 2;
  const progressWidth = containerWidth * clampedValue;
  const iconSize = 32;
  const iconMargin = 12;
  const iconGap = 8;
  const trackEnd = containerWidth - iconSize / 2 - iconMargin - iconGap;
  function wavePath(progressWidth: number) {
    if (progressWidth <= 0) return '';
    let d = `M 0 ${centerY}`;
    for (let x = 0; x <= progressWidth; x += 2) {
      const y = centerY + Math.sin((x / λ) * 2 * Math.PI + offset) * amp;
      d += ` L ${x} ${y}`;
    }
    return d;
  }
  function restPath(progressWidth: number) {
    if (progressWidth >= trackEnd) return '';
    const start = Math.min(trackEnd, progressWidth + waveStroke * 0.5);
    return `M ${start} ${centerY} L ${trackEnd} ${centerY}`;
  }

  return (
    <View
      style={{
        overflow: 'visible',
        height: svgHeight,
        ...style,
      }}
      onLayout={(e: LayoutChangeEvent) => setContainerWidth(e.nativeEvent.layout.width)}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      accessibilityValue={{ now: Math.round(clampedValue * 100), min: 0, max: 100 }}
    >
      {containerWidth > 0 && (
        <Svg height={svgHeight} width={containerWidth}>
          {/* Onda (solo hasta progress) */}
          <Path
            d={wavePath(Math.min(progressWidth, trackEnd))}
            stroke={progressColor}
            strokeWidth={waveStroke}
            strokeLinecap="butt"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Resto del track (delgado, termina antes del icono) */}
          <Path
            d={restPath(progressWidth)}
            stroke={trackBg}
            strokeWidth={waveStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Stop dot */}
          {progressWidth > 0 && progressWidth < trackEnd && (
            <Circle
              cx={progressWidth}
              cy={centerY}
              r={waveStroke / 2}
              fill={progressColor}
              stroke={progressColor}
              strokeWidth={2}
            />
          )}
        </Svg>
      )}
      {/* Vector image más pequeño, con margen y espacio respecto al track */}
      {showVectorIcon && containerWidth > 0 && (
        <Image
          source={require('../../../../assets/Vector.png')}
          style={{
            position: 'absolute',
            right: iconMargin,
            top: Math.round(centerY - iconSize / 2),
            width: iconSize,
            height: iconSize,
            zIndex: 2,
          }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

