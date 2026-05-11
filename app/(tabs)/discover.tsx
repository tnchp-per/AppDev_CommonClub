import styles from "@/components/DiscoveryStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Discovery() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "1",
      title: "WORKOUT",
      image: require("../../assets/images/excs.jpg")
    },
    {
      id: "2",
      title: "STUDY SESSION",
      image: require("../../assets/images/work.jpg")
    },
    {
      id: "3",
      title: "CAFE HOPPING",
      image: require("../../assets/images/cafe2.jpg")
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.pageTitle}>DISCOVER</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#042917" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories or events..."
          placeholderTextColor="#A0A0A0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => console.log(`Go to ${category.title}`)}
          >
            {/* ✅ อัปเดตตรงนี้: ลบปีกกาและคำว่า uri ออกไปแล้ว */}
            <Image source={category.image} style={styles.categoryImage} />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryText}>{category.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}