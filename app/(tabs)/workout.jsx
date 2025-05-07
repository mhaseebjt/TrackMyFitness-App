import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import hasNotification from "@/app/(tabs)/index.jsx";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/scripts/firebaseConfig.js";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SECTIONWIDTH = SCREEN_WIDTH * 0.44;

const workoutOptions = [
  {
    id: 1,
    name: "Push-ups",
    duration: 10,
    image: require("@/assets/images/pushups.png"),
    caloriesPerMinute: 7,
  },
  {
    id: 2,
    name: "Squats",
    duration: 15,
    image: require("@/assets/images/squats.png"),
    caloriesPerMinute: 5,
  },
  {
    id: 3,
    name: "Jumping Jacks",
    duration: 5,
    image: require("@/assets/images/jumpingjacks.png"),
    caloriesPerMinute: 8,
  },
  {
    id: 4,
    name: "Plank",
    duration: 1,
    image: require("@/assets/images/plank.png"),
    caloriesPerMinute: 4,
  },
  {
    id: 5,
    name: "Burpees",
    duration: 7,
    image: require("@/assets/images/burpees.png"),
    caloriesPerMinute: 10,
  },
];

const WorkoutPage = () => {
  const navigation = useNavigation();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        retrieveWorkouts(currentUser.uid);
      } else {
        setUser(null);
        setCompletedWorkouts({});
        setTotalCaloriesBurned(0);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let interval;
    if (timerStarted && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timerStarted && timeLeft === 0) {
      clearInterval(interval);
      setTimerStarted(false);
      if (selectedWorkout) {
        const calories =
          selectedWorkout.duration * selectedWorkout.caloriesPerMinute;

        setCompletedWorkouts((prev) => {
          const existing = prev[selectedWorkout.name];
          const updated = {
            ...prev,
            [selectedWorkout.name]: {
              ...selectedWorkout,
              count: existing ? existing.count + 1 : 1,
              caloriesBurned:
                (existing ? existing.caloriesBurned : 0) + calories,
            },
          };

          const newTotal = totalCaloriesBurned + calories;
          saveToFirebase(updated, newTotal);
          return updated;
        });

        setTotalCaloriesBurned((prev) => prev + calories);
      }
    }
    return () => clearInterval(interval);
  }, [timerStarted, timeLeft]);

  const saveToFirebase = async (data, newTotalCalories) => {
    if (!user) return;
    try {
      const workoutsArray = Object.keys(data).map((key) => ({
        ...data[key],
        name: key,
      }));
      await updateDoc(doc(db, "users", user.uid), {
        completedWorkouts: workoutsArray,
        totalCaloriesBurned: newTotalCalories,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error saving workout to Firebase:", error);
    }
  };

  const retrieveWorkouts = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const workoutsArray = data.completedWorkouts || [];
        const workoutsObject = {};
        workoutsArray.forEach((workout) => {
          if (workout.name) workoutsObject[workout.name] = workout;
        });
        setCompletedWorkouts(workoutsObject);
        setTotalCaloriesBurned(data.totalCaloriesBurned || 0);
      }
    } catch (error) {
      console.error("Error retrieving workout data:", error);
    }
  };

  const resetWorkouts = async () => {
    try {
      if (!user) return;
      await updateDoc(doc(db, "users", user.uid), {
        completedWorkouts: [],
        totalCaloriesBurned: 0,
      });
      setCompletedWorkouts({});
      setTotalCaloriesBurned(0);
      Alert.alert("Reset", "Workout history cleared.");
    } catch (err) {
      console.error("Error resetting workouts:", err);
    }
  };

  const startTimer = () => {
    if (selectedWorkout) {
      setTimeLeft(selectedWorkout.duration * 60);
      setTimerStarted(true);
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <FlatList
      data={workoutOptions}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
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

          <Text style={styles.headerWorkoutText}>Workout Options</Text>

          {selectedWorkout && (
            <View style={styles.selectedWorkout}>
              <Image
                style={styles.workoutImage}
                source={selectedWorkout.image}
              />
              <Text style={styles.workoutName}>{selectedWorkout.name}</Text>
              <Text style={styles.workoutDuration}>
                Duration: {selectedWorkout.duration} mins
              </Text>
              {timerStarted ? (
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              ) : (
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={startTimer}
                >
                  <Text style={styles.startButtonText}>Start</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {Object.keys(completedWorkouts).length > 0 && (
            <View style={styles.workoutsPerformed}>
              <Text style={styles.workoutsPerformedHeader}>
                Workouts Performed
              </Text>
              {Object.entries(completedWorkouts).map(([name, data]) => (
                <View key={name} style={styles.completedWorkout}>
                  <Text style={styles.completedWorkoutName}>
                    {name} x{data.count}
                  </Text>
                  <Text style={styles.completedWorkoutCalories}>
                    Total Calories: {data.caloriesBurned} kcal
                  </Text>
                </View>
              ))}
              <Text style={styles.totalCaloriesText}>
                Total Calories Burned: {totalCaloriesBurned} kcal
              </Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetWorkouts}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.workoutOption}
          onPress={() => {
            setSelectedWorkout(item);
            setTimerStarted(false);
            setTimeLeft(0);
          }}
        >
          <Image style={styles.workoutImage} source={item.image} />
          <Text style={styles.workoutName}>{item.name}</Text>
          <Text style={styles.workoutDuration}>{item.duration} mins</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2f108f",
    padding: 16,
    paddingBottom: 50,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerGradient: {
    borderRadius: 10,
    paddingBottom: 16,
    marginBottom: 20,
    marginTop: 25,
  },
  alignflex: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  profileIcon: { width: 40, height: 40, tintColor: "white" },
  headerText: { width: 150, height: 30, tintColor: "white", right: 2 },
  bellIconActive: { width: 25, height: 25 },
  bellIcon: { width: 25, height: 25 },
  headerWorkoutText: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  selectedWorkout: {
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#282828",
    padding: 16,
  },
  workoutImage: { width: 100, height: 100, marginBottom: 8 },
  workoutName: { fontSize: 20, fontWeight: "700", color: "#fff" },
  workoutDuration: { fontSize: 16, fontWeight: "600", color: "#a6a6a6" },
  startButton: {
    backgroundColor: "#1ED760",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  startButtonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  timerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#00FF00",
    marginTop: 10,
  },
  columnWrapper: { justifyContent: "space-between", marginBottom: 16 },
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
  workoutsPerformed: { marginTop: 20 },
  workoutsPerformedHeader: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  completedWorkout: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  completedWorkoutName: { fontSize: 18, color: "#fff" },
  completedWorkoutCalories: { fontSize: 16, color: "#FFA500", marginTop: 6 },
  totalCaloriesText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFD700",
    marginTop: 10,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: "#FF4136",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});

export default WorkoutPage;
