import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker"; // Import the Picker component

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  height: yup
    .number()
    .min(50, "Height must be at least 50 cm")
    .max(250, "Height cannot exceed 250 cm")
    .required("Height is required"),
  weight: yup
    .number()
    .min(20, "Weight must be at least 20 kg")
    .max(300, "Weight cannot exceed 300 kg")
    .required("Weight is required"),
  fitnessGoal: yup.string().required("Fitness goal is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Incorrect Password")
    .required("Confirm Password is required"),
});

const submit = (values) => {
  console.log(values);
  Alert.alert("Signup Successful", `Welcome, ${values.email}`);
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        style={styles.header}
        source={require("@/assets/images/TrackMyFitnessLogo.png")}
      />

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          height: "",
          weight: "",
          fitnessGoal: "", // Initial value for fitness goal
        }}
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

            {/* Password Input with Eye Icon */}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#555"
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Confirm Password Input with Eye Icon */}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#555"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            {/* Height Input */}
            <View style={styles.inputContainer}>
              <Icon name="walk-outline" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Height (in cm)"
                keyboardType="numeric"
                onChangeText={handleChange("height")}
                onBlur={handleBlur("height")}
                value={values.height}
                placeholderTextColor="#999"
              />
            </View>
            {errors.height && touched.height && (
              <Text style={styles.errorText}>{errors.height}</Text>
            )}

            {/* Weight Input */}
            <View style={styles.inputContainer}>
              <Icon name="fitness-outline" size={20} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Weight (in kg)"
                keyboardType="numeric"
                onChangeText={handleChange("weight")}
                onBlur={handleBlur("weight")}
                value={values.weight}
                placeholderTextColor="#999"
              />
            </View>
            {errors.weight && touched.weight && (
              <Text style={styles.errorText}>{errors.weight}</Text>
            )}

            {/* Fitness Goal Dropdown */}
            <View style={styles.inputContainer}>
              <Icon name="barbell-outline" size={20} style={styles.icon} />
              <Picker
                selectedValue={values.fitnessGoal}
                onValueChange={handleChange("fitnessGoal")}
                style={styles.picker}
              >
                <Picker.Item label="Select Fitness Goal" value="" />
                <Picker.Item label="Gain Weight" value="Gain Weight" />
                <Picker.Item label="Maintain Weight" value="Maintain Weight" />
                <Picker.Item label="Lose Weight" value="Lose Weight" />
              </Picker>
            </View>
            {errors.fitnessGoal && touched.fitnessGoal && (
              <Text style={styles.errorText}>{errors.fitnessGoal}</Text>
            )}

            <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
              <LinearGradient
                colors={["#6a11cb", "#2575fc"]}
                style={styles.addButton}
              >
                <Text
                  style={styles.addButtonText}
                  onPress={() => navigation.goBack()}
                >
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.signUp}>
                Already Have an Account?{" "}
                <Text style={styles.signUpLink}>Login</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#2f108f",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: 200,
    height: 50,
    marginTop: 10,
    marginBottom: 50,
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
    shadowColor: "#333",
    shadowOffset: { width: 1, height: 0 },
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
  eyeIcon: {
    position: "absolute",
    right: 12,
  },
  picker: {
    flex: 1,
    color: "#fff",
  },
  addButton: {
    borderRadius: 10,
    backgroundColor: "#1ed73c",
    paddingVertical: 8,
    paddingHorizontal: 30,
    marginTop: 30,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    marginBottom: 80,
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
});
