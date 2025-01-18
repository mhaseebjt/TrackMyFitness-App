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
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

const submit = (values) => {
  console.log(values);
  Alert.alert("Login Successful", `Welcome, ${values.email}`);
};

export default function ResetPassword() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.header}
        source={require("@/assets/images/TrackMyFitnessLogo.png")}
      />

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={submit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholderTextColor="#999"
              />
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("Confirmation")}
              disabled={!isValid}
            >
              <Text style={styles.addButtonText}>Confirm</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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
    color: "#fff",
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
});