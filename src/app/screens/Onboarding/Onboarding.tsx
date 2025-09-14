import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { useTheme, Appbar, Button, Text, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearProgress } from '../../../design-system/components/Progress/Linear';
import { FilterChip } from '../../../design-system/components/Chip';
import { Checkbox } from '../../../design-system/components/Checkbox';
import { Card } from '../../../design-system/components/Card';
import { spacing } from '../../../design-system/tokens/spacing';
import { radius } from '../../../design-system/tokens/radius';

const AGE_OPTIONS = ['Menos de 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'];
const EXPERIENCE_OPTIONS = ['Principiante', 'Intermedio', 'Avanzado'];
const GOALS = [
  'Quiero mejorar mis habilidades y aprender algo nuevo',
  'Me interesa compartir mi conocimiento y ayudar a otros',
  'Solo estoy explorando y viendo de qué se trata la radioafición.'
];
const TOPICS = [
  'DXing', 'Comunicación en emergencias', 'Contesting', 'Construir mi antena',
  'Electrónica básica', 'Modos digitales', 'Programar radios', 'Aprender de ondas',
  'Conocer y conectar con radioaficionados', 'Unirme a eventos', 'Examen de licencia',
  'Códigos y procedimientos operativos'
];
const COURSES = [
  { id: 'c1', title: 'Primeros pasos en la radio', meta: 'Beginner • 3 horas', desc: 'Diseñado para el principiante absoluto.', img: 'https://picsum.photos/seed/ham1/640/360' },
  { id: 'c2', title: 'Despegando en HF', meta: 'Beginner • 2 horas', desc: 'Introducción a bandas y equipos.', img: 'https://picsum.photos/seed/ham2/640/360' }
];

const STEP_TITLES = ['Bienvenida', 'Objetivo', 'Intereses', 'Curso'];

