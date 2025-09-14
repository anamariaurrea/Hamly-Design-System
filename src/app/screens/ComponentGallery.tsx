import * as React from 'react';
import { ScrollView, View, Text as RNText } from 'react-native';
import { DesignSystemProvider } from '../../design-system/providers';
import { AppBar } from '../../design-system/components/AppBar';
import { Avatar } from '../../design-system/components/Avatar';
import { Badge } from '../../design-system/components/Badge';
import { BottomSheet } from '../../design-system/components/BottomSheet';
import { Button, IconButton, SegmentedButtons } from '../../design-system/components/Button';
import { Button, IconButton, SegmentedButtons } from '../../design-system/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { tokens } from '../../design-system/theme';

const ComponentGallery: React.FC = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [sheetVisible, setSheetVisible] = React.useState(false);
  const [period, setPeriod] = React.useState('week');
  const [periodSm, setPeriodSm] = React.useState('day');
  const [segValue, setSegValue] = React.useState('day');

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
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>BottomSheet</RNText>
        <Button label="Abrir BottomSheet" variant="filled" onPress={() => setSheetVisible(true)} style={{ marginBottom: 12 }} />
        <BottomSheet
          visible={sheetVisible}
          onDismiss={() => setSheetVisible(false)}
          header={<RNText style={{ fontWeight: 'bold', fontSize: 16 }}>Header de ejemplo</RNText>}
        >
          <RNText>Este es el contenido del BottomSheet. Puedes poner aquí cualquier componente.</RNText>
        </BottomSheet>
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
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>Icon Buttons</RNText>
        <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <IconButton icon="heart-outline" variant="standard" />
          <IconButton icon="heart" variant="filled" selected />
          <IconButton icon="star" variant="tonal" />
          <IconButton icon="share-variant" variant="outlined" />
          <IconButton icon="bell" variant="filled" size="sm" />
          <IconButton icon="camera" variant="tonal" size="lg" />
          <IconButton icon="trash-can-outline" variant="standard" disabled />
        </View>
        <RNText style={{ marginVertical: 16, fontWeight: 'bold', fontSize: 18 }}>Segmented Buttons</RNText>
        <SegmentedButtons
          options={[
            { value: 'day', label: 'Day', icon: 'weather-sunny' },
            { value: 'week', label: 'Week', icon: 'calendar-week' },
            { value: 'month', label: 'Month', icon: 'calendar-month' },
          ]}
          value={segValue}
          onChange={setSegValue}
          size="md"
          fullWidth
        />
        {/* Add more component examples here */}
      </ScrollView>
    </DesignSystemProvider>
  );
};

export default ComponentGallery;
