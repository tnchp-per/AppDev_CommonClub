import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fetchAllHangouts, fetchDashboardData } from "../../api/hangoutApi";
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
  const router = useRouter();
  
  const [upcoming, setUpcoming] = useState<Hangout[]>([]);
  const [recommended, setRecommended] = useState<Hangout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Logic to load data based on Auth status
  const loadData = async () => {
    try {
      setIsLoading(true); // Ensure loading shows
      setError(null);

      console.log("Current User ID:", user?.id); // Debug check

      if (user?.id) {
        const data = await fetchDashboardData(user.id);
        setUpcoming(data.upcoming || []);
        setRecommended(data.recommended || []);
      } else {
        // Ensure this function name matches what is in your hangoutApi.js
        const allEvents = await fetchAllHangouts(); 
        console.log("Fetched all events:", allEvents?.length);
        
        setUpcoming([]); 
        setRecommended(allEvents || []);
      }
    } catch (err: any) {
      // CHANGE THIS: Let's see what the actual error is!
      setError(`Connection Error: ${err.message}`);
      console.error("Home Load Error Detail:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  useEffect(() => {
    loadData();
  }, [user?.id]);

  const onRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={{ marginTop: 10, color: "#666" }}>Loading club life...</Text>
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
        {/* Error Banner */}
        {error && (
          <View style={[styles.card, { backgroundColor: '#FFE5E5', marginBottom: 15 }]}>
            <Text style={{ color: '#D8000C', textAlign: 'center' }}>{error}</Text>
          </View>
        )}

        {/* Dynamic Header */}
        <View style={{ marginBottom: 20, marginLeft: 10 }}>
          <Text style={styles.header}>
            {user ? `Welcome Back, ${user.name}!` : "Explore the Club!"}
          </Text>
          
          {!user && (
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={{ color: "#FF6B6B", fontWeight: "600", fontSize: 16, marginTop: 4 }}>
                Sign in to join or host events →
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* SECTION 1: UPCOMING (Only show for logged in users with events) */}
        {user && upcoming.length > 0 && (
          <>
            <HorizontalSection 
              title="Your Upcoming Events" 
              data={upcoming} 
            />
            <View style={{ height: 25 }} />
          </>
        )}

        {/* SECTION 2: DISCOVER/RECOMMENDED (Visible to everyone) */}
        <HorizontalSection 
          title={user ? "Recommended for You" : "All Hangouts"} 
          data={recommended} 
        />

        {/* Empty State for Guests or New Users */}
        {upcoming.length === 0 && recommended.length === 0 && !error && (
          <View style={{ marginTop: 60, alignItems: 'center' }}>
            <Text style={{ color: "#999", textAlign: "center" }}>
              The club is quiet right now.{"\n"}
              {user ? "Why not create the first event?" : "Login and start the party!"}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button: Only for logged-in users */}
      {user && (
        <TouchableOpacity 
          style={{
            position: 'absolute',
            right: 20,
            bottom: 30,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: '#FF6B6B',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
          onPress={() => router.push("/create")}
        >
          <Text style={{ color: '#fff', fontSize: 28, lineHeight: 32 }}>+</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}