import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Alert, Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Button, Text } from "react-native-paper";
import { useAuth } from "@/context/AppContext";

export default function TabLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { logout, user } = useAuth();
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
        },
      ],
      { cancelable: false }
    );
  };
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
              Travella
            </Text>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hospitals",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="hospital-o" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color }) => (
            <Entypo name="bookmark" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
