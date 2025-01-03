// Nutrition.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const App = () => {
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredFoodList(
        foodList.filter((food) =>
          food.name.toLowerCase().includes(query.toLowerCase())
        )
      );
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
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
    setQuantity(1); // Reset quantity after adding
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

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        TrackMyFitness
      </ThemedText>
      <ThemedText type="subtitle" style={styles.totalCalories}>
        Total Calories: {calculateTotalCalories()}
      </ThemedText>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for food"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={handleSearch}
          onFocus={() => setDropdownVisible(true)}
        />
        {dropdownVisible && (
          <View style={styles.dropdownContainer}>
            {filteredFoodList.map((food) => (
              <View key={food.id} style={styles.dropdownItem}>
                <ThemedText style={styles.foodText}>
                  {food.name} - {food.calories} cal
                </ThemedText>
                <View style={styles.addSection}>
                  <TextInput
                    style={styles.quantityInput}
                    keyboardType="number-pad"
                    value={quantity.toString()}
                    onChangeText={(value) =>
                      setQuantity(Math.max(1, parseInt(value) || 1))
                    }
                  />
                  <Picker
                    selectedValue={selectedMeal}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedMeal(itemValue)}
                  >
                    <Picker.Item label="Breakfast" value="Breakfast" />
                    <Picker.Item label="Lunch" value="Lunch" />
                    <Picker.Item label="Dinner" value="Dinner" />
                    <Picker.Item label="Snacks" value="Snacks" />
                  </Picker>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToMeal(food)}
                  >
                    <ThemedText style={styles.addButtonText}>+</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
      {["Breakfast", "Lunch", "Dinner", "Snacks"].map((meal) => (
        <ThemedView key={meal} style={styles.section}>
          <View style={styles.mealHeader}>
            <ThemedText type="subtitle" style={styles.label}>
              {meal}
            </ThemedText>
            <ThemedText type="subtitle" style={styles.calorieCount}>
              {calculateMealCalories(meal)} cal
            </ThemedText>
          </View>
          {addedFood[meal].map((food, index) => (
            <ThemedText key={index} style={styles.value}>
              {food.name} - {food.calories} cal x {food.count}
            </ThemedText>
          ))}
        </ThemedView>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 24,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333333",
    textAlign: "center",
    marginBottom: 16,
  },
  searchContainer: {
    width: "100%",
    position: "relative",
    zIndex: 10,
  },
  searchBar: {
    width: "100%",
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    color: "#333333",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dropdownContainer: {
    position: "absolute",
    top: 50,
    width: "95%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 20,
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  totalCalories: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "600",
    color: "#333333",
  },
  section: {
    marginBottom: 24,
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "95%",
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  calorieCount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555555",
  },
  value: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555555",
    marginTop: 4,
  },
  foodText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  addSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  picker: {
    flex: 1,
    height: 40,
    color: "#333333",
    backgroundColor: "#ffffff",
    borderRadius: 8,
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
});

export default App;