const Onboarding = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(0);
  const [age, setAge] = useState<string | null>(null);
  const [ageMenu, setAgeMenu] = useState(false);
  const [experience, setExperience] = useState<string | null>(null);
  const [expMenu, setExpMenu] = useState(false);
  const [goals, setGoals] = useState<Record<string, boolean>>(() => GOALS.reduce((acc, g) => ({ ...acc, [g]: false }), {}));
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const progress = (step + 1) / 4;

  const next = () => setStep(s => Math.min(s + 1, 3));
  const prev = () => setStep(s => Math.max(s - 1, 0));
  const finish = () => {
    navigation.reset({ index: 0, routes: [{ name: 'MainTabs', params: { screen: 'Community' } }] });
  };

  let canContinue = false;
  if (step === 0) canContinue = !!age && !!experience;
  else if (step === 1) canContinue = true;
  else if (step === 2) canContinue = topics.length >= 3;
  else if (step === 3) canContinue = !!selectedCourse;

  // STEP 0: Bienvenida
  const renderStep0 = () => (
    <View>
      <Text variant="headlineMedium" style={[styles.center, { color: theme.colors.onBackground, marginBottom: spacing.md }]}>¡Bienvenido a Hamly!</Text>
      <Text variant="bodyMedium" style={[styles.center, { color: theme.colors.onSurfaceVariant, marginBottom: spacing.lg }]}>Selecciona tu edad y experiencia para personalizar tu camino.</Text>
      <View style={styles.selectRow}>
        <Menu
          visible={ageMenu}
          onDismiss={() => setAgeMenu(false)}
          anchor={
            <Button
              mode="outlined"
              style={[styles.selectBtn, { borderRadius: radius.lg, borderColor: theme.colors.outline }]}
              onPress={() => setAgeMenu(true)}
              accessibilityLabel="Seleccionar edad"
            >
              {age || 'Edad'}
            </Button>
          }
        >
          {AGE_OPTIONS.map(opt => (
            <Menu.Item key={opt} onPress={() => { setAge(opt); setAgeMenu(false); }} title={opt} />
          ))}
        </Menu>
      </View>
      <View style={styles.selectRow}>
        <Menu
          visible={expMenu}
          onDismiss={() => setExpMenu(false)}
          anchor={
            <Button
              mode="outlined"
              style={[styles.selectBtn, { borderRadius: radius.lg, borderColor: theme.colors.outline }]}
              onPress={() => setExpMenu(true)}
              accessibilityLabel="Seleccionar experiencia"
            >
              {experience || 'Experiencia'}
            </Button>
          }
        >
          {EXPERIENCE_OPTIONS.map(opt => (
            <Menu.Item key={opt} onPress={() => { setExperience(opt); setExpMenu(false); }} title={opt} />
          ))}
        </Menu>
      </View>
    </View>
  );

  // STEP 1: Objetivo
  const renderStep1 = () => (
    <Card style={{ padding: spacing.md, backgroundColor: theme.colors.surfaceVariant, borderRadius: radius.lg }}>
      {GOALS.map((goal, idx) => (
        <View key={goal} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm }}>
          <Checkbox
            state={goals[goal] ? 'checked' : 'unchecked'}
            onPress={() => setGoals(g => ({ ...g, [goal]: !g[goal] }))}
            accessibilityLabel={goal}
          />
          <Text style={{ flex: 1, color: theme.colors.onSurface, marginLeft: spacing.sm }}>{goal}</Text>
          {idx < GOALS.length - 1 && (
            <View style={{ height: 1, backgroundColor: theme.colors.outlineVariant, marginVertical: spacing.xs, position: 'absolute', left: 0, right: 0, bottom: -spacing.xs }} />
          )}
        </View>
      ))}
    </Card>
  );

  // STEP 2: Intereses
  const renderStep2 = () => (
    <View>
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: spacing.sm }}>
        Selecciona al menos 3 intereses:
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
        {TOPICS.map(topic => (
          <FilterChip
            key={topic}
            label={topic}
            selected={topics.includes(topic)}
            onPress={() => {
              setTopics(t => t.includes(topic) ? t.filter(x => x !== topic) : [...t, topic]);
            }}
            style={{
              marginBottom: spacing.sm,
              borderRadius: radius.lg,
              backgroundColor: topics.includes(topic) ? theme.colors.primaryContainer : theme.colors.surface,
            }}
          />
        ))}
      </View>
    </View>
  );

  // STEP 3: Curso
  const renderStep3 = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.lg }}>
      {COURSES.map(course => (
        <Card
          key={course.id}
          style={{ width: 280, borderRadius: radius.lg, marginRight: spacing.lg, backgroundColor: theme.colors.surface }}
        >
          <Image
            source={{ uri: course.img }}
            style={{ width: '100%', height: 140, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg }}
            resizeMode="cover"
          />
          <Card.Content style={{ padding: spacing.md }}>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>{course.title}</Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginBottom: spacing.sm }}>{course.meta}</Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, marginBottom: spacing.md }}>{course.desc}</Text>
            <Button
              mode={selectedCourse === course.id ? 'contained' : 'outlined'}
              onPress={() => setSelectedCourse(course.id)}
              style={{ borderRadius: radius.lg }}
              accessibilityLabel={`Seleccionar curso ${course.title}`}
            >
              {selectedCourse === course.id ? 'Seleccionado' : 'Seleccionar'}
            </Button>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <Appbar style={{ backgroundColor: theme.colors.background, elevation: 0 }}>
        {step > 0 && <Appbar.BackAction onPress={prev} accessibilityLabel="Atrás" />}
        <Appbar.Content title={STEP_TITLES[step]} titleStyle={{ color: theme.colors.primary, fontWeight: 'bold' }} />
      </Appbar>
      <LinearProgress
        variant="wave"
        value={progress}
        height={12}
        waveAmplitude={4}
        waveWavelength={40}
        transitionMs={800}
        style={{ marginHorizontal: spacing.md, marginTop: spacing.sm }}
      />
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.lg }}>
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={step === 3 ? finish : next}
          disabled={!canContinue}
          style={{ borderRadius: radius.lg, flex: 1 }}
          accessibilityLabel={step === 3 ? 'Finalizar' : 'Continuar'}
        >
          {step === 3 ? 'Finalizar' : 'Continuar'}
        </Button>
        {step < 3 && (
          <Button
            mode="text"
            onPress={finish}
            style={{ marginLeft: spacing.md }}
            accessibilityLabel="Omitir por ahora"
          >
            Omitir por ahora
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { textAlign: 'center' },
  selectRow: { marginBottom: spacing.lg },
  selectBtn: { flex: 1, borderWidth: 1 },
  card: { padding: spacing.md },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    backgroundColor: 'transparent',
  },
});

export default Onboarding;

// Para agregar la ruta al Stack principal:
// <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown:false }} />

