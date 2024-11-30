import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { IncomeType } from "@/types";
import { DollarIcon, WalletAddMoneyIcon, WalletCardIcon } from "@/constants/Icons";
import { Feather } from "@expo/vector-icons";
import * as Linking from "expo-linking";

const RewardsBlock = ({ incomeList }: { incomeList: IncomeType[] }) => {
  const handlePress = (link: string | undefined) => {
    if (link) {
      Linking.openURL(link).catch(() =>
        Alert.alert("Error", "Failed to open the link")
      );
    } else {
      Alert.alert("No Link", "This reward does not have a link.");
    }
  };

  const renderItem: ListRenderItem<IncomeType> = ({ item }) => {
    let icon = <DollarIcon width={22} height={22} color={Colors.white} />;
    if (item.name == "Freelancing") {
      icon = <WalletCardIcon width={22} height={22} color={Colors.white} />;
    } else if (item.name == "Interest") {
      icon = <WalletAddMoneyIcon width={22} height={22} color={Colors.white} />;
    }

    let amount = item.amount.split(".");
    return (
      <TouchableOpacity onPress={() => handlePress(item.link)}>
        <View
          style={{
            backgroundColor: Colors.grey,
            padding: 20,
            borderRadius: 20,
            marginRight: 15,
            width: 150,
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderColor: "#666",
                borderWidth: 1,
                borderRadius: 50,
                padding: 5,
                alignSelf: "flex-start",
              }}
            >
              {icon}
            </View>
            <Feather name="more-horizontal" size={20} color={Colors.white} />
          </View>
          <Text style={{ color: Colors.white }}>{item.name}</Text>
          <Text
            style={{ color: Colors.white, fontSize: 18, fontWeight: "600" }}
          >
            {amount[0]} points
            <Text style={{ fontSize: 12, fontWeight: "400" }}>{amount[1]}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={{ color: Colors.white, fontSize: 16, marginBottom: 20 }}>
        My <Text style={{ fontWeight: "700" }}>Rewards</Text>
      </Text>
      <FlatList
        data={incomeList}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default RewardsBlock;

const styles = StyleSheet.create({});
