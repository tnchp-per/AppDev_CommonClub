import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from "react-native";
import { fetchDashboardData } from "../../api/hangoutApi";
import { styles } from "../../components/homeStyles";
import { HorizontalSection } from "../../components/HorizontalSection";

// 1. Define the Hangout interface to keep TypeScript happy
interface Hangout {
  _id: string;
  title: string;
  location: string;
  description: string;
  image?: string;
  time?: string;
  date: string;
}

export default function HomeScreen() {
  const [upcoming, setUpcoming] = useState<Hangout[]>([]);
  const [recommended, setRecommended] = useState<Hangout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // REPLACE THIS with a real User ID from your MongoDB 'users' collection
  const TEMP_USER_ID = "65f1234567890abcdef12345"; 

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Call the new dashboard API function
        const data = await fetchDashboardData(TEMP_USER_ID);
        
        setUpcoming(data.upcoming || []);
        setRecommended(data.recommended || []);
        setError(null);
      } catch (err) {
        setError("Could not sync with the club server.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={{ marginTop: 10, color: "#666" }}>Loading your club life...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView 
        contentContainerStyle={[styles.container, { paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {error && (
          <View style={styles.card}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* SECTION 1: UPCOMING (Joined/Hosted by User) */}
        <HorizontalSection 
          title="Your Upcoming Events" 
          data={upcoming} 
        />

        {/* Space between sections */}
        <View style={{ height: 25 }} />

        {/* SECTION 2: RECOMMENDED (New events to discover) */}
        <HorizontalSection 
          title="Recommended for You" 
          data={recommended} 
        />

        {/* Empty State Feedback */}
        {upcoming.length === 0 && recommended.length === 0 && (
          <View style={styles.centerContainer}>
            <Text style={{ color: "#999", textAlign: "center", marginTop: 40 }}>
              It's quiet in here...{"\n"}Try creating an event in Postman!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}