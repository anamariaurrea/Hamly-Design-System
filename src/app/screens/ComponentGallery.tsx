import * as React from 'react';
import { ScrollView, View, Text as RNText } from 'react-native';
import { DesignSystemProvider } from '../../design-system/providers';
import { AppBar } from '../../design-system/components/AppBar';
import { Avatar } from '../../design-system/components/Avatar';
import { Badge } from '../../design-system/components/Badge';
import { BottomSheet } from '../../design-system/components/BottomSheet';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { tokens } from '../../design-system/theme';

const ComponentGallery: React.FC = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [sheetVisible, setSheetVisible] = React.useState(false);

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
        <Button mode="contained" onPress={() => setSheetVisible(true)} style={{ marginBottom: 12 }}>
          Abrir BottomSheet
        </Button>
        <BottomSheet
          visible={sheetVisible}
          onDismiss={() => setSheetVisible(false)}
          header={<RNText style={{ fontWeight: 'bold', fontSize: 16 }}>Header de ejemplo</RNText>}
        >
          <RNText>Este es el contenido del BottomSheet. Puedes poner aquí cualquier componente.</RNText>
        </BottomSheet>
        {/* Add more component examples here */}
      </ScrollView>
    </DesignSystemProvider>
  );
};

export default ComponentGallery;
