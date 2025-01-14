import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  navigation,
} from "react-native";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import CalorieTracker from "@/app/caloriecircle.jsx";
import CalorieBurntTracker from "@/app/calorieburnt.jsx";

const SCREEN_WIDTH = Dimensions.get("window").height;
const SECTIONWIDTH = SCREEN_WIDTH * 0.44;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SECTIONHEIGHT = SCREEN_HEIGHT * 0.2;

const Dashboard = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Poppins: require("@/assets/fonts/Poppins.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  const foodItems = [
    { id: "1", name: "Apple" },
    { id: "2", name: "Banana" },
    { id: "3", name: "Chicken Breast" },
    { id: "4", name: "Salmon" },
    { id: "5", name: "Broccoli" },
  ];

  const handleFocus = () => {
    setDropdownVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => setDropdownVisible(false), 100);
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.alignflex}>
        <TouchableOpacity onPress={() => handleNavigate("ProfilePage")}>
          <Image
            style={styles.profileIcon}
            source={require("@/assets/images/profile-icon-colored.png")}
          />
        </TouchableOpacity>
        <Image
          style={styles.headerText}
          source={require("@/assets/images/TrackMyFitnessLogo.png")}
        />
        <Image
          style={styles.bellIcon}
          source={require("@/assets/images/bell-icon.png")}
        />
      </View>
      <View style={styles.forback}>
        <Image
          style={styles.obj2}
          source={require("@/assets/images/backward.png")}
        />
        <View>
          <Text style={styles.mediumHeading}>Today</Text>
        </View>
        <Image
          style={styles.obj2}
          source={require("@/assets/images/forward.png")}
        />
      </View>
      <View style={styles.totalcalories}>
        <Image
          style={styles.obj1}
          source={require("@/assets/images/obj1.png")}
        />
        <View style={styles.bigsection}>
          <View style={styles.backobj}>
            <Text style={styles.labelobj}>Total Calories Goal:</Text>
          </View>
          <View style={styles.values}>
            <Text style={styles.label}>Consumed: </Text>
            <Text style={styles.value}>1450</Text>
            <Text style={styles.kcal}>kcal</Text>
          </View>
          <View style={styles.values}>
            <Text style={styles.label}>Total: </Text>
            <Text style={styles.value}>2000</Text>
            <Text style={styles.kcal}>kcal</Text>
          </View>
        </View>
        <View style={styles.caloriecircle}>
          <CalorieTracker />
        </View>
      </View>

      <View style={styles.totalcalories}>
        <Image
          style={styles.burntobj1}
          source={require("@/assets/images/obj1.png")}
        />
        <View style={styles.bigsection}>
          <View style={styles.burntbackobj}>
            <Text style={styles.labelobj}>Calories Burnt:</Text>
          </View>
          <View style={styles.values}>
            <Text style={styles.label}>Steps: </Text>
            <Text style={styles.value}>150</Text>
            <Text style={styles.kcal}>kcal</Text>
          </View>
          <View style={styles.values}>
            <Text style={styles.label}>Exercise: </Text>
            <Text style={styles.value}>600</Text>
            <Text style={styles.kcal}>kcal</Text>
          </View>
        </View>
        <View style={styles.caloriecircle}>
          <CalorieBurntTracker />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Weight Monitoring:</Text>
        <Text style={styles.value}>68 kg</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Poppins",
    backgroundColor: "#1B1A1C",
    flex: 1,
    padding: 16,
  },
  alignflex: {
    marginTop: 20,
    padding: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  headerBackground: {
    position: "static",
    padding: 50,
    alignItems: "center",
  },
  headerText: {
    width: 180,
    height: 20,
    right: 5,
  },
  safeArea: {
    marginVertical: 16,
  },
  profileIcon: {
    width: 45,
    height: 45,
    alignSelf: "center",
    tintColor: "white",
  },
  bellIcon: {
    width: 25,
    height: 25,
    alignSelf: "center",
    tintColor: "white",
  },
  mediumHeading: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
    display: "flex",
    textAlign: "center",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  forback: {
    width: SECTIONWIDTH,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  burntobj1: {
    left: -4,
    width: 270,
    height: 115,
    position: "absolute",
  },
  obj2: {
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 100,
    width: 20,
    height: 20,
  },
  obj1: {
    left: -4,
    width: 270,
    height: 115,
    position: "absolute",
  },
  backobj: {
    flexWrap: "wrap",
  },
  burntbackobj: {
    marginRight: 58,
  },
  section: {
    marginBottom: 24,
    alignItems: "flex-start",
    backgroundColor: "#1B1A1C",
    paddingVertical: 20,
    padding: 16,
    shadowColor: "#1ED760",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 100,
    shadowRadius: 20,
  },
  totalcalories: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    backgroundColor: "#1B1A1C",
    padding: 10,
    shadowColor: "#1ED760",
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 10,
    height: SECTIONHEIGHT,
    borderWidth: 0.5,
    borderColor: "#1B1A1C",
  },
  bigsection: {
    margin: 5,
  },

  caloriecircle: {
    right: 14,
    padding: 2,
  },

  gradientSection: {
    padding: 16,
    borderRadius: 8,
    alignItems: "flex-start",
  },
  labelobj: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  label: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  kcal: {
    alignItems: "center",
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#a6a6a6",
    marginRight: 15,
  },
  values: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  value: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 25,
    color: "#a6a6a6",
    marginTop: 4,
  },
});

export default Dashboard;
