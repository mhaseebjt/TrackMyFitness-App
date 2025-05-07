import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { signUpUser } from "@/scripts/firebaseAuth"; // Import Firebase signup logic

const loginValidationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  height: yup.number().min(50).max(250).required("Height is required"),
  weight: yup.number().min(20).max(300).required("Weight is required"),
  fitnessGoal: yup.string().required("Fitness goal is required"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  const submit = async (values) => {
    try {
      await signUpUser(values);
      Alert.alert("Signup Successful", `Welcome, ${values.email}`);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    }
  };

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
          fitnessGoal: "",
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
            <InputField
              icon="mail-outline"
              placeholder="Email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            <ErrorText error={errors.email} touched={touched.email} />

            <InputField
              icon="lock-closed-outline"
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              toggleEye={() => setShowPassword(!showPassword)}
              showEyeIcon={true}
              eyeVisible={showPassword}
            />
            <ErrorText error={errors.password} touched={touched.password} />

            <InputField
              icon="lock-closed-outline"
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              toggleEye={() => setShowConfirmPassword(!showConfirmPassword)}
              showEyeIcon={true}
              eyeVisible={showConfirmPassword}
            />
            <ErrorText
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <InputField
              icon="walk-outline"
              placeholder="Height (in cm)"
              keyboardType="numeric"
              value={values.height}
              onChangeText={handleChange("height")}
              onBlur={handleBlur("height")}
            />
            <ErrorText error={errors.height} touched={touched.height} />

            <InputField
              icon="fitness-outline"
              placeholder="Weight (in kg)"
              keyboardType="numeric"
              value={values.weight}
              onChangeText={handleChange("weight")}
              onBlur={handleBlur("weight")}
            />
            <ErrorText error={errors.weight} touched={touched.weight} />

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
            <ErrorText
              error={errors.fitnessGoal}
              touched={touched.fitnessGoal}
            />

            <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
              <LinearGradient
                colors={["#6a11cb", "#2575fc"]}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Sign Up</Text>
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

const InputField = ({
  icon,
  placeholder,
  secureTextEntry,
  keyboardType,
  value,
  onChangeText,
  onBlur,
  toggleEye,
  showEyeIcon,
  eyeVisible,
}) => (
  <View style={styles.inputContainer}>
    <Icon name={icon} size={20} style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      placeholderTextColor="#999"
    />
    {showEyeIcon && (
      <TouchableOpacity style={styles.eyeIcon} onPress={toggleEye}>
        <Icon
          name={eyeVisible ? "eye-off-outline" : "eye-outline"}
          size={20}
          color="#555"
        />
      </TouchableOpacity>
    )}
  </View>
);

const ErrorText = ({ error, touched }) =>
  error && touched ? <Text style={styles.errorText}>{error}</Text> : null;

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
