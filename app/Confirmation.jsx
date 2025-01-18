import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Confirmation() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>✅ Success</Text>
        <Text style={styles.value}>A link has been sent to your Email.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1A1C",
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: 200,
    height: 50,
    marginTop: 10,
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#1B1A1C",
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: "#1ED760",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 10,
  },
  icon: {
    marginRight: 10,
    color: "#555555",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  forgotPassword: {
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#a6a6a6",
    fontWeight: "bold", // Updated to bold style
  },
  addButton: {
    backgroundColor: "#1ed73c",
    paddingVertical: 8,
    paddingHorizontal: 30,
    marginTop: 50,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addButtonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUp: {
    color: "#a6a6a6",
    marginTop: 10,
  },
  signUpLink: {
    color: "#fff",
    fontWeight: "bold", // Updated to bold style
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  section: {
    marginTop: 50,
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
    marginTop: 10,
  },
});
