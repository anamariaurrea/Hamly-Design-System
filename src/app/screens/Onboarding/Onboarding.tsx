import * as React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Platform, Pressable } from 'react-native';
import { useTheme, Button, Text, Menu, Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider } from '../../../design-system/components/Divider';
import { LinearProgress } from '../../../design-system/components/Progress/Linear';
import { spacing } from '../../../design-system/tokens/spacing';
import { radius } from '../../../design-system/tokens/radius';
import { Button as CustomButton } from '../../../design-system/components/Button';
import { Checkbox } from '../../../design-system/components/Checkbox';

const AGE_OPTIONS = ['Menor de 15 años', '15 - 25 años', '26 - 45 años', '46 años o más'];
const EXP_OPTIONS = [
  'Soy nuevo/a y quiero aprender desde cero.',
  'Tengo algo de conocimiento, pero no tengo licencia.',
  'Ya tengo mi licencia de radioaficionado.',
  'Soy radioaficionado y me gustaría aprender más',
];
const GOALS = [
  'Quiero mejorar mis habilidades y aprender algo nuevo',
  'Me interesa compartir mi conocimiento y ayudar a otros',
  'Solo estoy explorando y viendo de qué se trata la radioafición.',
];

const OnboardingWelcome: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [age, setAge] = React.useState<string | null>(null);
  const [experience, setExperience] = React.useState<string | null>(null);
  const [ageOpen, setAgeOpen] = React.useState(false);
  const [expOpen, setExpOpen] = React.useState(false);
  const [goals, setGoals] = React.useState<Record<string, boolean>>({});
  const [ageAnchorWidth, setAgeAnchorWidth] = React.useState<number>(0);
  const [expAnchorWidth, setExpAnchorWidth] = React.useState<number>(0);
  const [step, setStep] = React.useState(0);

  const canContinue = !!age && !!experience;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.lg }} keyboardShouldPersistTaps="handled">
          <View style={{ gap: spacing.md }}>
            <LinearProgress variant="wave" value={step === 0 ? 0 : step === 1 ? 0.2 : 0} height={8} transitionMs={0} style={{ marginBottom: 10 }} />
            {step === 0 && (
              <View style={{ gap: spacing.md }}>
                <Text
                  variant="headlineSmall"
                  style={{ color: theme.colors.primary, fontWeight: 'bold', textAlign: 'center' }}
                >
                  Bienvenido a Hamly
                </Text>
                <Text
                  variant="titleSmall"
                  style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center', marginTop: spacing.sm, fontSize: 14 }}
                >
                  Para empezar, compártenos algunos detalles sobre ti.
                </Text>
              </View>
            )}
          </View>
          {step === 0 && (
            <View style={{ gap: 8 }}>
              <View onLayout={e => setAgeAnchorWidth(e.nativeEvent.layout.width)}>
                <Menu
                  visible={ageOpen}
                  onDismiss={() => setAgeOpen(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setAgeOpen(true)}
                      style={{ width: '100%', borderRadius: radius.lg, justifyContent: 'flex-start', borderColor: theme.colors.outline }}
                      contentStyle={{ height: 56, flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                      icon="chevron-down"
                      labelStyle={{ color: theme.colors.onSurface, textAlign: 'left', flex: 1 }}
                      accessibilityLabel="Seleccionar edad"
                    >
                      {age ?? '¿Cuál es tu edad?'}
                    </Button>
                  }
                  contentStyle={{ width: ageAnchorWidth, backgroundColor: theme.colors.surfaceVariant, paddingVertical: 4 }}
                  theme={{ colors: { surface: theme.colors.surfaceVariant, onSurface: theme.colors.onSurface } }}
                >
                  {AGE_OPTIONS.map(opt => (
                    <Menu.Item key={opt} onPress={() => { setAge(opt); setAgeOpen(false); }} title={opt} titleStyle={{ color: theme.colors.onSecondaryContainer, opacity: 1 }} />
                  ))}
                </Menu>
              </View>
              <View onLayout={e => setExpAnchorWidth(e.nativeEvent.layout.width)}>
                <Menu
                  visible={expOpen}
                  onDismiss={() => setExpOpen(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setExpOpen(true)}
                      style={{ width: '100%', borderRadius: radius.lg, justifyContent: 'flex-start', borderColor: theme.colors.outline, marginTop: spacing.md }}
                      contentStyle={{ height: 56, flexDirection: 'row-reverse', justifyContent: 'space-between' }}
                      icon="chevron-down"
                      labelStyle={{ color: theme.colors.onSurface, textAlign: 'left', flex: 1 }}
                      accessibilityLabel="Seleccionar experiencia"
                    >
                      {experience ?? '¿Cuál es tu nivel de experiencia?'}
                    </Button>
                  }
                  contentStyle={{ width: expAnchorWidth, backgroundColor: theme.colors.surfaceVariant, paddingVertical: 4 }}
                  theme={{ colors: { surface: theme.colors.surfaceVariant, onSurface: theme.colors.onSurface } }}
                >
                  {EXP_OPTIONS.map(opt => (
                    <Menu.Item key={opt} onPress={() => { setExperience(opt); setExpOpen(false); }} title={opt} titleStyle={{ color: theme.colors.onSurface, opacity: 1 }} />
                  ))}
                </Menu>
              </View>
            </View>
          )}
          {step === 1 && (
            <View style={{ gap: spacing.md }}>
              <Text
                variant="headlineSmall"
                style={{ color: theme.colors.primary, fontWeight: 'bold', textAlign: 'center' }}
              >
                ¿Qué buscas en Hamly?
              </Text>
              <Text
                variant="titleSmall"
                style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}
              >
                Esto nos ayudará a crear una mejor experiencia para ti.
              </Text>
              <View style={{ gap: spacing.sm }}>
                {GOALS.map((label) => {
                  const checked = !!goals[label];
                  return (
                    <Pressable
                      key={label}
                      onPress={() => setGoals((prev) => ({ ...prev, [label]: !prev[label] }))}
                      style={{
                        backgroundColor: theme.colors.surface,
                        borderRadius: radius.md,
                        paddingHorizontal: spacing.md,
                        paddingVertical: 14,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked }}
                    >
                      <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, flex: 1, marginRight: spacing.md }}>
                        {label}
                      </Text>
                      <Checkbox
                        state={checked ? 'checked' : 'unchecked'}
                        onPress={() => setGoals((prev) => ({ ...prev, [label]: !prev[label] }))}
                        color={theme.colors.primary}
                        testID={`goal-${label}`}
                      />
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl + insets.bottom, backgroundColor: theme.colors.background }}>
          <Divider style={{ marginTop: spacing.md, height: 3, backgroundColor: theme.colors.outline }} />
          <View style={{ marginTop: spacing.md, flexDirection: 'column' }}>
            <Button
              mode="contained"
              onPress={step === 0 ? nextStep : () => { }}
              disabled={!canContinue}
              style={{ borderRadius: radius.round, width: '100%' }}
              contentStyle={{ height: 48 }}
              accessibilityLabel="Continuar"
            >
              Continuar
            </Button>
            <View style={{ height: 8 }} />
            <Button
              mode="text"
              onPress={() => { }}
              style={{ width: '100%', borderRadius: radius.round }}
              contentStyle={{ height: 48 }}
              textColor={theme.colors.primary}
              accessibilityLabel="Omitir por ahora"
            >
              Omitir por ahora
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingWelcome;

