import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HangoutDetails() {
  const { id } = useLocalSearchParams();
  const [hangout, setHangout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Replace with your actual IP address
  const BASE_URL = "http://localhost:5001/api/hangouts";

  useEffect(() => {
    fetchHangoutDetails();
  }, [id]);

  const fetchHangoutDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      setHangout(data);
    } catch (error) {
      console.error("Error fetching hangout details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1A3C22" />
      </View>
    );
  }

  if (!hangout) {
    return (
      <View style={styles.center}>
        <Text>Hangout not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: hangout.title, headerBackTitle: "Back" }} />
      
      {hangout.image && (
        <Image source={{ uri: hangout.image }} style={styles.image} />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{hangout.title}</Text>
        <Text style={styles.category}>{hangout.category}</Text>
        
        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{hangout.location}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.value}>
            {new Date(hangout.date).toLocaleDateString()} at {new Date(hangout.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{hangout.description || "No description provided."}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Participants</Text>
          <Text style={styles.value}>
            {hangout.acceptedParticipants?.length || 0} / {hangout.maxParticipants} joined
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFCF0" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#1A3C22" },
  category: { fontSize: 14, color: "#666", marginBottom: 20, fontStyle: 'italic' },
  section: { marginBottom: 15 },
  label: { fontSize: 12, color: "#888", textTransform: 'uppercase', marginBottom: 4 },
  value: { fontSize: 16, color: "#333" },
});