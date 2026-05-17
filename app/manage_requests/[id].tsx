import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import style from '../../components/manageRequestStyles'; // Adjust path as needed

export default function ManageRequests() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [hangout, setHangout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isHost = hangout?.host?.toString() === user?._id?.toString();
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

  const handleAction = async (participantId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${hangout._id}/manage-request`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: participantId, // The person who wants to join
          hostId: hangout?.host?._id ,
          action: "accept"
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("User accepted!");
        window.location.reload(); // Refresh to update the UI lists
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("System error accepting user");
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} color="#1A3C22" />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDFCF0' }}>
      <View style={style.headerStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A3C22" />
        </TouchableOpacity>
        <Text style={style.headerStyles.headerTitle}>MANAGE ATTENDEES</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        <Text style={style.sectionStyles.title}>Pending ({hangout?.pendingParticipants?.length || 0})</Text>
        {hangout?.pendingParticipants?.length === 0 ? (
          <Text style={style.sectionStyles.emptyText}>No new requests.</Text>
        ) : (
          hangout?.pendingParticipants.map((user: any) => {
            const imageSource = (typeof user.image === 'string' && user.image.startsWith('data:image'))
                    ? { uri: user.image }
                    : require("../../assets/images/default.png");
            return (
            <View key={user._id} style={style.sectionStyles.card}>
              <View style={style.sectionStyles.userInfo}>
                

                  <Image source={imageSource} style={style.sectionStyles.avatar} />
                <Text style={style.sectionStyles.userName}>{user.name}</Text>
              </View>
              <View style={style.sectionStyles.actions}>
                <TouchableOpacity 
                    style={style.sectionStyles.acceptBtn} 
                    onPress={() => handleAction(user._id)}
                  >
                    <Text style={style.sectionStyles.acceptText}>ACCEPT</Text>
                  </TouchableOpacity>
              </View>
            </View>
          );
        }))}

        <Text style={[style.sectionStyles.title, { marginTop: 30 }]}>Joined ({hangout?.acceptedParticipants?.length || 0})</Text>
        {hangout?.acceptedParticipants?.length === 0 ? (
          <Text style={style.sectionStyles.emptyText}>No one has joined yet.</Text>
        ) : (
          hangout?.acceptedParticipants.map((user: any) => {
            const imageSource = (typeof user.image === 'string' && user.image.startsWith('data:image'))
                    ? { uri: user.image }
                    : require("../../assets/images/default.png");
            return (
            <View key={user._id} style={style.sectionStyles.card}>
              <View style={style.sectionStyles.userInfo}>
                <Image source={imageSource} style={style.sectionStyles.avatar} />


                <Text style={style.sectionStyles.userName}>{user.name}</Text>
              </View>
            </View>)
})
        )}

      </ScrollView>
    </SafeAreaView>
  );
}