import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import AppBar from '../../src/design-system/components/AppBar';

const Register: React.FC = () => (
  <SafeAreaView style={styles.safe}>
    <AppBar title="Registro" badgeCount={0} onPressLeft={() => {}} />
    <View style={styles.content}>
      <Text variant="headlineMedium">Registro</Text>
      <Text>Formulario de registro (placeholder)</Text>
      <Button mode="outlined" style={{ marginTop: 16 }}>Crear cuenta</Button>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 16 }
});

export default Register;
