import React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import AppBar from '../../design-system/components/AppBar/AppBar';
import Avatar from '../../design-system/components/Avatar/Avatar';
import { HorizontalCardVariant } from '../../design-system/components/Card/HorizontalCardVariant';
import { spacing } from '../../design-system/tokens/spacing';

const Leagues: React.FC = () => {
  const theme = useTheme();

  const leagueImage = require('../../../assets/leagues.png');

  const leagueParticipants = [
    { id: 1, name: 'Andrés M.', category: 'Aspirante Curioso', points: '1,500px', avatar: 'A' },
    { id: 2, name: 'Sofía G.', category: 'Aspirante Curiosa', points: '1,500px', avatar: 'S' },
    { id: 3, name: 'Laura C.', category: 'Aspirante Curiosa', points: '1,500px', avatar: 'L' },
    { id: 4, name: 'Carlos R.', category: 'Aspirante Curioso', points: '1,500px', avatar: 'C' },
    { id: 5, name: 'María F.', category: 'Aspirante Curiosa', points: '1,500px', avatar: 'M' },
  ];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={{ flex: 1 }}>
        <AppBar
          title="Ligas"
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
            paddingBottom: spacing.xxl
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Liga Header */}
          <View style={styles.headerContainer}>
            <Avatar
              size={120}
              source={leagueImage}
              style={{ marginBottom: spacing.lg }}
            />
            <Text style={[styles.leagueTitle, { color: theme.colors.onBackground }]}>
              Liga Cuarzo
            </Text>
            <Text style={[styles.leagueSubtitle, { color: theme.colors.onSurfaceVariant }]}>
              Por completar el Nivel 1 de cursos.
            </Text>
          </View>

          {/* Participantes List */}
          <View style={styles.participantsList}>
            {leagueParticipants.map((participant, index) => (
              <HorizontalCardVariant
                key={participant.id}
                title={participant.name}
                category={participant.category}
                valueRight={participant.points}
                position={index + 1}
                labelForAvatar={participant.avatar}
                onPress={() => { }}
                style={styles.participantCard}
              />
            ))}
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
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  leagueTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  leagueSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
  },
  participantsList: {
    paddingHorizontal: spacing.lg,
  },
  participantCard: {
    marginBottom: 0,
  },
});

export default Leagues;
