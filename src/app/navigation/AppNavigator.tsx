import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import ComponentGallery from "../screens/ComponentGallery";
import TabsNavigator from "./TabsNavigator";
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
    <Stack.Screen name="MainTabs" component={TabsNavigator} />
    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AppNavigator;
