import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Alert, AppState, AppStateStatus, Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Button, Text } from "react-native-paper";
import { useAppContext } from "@/context/AppContext";
import { setUserOnline } from "@/services/userService";

export default function TabLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { logout, user } = useAppContext();
  const handleLogout = () => {
    router.replace("/auth");
    logout();
  };
  const onLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            handleLogout();
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
  useEffect(() => {
    if (!user) return;
    setUserOnline(user?.uid, "online");
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        setUserOnline(user?.uid, "offline");
      }
      if (nextAppState === "active") {
        setUserOnline(user?.uid, "online");
      }
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      setUserOnline(user?.uid, "offline");
      subscription.remove();
    };
  }, [user]);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerTitle: user?.displayName ?? "",
        headerTitleAlign: "center",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
        headerRight: () => {
          return (
            <Button icon="logout" mode="text" onPress={onLogout}>
              Logout
            </Button>
          );
        },

        headerLeft: () => {
          return (
            <Text variant="titleLarge" style={{ marginLeft: 10 }}>
              Travelog
            </Text>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="hospital-o" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "Add Log",
          tabBarIcon: ({ color }) => (
            <Entypo name="bookmark" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
