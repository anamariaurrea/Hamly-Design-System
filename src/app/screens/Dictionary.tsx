import React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import AppBar from '../../design-system/components/AppBar/AppBar';
import { CardVariant } from '../../design-system/components/Card/CardVariant';
import { spacing } from '../../design-system/tokens/spacing';

const Dictionary: React.FC = () => {
  const theme = useTheme();

  const titleStyle = {
    fontSize: 20,
    fontWeight: '500' as const,
    color: theme.colors.onBackground,
    marginBottom: spacing.md,
    textAlign: 'left' as const
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={{ flex: 1 }}>
        <AppBar
          title="Diccionario"
          leftIconName={undefined}
          style={{
            paddingHorizontal: spacing.lg,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
          rightIcons={undefined}
        />

        <ScrollView
          style={{ flex: 1, marginTop: 2 }}
          contentContainerStyle={{
            padding: spacing.lg,
            paddingBottom: spacing.xxl
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Recientes */}
          <Text style={titleStyle}>
            Recientes
          </Text>

          <CardVariant
            title="Unidades de Medida y Parámetros Técnicos"
            rating={1}
            maxStars={3}
            image={require('../../../assets/dictionary-desk.png')}
            onPress={() => { }}
            style={{ marginBottom: spacing.xl }}
          />

          {/* Destacados */}
          <Text style={titleStyle}>
            Destacados
          </Text>

          <View style={styles.gridContainer}>
            {/* Fila 1 */}
            <View style={styles.gridRow}>
              <CardVariant
                title="Fundamentos de la Radio"
                rating={1}
                maxStars={3}
                image={require('../../../assets/dictionary-radio.png')}
                imageHeight={100}
                onPress={() => { }}
                style={styles.gridCard}
              />

              <CardVariant
                title="Componentes de una estación"
                rating={1}
                maxStars={3}
                image={require('../../../assets/dictionary-station.png')}
                imageHeight={100}
                onPress={() => { }}
                style={styles.gridCard}
              />
            </View>

            {/* Fila 2 */}
            <View style={styles.gridRow}>
              <CardVariant
                title="Jerga de los radioaficionados"
                rating={1}
                maxStars={3}
                image={require('../../../assets/dictionary-micro.png')}
                imageHeight={100}
                onPress={() => { }}
                style={styles.gridCard}
              />

              <CardVariant
                title="Conceptos Legales y de Licenciamiento"
                rating={1}
                maxStars={3}
                image={require('../../../assets/dictionary-books.png')}
                imageHeight={100}
                onPress={() => { }}
                style={styles.gridCard}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  gridContainer: {
    gap: spacing.md,
  },
  gridRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  gridCard: {
    flex: 1,
    marginBottom: 0,
  },
});

export default Dictionary;
