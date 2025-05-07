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
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "@/scripts/firebaseConfig.js";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Dashboard = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState(0); // Default dummy
  const [totalCalories, setTotalCalories] = useState(0); // Default dummy
  const [caloriesBurned, setCaloriesBurned] = useState(0); // Default dummy
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    const db = getFirestore(app);
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth user:", user);

      if (!user) {
        console.log("User not logged in, showing dummy data");
      } else {
        const userDocRef = doc(db, "users", user.uid);
        const unsubDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Fetched Firestore data:", data);
            setTotalCalories(data.totalCalories ?? 0);
            setCaloriesBurned(data.totalCaloriesBurned ?? 0);
            setWeight(data.weight ?? 0);
          } else {
            console.log("No document found for user");
          }
        });

        // Clean up document listener when user changes
        return () => unsubDoc();
      }

      setHasNotification(true);
    });

    // Clean up auth listener when component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          Poppins: require("@/assets/fonts/Poppins.ttf"),
        });
        console.log("Fonts loaded");
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Wait for fonts
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
              <Text style={styles.cardLabel}>
                Consumed: {totalCalories} kcal
              </Text>
              <Text style={styles.cardLabel}>Goal: 1500 kcal</Text>
            </View>
            <CalorieTracker />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Card: Calories Burnt")}>
          <LinearGradient colors={["#1B1A1C", "#1B1A1C"]} style={styles.card}>
            <Text style={styles.cardTitle}>Calories Burnt</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Burnt: {caloriesBurned} kcal</Text>
              <Text style={styles.cardLabel}>Goal: 200 kcal</Text>
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
              <Text style={styles.cardLabel}>Current: {weight} kg</Text>
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
              <Text style={styles.cardLabel}>Current: 0 steps</Text>
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
    backgroundColor: "#1B1A1C",
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
  smallCard: {
    borderRadius: 10,
    padding: 16,
    width: (SCREEN_WIDTH - 48) / 2,
    backgroundColor: "#1B1A1C",
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
