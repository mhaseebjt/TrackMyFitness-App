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
  FlatList,
} from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import hasNotification from "@/app/(tabs)/index.jsx";
import { LinearGradient } from "expo-linear-gradient";

const App = () => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [foodList, setFoodList] = useState([
    { id: "1", name: "Apple", calories: 95 },
    { id: "2", name: "Banana", calories: 105 },
    { id: "3", name: "Egg", calories: 78 },
    { id: "4", name: "Toast", calories: 75 },
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
  const [mealPickerVisible, setMealPickerVisible] = useState(false); // Modal state
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

      if (existingFoodIndex !== -1) {
        const updatedMealFoods = [...mealFoods];
        updatedMealFoods[existingFoodIndex].count += quantity;
        return { ...prev, [selectedMeal]: updatedMealFoods };
      }

      return {
        ...prev,
        [selectedMeal]: [...mealFoods, { ...food, count: quantity }],
      };
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

  if (!fontsLoaded) {
    return null;
  }

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
        {/* Modal for Meal Picker */}
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
              <Image
                style={styles.bellIcon}
                source={
                  hasNotification
                    ? require("@/assets/images/bell-icon-active.png")
                    : require("@/assets/images/bell-icon.png")
                }
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <Text style={styles.totalCalories}>
          Total Calories: {calculateTotalCalories()}
        </Text>
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
});

export default App;
