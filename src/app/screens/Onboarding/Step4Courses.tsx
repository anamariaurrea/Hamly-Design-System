import * as React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useTheme, Text, Button } from 'react-native-paper';

const COURSES = [
  { id: 'c1', title: 'Primeros pasos en la radio', meta: 'Beginner • 3 horas', desc: 'Se enfoca en despertar el interés y proporcionar una base.', img: require('../../../../assets/courses-card-1.png') },
  { id: 'c2', title: 'Despegando en HF', meta: 'Beginner • 2 horas', desc: 'Introducción a bandas y equipos, con prácticas guiadas.', img: require('../../../../assets/courses-card-2.png') },
  { id: 'c3', title: 'Modos digitales', meta: 'Intermediate • 4 horas', desc: 'Da tus primeros pasos en FT8, PSK31 y más.', img: require('../../../../assets/courses-card-3.png') },
];

export const Step4Courses = ({ finish }: { finish: () => void }) => {
  const theme = useTheme();
  const [selectedCourse, setSelectedCourse] = React.useState<string | null>(null);
  const canContinue = !!selectedCourse;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 32 }}>
        <Text variant="headlineSmall" style={{ color: theme.colors.primary, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>
          Selecciona un curso para comenzar
        </Text>
        <Text variant="titleSmall" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center', marginBottom: 24 }}>
          Puedes cambiar esta opción más adelante.
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={292} // card width + gap (280 + 12)
          contentContainerStyle={{ paddingHorizontal: 0, gap: 12 }}
        >
          {COURSES.map(course => {
            const selected = selectedCourse === course.id;
            return (
              <View key={course.id} style={{ borderWidth: 1, borderColor: theme.colors.outline, borderRadius: 16, width: 280, backgroundColor: theme.colors.surface, marginRight: 12, overflow: 'hidden' }}>
                <Image source={course.img} style={{ width: 280, height: 140, borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
                <View style={{ paddingVertical: 12, paddingHorizontal: 24, gap: 6 }}>
                  <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>{course.title}</Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>{course.meta}</Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurface, opacity: 0.8 }}>{course.desc}</Text>
                  <Button
                    mode={selected ? 'contained' : 'outlined'}
                    onPress={() => setSelectedCourse(course.id)}
                    style={{ borderRadius: 24, marginTop: 8 }}
                    contentStyle={{ height: 40 }}
                  >
                    {selected ? 'Seleccionado' : 'Seleccionar curso'}
                  </Button>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <Button
          mode="contained"
          onPress={finish}
          disabled={!canContinue}
          style={{ marginTop: 32, borderRadius: 24 }}
          contentStyle={{ height: 48 }}
          accessibilityLabel="Continuar"
        >
          Continuar
        </Button>
      </ScrollView>
    </View>
  );
};

export default Step4Courses;
