import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Svg, Circle, G } from "react-native-svg";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CIRCLE_SIZE = SCREEN_WIDTH * 0.37;
const STROKE_WIDTH = 10;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CalorieBurntTracker() {
  const [consumed, setConsumed] = useState(450); // Calories consumed
  const [total, setTotal] = useState(500); // Total calories

  const remaining = total - consumed;
  const progress = consumed / total;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <View style={styles.container}>
      <Svg height={CIRCLE_SIZE} width={CIRCLE_SIZE}>
        <G rotation="-90" originX={CIRCLE_SIZE / 2} originY={CIRCLE_SIZE / 2}>
          {/* Background Circle */}
          <Circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            stroke="gainsboro"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />

          {/* Progress Circle */}
          <Circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            stroke="gainsboro" // Orange color for progress
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />

          {/* Remaining Circle */}
          <Circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            stroke="#d71e1e" // Blue color for progress
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset * 1.5} // Adjust for a secondary progress (if needed)
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
