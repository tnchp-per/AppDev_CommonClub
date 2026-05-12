import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext"; // Path to your context



export default function HangoutDetails() {
  const { id } = useLocalSearchParams();
  const [hangout, setHangout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get the logged-in user
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Replace with your actual IP address
  const BASE_URL = "http://localhost:5001/api/hangouts";

  useEffect(() => {
    fetchHangoutDetails();
  }, [id]);

  const handleJoinRequest = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to join.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`http://192.168.1.XX:5001/api/hangouts/${id}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id || user._id }), // Handle different ID naming
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Request sent! Wait for the host to accept.");
      } else {
        Alert.alert("Notice", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Join Error:", error);
      Alert.alert("Error", "Could not connect to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <TouchableOpacity 
          style={[styles.joinButton, isSubmitting && { opacity: 0.7 }]} 
          onPress={handleJoinRequest}
          disabled={isSubmitting}
        >
          <Text style={styles.joinButtonText}>
            {isSubmitting ? "SENDING..." : "REQUEST TO JOIN"}
          </Text>
        </TouchableOpacity>
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
  joinButton: { backgroundColor: "#1A3C22", paddingVertical: 14, borderRadius: 10, marginTop: 10 },
  joinButtonText: { color: "#FFF", fontWeight: "bold", textAlign: "center" },
});