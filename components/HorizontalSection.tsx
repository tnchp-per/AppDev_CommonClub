// components/HorizontalSection.tsx
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import hangoutCardStyle from "../components/HangoutCardStyle";

interface Hangout {
  _id: string;
  title: string;
  location: string;
  image?: string;
  time?: string;
}

interface Props {
  title: string;
  data: Hangout[];
}

export const HorizontalSection = ({ title, data }: Props) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <View key={item._id} style={hangoutCardStyle.card}>
            <Image 
              source={{ uri: item.image || '../../assets/images/logo.png' }} 
              style={hangoutCardStyle.image} 
            />
            <Text style={hangoutCardStyle.title}>{item.title}</Text>
            <Text style={hangoutCardStyle.location}>{item.location}</Text>
            <Text style={hangoutCardStyle.time}>{item.time || "Time TBD"}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: 4,
  },
});