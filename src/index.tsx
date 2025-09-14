// index.tsx
import * as React from 'react';
import { DesignSystemProvider } from './design-system/providers/DesignSystemProvider';
import RootNavigator from './app/navigation/RootNavigator';

export default function App() {
  return (
    <DesignSystemProvider>
      <RootNavigator />
    </DesignSystemProvider>
  );
}
