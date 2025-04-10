import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.section}>
        <View>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userProfile.email}</Text>
        </View>
      </LinearGradient>

      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.section}>
        <View>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.value}>{userProfile.password}</Text>
        </View>
      </LinearGradient>

      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.section}>
        <View>
          <Text style={styles.label}>Height</Text>
          <Text style={styles.value}>{userProfile.height}</Text>
        </View>
      </LinearGradient>

      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.section}>
        <View>
          <Text style={styles.label}>Weight</Text>
          <Text style={styles.value}>{userProfile.weight}</Text>
        </View>
      </LinearGradient>

      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.section}>
        <View>
          <Text style={styles.label}>Fitness Goal</Text>
          <Text style={styles.value}>{userProfile.fitnessGoal}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#2f108f",
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
    color: "#fff",
  },
  section: {
    borderRadius: 10,
    alignItems: "flex-start",
    paddingVertical: 20,
    padding: 10,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "900",
    color: "#fff",
  },
  value: {
    fontSize: 18,
    fontWeight: "400",
    color: "#fff",
    marginTop: 4,
  },
});

export default ProfilePage;
