import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Image } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/dashboard-icon-1024x1024-qzkesrqd.png")} // Replace with the path to your custom icon
              style={{ width: 25, height: 25, tintColor: color }} // Set the size and tintColor
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Nutrition",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/calories-icon.png")} // Replace with the path to your custom icon
              style={{ width: 35, height: 35, tintColor: color }} // Set the size and tintColor
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: "Workout",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/running-icon.jpg")} // Replace with the path to your custom icon
              style={{ width: 28, height: 28, tintColor: color }} // Set the size and tintColor
            />
          ),
        }}
      />
    </Tabs>
  );
}
