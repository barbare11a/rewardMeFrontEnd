import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Linking } from "react-native";
import Colors from "@/constants/Colors"; 
import restaurantData from "@/data/restaurants.json"; 
import { Stack } from "expo-router";
import images from "@/constants/images";

type ShopData = {
  id: string;
  name: string;
  category: string;
  image: string;
  grubhubLink: string;
  discountCodes?: {
    code: string;
    pointsRequired: number;
    status: string;
  }[];
};

const typedRestaurantData = restaurantData as ShopData[];


const categories = ["All", "Food & Drinks", "Student Orgs"];

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredShops =
  selectedCategory === "All"
    ? typedRestaurantData
    : typedRestaurantData.filter((shop) => shop.category === selectedCategory);

  const handlePress = (link: string) => {
    Linking.openURL(link).catch((err) => {
      console.error("Failed to open link: ", err);
    });
  };
  const getImageSource = (imageName: string) => {
    return images[imageName] || null; 
  };

  const renderCategoryButton = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.categoryTextActive,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderShopCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePress(item.grubhubLink)}
    >
  {item.image && (
      <Image
        source={getImageSource(item.image)}
        style={styles.image}
      />
    )}
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Shops</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category) => renderCategoryButton(category))}
        </View>
        <FlatList
          data={filteredShops}
          keyExtractor={(item) => item.id}
          renderItem={renderShopCard}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 16,
    paddingTop: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 26,
    color: Colors.white,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    marginHorizontal: 4,
  },
  categoryButtonActive: {
    backgroundColor: Colors.yellow,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.tintColor,
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  grid: {
    justifyContent: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 12,
    borderRadius: 30,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.tintColor,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#777",
  },
});
