// App.tsx
import React from 'react';
import { registerRootComponent } from 'expo';
import ComponentGallery from './src/app/screens/ComponentGallery';
import { DesignSystemProvider } from './src/design-system/providers/DesignSystemProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <DesignSystemProvider>
        <ComponentGallery />
      </DesignSystemProvider>
    </SafeAreaProvider>
  );
}

export default App;
registerRootComponent(App);

