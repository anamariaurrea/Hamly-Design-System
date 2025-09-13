// RootNavigator.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigator from './TabsNavigator';

const RootNavigator = () => (
  <NavigationContainer>
    <TabsNavigator />
  </NavigationContainer>
);

export default RootNavigator;
