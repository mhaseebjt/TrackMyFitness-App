import React, { useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { app } from "@/scripts/firebaseConfig.js";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct import

const auth = getAuth(app);
const db = getFirestore(app);

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

const LoginProfileScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleLogin = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setUserProfile({
          email: user.email,
          password: "********",
          height: `${userData.height} cm`,
          weight: `${userData.weight} kg`, // Make sure this field exists
          fitnessGoal: userData.fitnessGoal,
        });

        await AsyncStorage.setItem(
          "userProfile",
          JSON.stringify({
            email: user.email,
            password: "********",
            height: `${userData.height} cm`,
            weight: `${userData.weight} kg`, // Store weight correctly
            fitnessGoal: userData.fitnessGoal,
          })
        );

        setIsLoggedIn(true);
        Alert.alert("Login Successful", `Welcome back, ${user.email}`);
      } else {
        Alert.alert("Error", "User profile not found in database.");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
      setIsLoggedIn(false);
      await AsyncStorage.removeItem("userProfile"); // Remove profile from AsyncStorage
      Alert.alert("Logged Out", "You have been signed out.");
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  if (isLoggedIn && userProfile) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        {[
          ["Email", userProfile.email],
          ["Password", userProfile.password],
          ["Height", userProfile.height],
          ["Weight", userProfile.weight],
          ["Fitness Goal", userProfile.fitnessGoal],
        ].map(([label, value], idx) => (
          <LinearGradient
            key={idx}
            colors={["#6a11cb", "#2575fc"]}
            style={styles.section}
          >
            <View>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          </LinearGradient>
        ))}

        <TouchableOpacity onPress={handleLogout}>
          <LinearGradient
            colors={["#ff416c", "#ff4b2b"]}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require("@/assets/images/TrackMyFitnessLogo.png")}
      />

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
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

            <TouchableOpacity
              onPress={() => navigation.navigate("Reset Password")}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
              <LinearGradient
                colors={["#6a11cb", "#2575fc"]}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => navigation.navigate("Sign Up")}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f108f",
    padding: 20,
    alignItems: "center",
  },
  headerImage: {
    width: 200,
    height: 50,
    marginTop: 50,
    marginBottom: 100,
    tintColor: "white",
  },
  inputContainer: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#1B1A1C",
    paddingHorizontal: 12,
    marginBottom: 16,
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
    fontWeight: "bold",
  },
  addButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 10,
    marginBottom: 20,
    elevation: 10,
  },
  addButtonText: {
    color: "#fff",
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
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  header: {
    marginTop: 20,
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
    width: "100%",
    elevation: 5,
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
  logoutButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 5,
    elevation: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginProfileScreen;
