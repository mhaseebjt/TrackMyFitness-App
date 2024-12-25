// Dashboard.jsx
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Dropdown state

  const foodItems = [
    { id: "1", name: "Apple" },
    { id: "2", name: "Banana" },
    { id: "3", name: "Chicken Breast" },
    { id: "4", name: "Salmon" },
    { id: "5", name: "Broccoli" },
  ];

  const handleFocus = () => {
    setDropdownVisible(true);
  };

  const handleBlur = () => {
    // Delay hiding dropdown to allow item click
    setTimeout(() => setDropdownVisible(false), 100);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        TrackMyFitness
      </ThemedText>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for food"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isDropdownVisible && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={foodItems.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text style={styles.foodText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.label}>
          Total Calories Goal:
        </ThemedText>
        <ThemedText style={styles.value}>2000 kcal</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.label}>
          Calories Burnt:
        </ThemedText>
        <ThemedText style={styles.value}>650 kcal</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.label}>
          Weight Monitoring:
        </ThemedText>
        <ThemedText style={styles.value}>68 kg</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 24,
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dropdownContainer: {
    position: "absolute",
    top: 45,
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5, // This is for Android
    zIndex: 10, // This is for iOS and web
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  header: {
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
  },
  section: {
    marginBottom: 24,
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: "90%",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: 18,
    fontWeight: "400",
    color: "#222",
    marginTop: 4,
  },
  foodText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Dashboard;
