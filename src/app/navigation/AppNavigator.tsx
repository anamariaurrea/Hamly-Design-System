import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import ComponentGallery from "../screens/ComponentGallery";
import MainTabs from '../screens/MainTabs';
import Register from "../screens/Register";
import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="ComponentGallery" component={ComponentGallery} />
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Courses" component={require('../screens/CoursesScreen').default} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AppNavigator;
