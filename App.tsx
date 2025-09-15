// App.tsx
import * as React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { adaptNavigationTheme } from "react-native-paper";
import { useTheme } from "react-native-paper";

import ComponentGallery from "./src/app/screens/ComponentGallery";
import LoginScreen from "./src/app/navigation/LoginScreen";
import RegisterEmailScreen from "./src/app/screens/Register";
import OnboardingWizard from "./src/app/screens/Onboarding/Onboarding";
import MainTabs from "./src/app/screens/MainTabs";
import SplashScreen from "./src/app/screens/SplashScreen";
import { ThemeProvider, useAppTheme } from "./src/design-system/providers/ThemeProvider";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const theme = useTheme();
  const { isDarkMode } = useAppTheme();

  // Sincroniza navegación y paper
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
    materialLight: theme,
    materialDark: theme,
  });
  const navTheme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="ComponentGallery"
            component={ComponentGallery}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterEmailScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingWizard} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
