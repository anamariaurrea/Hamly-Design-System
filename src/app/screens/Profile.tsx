// Profile.tsx
import * as React from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import AppBar from '../../design-system/components/AppBar/AppBar';
import IconButton from '../../design-system/components/Button/IconButton';
import Avatar from '../../design-system/components/Avatar/Avatar';
import { Button } from '../../design-system/components/Button/Button';
import CardHorizontal from '../../design-system/components/Card/CardHorizontal';
import { spacing } from '../../design-system/tokens/spacing';
import { useAppTheme } from '../../design-system/providers/ThemeProvider';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Profile = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useAppTheme();

  const profileImage = require('../../../assets/profile-avatar.png');
  const certificateImage1 = require('../../../assets/courses-radio.png');
  const certificateImage2 = require('../../../assets/profile-antenna.png');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1 }}>
        <AppBar
          title="Perfil"
          leftIconName={undefined}
          style={{
            paddingHorizontal: spacing.lg,
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
                size={24}
                onPress={toggleTheme}
                accessibilityLabel={isDarkMode ? "Modo claro" : "Modo oscuro"}
              />
              <IconButton icon="cog-outline" size={24} onPress={() => { }} accessibilityLabel="Ajustes" />
            </View>
          }
        />

        <ScrollView
          style={{ flex: 1, marginTop: 2 }}
          contentContainerStyle={{
            padding: spacing.lg,
            paddingBottom: spacing.xxl
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar y botón editar */}
          <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
            <Avatar
              size={120}
              source={profileImage}
              style={{ marginBottom: spacing.md }}
            />
            <Text style={{
              fontSize: 24,
              fontWeight: '600',
              color: theme.colors.onBackground,
              marginBottom: spacing.md
            }}>
              Carlos R.
            </Text>
            <Button
              variant="outlined"
              icon="account-edit-outline"
              label="Editar"
              onPress={() => { }}
              style={{ marginBottom: spacing.xl }}
            />
          </View>

          {/* Certificados */}
          <Text style={{
            fontSize: 20,
            fontWeight: '500',
            color: theme.colors.onBackground,
            marginBottom: spacing.md,
            textAlign: 'left'
          }}>
            Certificados
          </Text>

          <View style={{ marginBottom: spacing.xl }}>
            <CardHorizontal
              title="Explorador de Ondas"
              meta="Subhead"
              image={certificateImage1}
              style={{ width: '100%', marginBottom: spacing.sm }}
              onPress={() => { }}
            />
            <CardHorizontal
              title="Constructor de Señales"
              meta="Subhead"
              image={certificateImage2}
              style={{ width: '100%' }}
              onPress={() => { }}
            />
          </View>

          {/* Logros */}
          <Text style={{
            fontSize: 20,
            fontWeight: '500',
            color: theme.colors.onBackground,
            marginBottom: spacing.md,
            textAlign: 'left'
          }}>
            Logros
          </Text>

          {/* Grid de logros */}
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: spacing.sm
          }}>
            {/* Racha de Sintonía */}
            <View style={{
              width: '48%',
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.colors.outlineVariant,
              padding: spacing.md,
              alignItems: 'center',
              marginBottom: spacing.sm
            }}>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={32}
                color="#FFB000"
                style={{ marginBottom: spacing.sm }}
              />
              <Text style={{
                fontSize: 24,
                fontWeight: '600',
                color: theme.colors.onSurface,
                marginBottom: 4
              }}>
                1
              </Text>
              <Text style={{
                fontSize: 14,
                color: theme.colors.onSurfaceVariant,
                textAlign: 'center'
              }}>
                Racha de Sintonía
              </Text>
            </View>

            {/* Mejor Racha */}
            <View style={{
              width: '48%',
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.colors.outlineVariant,
              padding: spacing.md,
              alignItems: 'center',
              marginBottom: spacing.sm
            }}>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={32}
                color="#FF5722"
                style={{ marginBottom: spacing.sm }}
              />
              <Text style={{
                fontSize: 24,
                fontWeight: '600',
                color: theme.colors.onSurface,
                marginBottom: 4
              }}>
                5
              </Text>
              <Text style={{
                fontSize: 14,
                color: theme.colors.onSurfaceVariant,
                textAlign: 'center'
              }}>
                Mejor Racha
              </Text>
            </View>

            {/* Cuarzo Liga */}
            <View style={{
              width: '48%',
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.colors.outlineVariant,
              padding: spacing.md,
              alignItems: 'center'
            }}>
              <MaterialCommunityIcons
                name="trophy"
                size={32}
                color="#9C27B0"
                style={{ marginBottom: spacing.sm }}
              />
              <Text style={{
                fontSize: 24,
                fontWeight: '600',
                color: theme.colors.onSurface,
                marginBottom: 4
              }}>
                Cuarzo
              </Text>
              <Text style={{
                fontSize: 14,
                color: theme.colors.onSurfaceVariant,
                textAlign: 'center'
              }}>
                Liga
              </Text>
            </View>

            {/* Puntos */}
            <View style={{
              width: '48%',
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.colors.outlineVariant,
              padding: spacing.md,
              alignItems: 'center'
            }}>
              <MaterialCommunityIcons
                name="star"
                size={32}
                color="#FF9800"
                style={{ marginBottom: spacing.sm }}
              />
              <Text style={{
                fontSize: 24,
                fontWeight: '600',
                color: theme.colors.onSurface,
                marginBottom: 4
              }}>
                750
              </Text>
              <Text style={{
                fontSize: 14,
                color: theme.colors.onSurfaceVariant,
                textAlign: 'center'
              }}>
                Puntos
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
