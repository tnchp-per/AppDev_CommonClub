import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fetchAllHangouts } from "../../api/hangoutApi";

// ✅ คำนวณความกว้างเพื่อให้ได้ 3 ช่องแบบเป๊ะๆ โดยอิงจากหน้าจอ
const { width: screenWidth } = Dimensions.get('window');
const horizontalPadding = 20;
const gap = 10; // ระยะห่างระหว่างการ์ด
const gridCardWidth = (screenWidth - (horizontalPadding * 2) - (gap * 2)) / 3.01;

export default function Discovery() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: "1", title: "WORKOUT & SPORTS", values: ["Sports", "Workout", "Gym"], image: require("../../assets/images/workout.jpg") },
    { id: "2", title: "STUDY SESSION", values: ["Study", "Education", "Workshop"], image: require("../../assets/images/work.jpg") },
    { id: "3", title: "FOOD & CAFE HOPPING", values: ["Food", "Cafe Hopping", "Brunch", "Cafe"], image: require("../../assets/images/cafe2.jpg") },
    { id: "4", title: "OUTDOOR & ADVENTURE", values: ["Outdoor", "Photography", "Travel", "Waterpark", "Adventure"], image: require("../../assets/images/work.jpg") },
    { id: "5", title: "ENTERTAINMENT", values: ["Movie", "Gaming", "Music", "Social", "Entertainment"], image: require("../../assets/images/work.jpg") },
    { id: "6", title: "OTHERS", values: ["Other", "Others"], image: require("../../assets/images/logo.png") },
  ];

  useFocusEffect(
    useCallback(() => {
      const loadEvents = async () => {
        try {
          setIsLoading(true);
          const data = await fetchAllHangouts();
          setAllEvents(data || []);
        } catch (err) {
          console.error("Discovery Error:", err);
        } finally {
          setIsLoading(false);
        }
      };
      loadEvents();
    }, [])
  );

  const filteredEvents = allEvents.filter((item) => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;
    const selectedCategory = categories.find(cat => cat.title.toLowerCase() === query);
    if (selectedCategory) {
      return selectedCategory.values.some(v => v.toLowerCase() === item.category?.toLowerCase());
    }
    return (
      item.title?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAF9F1" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

        <View style={localStyles.centeredHeader}>
          <Text style={localStyles.pageTitle}>DISCOVER</Text>
        </View>

        <View style={localStyles.searchSection}>
          <View style={localStyles.searchWrapper}>
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="arrow-back" size={24} color="#042917" style={{ marginRight: 10 }} />
              </TouchableOpacity>
            )}
            {searchQuery === "" && <Ionicons name="search" size={20} color="#042917" style={{ marginRight: 10 }} />}
            <TextInput
              style={localStyles.searchInput}
              placeholder="Search categories or events..."
              placeholderTextColor="#8E8E8E"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: horizontalPadding }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#FF6B6B" style={{ marginTop: 50 }} />
          ) : searchQuery === "" ? (
            /* --- หน้าแรก: Categories แถวยาวแบบเดิมที่คุณต้องการ --- */
            categories.map((cat) => (
              <TouchableOpacity key={cat.id} style={localStyles.categoryRow} onPress={() => setSearchQuery(cat.title)}>
                <Image source={cat.image} style={localStyles.catImage} />
                <View style={localStyles.overlay}>
                  <Text style={localStyles.catTitle}>{cat.title}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            /* --- หน้าผลลัพธ์: Grid แถวละ 3 สไตล์เดียวกับหน้า Home --- */
            <View>
              <Text style={localStyles.resultsText}>{filteredEvents.length} hangouts found</Text>
              <View style={localStyles.gridContainer}>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((item, index) => (
                    <TouchableOpacity
                      key={item._id}
                      style={[
                        localStyles.gridCard,
                        (index + 1) % 3 !== 0 && { marginRight: gap } // เว้นช่องว่าง ยกเว้นใบที่ 3 ของแถว
                      ]}
                      onPress={() => router.push(`/hangout/${item._id}`)}
                    >
                      <Image
                        source={item.image ? { uri: item.image } : require("../../assets/images/logo.png")}
                        style={localStyles.gridImage}
                      />
                      <View style={localStyles.gridContent}>
                        <Text style={localStyles.gridTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={localStyles.gridLocation} numberOfLines={1}>{item.location}</Text>
                        <Text style={localStyles.gridTime} numberOfLines={1}>
                          {item.date || 'Coming soon'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={{ width: '100%', alignItems: 'center', marginTop: 50 }}>
                    <Text style={{ color: '#999' }}>No results found</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  // ส่วนหัวและช่องค้นหา (สไตล์เดิม)
  centeredHeader: { marginTop: 40, marginBottom: 20, alignItems: 'center' },
  pageTitle: { fontSize: 24, fontWeight: '800', color: '#042917', letterSpacing: 1, marginTop: 20 },
  searchSection: { paddingHorizontal: 20, marginBottom: 25 },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 10, paddingHorizontal: 15, height: 50 },
  searchInput: { flex: 1, fontSize: 16, color: '#042917' },

  // สไตล์หน้า Categories (แถวยาว สไตล์เดิม)
  categoryRow: { height: 130, borderRadius: 20, overflow: 'hidden', marginBottom: 18 },
  catImage: { width: '100%', height: '100%', position: 'absolute' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  catTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  resultsText: { marginBottom: 15, color: '#666', fontSize: 14, fontWeight: '600' },

  // ✅ สไตล์ Grid 3 ช่อง (ดึงดีไซน์จากหน้า Home)
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  gridCard: {
    width: gridCardWidth,
    backgroundColor: '#FFF',
    borderRadius: 15, // มนสวยเหมือนหน้า Home
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  gridImage: {
    width: '100%',
    height: gridCardWidth, // รูปทรงจัตุรัสเพื่อให้เรียงกันสวย
    backgroundColor: '#EEE',
  },
  gridContent: {
    padding: 8,
  },
  gridTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  gridLocation: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  gridTime: {
    fontSize: 9,
    color: '#999',
    marginTop: 2,
  },
});