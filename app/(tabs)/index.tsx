import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import ExpenseBlock from "@/components/ExpenseBlock";
import IncomeBlock from "@/components/Rewards";
import SpendingBlock from "@/components/SpendingBlock";
import ExpenseList from "@/data/expenses.json";
import incomeList from "@/data/rewards.json";
import spendingList from "@/data/spending.json";

const Page = () => {
  const points = 1972;

  // Function to determine which image to display
  const getCoinImage = () => {
    if (points > 5000) {
      return require("@/constants/goldcoin.png")
    } else if (points >= 1000) {
      return require("@/constants/silvercoin.png")
    } else {
      return require("@/constants/bronzecoin.png")
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />
      <View style={[styles.container, { paddingTop: 55 }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 10 }}>
              <Text style={{ color: Colors.white, fontSize: 20 }}>
                Hi <Text style={{ fontWeight: "700" }}>Roary!</Text>
              </Text>
              <Text
                style={{ color: Colors.white, fontSize: 30, fontWeight: "700" }}
              >
                {points}
                <Text style={{ fontSize: 15, fontWeight: "400" }}> points</Text>
              </Text>
            </View>
            <View style={{ paddingVertical: 20, alignItems: "center", right: 15}}>
              <Image source={getCoinImage()} style={styles.coinImage} />
              {/* <Text
               style={{ color: Colors.white, fontSize: 10, fontWeight: "700", top:10}}
               >
                coin status </Text> */}
            </View>
          </View>

          <ExpenseBlock expenseList={ExpenseList} />

          <IncomeBlock incomeList={incomeList} />

          <SpendingBlock spendingList={spendingList} />
        </ScrollView>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
  },
  coinImage: {
    width: 70, // Adjust size as needed
    height: 70, // Adjust size as needed
    resizeMode: "contain",
  },
});
