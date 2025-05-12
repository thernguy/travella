import { CombinedDarkTheme, CombinedDefaultTheme } from "@/constants/Themes";
import { ContextProvider, useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const { user } = useAppContext();

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
      if (user) {
        router.replace("/tabs");
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
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName={user ? "tabs" : "auth"}
        >
          <Stack.Screen
            name="search/index"
            options={{
              headerShown: true,
              title: "Search User",
              animation: "fade",
              headerBackTitle: "Feed",
            }}
          />
          <Stack.Screen
            name="chat/index"
            options={({ route }) => {
              const params = route.params as { user?: string };
              const user = params?.user ? JSON.parse(params.user) : null;
              return {
                headerShown: true,
                title: user?.name || "Chat",
              };
            }}
          />
        </Stack>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </PaperProvider>
    </ThemeProvider>
  );
}

export default function RootLayoutWrapper() {
  return (
    <ContextProvider>
      <RootLayout />
    </ContextProvider>
  );
}
