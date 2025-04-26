import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from "@react-navigation/native";
import merge from "deepmerge";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme
} from "react-native-paper";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
export const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
export const NavigationTheme = {
    regular: {
      fontFamily: "SpaceMono",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "SpaceMono",
      fontWeight: "normal",
    },
    bold: {
      fontFamily: "SpaceMono",
      fontWeight: "normal",
    },
    heavy: {
      fontFamily: "SpaceMono",
      fontWeight: "normal",
    },
};
