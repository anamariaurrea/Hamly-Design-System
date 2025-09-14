import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { AppBar } from '../../design-system/components/AppBar';

const Community: React.FC = () => (
  <SafeAreaView style={styles.safe}>
    <AppBar title="Comunidad" badgeCount={0} onPressLeft={() => { }} />
    <View style={styles.content}>
      <Text variant="headlineMedium">Comunidad</Text>
      <Text>Listado o feed de comunidad (placeholder)</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 16 }
});

export default Community;
