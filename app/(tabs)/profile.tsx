import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Switch,
  TextInput,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { auth } from "@/firebaseConfig"; 
import { onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { Stack, useRouter } from "expo-router";

const Page = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [isSharingData, setIsSharingData] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  // Fetch user information from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "Roary User",
          email: currentUser.email || "",
        });
        setResetEmail(currentUser.email || "");
      } else {
        setUser({ name: "", email: "" });
        setResetEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.navigate("../(auth)/login");
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert("Success", "Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to send password reset email.");
    }
  };

  const toggleDataSharing = (value: boolean) => {
    setIsSharingData(value);
    Alert.alert(
      "Data Sharing",
      value
        ? "You have agreed to share your data."
        : "You have declined to share your data."
    );
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  const handleContactUs = () => {
    const email = "mailto:roaryrewards@fiu.edu";
    Linking.openURL(email).catch(() => {
      Alert.alert("Error", "Unable to open email client.");
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
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
                 {/* Phone */}
                 <View style={styles.infoSection}>
          <Text style={styles.label}>Phone: </Text>
          <View style={styles.textBox}>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </View>

        {/* Birthday */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Birthday:</Text>
          <TouchableOpacity
            style={styles.textBox}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.value}>
              {birthday
                ? birthday.toLocaleDateString()
                : "Select your birthday"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthday || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        {/* Reset Password */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Reset Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor="#B0B0B0"
            value={resetEmail}
            onChangeText={setResetEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
            <Text style={styles.resetButtonText}>Send Reset Email</Text>
          </TouchableOpacity>
        </View>

        {/* Data Sharing Toggle */}
        <View style={[styles.infoSection, styles.toggleContainer]}>
          <Text style={styles.label}>Share My Data</Text>
          <Switch
            value={isSharingData}
            onValueChange={toggleDataSharing}
            thumbColor={isSharingData ? Colors.white : Colors.white}
            trackColor={{ false: Colors.grey, true: Colors.tintColor }}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>

        {/* Contact Us */}
        <View style={styles.contactSection}>
          <Text style={styles.contactText}>
            Having issues?{" "}
            <Text style={styles.contactLink} onPress={handleContactUs}>
              Contact Us
            </Text>
          </Text>
          <Text style={styles.contactText}>Florida International University</Text>
          <Text style={styles.contactText}>RoaryRewards 2024</Text>
        </View>
        
      </ScrollView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
    position: "relative",
  },
  headerText: {
    fontSize: 24,
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
  },
  textBox: {
    backgroundColor: Colors.grey,
    padding: 10,
    borderRadius: 8,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  textInput: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: Colors.yellow,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButtonText: {
    color: Colors.tintColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: Colors.red,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactSection: {
    marginTop: 20,
    alignItems: "center",
  },
  contactText: {
    fontSize: 14,
    color: Colors.white,
    marginTop: 30,
  },
  contactLink: {
    color: Colors.yellow,
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
