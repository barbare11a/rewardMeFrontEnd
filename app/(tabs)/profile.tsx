import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isGrubhubConnected, setIsGrubhubConnected] = useState(false);

  // Mock user data
  const [user, setUser] = useState({
    username: "JohnDoe",
    name: "john doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
  });

  // Temporary state to hold editable values
  const [tempUser, setTempUser] = useState(user);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
    Alert.alert("Profile Updated", "Your profile changes have been saved.");
  };

  const handleCancel = () => {
    setTempUser(user); // Revert changes
    setIsEditing(false);
  };

  const handleConnectGrubhub = () => {
    Alert.alert(
      "Connect Grubhub Account",
      "You will be redirected to log in with Grubhub.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", onPress: () => setIsGrubhubConnected(true) },
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header with Edit Icon */}
        <View style={styles.header}>
  <Text style={styles.headerText}>Profile</Text>
  {!isEditing && (
    <TouchableOpacity onPress={handleEditProfile} style={styles.editIcon}>
      <FontAwesome name="pencil" size={20} color={Colors.white} />
    </TouchableOpacity>
  )}
</View>


        {/* Username */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Username:</Text>
          {isEditing ? (
            <TextInput
              style={styles.textBox}
              value={tempUser.username}
              onChangeText={(text) => setTempUser({ ...tempUser, username: text })}
            />
          ) : (
            <View style={styles.textBox}>
              <Text style={styles.value}>{user.username}</Text>
            </View>
          )}
        </View>
                {/* Name */}
                <View style={styles.infoSection}>
          <Text style={styles.label}>Name:</Text>
          {isEditing ? (
            <TextInput
              style={styles.textBox}
              value={tempUser.name}
              onChangeText={(text) => setTempUser({ ...tempUser, name: text })}
            />
          ) : (
            <View style={styles.textBox}>
              <Text style={styles.value}>{user.username}</Text>
            </View>
          )}
        </View>

        {/* Email */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Email:</Text>
          {isEditing ? (
            <TextInput
              style={styles.textBox}
              value={tempUser.email}
              onChangeText={(text) => setTempUser({ ...tempUser, email: text })}
            />
          ) : (
            <View style={styles.textBox}>
              <Text style={styles.value}>{user.email}</Text>
            </View>
          )}
        </View>

        {/* Phone Number */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Phone Number:</Text>
          {isEditing ? (
            <TextInput
              style={styles.textBox}
              value={tempUser.phone}
              onChangeText={(text) => setTempUser({ ...tempUser, phone: text })}
            />
          ) : (
            <View style={styles.textBox}>
              <Text style={styles.value}>{user.phone}</Text>
            </View>
          )}
        </View>

        {/* Grubhub Connection */}
        <View style={styles.infoSection}>
          {/* <Text style={styles.label}>Grubhub Account:</Text> */}
          {isGrubhubConnected ? (
            <Text style={styles.connectedText}>Connected</Text>
          ) : (
            <TouchableOpacity style={styles.connectButton} onPress={handleConnectGrubhub}>
              <Text style={styles.buttonText}>Connect Grubhub</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Save and Cancel Buttons */}
        {isEditing && (
          <View style={styles.editButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => console.log("Logged out!")}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </>
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
  connectedText: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  connectButton: {
    backgroundColor: "#FF8000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  editButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: "grey",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "45%",
  },
  saveButton: {
    backgroundColor: Colors.blue,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "45%",
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
