// Profile.tsx
import * as React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import AppBar from '../../design-system/components/AppBar/AppBar';
import IconButton from '../../design-system/components/Button/IconButton';
import { spacing } from '../../design-system/tokens/spacing';

const Profile = () => (
  <SafeAreaView style={{ flex: 1 }}>
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
            <IconButton icon="weather-night" size={32} onPress={() => { }} accessibilityLabel="Modo oscuro" />
            <IconButton icon="cog-outline" size={32} onPress={() => { }} accessibilityLabel="Ajustes" />
          </View>
        }
      />
      <View style={{ flex: 1, marginTop: 64, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        {/* TODO: Add profile content */}
      </View>
    </View>
  </SafeAreaView>
);

export default Profile;
