import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import CalorieTracker from "@/app/caloriecircle.jsx";
import CalorieBurntTracker from "@/app/calorieburnt.jsx";
import calculateTotalCalories from "@/app/(tabs)/nutrition.jsx";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Dashboard = () => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Poppins: require("@/assets/fonts/Poppins.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
    const notificationReceived = true;
    setHasNotification(notificationReceived);
  }, []);

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6a11cb", "#2575fc"]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("profile")}>
            <Image
              style={styles.profileIcon}
              source={require("@/assets/images/profile-icon-colored.png")}
            />
          </TouchableOpacity>
          <Image
            style={styles.logo}
            source={require("@/assets/images/TrackMyFitnessLogo.png")}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Image
              style={styles.bellIcon}
              source={
                hasNotification
                  ? require("@/assets/images/bell-icon-active.png")
                  : require("@/assets/images/bell-icon.png")
              }
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Today</Text>
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            onPress={() => console.log("Navigate to Yesterday")}
          >
            <Image
              style={styles.navIcon}
              source={require("@/assets/images/backward.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Navigate to Tomorrow")}>
            <Image
              style={styles.navIcon}
              source={require("@/assets/images/forward.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollableSection}>
        <TouchableOpacity
          onPress={() => console.log("Card: Total Calories Goal")}
        >
          <LinearGradient colors={["#1B1A1C", "#1B1A1C"]} style={styles.card}>
            <Text style={styles.cardTitle}>Total Calories Goal</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Consumed: 0 kcal</Text>
              <Text style={styles.cardLabel}>Goal: 2000 kcal</Text>
            </View>
            <CalorieTracker />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Card: Calories Burnt")}>
          <LinearGradient colors={["#1B1A1C", "#1B1A1C"]} style={styles.card}>
            <Text style={styles.cardTitle}>Calories Burnt</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Steps: 150 kcal</Text>
              <Text style={styles.cardLabel}>Exercise: 600 kcal</Text>
            </View>
            <CalorieBurntTracker />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => console.log("Card: Weight Monitoring")}
          >
            <LinearGradient
              colors={["#1B1A1C", "#1B1A1C"]}
              style={styles.smallCard}
            >
              <Text style={styles.smallCardTitle1}>Weight Monitoring</Text>
              <Text style={styles.cardLabel}>Current: 60 kg</Text>
              <Text style={styles.cardLabel}>Goal: 75 kg</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Card: Steps Counter")}>
            <LinearGradient
              colors={["#1B1A1C", "#1B1A1C"]}
              style={styles.smallCard}
            >
              <Text style={styles.smallCardTitle}>Steps</Text>
              <Text style={styles.smallCardTitle1}>Counter</Text>
              <Text style={styles.cardLabel}>Current: 1000 steps</Text>
              <Text style={styles.cardLabel}>Goal: 5000 steps</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f108f",
    padding: 16,
  },
  headerGradient: {
    borderRadius: 10,
    paddingBottom: 16,
    marginBottom: 0,
    marginTop: 25,
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  logo: {
    width: 150,
    height: 30,
    tintColor: "white",
    right: 2,
  },
  profileIcon: {
    width: 40,
    height: 40,
    tintColor: "white",
  },
  bellIcon: {
    width: 25,
    height: 25,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    position: "relative",
    bottom: -33,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  scrollableSection: {
    flex: 1,
  },
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  cardContent: {
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  smallCard: {
    borderRadius: 10,
    padding: 16,
    width: (SCREEN_WIDTH - 48) / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  smallCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  smallCardTitle1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
});

export default Dashboard;
