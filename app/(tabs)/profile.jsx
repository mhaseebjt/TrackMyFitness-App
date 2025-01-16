import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({
    email: "user@example.com", // Example email
    password: "********", // Hidden password
    height: "170 cm",
    weight: "68 kg",
    fitnessGoal: "Maintain Weight",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userProfile.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Password</Text>
        <Text style={styles.value}>{userProfile.password}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Height</Text>
        <Text style={styles.value}>{userProfile.height}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Weight</Text>
        <Text style={styles.value}>{userProfile.weight}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Fitness Goal</Text>
        <Text style={styles.value}>{userProfile.fitnessGoal}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#1B1A1C",
    padding: 24,
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "700",
    color: "#1ed73c",
  },
  section: {
    marginBottom: 24,
    alignItems: "flex-start",
    backgroundColor: "#1B1A1C",
    paddingVertical: 20,
    padding: 10,
    shadowColor: "#1ED760",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 10,
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  value: {
    fontSize: 18,
    fontWeight: "400",
    color: "#a6a6a6",
    marginTop: 4,
  },
});

export default ProfilePage;
