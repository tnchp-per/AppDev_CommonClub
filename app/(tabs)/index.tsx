import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { fetchDashboardData } from "../../api/hangoutApi"; // Ensure this points to Port 5001
import { styles } from "../../components/homeStyles";
import HorizontalSection from "../../components/HorizontalSection";
import { useAuth } from "../../context/AuthContext";

// 1. Define the Hangout interface
interface Hangout {
  _id: string;
  title: string;
  location: string;
  description: string;
  image?: string;
  time?: string;
  date: string;
  host: string;
}

export default function HomeScreen() {
  const { user } = useAuth(); 
  
  const [upcoming, setUpcoming] = useState<Hangout[]>([]);
  const [recommended, setRecommended] = useState<Hangout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 3. Function to fetch data from your Node.js Backend
  const loadData = async () => {
    if (!user?.id) return;

    try {
      setError(null);
      // Calls your API (e.g., http://localhost:5001/api/hangouts/dashboard/USER_ID)
      const data = await fetchDashboardData(user.id);
      
      setUpcoming(data.upcoming || []);
      setRecommended(data.recommended || []);
    } catch (err: any) {
      setError("Unable to connect to the club server.");
      console.error("Dashboard Fetch Error:", err.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // 4. Load data when the component mounts or when the user changes
  useEffect(() => {
    loadData();
  }, [user?.id]);

  // 5. Handle Pull-to-Refresh
  const onRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={{ marginTop: 10, color: "#666" }}>Loading your club life...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFCF0" }}>
      <ScrollView 
        contentContainerStyle={[styles.container, { paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {error && (
          <View style={[styles.card, { backgroundColor: '#FFE5E5' }]}>
            <Text style={[styles.errorText, { color: '#D8000C' }]}>{error}</Text>
          </View>
        )}

        {/* Dynamic Header based on AuthContext */}
        <Text style={styles.header}>Welcome Back, {user?.name || "Member"}!</Text>

        {/* SECTION 1: UPCOMING (Events Hong Hosted or Joined) */}
        <HorizontalSection 
          title="Your Upcoming Events" 
          data={upcoming} 
        />

        <View style={{ height: 25 }} />

        {/* SECTION 2: RECOMMENDED (Events hosted by others) */}
        <HorizontalSection 
          title="Recommended for You" 
          data={recommended} 
        />

        {/* Empty State */}
        {upcoming.length === 0 && recommended.length === 0 && !error && (
          <View style={styles.centerContainer}>
            <Text style={{ color: "#999", textAlign: "center", marginTop: 40 }}>
              No hangouts found nearby.{"\n"}Why not create one?
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}