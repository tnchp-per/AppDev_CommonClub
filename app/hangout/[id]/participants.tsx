import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

//const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const BASE_URL = "http://localhost:5001/api"; // Use your Mac's IP or

export default function ParticipantsList() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [participants, setParticipants] = useState<any[]>([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        // Make sure your backend .populate('acceptedParticipants')
        const res = await axios.get(`${BASE_URL}/hangouts/${id}`);
        setParticipants(res.data.acceptedParticipants || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, [id]);

  const renderUser = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.userCard}
      onPress={() => router.push(`/profile/${item._id}`)}
    >
      <Image 
        source={item.image ? { uri: item.image } : require('../../../assets/images/default.png')} 
        style={styles.avatar} 
      />
      <View>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userBio} numberOfLines={1}>{item.bio || "Member"}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF9F1' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A3C22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Participants ({participants.length})</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item._id}
        renderItem={renderUser}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No participants yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = {
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: 20,
    backgroundColor: '#FAF9F1',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' as const, color: '#1A3C22' },
  userCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    // Add a slight shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  userName: { fontSize: 16, fontWeight: '600' as const, color: '#1A3C22' },
  userBio: { fontSize: 13, color: '#666', marginTop: 2 },
  emptyText: { textAlign: 'center' as const, marginTop: 50, color: '#888' }
};