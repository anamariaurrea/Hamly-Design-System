import * as React from 'react';
import { ScrollView, View, Text as RNText } from 'react-native';
import { DesignSystemProvider } from '../../design-system/providers';
import { AppBar } from '../../design-system/components/AppBar';
import { Avatar } from '../../design-system/components/Avatar';
import { Badge } from '../../design-system/components/Badge';
import { BottomSheet } from '../../design-system/components/BottomSheet';
import { Button, IconButton, SegmentedButtons, SplitButton } from '../../design-system/components/Button';
import { Divider } from '../../design-system/components/Divider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { tokens } from '../../design-system/theme';
import { Checkbox } from '../../design-system/components/Checkbox';
import { Card, CardHorizontal, HorizontalCardVariant } from '../../design-system/components/Card';
import { Text } from 'react-native-paper';

const ComponentGallery: React.FC = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [sheetVisible, setSheetVisible] = React.useState(false);
  const [period, setPeriod] = React.useState('week');
  const [periodSm, setPeriodSm] = React.useState('day');

  return (
    <DesignSystemProvider>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 16,
        }}
      >
        <AppBar title="Component Gallery" />
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>Avatars</RNText>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Avatar variant="image" source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} accessibilityLabel="User Image" />
          <Avatar variant="icon" icon="account" accessibilityLabel="User Icon" />
          <Avatar variant="text" label="A" accessibilityLabel="User Monogram" />
          <Avatar variant="image" checked source={{ uri: 'https://randomuser.me/api/portraits/women/2.jpg' }} accessibilityLabel="Checked User" />
        </View>
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>Badges</RNText>
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <Badge variant="large" value={3} accessibilityLabel="Notificaciones 3" />
          <Badge variant="small" accessibilityLabel="Alerta pequeña" />
        </View>
        <Divider />
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>BottomSheet</RNText>
        <Button label="Abrir BottomSheet" variant="filled" onPress={() => setSheetVisible(true)} style={{ marginBottom: 12 }} />
        <BottomSheet
          visible={sheetVisible}
          onDismiss={() => setSheetVisible(false)}
          header={<RNText style={{ fontWeight: 'bold', fontSize: 16 }}>Header de ejemplo</RNText>}
        >
          <RNText>Este es el contenido del BottomSheet. Puedes poner aquí cualquier componente.</RNText>
        </BottomSheet>
        <Divider inset />
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>Buttons</RNText>
        <View style={{ gap: 12 }}>
          <Button label="Filled" variant="filled" size="medium" icon="check" />
          <Button label="Filled Disabled" variant="filled" size="medium" disabled />
          <Button label="Tonal" variant="tonal" size="medium" icon="star-outline" />
          <Button label="Outline" variant="outlined" size="medium" icon="send" />
          <Button label="Elevated" variant="elevated" size="medium" icon="star-outline" />
          <Button label="Text" variant="text" size="medium" icon="send" />
          <Button label="Small" variant="filled" size="small" />
        </View>
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>IconButtons</RNText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton icon="heart-outline" variant="standard" size="md" accessibilityLabel="Favorito" style={{ marginRight: 16 }} />
          <IconButton icon="check" variant="filled" size="md" selected accessibilityLabel="Seleccionado" style={{ marginRight: 16 }} />
          <IconButton icon="star" variant="tonal" size="lg" accessibilityLabel="Estrella" style={{ marginRight: 16 }} />
          <IconButton icon="share-variant" variant="outlined" size="sm" accessibilityLabel="Compartir" style={{ marginRight: 16 }} />
          <IconButton icon="heart-outline" variant="filled" size="md" disabled accessibilityLabel="Favorito deshabilitado" style={{ marginRight: 16 }} />
          <IconButton icon="star" variant="tonal" size="lg" disabled accessibilityLabel="Estrella deshabilitada" />
        </View>
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>Segmented Buttons (Outlined — single select)</RNText>
        <View style={{ gap: 16 }}>
          {/* Example 1: fullWidth, size md */}
          <SegmentedButtons
            options={[
              { value: 'day', label: 'Day', icon: 'calendar-today' },
              { value: 'week', label: 'Week', icon: 'calendar-week' },
              { value: 'month', label: 'Month', icon: 'calendar-month' },
            ]}
            value={period}
            onChange={setPeriod}
            size="md"
            fullWidth
          />
          {/* Example 2: size sm, not fullWidth */}
          <SegmentedButtons
            options={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
            ]}
            value={periodSm}
            onChange={setPeriodSm}
            size="sm"
          />
        </View>
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>Split Button (outlined)</RNText>
        <View style={{ gap: 12 }}>
          <SplitButton
            label="Guardar"
            onPrimaryPress={() => alert('Primary pressed')}
            onSecondaryPress={() => alert('Secondary pressed')}
          />
          <SplitButton
            label="Guardar"
            disabled
            onPrimaryPress={() => { }}
            onSecondaryPress={() => { }}
          />
          <SplitButton
            label="Guardar"
            loading
            onPrimaryPress={() => { }}
            onSecondaryPress={() => { }}
          />
          <SplitButton
            label="Guardar"
            size="sm"
            onPrimaryPress={() => { }}
            onSecondaryPress={() => { }}
          />
          <SplitButton
            label="Guardar"
            size="lg"
            onPrimaryPress={() => { }}
            onSecondaryPress={() => { }}
          />
        </View>
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>Checkboxes (Material)</RNText>
        <View style={{ flexDirection: 'row', gap: 32 }}>
          {/* Primera columna: con label */}
          <View style={{ gap: 12 }}>
            {/* Unselected */}
            <Checkbox label="Unselected" state="unchecked" onPress={() => { }} />
            {/* Selected */}
            <Checkbox label="Selected" state="checked" onPress={() => { }} />
            {/* Indeterminate */}
            <Checkbox label="Indeterminate" state="indeterminate" onPress={() => { }} />
            {/* Error unselected */}
            <Checkbox label="Error" state="unchecked" error onPress={() => { }} />
            {/* Error selected */}
            <Checkbox label="Error" state="checked" error onPress={() => { }} />
            {/* Error indeterminate */}
            <Checkbox label="Error" state="indeterminate" error onPress={() => { }} />
            {/* Disabled */}
            <Checkbox label="Disabled" state="checked" disabled onPress={() => { }} />
          </View>
          {/* Segunda columna: sin label */}
          <View style={{ gap: 12 }}>
            <Checkbox state="unchecked" onPress={() => { }} />
            <Checkbox state="checked" onPress={() => { }} />
            <Checkbox state="indeterminate" onPress={() => { }} />
            <Checkbox state="unchecked" error onPress={() => { }} />
            <Checkbox state="checked" error onPress={() => { }} />
            <Checkbox state="indeterminate" error onPress={() => { }} />
            <Checkbox state="checked" disabled onPress={() => { }} />
          </View>
        </View>
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>Cards</RNText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }} contentContainerStyle={{ gap: 16 }}>
          {[
            {
              id: '1',
              title: 'Curso de React Native',
              meta: '3 módulos · 12 lecciones',
              desc: 'Aprende a crear apps móviles con React Native y Material Design.',
              img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: '2',
              title: 'Diseño de Interfaces',
              meta: '5 módulos · 20 lecciones',
              desc: 'Domina los principios de UI/UX y prototipado rápido.',
              img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: '3',
              title: 'Animaciones en Apps',
              meta: '2 módulos · 8 lecciones',
              desc: 'Crea experiencias interactivas y animadas en tus aplicaciones.',
              img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
            },
          ].map(c => (
            <Card
              key={c.id}
              mode="outlined"
              style={{ width: 280, borderRadius: 16 }}
              accessibilityLabel={`Curso ${c.title}`}
            >
              <Card.Cover
                source={{ uri: c.img }}
                style={{ width: '100%', height: 140, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                theme={{ roundness: 0 }}
              />
              <Card.Content style={{ gap: 6, paddingVertical: 12 }}>
                <Text variant="titleMedium">{c.title}</Text>
                <Text variant="bodySmall" style={{ opacity: 0.7 }}>{c.meta}</Text>
                <Text variant="bodySmall" style={{ opacity: 0.8 }}>{c.desc}</Text>
                <Button variant="filled" style={{ marginTop: 8, borderRadius: 24 }} label="Comenzar curso" />
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>Horizontal Cards</RNText>
        <View style={{ gap: 16 }}>
          <CardHorizontal
            title="Álgebra básica"
            meta="2 módulos · 8 lecciones"
            image={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }}
            completed={false}
            labelForAvatar="Algebra"
            style={{ marginBottom: 8 }}
            accessibilityLabel="Curso Álgebra básica"
          />
          <CardHorizontal
            title="Álgebra básica"
            meta="2 módulos · 8 lecciones"
            image={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }}
            completed={true}
            labelForAvatar="Algebra"
            style={{ marginBottom: 8 }}
            accessibilityLabel="Curso Álgebra básica completado"
          />
          <HorizontalCardVariant
            title="Nombre"
            category="Categoría"
            valueRight="1,500px"
            position={1}
            labelForAvatar="Ana"
            style={{ marginBottom: 8 }}
            accessibilityLabel="Ejemplo HorizontalCardVariant"
          />
        </View>
        {/* Add more component examples here */}
      </ScrollView>
    </DesignSystemProvider>
  );
};

export default ComponentGallery;
