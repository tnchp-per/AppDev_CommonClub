import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fetchAllHangouts } from "../../api/hangoutApi";
import cardStyles from "../../components/HangoutCardStyle";

export default function Discovery() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ จับคู่กลุ่มคำจาก Dropdown เข้ากับหมวดหมู่ใหญ่
  const categories = [
    {
      id: "1", title: "WORKOUT & SPORTS",
      values: ["Sports", "Workout", "Gym"],
      image: require("../../assets/images/workout.jpg")
    },
    {
      id: "2", title: "STUDY SESSION",
      values: ["Study", "Education", "Workshop"],
      image: require("../../assets/images/work.jpg")
    },
    {
      id: "3", title: "FOOD & CAFE HOPPING",
      values: ["Food", "Cafe Hopping", "Brunch", "Cafe"],
      image: require("../../assets/images/cafe2.jpg")
    },
    {
      id: "4", title: "OUTDOOR & ADVENTURE",
      values: ["Outdoor", "Photography", "Travel"],
      image: require("../../assets/images/work.jpg")
    },
    {
      id: "5", title: "ENTERTAINMENT",
      values: ["Movie", "Gaming", "Music", "Social"],
      image: require("../../assets/images/work.jpg")
    },
    {
      id: "6", title: "OTHERS",
      values: ["Other"],
      image: require("../../assets/images/logo.png")
    },
  ];

  useFocusEffect(
    useCallback(() => {
      const loadEvents = async () => {
        try {
          setIsLoading(true);
          const data = await fetchAllHangouts();
          setAllEvents(data || []);
        } catch (err) {
          console.error("Discovery Load Error:", err);
        } finally {
          setIsLoading(false);
        }
      };
      loadEvents();
    }, [])
  );

  // ✅ Logic การกรองที่ฉลาดขึ้น
  const filteredEvents = allEvents.filter((item) => {
    const query = searchQuery.toLowerCase();

    // 1. เช็คว่าชื่อ Hangout หรือชื่อ Host ตรงกับที่เสิร์ชไหม
    const matchesText = item.title?.toLowerCase().includes(query) ||
      item.host?.name?.toLowerCase().includes(query);

    // 2. เช็คว่า Category ของ Hangout นั้นๆ อยู่ในกลุ่มที่เราเลือกมาหรือเปล่า
    // (ใช้สำหรับตอนกดจากหน้า Categories)
    const matchesCategory = item.category?.toLowerCase().includes(query);

    return matchesText || matchesCategory;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAF9F1" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

        <View style={localStyles.centeredHeader}>
          <Text style={localStyles.pageTitle}>DISCOVER</Text>
        </View>

        <View style={localStyles.searchSection}>
          <View style={localStyles.searchWrapper}>
            {searchQuery !== "" ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="arrow-back" size={24} color="#042917" style={{ marginRight: 10 }} />
              </TouchableOpacity>
            ) : (
              <Ionicons name="search" size={20} color="#042917" style={{ marginRight: 10 }} />
            )}
            <TextInput
              style={localStyles.searchInput}
              placeholder="Search categories or events..."
              placeholderTextColor="#8E8E8E"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#FF6B6B" style={{ marginTop: 50 }} />
          ) : searchQuery === "" ? (
            /* --- หน้าหมวดหมู่หลัก --- */
            categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={localStyles.categoryRow}
                // ✅ เมื่อกดปุ่มนี้ จะแสดงผลเฉพาะ Hangout ที่มี category ตรงกับหนึ่งใน values ของเรา
                onPress={() => {
                  // กรองข้อมูลเฉพาะกลุ่มนี้
                  const results = allEvents.filter(event =>
                    cat.values.some(v => v.toLowerCase() === event.category?.toLowerCase())
                  );
                  // ใช้เทคนิคเซ็ต query เป็นชื่อกลุ่ม หรือจะกรองข้างนอกก็ได้ 
                  // ในที่นี้เพื่อให้ UI สวย เราจะเซ็ต Query เป็นคำแรกใน list เพื่อให้ระบบ filter ทำงาน
                  setSearchQuery(cat.values[0]);
                }}
              >
                <Image source={cat.image} style={localStyles.catImage} />
                <View style={localStyles.overlay}>
                  <Text style={localStyles.catTitle}>{cat.title}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            /* --- หน้าผลการค้นหา --- */
            <View>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((item) => (
                  <TouchableOpacity
                    key={item._id}
                    style={[cardStyles.card, { width: '100%', marginBottom: 20, marginRight: 0 }]}
                    onPress={() => router.push(`/hangout/${item._id}`)}
                  >
                    <Image source={item.image ? { uri: item.image } : require("../../assets/images/logo.png")} style={cardStyles.image} />
                    <View style={cardStyles.content}>
                      <Text style={cardStyles.title}>{item.title}</Text>
                      <View style={localStyles.infoRow}>
                        <Text style={{ color: '#666' }}>@{item.host?.name || 'Member'}</Text>
                        <Text style={{ color: '#FF6B6B', fontWeight: 'bold' }}>{item.category}</Text>
                      </View>
                      <Text style={cardStyles.location}>📍 {item.location}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                  <Text style={{ color: '#999' }}>No results found</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  centeredHeader: { marginTop: 40, marginBottom: 20, alignItems: 'center' },
  pageTitle: { fontSize: 24, fontWeight: '800', color: '#042917', letterSpacing: 1.2 },
  searchSection: { paddingHorizontal: 20, marginBottom: 25 },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 10, paddingHorizontal: 15, height: 50 },
  searchInput: { flex: 1, fontSize: 16, color: '#042917' },
  categoryRow: { height: 130, borderRadius: 20, overflow: 'hidden', marginBottom: 18 },
  catImage: { width: '100%', height: '100%', position: 'absolute' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  catTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', letterSpacing: 1.5 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }
});