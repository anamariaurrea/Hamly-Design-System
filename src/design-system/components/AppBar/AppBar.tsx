import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Text, useTheme, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplitButton from '../Button/SplitButton';

// Usamos SafeAreaView para respetar la zona segura superior (notch/status bar) en headers.

export interface AppBarProps {
  onClick?: () => void;
  leftIconName?: string; // MaterialCommunityIcons name
  boltIconName?: string; // MaterialCommunityIcons name
  title?: string;
  count?: number;
  style?: ViewStyle;
  rightIcons?: React.ReactNode; // NUEVA PROP para iconos personalizados a la derecha
}

// Named export for AppBarContent if needed elsewhere
export const AppBarContent: React.FC<Pick<AppBarProps, 'title' | 'count'>> = ({
  title = 'Cursos',
  count = 0,
}) => {
  const theme = useTheme();
  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>
      <MaterialCommunityIcons
        name="chevron-down"
        size={20}
        color={theme.colors.onSurface}
        style={styles.chevron}
      />
      <View style={styles.boltContainer}>
        <MaterialCommunityIcons
          name='star'
          size={20}
          color={theme.colors.primary}
        />
        <Text style={[styles.count, { color: theme.colors.primary }]}>{count}</Text>
      </View>
    </View>
  );
};

const AppBar: React.FC<AppBarProps> = ({
  onClick,
  leftIconName,
  boltIconName = 'star',
  title = 'Cursos',
  count = 0,
  style,
  rightIcons,
}) => {
  const theme = useTheme();

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: theme.colors.surface }}>
      <View style={[
        styles.root,
        {
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.outlineVariant,
        },
        style
      ]}>
        {/* Left pill con SplitButton si hay leftIconName */}
        {leftIconName ? (
          <SplitButton
            icon="chevron-down"
            label={title}
            onPrimaryPress={onClick}
            onSecondaryPress={onClick} // El botón secundario también activa el BottomSheet
            style={styles.leftPill}
          />
        ) : (
          <View style={styles.leftTitleOnly}>
            <Text style={[styles.pillText, { color: theme.colors.onSurface }]}>{title}</Text>
          </View>
        )}
        {/* Right icons personalizados o bolt+count por defecto */}
        <View style={styles.rightContainer}>
          {rightIcons ? (
            rightIcons
          ) : (
            <>
              <MaterialCommunityIcons
                name={boltIconName}
                size={32}
                color={theme.colors.outlineVariant}
                style={styles.boltIcon}
              />
              <Text style={[styles.count, { color: theme.colors.onSurfaceVariant }]}>{count}</Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64, // Altura fija para todas las variantes
    backgroundColor: 'transparent',
  },
  leftPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8, // Padding vertical consistente
    elevation: 1,
    height: 40, // Altura fija para el pill
  },
  leftIcon: {
    marginRight: 8,
  },
  pillText: {
    fontSize: 22, // Cambiado a tamaño 22 para title large
    fontWeight: '500',
    marginRight: 4,
  },
  chevron: {
    marginLeft: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 40, // Altura consistente con el lado izquierdo
  },
  boltIcon: {
    marginRight: 4,
  },
  count: {
    fontSize: 15,
    fontWeight: '600',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boltContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  title: {
    fontSize: 22, // Cambiado a tamaño 22 para title large
    fontWeight: '500',
  },
  leftTitleOnly: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8, // Padding vertical consistente
    elevation: 1,
    height: 40, // Altura fija consistente con leftPill
  },
});

export default AppBar;

