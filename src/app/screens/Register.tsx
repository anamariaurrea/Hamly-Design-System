import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView } from 'react-native';
import { useTheme, Button, Text, Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextField } from '../../design-system/components/TextField';
import { spacing } from '../../design-system/tokens/spacing';
import { radius } from '../../design-system/tokens/radius';
import { RootStackParamList } from '../../types/navigation';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const isEmailValid = React.useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);
  const canSubmit = name.trim().length > 0 && isEmailValid && password.length >= 6;

  const onSubmit = () => {
    if (!canSubmit) return;
    navigation.navigate('Onboarding');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['left', 'right', 'bottom']}>
      <Appbar.Header mode="small" style={{ backgroundColor: theme.colors.background, elevation: 0 }}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} accessibilityLabel="Volver" />
        <Appbar.Content title="Registrarse con Email" titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
      </Appbar.Header>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.content, { justifyContent: 'flex-start', flexGrow: 1 }]} keyboardShouldPersistTaps="handled">
          <View style={[styles.form, { justifyContent: 'flex-start', flexGrow: 0 }]}>
            <TextField
              label="Nombre"
              value={name}
              onChangeText={setName}
              leadingIcon="account-outline"
              accessibilityLabel="Campo Nombre"
            />
            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              leadingIcon="email-outline"
              accessibilityLabel="Campo Email"
              style={{ marginTop: spacing.md }}
            />
            <TextField
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              leadingIcon="lock-outline"
              accessibilityLabel="Campo Contraseña"
              style={{ marginTop: spacing.md }}
            />

            <Button
              mode="contained"
              onPress={onSubmit}
              disabled={!canSubmit}
              style={{ marginTop: spacing.lg, borderRadius: radius.round }}
              contentStyle={{ height: 48 }}
              accessibilityLabel="Crear cuenta"
            >
              Crear cuenta
            </Button>

            <Text style={[styles.legal, { color: theme.colors.onSurfaceVariant }]}>Al crear una cuenta, aceptas los
              <Text style={{ color: theme.colors.primary }} onPress={() => console.log('Términos')}> Términos de Servicio </Text>
              y la
              <Text style={{ color: theme.colors.primary }} onPress={() => console.log('Privacidad')}> Política de Privacidad</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: { padding: spacing.lg, flexGrow: 1 },
  form: { flexGrow: 1 },
  legal: { marginTop: spacing.md, textAlign: 'center' },
});

export default RegisterScreen;
