import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import style from "../../../components/manageRequestStyles";

const BASE_URL = "http://localhost:5001/api";

export default function ParticipantsList() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [host, setHost] = useState<any>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/hangouts/${id}`);
        setParticipants(res.data.acceptedParticipants || []);
        setHost(res.data.host);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, [id]);



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF9F1' }}>
      <View style={style.sectionStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A3C22" />
        </TouchableOpacity>
        <Text style={style.sectionStyles.headerTitle}>Participants ({participants.length})</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>

        <Text style={style.sectionStyles.title2}>Host</Text>
        <TouchableOpacity
          style={style.sectionStyles.card}
          onPress={() => router.push(`/profile/${host._id}`)}
        >
          <Image
            source={host?.image ? { uri: host.image } : require('../../../assets/images/default.png')}
            style={style.sectionStyles.avatar}
          />
          <View>
            <Text style={style.sectionStyles.userName}>{host?.name}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
        <Text style={[style.sectionStyles.title2, { marginTop: 20 }]}>Participants</Text>

        <FlatList
          data={participants}
          scrollEnabled={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={style.sectionStyles.card}
              onPress={() => router.push(`/profile/${item._id}`)}
            >
              <Image
                source={item.image ? { uri: item.image } : require('../../../assets/images/default.png')}
                style={style.sectionStyles.avatar}
              />
              <Text style={style.sectionStyles.userName}>{item.name}</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  )
}