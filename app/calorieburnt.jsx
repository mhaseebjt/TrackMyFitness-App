import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Svg, Circle, G } from "react-native-svg";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/scripts/firebaseConfig.js";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CIRCLE_SIZE = SCREEN_WIDTH * 0.37;
const STROKE_WIDTH = 10;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CalorieBurntTracker() {
  const [burned, setBurned] = useState(0); // Calories burned
  const [goal, setGoal] = useState(200); // Burn goal

  useEffect(() => {
    const db = getFirestore(app);
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setBurned(data.totalCaloriesBurned ?? 0);
            setGoal(data.burnGoal ?? 200); // Use stored goal if available
          }
        });

        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const remaining = Math.max(0, goal - burned);
  const progress = Math.min(1, burned / goal);
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <View style={styles.container}>
      <Svg height={CIRCLE_SIZE} width={CIRCLE_SIZE}>
        <G rotation="-90" originX={CIRCLE_SIZE / 2} originY={CIRCLE_SIZE / 2}>
          <Circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            stroke="gainsboro"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          <Circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            stroke="#d71e1e"
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.remainingText}>{remaining}</Text>
        <Text style={styles.labelText}>Remaining</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  remainingText: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
  },
  labelText: {
    fontSize: 14,
    color: "#fff",
  },
});
