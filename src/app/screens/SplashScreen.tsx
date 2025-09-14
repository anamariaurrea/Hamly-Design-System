import * as React from "react";
import { SafeAreaView, Image, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export interface SplashScreenProps {
  durationMs?: number;
  nextRoute?: string;
  tint?: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  durationMs = 1200,
  nextRoute = "ComponentGallery",
  tint = false,
}) => {
  const theme = useTheme();
  const navigation = useNavigation();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      // @ts-ignore
      navigation.navigate(nextRoute as never);
    }, durationMs);
    return () => clearTimeout(timeout);
  }, [navigation, nextRoute, durationMs]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: "center",
        justifyContent: "center",
      }}
      accessible={true}
      accessibilityLabel="Splash"
    >
      <StatusBar
        barStyle={theme.dark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <Image
        source={require("../../../assets/splash-icon.png")}
        style={{
          width: 200,
          height: 200,
          maxWidth: 220,
          resizeMode: "contain",
          ...(tint ? { tintColor: theme.colors.onBackground } : {}),
        }}
        accessibilityLabel="Logo"
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
export { SplashScreen };
