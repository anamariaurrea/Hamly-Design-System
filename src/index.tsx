// index.tsx
import * as React from 'react';
import { registerRootComponent } from 'expo';
import { DesignSystemProvider } from './design-system/providers/DesignSystemProvider';
import RootNavigator from './app/navigation/RootNavigator';

const App = () => (
  <DesignSystemProvider>
    <RootNavigator />
  </DesignSystemProvider>
);

registerRootComponent(App);
