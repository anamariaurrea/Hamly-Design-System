// TabsNavigator.tsx
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import ComponentGallery from '../screens/ComponentGallery';
import Register from '../screens/Register';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => (
  <Tab.Navigator id={undefined}>
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="ComponentGallery" component={ComponentGallery} />
    <Tab.Screen name="Register" component={Register} options={{ tabBarButton: () => null }} />
  </Tab.Navigator>
);

export default TabsNavigator;
