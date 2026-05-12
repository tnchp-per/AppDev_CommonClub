import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../components/HangoutDetailStyles"; // Adjust path as needed
import { useAuth } from "../../context/AuthContext"; // Path to your context



export default function HangoutDetails() {
  const { id } = useLocalSearchParams();
  const [hangout, setHangout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get the logged-in user
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isImageValid = hangout?.image && (hangout.image.startsWith('http') || hangout.image.startsWith('data:image'));
  const imageSource = isImageValid 
  ? { uri: hangout.image } 
  : require('../../assets/images/logo.png'); // Local fallback

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
      const response = await fetch(`http://localhost:5001/api/hangouts/${id}/join`, {
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

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  if (!hangout) {
    return (
      <View style={styles.center}>
        <Text>Hangout not found.</Text>
      </View>
    );
  };

  const eventDate = hangout?.date ? new Date(hangout.date) : null;
  const formattedDate = eventDate?.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
  const formattedTime = eventDate?.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER SECTION */}
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1A3C22" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerTitle}>EVENT DESCRIPTION</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        
        <View>
          <Image source={imageSource} style={styles.image} />  
          {/* DYNAMIC TITLE */}
          <Text style={styles.mainTitle}>{hangout?.title}</Text>
        
          <Text style={styles.dateTimeText}>
            {formattedDate} • {formattedTime}
          </Text>
          
      
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={16} color="#1A3C22" />
            <Text style={styles.locationText}>{hangout?.location}</Text>
          </View>
        
          <Text style={styles.participantText}>
            Participant: {hangout?.acceptedParticipants?.length || 0}/{hangout?.maxParticipants || 0}
          </Text>

          <Text style={styles.aboutHeader}>About this event</Text>
          
          {/* DYNAMIC HOST */}
          <View style={styles.hostRow}>
            <Image 
               source={{ uri: hangout?.host?.image }} 
               style={styles.hostAvatar} 
            />
            <Text style={styles.hostName}>{hangout?.host?.name || "Host"}</Text>
          </View>

          {/* DYNAMIC DESCRIPTION */}
          <Text style={styles.descriptionText}>{hangout?.description}</Text>
        </View>
      </ScrollView>

      {/* STICKY JOIN BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.Button, isSubmitting && { opacity: 0.6 }]} 
          onPress={handleJoinRequest}
          disabled={isSubmitting}
        >
          <Text style={styles.ButtonText}>
            {isSubmitting ? "SENDING..." : "REQUEST TO JOIN"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}