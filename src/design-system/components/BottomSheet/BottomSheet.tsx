// BottomSheet.tsx
import * as React from 'react';
import { View, StyleSheet, Platform, Animated, Dimensions } from 'react-native';
import { Modal, Portal, useTheme, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface BottomSheetProps {
  visible?: boolean;
  onDismiss?: () => void;
  snapPoints?: string[];
  header?: React.ReactNode;
  children?: React.ReactNode;
  enablePanDownToClose?: boolean;
  accessibilityLabel?: string;
}

// Fallback implementation using Modal + Animated
const BottomSheet: React.FC<BottomSheetProps> = ({
  visible = false,
  onDismiss,
  snapPoints = ['25%', '50%'],
  header,
  children,
  enablePanDownToClose = true,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get('window').height;
  const snapPx = parseInt(snapPoints[snapPoints.length - 1]) || Math.round(screenHeight * 0.5);
  const translateY = React.useRef(new Animated.Value(screenHeight)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: screenHeight - snapPx,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, snapPx, screenHeight, translateY]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ flex: 1 }}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: theme.colors.surface,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingBottom: insets.bottom,
              transform: [{ translateY }],
            },
          ]}
        >
          {header && <View style={styles.header}>{header}</View>}
          <View style={styles.content}>{children}</View>
          {enablePanDownToClose && (
            <Button onPress={onDismiss} style={styles.closeBtn} accessibilityLabel="Cerrar">
              Cerrar
            </Button>
          )}
        </Animated.View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 120,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  },
  header: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  content: {
    padding: 16,
  },
  closeBtn: {
    marginTop: 8,
    alignSelf: 'center',
  },
});

export default BottomSheet;
export { BottomSheet };
