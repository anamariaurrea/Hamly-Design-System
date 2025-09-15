// Profile.tsx
import * as React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import AppBar from '../../design-system/components/AppBar/AppBar';
import IconButton from '../../design-system/components/Button/IconButton';
import { spacing } from '../../design-system/tokens/spacing';
import { useAppTheme } from '../../design-system/providers/ThemeProvider';

const Profile = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useAppTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1 }}>
        <AppBar
          title="Perfil"
          leftIconName={undefined}
          style={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
          rightIcons={
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <IconButton
                icon={isDarkMode ? "weather-sunny" : "weather-night"}
                size={32}
                onPress={toggleTheme}
                accessibilityLabel={isDarkMode ? "Modo claro" : "Modo oscuro"}
              />
              <IconButton icon="cog-outline" size={32} onPress={() => { }} accessibilityLabel="Ajustes" />
            </View>
          }
        />
        <View style={{ flex: 1, marginTop: 64, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: theme.colors.onBackground }}>Profile Screen</Text>
          <Text style={{ color: theme.colors.onBackground, marginTop: 16 }}>
            Modo actual: {isDarkMode ? 'Oscuro' : 'Claro'}
          </Text>
          {/* TODO: Add profile content */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
