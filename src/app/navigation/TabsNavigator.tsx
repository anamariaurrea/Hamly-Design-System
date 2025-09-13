// TabsNavigator.tsx
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Login" component={LoginScreen} />
  </Tab.Navigator>
);

export default TabsNavigator;
