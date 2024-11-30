import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ExpenseType } from "@/types";
import Colors from "@/constants/Colors";

const ExpenseBlock = ({ expenseList }: { expenseList: ExpenseType[] }) => {
  const renderItem: ListRenderItem<Partial<ExpenseType>> = ({ item }) => {
    let amount = item.amount.split(".");

    return (
      <View
        style={[
          styles.expenseBlock,
          {
            backgroundColor:
              item.name == "Panda Express"
                ? Colors.blue
                : item.name == "WiCS"
                ? Colors.white
                : Colors.tintColor,
          },
        ]}
      >
        <Text
          style={[
            styles.expenseBlockTxt1,
            {
              color:
                item.name == "Panda Express"
                  ? Colors.black
                  : item.name == "WiCS"
                  ? Colors.black
                  : Colors.white,
            },
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.expenseBlockTxt2,
            {
              color:
                item.name == "Panda Express"
                  ? Colors.black
                  : item.name == "WiCS"
                  ? Colors.black
                  : Colors.white,
            },
          ]}
        >
          {amount[0]} pts.
          <Text style={styles.expenseBlockTxt2Span}>{amount[1]}</Text>
        </Text>
        <View style={styles.expenseBlock3View}>
          <Text
            style={[
              styles.expenseBlockTxt1,
              {
                color:
                  item.name == "Panda Express"
                    ? Colors.black
                    : item.name == "WiCS"
                    ? Colors.black
                    : Colors.white,
              },
            ]}
          >
            {item.percentage} scans
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ paddingVertical: 20 }}>
      <Text style={styles.sectionTitle}>
        My <Text style={{ fontWeight: "700" }}>Top Scans</Text>
      </Text>
      <FlatList
        data={expenseList}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ExpenseBlock;

const styles = StyleSheet.create({
  sectionTitle: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 20,
  },
  expenseBlock: {
    backgroundColor: Colors.tintColor,
    width: 100,
    padding: 15,
    borderRadius: 15,
    marginRight: 20,
    gap: 8,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  expenseBlockTxt1: {
    color: Colors.white,
    fontSize: 14,
  },
  expenseBlockTxt2: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  expenseBlockTxt2Span: {
    fontSize: 12,
    fontWeight: "400",
  },
  expenseBlock3View: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
  },
});
