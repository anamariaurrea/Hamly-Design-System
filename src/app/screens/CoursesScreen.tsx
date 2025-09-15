import * as React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';
import AppBar from '../../design-system/components/AppBar/AppBar';
import { Badge } from '../../design-system/components/Badge/Badge';
import { ExpansionPanel } from '../../design-system/components/ExpansionPanel/ExpansionPanel';
import CardHorizontal from '../../design-system/components/Card/CardHorizontal';
import { BottomSheet } from '../../design-system/components/BottomSheet/BottomSheet';
import SegmentedButtons from '../../design-system/components/Button/SegmentedButtons';

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
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const [segmentedValue, setSegmentedValue] = React.useState('info');

  const radioImage = require('../../../assets/courses-radio.png');
  const wavesImage = require('../../../assets/courses-waves.png');
  const securityImage = require('../../../assets/courses-security.png');
  const antennaImage = require('../../../assets/courses-antenna.png');
  const codesImage = require('../../../assets/courses-codes.png');
  const licenseImage = require('../../../assets/courses-license.png');

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <View style={{ flex: 1 }}>
        <AppBar
          title="Cursos"
          leftIconName="menu"
          onClick={() => setBottomSheetVisible(true)}
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
          style={{ flex: 1, marginTop: 0 }}
          contentContainerStyle={{
            paddingHorizontal: spacing.sm,
            paddingTop: spacing.md,
            paddingBottom: spacing.xl,
          }}
        >
          {LEVELS.map((level, idx) => (
            <React.Fragment key={level.id}>
              <ExpansionPanel
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
              {expanded === level.id && (
                <View style={{ marginTop: 16, gap: 8, marginBottom: 16 }}>
                  {idx === 0 ? (
                    <>
                      <CardHorizontal
                        key={`card-${level.id}-1`}
                        title="¿Qué es la radioafición?"
                        meta="Principiante • 6 horas"
                        image={radioImage}
                        style={{ width: '100%' }}
                        onPress={() => { }}
                      />
                      <CardHorizontal
                        key={`card-${level.id}-2`}
                        title="El mundo de las Ondas"
                        meta="Principiante • 3 horas"
                        image={wavesImage}
                        style={{ width: '100%' }}
                        onPress={() => { }}
                      />
                      <CardHorizontal
                        key={`card-${level.id}-3`}
                        title="Seguridad en la Estación"
                        meta="Principiante • 3 horas"
                        image={securityImage}
                        style={{ width: '100%' }}
                        onPress={() => { }}
                      />
                    </>
                  ) : idx === 1 ? (
                    <>
                      <CardHorizontal
                        key={`card-${level.id}-1`}
                        title="Ondas y Frecuencia"
                        meta="Principiante • 6 horas"
                        image={antennaImage}
                        style={{ width: '100%' }}
                        onPress={() => { }}
                      />
                      <CardHorizontal
                        key={`card-${level.id}-2`}
                        title="Códigos Básicos"
                        meta="Principiante • 5 horas"
                        image={codesImage}
                        style={{ width: '100%' }}
                        onPress={() => { }}
                      />
                      <CardHorizontal
                        key={`card-${level.id}-3`}
                        title="Tu Licencia"
                        meta="Principiante • 7 horas"
                        image={licenseImage}
                        style={{ width: '100%' }}
                        onPress={() => { }}
                      />
                    </>
                  ) : (
                    [1, 2, 3].map(i => (
                      <CardHorizontal
                        key={`card-${level.id}-${i}`}
                        title={`Card ${i} ${level.title}`}
                        meta={`Meta info ${i}`}
                        image={{ uri: `https://picsum.photos/seed/${level.id}-${i}/200/200` }}
                        style={{ width: '100%' }}
                        onPress={() => { }}
                      />
                    ))
                  )}
                </View>
              )}
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
      <BottomSheet
        visible={bottomSheetVisible}
        onDismiss={() => setBottomSheetVisible(false)}
        snapPoints={["40%"]}
      >
        <View style={{ marginTop: 8 }}>
          <SegmentedButtons
            options={[
              { value: 'info', label: 'Información' },
              { value: 'temario', label: 'Temario' },
              { value: 'progreso', label: 'Progreso' },
              { value: 'foro', label: 'Foro' },
            ]}
            value={segmentedValue}
            onChange={setSegmentedValue}
            size="md"
            fullWidth
            accessibilityLabel="Opciones de curso"
            style={{ marginBottom: 16 }}
          />
          <View style={{ gap: 8, marginBottom: 16 }}>
            <CardHorizontal
              key="bottomsheet-card-1"
              title="¿Qué es la radioafición?"
              meta="Principiante • 6 horas"
              image={radioImage}
              style={{ width: '100%' }}
            />
            <CardHorizontal
              key="bottomsheet-card-2"
              title="El mundo de las Ondas"
              meta="Principiante • 3 horas"
              image={wavesImage}
              style={{ width: '100%' }}
            />
            <CardHorizontal
              key="bottomsheet-card-3"
              title="Seguridad en la Estación"
              meta="Principiante • 3 horas"
              image={securityImage}
              style={{ width: '100%' }}
            />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default CoursesScreen;
