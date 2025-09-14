// App.tsx
import * as React from "react";
import { useColorScheme, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
} from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { adaptNavigationTheme } from "react-native-paper";

import ComponentGallery from "./src/app/screens/ComponentGallery";
import LoginScreen from "./src/app/screens/LoginScreen";
import RegisterEmailScreen from "./src/app/screens/Register";
import OnboardingWizard from "./src/app/screens/Onboarding/Onboarding";
import MainTabs from "./src/app/screens/MainTabs";
import SplashScreen from "./src/app/screens/SplashScreen";

// 1. ThemeContext
export const ThemeContext = React.createContext({
  isDark: false,
  toggle: () => { },
});

const lightColors = {
  primary: '#425E91',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  onSurface: '#111111',
  onSurfaceVariant: '#666666',
  outline: '#E0E0E0',
  outlineVariant: '#E0E0E0',
  primaryContainer: '#E3ECF7', // azul claro
  onPrimaryContainer: '#1A2B4D', // texto sobre azul claro
};
const darkColors = {
  primary: '#9FC1FF',
  background: '#0B0F14',
  surface: '#0F141A',
  onSurface: '#EDEFF3',
  onSurfaceVariant: '#A9B3BE',
  outline: '#27313B',
  outlineVariant: '#27313B',
  primaryContainer: '#22304A', // azul oscuro
  onPrimaryContainer: '#CFE2FF', // texto sobre azul oscuro
};

const Stack = createNativeStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = React.useState(colorScheme === "dark");
  const toggle = React.useCallback(() => setIsDark((d) => !d), []);

  // Extiende el tema MD3
  const theme = React.useMemo(() => {
    const base = isDark ? MD3DarkTheme : MD3LightTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        ...(isDark ? darkColors : lightColors),
      },
    };
  }, [isDark]);

  // Sincroniza navegación y paper
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
    materialLight: theme,
    materialDark: theme,
  });
  const navTheme = isDark ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <SafeAreaProvider>
        <PaperProvider
          theme={theme}
          settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
        >
          <StatusBar
            barStyle={isDark ? "light-content" : "dark-content"}
            backgroundColor={theme.colors.background}
          />
          <NavigationContainer theme={navTheme}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="ComponentGallery"
                component={ComponentGallery}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="RegisterEmail"
                component={RegisterEmailScreen}
              />
              <Stack.Screen name="Onboarding" component={OnboardingWizard} />
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen name="Splash" component={SplashScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
};

export default App;
