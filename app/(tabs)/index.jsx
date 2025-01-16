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
} from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import CalorieTracker from "@/app/caloriecircle.jsx";
import CalorieBurntTracker from "@/app/calorieburnt.jsx";

const SCREEN_WIDTH = Dimensions.get("window").height;
const SECTIONWIDTH = SCREEN_WIDTH * 0.44;
const SMALLSECWIDTH = SCREEN_WIDTH * 0.22;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SECTIONHEIGHT = SCREEN_HEIGHT * 0.2;
const SMALLSECHEIGHT = SCREEN_HEIGHT * 0.2;

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
    <View style={styles.container}>
      <View style={styles.alignflex}>
        <TouchableOpacity onPress={() => navigation.navigate("profile")}>
          <Image
            style={styles.profileIcon}
            source={require("@/assets/images/profile-icon-colored.png")}
          />
        </TouchableOpacity>
        <Image
          style={styles.headerText}
          source={require("@/assets/images/TrackMyFitnessLogo.png")}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          {hasNotification ? (
            <Image
              style={styles.bellIconActive}
              source={require("@/assets/images/bell-icon-active.png")}
            />
          ) : (
            <Image
              style={styles.bellIcon}
              source={require("@/assets/images/bell-icon.png")}
            />
          )}
        </TouchableOpacity>
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
      <View style={styles.sectionFlex}>
        <View style={styles.section}>
          <Image
            style={styles.weightObj}
            source={require("@/assets/images/obj1.png")}
          />
          <Text style={styles.smallLabelObj}>Weight Monitoring:</Text>
          <View style={styles.values}>
            <Text style={styles.label}>Current: </Text>
            <Text style={styles.value}>60</Text>
            <Text style={styles.kcal}>kg</Text>
          </View>
          <View style={styles.values}>
            <Text style={styles.label}>Goal: </Text>
            <Text style={styles.value}>75</Text>
            <Text style={styles.kcal}>kg</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Image
            style={styles.weightObj}
            source={require("@/assets/images/obj1.png")}
          />
          <Text style={styles.smallLabelObj}>Steps Counter:</Text>
          <View style={styles.values}>
            <Text style={styles.label}>Current: </Text>
            <Text style={styles.value}>1000</Text>
            <Text style={styles.kcal}>steps</Text>
          </View>
          <View style={styles.values}>
            <Text style={styles.label}>Goal: </Text>
            <Text style={styles.value}>5000</Text>
            <Text style={styles.kcal}>steps</Text>
          </View>
        </View>
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
    paddingTop: 30,
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
  bellIconActive: {
    width: 25,
    height: 25,
    alignSelf: "center",
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
  weightObj: {
    left: -4,
    width: 215,
    height: 90,
    position: "absolute",
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
    display: "flex",
    flexDirection: "column",
    marginBottom: 24,
    backgroundColor: "#1B1A1C",
    padding: 10,
    shadowColor: "#1ED760",
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 10,
    height: SMALLSECHEIGHT,
    width: SMALLSECWIDTH,
    borderWidth: 0.5,
    borderColor: "#1B1A1C",
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
  sectionFlex: {
    flexDirection: "row",
    gap: 9,
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
  smallLabelObj: {
    fontFamily: "Poppins",
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
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
