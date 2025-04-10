import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Notifications = () => {
  // Sample notifications array
  const notifications = [
    {
      id: 1,
      title: "Meal Reminder",
      description: "Time to have your lunch!",
      timestamp: "2025-01-16 12:00",
    },
    {
      id: 2,
      title: "Workout Reminder",
      description: "It's time for your daily workout!",
      timestamp: "2025-01-16 08:00",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Scrollable list of notifications */}
      <ScrollView style={styles.notificationsList}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationDescription}>
              {notification.description}
            </Text>
            <Text style={styles.notificationTime}>
              {notification.timestamp}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f108f",
    padding: 24,
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "700",
    color: "#1ed73c",
  },
  notificationsList: {
    width: "100%",
  },
  notificationItem: {
    borderRadius: 10,
    marginBottom: 24,
    paddingVertical: 20,
    backgroundColor: "#1B1A1C",
    shadowColor: "#333",
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 10,
    width: "100%",
  },
  notificationTitle: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  notificationDescription: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "400",
    color: "#a6a6a6",
    marginTop: 4,
  },
  notificationTime: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: "300",
    color: "#a6a6a6",
    marginTop: 8,
  },
});

export default Notifications;
