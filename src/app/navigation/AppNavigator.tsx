import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import ComponentGallery from "../screens/ComponentGallery";
import TabsNavigator from "./TabsNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="ComponentGallery" component={ComponentGallery} />
    <Stack.Screen name="MainTabs" component={TabsNavigator} />
  </Stack.Navigator>
);

export default AppNavigator;
