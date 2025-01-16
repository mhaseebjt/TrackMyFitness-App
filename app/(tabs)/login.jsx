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
import logo from "../../assets/images/calories-icon.png";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as yup from "yup";
import signup from "../signup.jsx";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@react-navigation/elements";

function HomeScreen() {
  const navigation = useNavigation();
}

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const submit = (values) => {
  console.log(values);
  Alert.alert("Login Successful", `Welcome, ${values.email}`);
};

export default function Login() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TrackMyFitness</Text>

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
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholderTextColor="#999"
              />
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.addButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => navigation.navigate("signup")}
            >
              <Text style={styles.signUp}>
                Don't have an account?{" "}
                <Text style={styles.signUpLink}>Sign Up</Text>
              </Text>
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
    backgroundColor: "#f5f5f5",
    padding: 24,
    alignItems: "center",
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
  logo: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    marginBottom: 20,
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
    paddingBottom: 50,
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#000",
    fontWeight: "bold", // Updated to bold style
  },
  addButton: {
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
  addButtonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUp: {
    color: "#000",
    marginTop: 10,
  },
  signUpLink: {
    color: "#000",
    fontWeight: "bold", // Updated to bold style
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
