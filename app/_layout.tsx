import { CombinedDarkTheme, CombinedDefaultTheme } from "@/constants/Themes";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useNavigation, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import * as SystemUI from "expo-system-ui";
import { Platform } from "react-native";
import { initDB } from "@/database/db";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(true);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const theme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;
  SystemUI.setBackgroundColorAsync(theme.colors.background);

  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      if (isLoggedIn) {
        router.replace("/tabs");
        const setupDatabase = async () => {
          await initDB();
        };
        setupDatabase();
      } else {
        router.replace("/auth");
      }
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={theme as any}>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="hospitals/[id]"
            options={{
              headerShown: true,
              title: "Hospital Services",
            }}
          />
          <Stack.Screen
            name="book/[id]"
            options={{
              headerShown: true,
              title: "Book Service",
              presentation:
                Platform.OS === "ios" ? "formSheet" : "containedModal",
              animation: "fade",
            }}
          />
        </Stack>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </PaperProvider>
    </ThemeProvider>
  );
}
