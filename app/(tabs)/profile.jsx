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
    flex: 1,
    backgroundColor: "#f5f5f5",
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
    color: "#333",
  },
  section: {
    marginBottom: 24,
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: "90%",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: 18,
    fontWeight: "400",
    color: "#222",
    marginTop: 4,
  },
});

export default ProfilePage;
