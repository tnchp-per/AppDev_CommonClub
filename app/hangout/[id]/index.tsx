import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../../components/HangoutDetailStyles"; // Adjust path as needed
import { useAuth } from "../../../context/AuthContext"; // Path to your context

export default function HangoutDetails() {
  const { id } = useLocalSearchParams();
  const [hangout, setHangout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get the logged-in user
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isHangoutImageValid = hangout?.image && (hangout.image.startsWith('http') || hangout.image.startsWith('data:image'));
  const hangoutImageSource = isHangoutImageValid 
  ? { uri: hangout.image } 
  : require('../../../assets/images/logo.png'); // Local fallback
  const isHostImageValid = hangout?.host?.image && (hangout.host.image.startsWith('http') || hangout.host.image.startsWith('data:image'));
  const hostImageSource = isHostImageValid
    ? { uri: hangout.host.image }
    : require('../../../assets/images/default.png'); // Local fallback

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
        fetchHangoutDetails();
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

  const userId = user?._id || user?.id;
  const isHost = hangout?.host?._id === userId || hangout?.host === userId;
  const isAlreadyJoined = hangout?.acceptedParticipants?.some(
    (p: any) => (p._id || p) === userId
  );
  const isPending = hangout?.pendingParticipants?.some(
    (p: any) => (p._id || p) === userId
  );

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
          <Image source={hangoutImageSource} style={styles.image} />  
          {/* DYNAMIC TITLE */}
          <Text style={styles.mainTitle}>{hangout?.title}</Text>
        
          <Text style={styles.dateTimeText}>
            {formattedDate} • {formattedTime}
          </Text>
          
      
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={16} color="#1A3C22" />
            <Text style={styles.locationText}>{hangout?.location}</Text>
          </View>

          <TouchableOpacity 
            style={styles.participantRow} 
            onPress={() => router.push(`/hangout/${id}/participants`)}
          >
            <Text style={styles.participantText}>
              Participants: {hangout?.acceptedParticipants?.length || 0}/{hangout?.maxParticipants || 0}
            </Text>
          </TouchableOpacity> 


          

          <Text style={styles.aboutHeader}>About this event</Text>
          
          {/* DYNAMIC HOST */}
          <TouchableOpacity 
            style={styles.hostContainer} 
            onPress={() => router.push(`/profile/${hangout.host._id || hangout.host}`)}
          >
            {typeof hangout.host.image === 'string' && hangout.host.image.startsWith('data:image') ? (
              <Image 
                source={{ uri: hangout.host.image }} 
                style={styles.hostAvatar} 
              />
            ) : (
              <Image 
                source={hostImageSource} 
                style={styles.hostAvatar} 
              />
            )}
            <View>
              <Text style={styles.hostName}>{hangout.host.name }</Text>
            </View>
          </TouchableOpacity>

          {/* DYNAMIC DESCRIPTION */}
          <Text style={styles.descriptionText}>{hangout?.description}</Text>
        </View>
      </ScrollView>

        <View style={styles.actionContainer}>
          {!user ? (
            // 1. GUEST STATE: Not logged in
            <TouchableOpacity 
              style={[styles.Button, { backgroundColor: '#1A3C22' }]} 
              onPress={() => router.push("/login")}
            >
              <Text style={styles.ButtonText}>LOG IN TO JOIN</Text>
            </TouchableOpacity>
          ) : isHost ? (
            // 1. If user is the HOST
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, width: '100%' }}>
              <TouchableOpacity 
                style={[styles.Button, { flex: 1, backgroundColor: '#1A3C22' }]} 
                onPress={() => router.push(`/manage_requests/${hangout._id}`)}
              >
                <Text style={styles.ButtonText}>REVIEW REQUESTS</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.Button, { flex: 1, backgroundColor: '#1A3C22' }]}
                onPress={() => router.push(`/hangout/${id}/edit`)}
              >
                <Text style={styles.ButtonText}>Edit</Text> 
              </TouchableOpacity>
          
            </View>
          ) : isAlreadyJoined ? (
            // 2. If user is already a PARTICIPANT
            <View style={[styles.Button, { backgroundColor: '#E0E0E0', width: '100%' }]}>
              <Text style={[styles.ButtonText, { color: '#666' }]}>ALREADY JOINED</Text>
            </View>
          ) : isPending ? (
            // 3. If user has a PENDING request
            <View style={[styles.Button, { backgroundColor: '#E0E0E0', width: '100%' }]}>
              <Text style={[styles.ButtonText, { color: '#666' }]}>REQUEST PENDING</Text>
            </View>
          ) : (
            // 4. Default: Show JOIN button
            <TouchableOpacity 
              style={[styles.Button, { width: '100%' }, isSubmitting && { opacity: 0.6 }]} 
              onPress={handleJoinRequest}
              disabled={isSubmitting}
            >
              <Text style={styles.ButtonText}>
                {isSubmitting ? "SENDING..." : "REQUEST TO JOIN"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
          </SafeAreaView>
  );
}