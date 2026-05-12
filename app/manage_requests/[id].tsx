import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import style from '../../components/manageRequestStyles'; // Adjust path as needed

export default function ManageRequests() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [hangout, setHangout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5001/api/hangouts";

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      setHangout(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (participantId: string, action: 'accept' | 'reject' | 'remove') => {
    try {
      const response = await fetch(`${BASE_URL}/${id}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participantId, action }),
      });

      if (response.ok) {
        Alert.alert("Success", `User ${action}ed!`);
        fetchData(); // Refresh both lists
      }
    } catch (error) {
      Alert.alert("Error", "Action failed");
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} color="#1A3C22" />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDFCF0' }}>
      {/* Header */}
      <View style={style.headerStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A3C22" />
        </TouchableOpacity>
        <Text style={style.headerStyles.headerTitle}>MANAGE ATTENDEES</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        {/* SECTION 1: PENDING REQUESTS */}
        <Text style={style.sectionStyles.title}>Pending ({hangout?.pendingParticipants?.length || 0})</Text>
        {hangout?.pendingParticipants?.length === 0 ? (
          <Text style={style.sectionStyles.emptyText}>No new requests.</Text>
        ) : (
          hangout?.pendingParticipants.map((user: any) => (
            <View key={user._id} style={style.sectionStyles.card}>
              <View style={style.sectionStyles.userInfo}>
                <Image source={{ uri: user.image || 'https://via.placeholder.com/40' }} style={style.sectionStyles.avatar} />
                <Text style={style.sectionStyles.userName}>{user.name}</Text>
              </View>
              <View style={style.sectionStyles.actions}>
                <TouchableOpacity onPress={() => handleAction(user._id, 'reject')} style={style.sectionStyles.rejectBtn}>
                  <Ionicons name="close" size={18} color="#FF4B4B" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAction(user._id, 'accept')} style={style.sectionStyles.acceptBtn}>
                  <Ionicons name="checkmark" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* SECTION 2: ACCEPTED PARTICIPANTS */}
        <Text style={[style.sectionStyles.title, { marginTop: 30 }]}>Joined ({hangout?.acceptedParticipants?.length || 0})</Text>
        {hangout?.acceptedParticipants?.length === 0 ? (
          <Text style={style.sectionStyles.emptyText}>No one has joined yet.</Text>
        ) : (
          hangout?.acceptedParticipants.map((user: any) => (
            <View key={user._id} style={style.sectionStyles.card}>
              <View style={style.sectionStyles.userInfo}>
                <Image source={{ uri: user.image || 'https://via.placeholder.com/40' }} style={style.sectionStyles.avatar} />
                <Text style={style.sectionStyles.userName}>{user.name}</Text>
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const headerStyles = {
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1A3C22', letterSpacing: 1 },
};

const sectionStyles = {
  title: { fontSize: 14, fontWeight: 'bold', color: '#1A3C22', textTransform: 'uppercase', marginBottom: 15, opacity: 0.6 },
  card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF', padding: 12, borderRadius: 12, marginBottom: 10 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { fontSize: 15, fontWeight: '500', color: '#1A3C22' },
  actions: { flexDirection: 'row' },
  acceptBtn: { backgroundColor: '#1A3C22', width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  rejectBtn: { backgroundColor: '#FFEBEB', width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FF4B4B' },
  removeBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#f0f0f0' },
  removeBtnText: { color: '#888', fontSize: 12, fontWeight: '600' },
  emptyText: { color: '#999', fontStyle: 'italic', marginBottom: 10 }
};