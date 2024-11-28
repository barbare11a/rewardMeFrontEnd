import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { AntDesign, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.wrapper}
      >
        <View style={styles.userInfoWrapper}>
          <Image
              source={require("@/constants/roaryrewards-light.png")}
              style={styles.userImg}
          />
          <View style={styles.userTxtWrapper}>
            {/* <Text style={[styles.userText, { fontSize: 12 }]}>Hi, </Text> */}
            {/* <Text style={[styles.userText, { fontSize: 16 }]}>
              Hi <Text style={styles.boldText}>Username!</Text>
            </Text> */}
          </View>
        </View>
        {/* <TouchableOpacity
          onPress={() => {}}
          //  style={styles.btnWrapper}
        >
          <Text style={styles.btnText}>
          <FontAwesome name="gear" size={20} />
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.black, 
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  userInfoWrapper: { 
    flexDirection: "row", 
    alignItems: "center", 
  },
  userImg: { 
    height: 110, 
    width: 120, 
    borderRadius: 30,
  },
  userTxtWrapper: {
    marginLeft:10,
  },
  userText: {
    color: Colors.white,
  },
  boldText: {
    fontWeight:'700',
  },
  btnWrapper: {
    borderColor: "#666",
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
  },
  btnText: { 
    color: Colors.white, 
    fontSize: 12,
  },
});
