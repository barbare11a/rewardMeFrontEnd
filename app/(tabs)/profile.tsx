import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { auth } from "@/firebaseConfig"; // Import Firebase config
import { onAuthStateChanged, signOut } from "firebase/auth";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  // Fetch user information from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "Anonymous User",
          email: currentUser.email || "",
        });
      } else {
        setUser({ name: "", email: "" });
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged Out", "You have been logged out.");
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Edit Icon */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editIcon}>
            <FontAwesome name="pencil" size={20} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>

      {/* Name */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Name:</Text>
        <View style={styles.textBox}>
          <Text style={styles.value}>{user.name}</Text>
        </View>
      </View>

      {/* Email */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Email:</Text>
        <View style={styles.textBox}>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.black,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
    position: "relative",
  },
  editIcon: {
    position: "absolute",
    right: 10,
  },
  headerText: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
    color: Colors.white,
  },
  infoSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 5,
  },
  textBox: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: Colors.red,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
