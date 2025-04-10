import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import hasNotification from "@/app/(tabs)/index.jsx";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SECTIONWIDTH = SCREEN_WIDTH * 0.44;

const workoutOptions = [
  {
    id: 1,
    name: "Push-ups",
    duration: "10 mins",
    image: require("@/assets/images/pushups.png"),
  },
  {
    id: 2,
    name: "Squats",
    duration: "15 mins",
    image: require("@/assets/images/squats.png"),
  },
  {
    id: 3,
    name: "Jumping Jacks",
    duration: "5 mins",
    image: require("@/assets/images/jumpingjacks.png"),
  },
  {
    id: 4,
    name: "Plank",
    duration: "3 mins",
    image: require("@/assets/images/plank.png"),
  },
  {
    id: 5,
    name: "Burpees",
    duration: "7 mins",
    image: require("@/assets/images/burpees.png"),
  },
];

const WorkoutPage = () => {
  const navigation = useNavigation();
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const chooseRandomWorkout = () => {
    const randomWorkout =
      workoutOptions[Math.floor(Math.random() * workoutOptions.length)];
    setSelectedWorkout(randomWorkout);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={["#6a11cb", "#2575fc"]}
          style={styles.headerGradient}
        >
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
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
        </LinearGradient>
        <View style={styles.headerWorkout}>
          <Text style={styles.headerWorkoutText}>Workout Options</Text>
          <TouchableOpacity onPress={chooseRandomWorkout}>
            <LinearGradient
              colors={["#6a11cb", "#2575fc"]}
              style={styles.randomButton}
            >
              <Text style={styles.randomButtonText}>Random Workout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {selectedWorkout && (
        <View style={styles.selectedWorkout}>
          <Image style={styles.workoutImage} source={selectedWorkout.image} />
          <Text style={styles.workoutName}>{selectedWorkout.name}</Text>
          <Text style={styles.workoutDuration}>
            Duration: {selectedWorkout.duration}
          </Text>
        </View>
      )}

      <FlatList
        data={workoutOptions}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.workoutOption}>
            <Image style={styles.workoutImage} source={item.image} />
            <Text style={styles.workoutName}>{item.name}</Text>
            <Text style={styles.workoutDuration}>{item.duration}</Text>
          </View>
        )}
      />
    </View>
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
    marginBottom: 30,
    marginTop: 25,
  },
  alignflex: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
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
    width: 40,
    height: 40,
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
  },
  headerLogo: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    marginTop: 50,
  },
  headerText: {
    width: 150,
    height: 30,
    tintColor: "white",
    right: 2,
  },
  headerWorkout: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  headerWorkoutText: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 24,
    width: 180,
    height: 30,
  },
  randomButton: {
    backgroundColor: "#1ED760",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  randomButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  selectedWorkout: {
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: "#282828",
    padding: 16,
  },
  workoutImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  workoutDuration: {
    fontSize: 16,
    fontWeight: "600",
    color: "#a6a6a6",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  workoutOption: {
    borderRadius: 10,
    backgroundColor: "#1B1A1C",
    width: SECTIONWIDTH,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#333",
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 10,
  },
});

export default WorkoutPage;
