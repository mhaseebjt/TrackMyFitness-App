import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import * as Font from "expo-font";
import hasNotification from "@/app/(tabs)/index.jsx";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/scripts/firebaseConfig.js"; // Import Firebase setup

const App = () => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [foodList, setFoodList] = useState([
    { id: "1", name: "Apple (1 medium)", calories: 95 },
    { id: "2", name: "Banana (1 medium)", calories: 105 },
    { id: "3", name: "Egg (1 large, hard-boiled)", calories: 78 },
    { id: "4", name: "Toast (1 slice, white bread)", calories: 75 },
    { id: "5", name: "Carrot (1 medium)", calories: 25 },
    { id: "6", name: "Broccoli (1 cup, cooked)", calories: 55 },
    { id: "7", name: "Cucumber (1 cup, sliced)", calories: 16 },
    { id: "8", name: "Tomato (1 medium)", calories: 22 },
    { id: "9", name: "Spinach (1 cup, raw)", calories: 7 },
    { id: "10", name: "Potato (1 medium, baked)", calories: 161 },
    { id: "11", name: "Sweet Potato (1 medium, baked)", calories: 103 },
    { id: "12", name: "Avocado (1 medium)", calories: 234 },
    { id: "13", name: "Orange (1 medium)", calories: 62 },
    { id: "14", name: "Strawberries (1 cup, halved)", calories: 49 },
    { id: "15", name: "Blueberries (1 cup)", calories: 84 },
    { id: "16", name: "Grapes (1 cup)", calories: 62 },
    { id: "17", name: "Pineapple (1 cup, chunks)", calories: 82 },
    { id: "18", name: "Watermelon (1 cup, diced)", calories: 46 },
    { id: "19", name: "Peach (1 medium)", calories: 59 },
    { id: "20", name: "Pear (1 medium)", calories: 96 },
    { id: "21", name: "Mango (1 medium)", calories: 135 },
    { id: "22", name: "Cherries (1 cup, without pits)", calories: 97 },
    { id: "23", name: "Chicken Breast (3 oz, cooked)", calories: 142 },
    { id: "24", name: "Salmon (3 oz, cooked)", calories: 175 },
    { id: "25", name: "Turkey Breast (3 oz, cooked)", calories: 135 },
    { id: "26", name: "Tofu (1/2 cup, firm)", calories: 94 },
    { id: "27", name: "Lentils (1 cup, cooked)", calories: 230 },
    { id: "28", name: "Black Beans (1 cup, cooked)", calories: 227 },
    { id: "29", name: "Shrimp (3 oz, cooked)", calories: 84 },
    { id: "30", name: "White Bread (1 slice)", calories: 66 },
    { id: "31", name: "Whole Wheat Bread (1 slice)", calories: 70 },
    { id: "32", name: "Brown Rice (1 cup, cooked)", calories: 215 },
    { id: "33", name: "Quinoa (1 cup, cooked)", calories: 222 },
    { id: "34", name: "Oatmeal (1 cup, cooked)", calories: 147 },
    { id: "35", name: "Pasta (1 cup, cooked)", calories: 221 },
    { id: "36", name: "Bagel (1 medium)", calories: 289 },
    { id: "37", name: "Tortilla (1 medium, flour)", calories: 144 },
    { id: "38", name: "Croissant (1 medium)", calories: 231 },
    { id: "39", name: "English Muffin (1 whole)", calories: 132 },
    { id: "40", name: "Milk (1 cup, whole)", calories: 150 },
    { id: "41", name: "Greek Yogurt (1 cup, plain, non-fat)", calories: 100 },
    { id: "42", name: "Cheddar Cheese (1 oz)", calories: 113 },
    { id: "43", name: "Cottage Cheese (1 cup, low-fat)", calories: 206 },
    { id: "44", name: "Butter (1 tbsp)", calories: 102 },
    { id: "45", name: "Cream Cheese (1 tbsp)", calories: 50 },
    { id: "46", name: "Ice Cream (1/2 cup, vanilla)", calories: 137 },
    { id: "47", name: "Almond Milk (1 cup, unsweetened)", calories: 30 },
  ]);
  const [addedFood, setAddedFood] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");
  const [quantity, setQuantity] = useState(1);
  const [mealPickerVisible, setMealPickerVisible] = useState(false);
  const cancelHide = useRef(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Poppins: require("@/assets/fonts/Poppins.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  // 🔄 Load saved meals on login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setAddedFood({
              Breakfast: data.Breakfast || [],
              Lunch: data.Lunch || [],
              Dinner: data.Dinner || [],
              Snacks: data.Snacks || [],
            });
          }
        } catch (error) {
          console.error("Error loading saved meals:", error);
        }
      } else {
        // ❌ User logged out: Clear meals
        setAddedFood({
          Breakfast: [],
          Lunch: [],
          Dinner: [],
          Snacks: [],
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredFoodList(
        foodList.filter((food) =>
          food.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [searchQuery]);

  const handleDropdownPress = () => {
    cancelHide.current = true;
  };

  const addToMeal = (food) => {
    setAddedFood((prev) => {
      const mealFoods = prev[selectedMeal];
      const existingFoodIndex = mealFoods.findIndex(
        (item) => item.id === food.id
      );

      let updatedMealFoods;
      if (existingFoodIndex !== -1) {
        updatedMealFoods = [...mealFoods];
        updatedMealFoods[existingFoodIndex].count += quantity;
      } else {
        updatedMealFoods = [...mealFoods, { ...food, count: quantity }];
      }

      const newMeals = { ...prev, [selectedMeal]: updatedMealFoods };
      saveMealsToFirestore(newMeals); // Save updated meals
      return newMeals;
    });

    setQuantity(1);
    setDropdownVisible(false);
  };

  const calculateTotalCalories = () => {
    return Object.values(addedFood)
      .flat()
      .reduce((total, food) => total + food.calories * food.count, 0);
  };

  const calculateMealCalories = (meal) => {
    return addedFood[meal].reduce(
      (total, food) => total + food.calories * food.count,
      0
    );
  };

  const saveMealsToFirestore = async (meals) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);

      const mealsData = {
        ...meals,
        totalCalories: Object.values(meals)
          .flat()
          .reduce((total, food) => total + food.calories * food.count, 0),
      };

      try {
        await setDoc(userDocRef, mealsData, { merge: true });
        console.log("Meals saved successfully!");
      } catch (error) {
        console.error("Error saving meals: ", error);
      }
    } else {
      console.log("User not logged in!");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const resetMeals = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);

      const emptyMeals = {
        Breakfast: [],
        Lunch: [],
        Dinner: [],
        Snacks: [],
        totalCalories: 0,
      };

      try {
        await setDoc(userDocRef, emptyMeals, { merge: true });
        setAddedFood({
          Breakfast: [],
          Lunch: [],
          Dinner: [],
          Snacks: [],
        });
        console.log("Meals reset successfully!");
      } catch (error) {
        console.error("Error resetting meals: ", error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!cancelHide.current) {
          setDropdownVisible(false);
        }
        cancelHide.current = false;
      }}
    >
      <View style={styles.container}>
        <Modal
          transparent
          visible={mealPickerVisible}
          animationType="slide"
          onRequestClose={() => setMealPickerVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {["Breakfast", "Lunch", "Dinner", "Snacks"].map((meal) => (
                <TouchableOpacity
                  key={meal}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedMeal(meal);
                    setMealPickerVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{meal}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <LinearGradient
          colors={["#6a11cb", "#2575fc"]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("profile")}>
              <Image
                style={styles.profileIcon}
                source={require("@/assets/images/profile-icon-colored.png")}
              />
            </TouchableOpacity>
            <Image
              style={styles.logo}
              source={require("@/assets/images/TrackMyFitnessLogo.png")}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              {hasNotification ? (
                <Image
                  style={styles.bellIconActive}
                  source={require("@/assets/images/bell-icon-active.png")}
                />
              ) : (
                <Image
                  style={styles.bellIcon}
                  source={require("@/assets/images/bell-icon.png")}
                />
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <Text style={styles.totalCalories}>
          Total Calories: {calculateTotalCalories()}
        </Text>

        <TouchableOpacity style={styles.resetButton} onPress={resetMeals}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for food"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setDropdownVisible(true)}
          />
          {dropdownVisible && (
            <View
              style={styles.dropdownContainer}
              onStartShouldSetResponder={handleDropdownPress}
            >
              {filteredFoodList.map((food) => (
                <View key={food.id} style={styles.dropdownItem}>
                  <Text style={styles.foodText}>
                    {food.name} - {food.calories} cal
                  </Text>
                  <View style={styles.addSection}>
                    <TextInput
                      style={styles.quantityInput}
                      keyboardType="number-pad"
                      value={quantity.toString()}
                      onChangeText={(value) =>
                        setQuantity(Math.max(0, parseInt(value) || 0))
                      }
                    />
                    <TouchableOpacity
                      style={styles.pickerButton}
                      onPress={() => setMealPickerVisible(true)}
                    >
                      <Text style={styles.pickerButtonText}>
                        {selectedMeal}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addToMeal(food)}
                    >
                      <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {["Breakfast", "Lunch", "Dinner", "Snacks"].map((meal) => (
            <View key={meal} style={styles.section}>
              <View style={styles.mealHeader}>
                <Text style={styles.label}>{meal}</Text>
                <Text style={styles.calorieCount}>
                  {calculateMealCalories(meal)} cal
                </Text>
              </View>
              {addedFood[meal].map((food, index) => (
                <Text key={index} style={styles.value}>
                  {food.name} - {food.calories} cal x {food.count}
                </Text>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Poppins",
    backgroundColor: "#2f108f",
    flex: 1,
    padding: 16,
  },
  headerGradient: {
    borderRadius: 10,
    paddingBottom: 16,
    marginBottom: 30,
    marginTop: 25,
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  logo: {
    width: 150,
    height: 30,
    tintColor: "white",
    right: 2,
  },
  profileIcon: {
    width: 40,
    height: 40,
    tintColor: "white",
  },
  bellIconActive: {
    width: 25,
    height: 25,
    alignSelf: "center",
  },
  bellIcon: {
    width: 25,
    height: 25,
  },
  alignflex: {
    marginTop: 20,
    padding: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  headerBackground: {
    position: "static",
    padding: 50,
    alignItems: "center",
  },
  headerText: {
    width: 180,
    height: 20,
    right: 5,
  },
  safeArea: {
    marginVertical: 16,
  },
  searchContainer: {
    borderRadius: 10,
    width: "100%",
    position: "relative",
    zIndex: 10,
  },
  searchBar: {
    borderRadius: 10,
    width: "100%",
    height: 40,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    marginBottom: 16,
    color: "#333333",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dropdownContainer: {
    borderRadius: 10,
    overflow: "visible",
    position: "absolute",
    top: 50,
    width: "100%",
    backgroundColor: "#1B1A1C",
    shadowColor: "#fff",
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 20,
    maxHeight: 400,
  },
  dropdownItem: {
    justifyContent: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  totalCalories: {
    textAlign: "center",
    fontFamily: "Poppins",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
  },
  section: {
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 4,
    alignItems: "flex-start",
    backgroundColor: "#1B1A1C",
    padding: 16,
    shadowColor: "#333",
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 10,
    width: "100%",
  },
  mealHeader: {
    fontWeight: "700",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "900",
    color: "#fff",
  },
  calorieCount: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  value: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
    marginTop: 4,
  },
  foodText: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  addSection: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 5,
  },
  quantityInput: {
    width: 40,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    textAlign: "center",
    marginRight: 10,
    color: "#333333",
    backgroundColor: "#ffffff",
  },
  addButton: {
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addButtonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerButton: {
    borderRadius: 10,
    backgroundColor: "#2f108f",
    paddingVertical: 10,
    paddingHorizontal: 82,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  pickerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalItemText: {
    fontSize: 18,
    color: "#333",
  },
  resetButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginBottom: 10,
    marginTop: -10,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
});

export default App;
