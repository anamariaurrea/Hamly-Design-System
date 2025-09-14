// TabsNavigator.tsx
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import LoginScreen from '../screens/LoginScreen';
import ComponentGallery from '../screens/ComponentGallery';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => (
  <Tab.Navigator id={undefined}>
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Login" component={LoginScreen} />
    <Tab.Screen name="ComponentGallery" component={ComponentGallery} />
  </Tab.Navigator>
);

export default TabsNavigator;
