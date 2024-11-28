import { Image, View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { Link, Stack } from "expo-router";

import { useCameraPermissions } from "expo-camera";
import React from "react";
import Colors from "@/constants/Colors";

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Image
              source={require("@/constants/roaryrewards-light.png")}
              style={styles.userImg}
          />
      <Text style={styles.title}>Scan your QR code here!</Text>
      <View style={{ gap: 5 }}>
        <Pressable onPress={requestPermission}>
          <Text style={styles.buttonStyle}>Request Permissions</Text>
        </Pressable>
        <Link href={"/scanner"} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text
              style={[
                styles.buttonStyle,
                { opacity: !isPermissionGranted ? 0.5 : 1 },
              ]}
            >
              Scan Code
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.black,
    justifyContent: "space-around",
    paddingVertical: 80,
  },
  title: {
    color: "white",
    fontSize: 25,
    textAlign:"center",
    fontWeight: 700
  },
  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 80
  },
  userImg: { 
    height: 50, 
    width: 120, 
    borderRadius: 10,
  },
});
