// src/app/screens/Onboarding/Step3Interests.tsx
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { FilterChip } from '../../../design-system/components/Chip/FilterChip';
import { spacing } from '../../../design-system/tokens/spacing';
import { radius } from '../../../design-system/tokens/radius';

type Props = {
  topics?: string[];
  onChangeCount?: (n: number) => void;
  onNext?: () => void;
  onSkip?: () => void;
};

const DEFAULT_TOPICS = [
  'DXing', 'Comunicación en emergencias', 'Contesting', 'Construir mi antena',
  'Electrónica básica', 'Modos digitales', 'Programar radios', 'Aprender de ondas',
  'Conocer y conectar con radioaficionados', 'Unirme a eventos', 'Examen de licencia',
  'Códigos y procedimientos operativos',
];

export const Step3Interests: React.FC<Props> = ({
  topics = DEFAULT_TOPICS,
  onChangeCount,
  onNext,
  onSkip,
}) => {
  const theme = useTheme();
  const [selected, setSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    onChangeCount?.(selected.length);
  }, [selected, onChangeCount]);

  const toggle = (t: string) =>
    setSelected((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  return (
    <View style={{ gap: spacing.md }}>
      <Text
        variant="headlineSmall"
        style={{ color: theme.colors.primary, fontWeight: 'bold', textAlign: 'center' }}
      >
        ¿Qué te interesa más?
      </Text>
      <Text
        variant="titleSmall"
        style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}
      >
        Debes seleccionar al menos 3 temas.
      </Text>

      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {topics.map((t) => {
          const isSelected = selected.includes(t);
          return (
            <FilterChip
              key={t}
              label={t}
              selected={isSelected}
              onPress={() => toggle(t)}
              style={{ borderRadius: radius.lg }}
            />
          );
        })}
      </ScrollView>

      <View style={{ height: spacing.sm }} />
    </View>
  );
};

export default Step3Interests;
