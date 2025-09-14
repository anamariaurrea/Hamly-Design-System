// LoginScreen.tsx
import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, Image } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { spacing } from '../../design-system/tokens/spacing';
import { radius } from '../../design-system/tokens/radius';


const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const onGoogle = () => { };
  const onApple = () => { };
  const onFacebook = () => { };
  const onSignIn = () => { };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} accessibilityLabel="Login">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.kav}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/logo-vertical-positivo.png')}
            style={styles.logo}
            resizeMode="contain"
            onError={(e) => console.warn('Logo error:', e.nativeEvent.error)}
          />
          <Text
            variant="headlineSmall"
            style={[
              { fontWeight: 'bold', color: theme.colors.primary, textAlign: 'center', marginTop: spacing.sm },
            ]}
          >
            {`Tu primer contacto con la\nradioafición`}
          </Text>
        </View>
        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={onGoogle}
            style={[styles.cta, { borderRadius: radius.round, backgroundColor: theme.colors.primary }]}
            contentStyle={styles.ctaContent}
            icon={(props) => <MaterialCommunityIcons name="google" {...props} size={20} />}
            textColor={theme.colors.onPrimary}
            accessibilityLabel="Continuar con Google"
          >
            Continuar con Google
          </Button>
          <Button
            mode="outlined"
            onPress={onApple}
            style={[styles.cta, { borderRadius: radius.round, borderColor: theme.colors.outline }]}
            contentStyle={styles.ctaContent}
            textColor={theme.colors.onSurface}
            icon={(props) => <MaterialCommunityIcons name="apple" {...props} size={20} />}
            accessibilityLabel="Continuar con Apple"
          >
            Continuar con Apple
          </Button>
          <Button
            mode="outlined"
            onPress={onFacebook}
            style={[styles.cta, { borderRadius: radius.round, borderColor: theme.colors.outline }]}
            contentStyle={styles.ctaContent}
            textColor={theme.colors.onSurface}
            icon={(props) => <MaterialCommunityIcons name="facebook" {...props} size={20} />}
            accessibilityLabel="Continuar con Facebook"
          >
            Continuar con Facebook
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('RegisterEmail' as never)}
            style={[styles.cta, { borderRadius: radius.round, backgroundColor: theme.colors.primaryContainer }]}
            contentStyle={styles.ctaContent}
            textColor={theme.colors.onPrimaryContainer}
            accessibilityLabel="Registrarse con Email"
          >
            Registrarse con Email
          </Button>
          <Button
            mode="text"
            onPress={onSignIn}
            style={{}} // Elimina estilos de ancho y alineación para que parezca link
            contentStyle={{}}
            textColor={theme.colors.primary}
            accessibilityLabel="Iniciar sesión"
          >
            Iniciar sesión
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  kav: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'space-between' },
  header: { alignItems: 'center', marginTop: spacing.xl },
  logo: {
    marginTop: spacing.xxl,
    width: '70%',
    maxWidth: 420,
    aspectRatio: 3.5,
  },
  subtitle: { textAlign: 'center', marginTop: spacing.sm },
  actions: {
    marginBottom: spacing.xl,
    gap: 8, // Espacio vertical fijo entre botones
  },
  cta: {
    marginVertical: 0, // Elimina margen extra para que gap controle el espacio
    minWidth: '100%', // Todos los botones ocupan el mismo ancho
    alignSelf: 'stretch',
  },
  ctaContent: {
    height: 48,
    justifyContent: 'center',
  },
});

export default LoginScreen;
