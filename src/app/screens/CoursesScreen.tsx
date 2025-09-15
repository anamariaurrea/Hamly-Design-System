import * as React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import AppBar from '../../design-system/components/AppBar/AppBar';
import { Badge } from '../../design-system/components/Badge/Badge';
import { ExpansionPanel } from '../../design-system/components/ExpansionPanel/ExpansionPanel';
import CardHorizontal from '../../design-system/components/Card/CardHorizontal';

import { spacing } from '../../design-system/tokens/spacing';
import { radius } from '../../design-system/tokens/radius';

const LEVELS = [
  {
    id: 'lvl1',
    title: 'Primeros pasos en la radio',
    lessons: [
      {
        id: 'l1',
        title: '¿Qué es la radioafición?',
        level: 'Principiante',
        duration: '6 horas',
        image: { uri: 'https://picsum.photos/seed/ham-1/200/200' },
        leading: '✓',
        completed: true,
      },
      {
        id: 'l2',
        title: 'El mundo de las Ondas',
        level: 'Principiante',
        duration: '3 horas',
        image: { uri: 'https://picsum.photos/seed/ham-2/200/200' },
        leading: 'A',
        completed: false,
      },
      {
        id: 'l3',
        title: 'Seguridad en la Estación',
        level: 'Principiante',
        duration: '4 horas',
        image: { uri: 'https://picsum.photos/seed/ham-3/200/200' },
        leading: 'A',
        completed: false,
      },
      {
        id: 'l4',
        title: 'Ondas y Frecuencia',
        level: 'Principiante',
        duration: '6 horas',
        image: { uri: 'https://picsum.photos/seed/ham-4/200/200' },
        leading: 'A',
        completed: false,
      },
      {
        id: 'l5',
        title: 'Códigos Básicos',
        level: 'Principiante',
        duration: '5 horas',
        image: { uri: 'https://picsum.photos/seed/ham-5/200/200' },
        leading: 'A',
        completed: false,
      },
      {
        id: 'l6',
        title: 'Licencia',
        level: 'Principiante',
        duration: '7 horas',
        image: { uri: 'https://picsum.photos/seed/ham-6/200/200' },
        leading: 'A',
        completed: false,
      },
    ],
  },
  {
    id: 'lvl2',
    title: 'Despegando con la Radio',
    lessons: [
      {
        id: 'l7',
        title: 'Antenas y propagación',
        level: 'Intermedio',
        duration: '5 horas',
        image: { uri: 'https://picsum.photos/seed/ham-7/200/200' },
        leading: 'A',
        completed: false,
      },
    ],
  },
];

export const CoursesScreen = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState<string | null>(LEVELS[0].id);
  const [selectedTab, setSelectedTab] = React.useState('learn');

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <View style={{ flex: 1 }}>
        <AppBar
          title="Cursos"
          leftIconName="menu"
          onClick={() => { }}
          style={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            backgroundColor: theme.colors.background,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        />
        <ScrollView
          style={{ flex: 1, marginTop: 64 }}
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.md,
            paddingBottom: spacing.xl,
          }}
        >
          {LEVELS.map((level, idx) => (
            <ExpansionPanel
              key={level.id}
              title={level.title}
              levelLabel={`NIVEL ${idx + 1}`}
              expanded={expanded === level.id}
              onToggle={(next) => setExpanded(next ? level.id : null)}
              items={level.lessons.map((lesson) => ({
                id: lesson.id,
                title: lesson.title,
                meta: `${lesson.level} • ${lesson.duration}`,
                image: lesson.image,
                completed: lesson.completed,
                labelForAvatar: lesson.leading,
                onPress: () => { },
              }))}
              style={{
                marginBottom: spacing.md,
                borderRadius: radius.lg,
                borderColor: theme.colors.outlineVariant,
                backgroundColor: theme.colors.surface,
              }}
            />
          ))}
        </ScrollView>
      </View>
      {/* NavigationBar eliminado, ahora lo gestiona MainTabs */}
    </SafeAreaView>
  );
};

export default CoursesScreen;
