import * as React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationBar } from "../../design-system/components/NavigationBar/NavigationBar";
import CoursesScreen from "./CoursesScreen";
import DictionaryScreen from "./Dictionary";
import LeaguesScreen from "./Leagues";
import CommunityScreen from "./Community";
import ProfileScreen from "./Profile";

export type MainTabParamList = {
  Courses: undefined;
  Dictionary: undefined;
  Leagues: undefined;
  Community: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator();

function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityHome" component={CommunityScreen} />
    </Stack.Navigator>
  );
}

const ICONS = {
  Courses: "school-outline",
  Dictionary: "book-outline",
  Leagues: "trophy-outline",
  Community: "account-group-outline",
  Profile: "account-outline",
} as const;

function NavBarBridge({ state, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const selectedIndex = state.index;

  const items = state.routes.map((r) => ({
    key: r.name,
    label: r.name === "Courses" ? "Cursos" :
      r.name === "Dictionary" ? "Diccionario" :
        r.name === "Leagues" ? "Ligas" :
          r.name === "Community" ? "Comunidad" :
            r.name === "Profile" ? "Perfil" : r.name,
    icon: ({ color, size = 22 }: { color: string; size?: number }) => (
      <MaterialCommunityIcons
        name={ICONS[r.name as keyof typeof ICONS]}
        size={size}
        color={color}
      />
    ),
  }));

  const selectedKey = state.routes[state.index].name;

  const onPress = (key: string) => {
    const route = state.routes.find((r) => r.name === key);
    if (!route) return;
    const e = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });
    if (!e.defaultPrevented && selectedKey !== key) navigation.navigate(key as never);
  };

  return (
    <View
      style={[styles.bar, {
        backgroundColor: theme.colors.surfaceVariant,
      }]}
    >
      <NavigationBar
        items={items}
        selectedKey={selectedKey}
        onChange={onPress}
        style={{ backgroundColor: theme.colors.surfaceVariant }}
      />
    </View>
  );
}

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <NavBarBridge {...props} />}
      initialRouteName="Courses"
    >
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Dictionary" component={DictionaryScreen} />
      <Tab.Screen name="Leagues" component={LeaguesScreen} />
      <Tab.Screen name="Community" component={CommunityStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({
  bar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "transparent",
    paddingHorizontal: 12,
    paddingTop: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: -3 },
      },
      android: { elevation: 2 },
    }),
  },
});
