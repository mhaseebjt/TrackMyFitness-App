import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState(""); // Initialize with an empty string

  const handleSignUp = () => {
    if (!email || !password || !height || !weight || !goal) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    console.log("Signing up with", { email, password, height, weight, goal });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Your Account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={goal}
          onValueChange={(itemValue) => setGoal(itemValue)}
          style={styles.picker}
        >
          <Picker.Item
            label="Select Your Fitness Goal"
            value=""
            enabled={false}
          />
          <Picker.Item label="Weight Gain" value="Weight Gain" />
          <Picker.Item label="Weight Loss" value="Weight Loss" />
          <Picker.Item label="Maintain Weight" value="Maintain Weight" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    paddingTop: 150,
    paddingBottom: 75,
    fontSize: 28,
    fontWeight: "700",
    color: "#333333",
    textAlign: "center",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  dropdownContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  picker: {
    flex: 1,
    width: "100%",
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  signUpButtonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
