import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import AppBar from '../../src/design-system/components/AppBar';

const CoursesScreen: React.FC = () => (
  <SafeAreaView style={styles.safe}>
    <AppBar title="Cursos" badgeCount={3} onPressLeft={() => {}} />
    <View style={styles.content}>
      <Text variant="headlineMedium">Cursos</Text>
      <Text>Lista de cursos (placeholder)</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 16 }
});

export default CoursesScreen;
