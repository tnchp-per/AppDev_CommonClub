import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fetchAllHangouts } from "../../api/hangoutApi";
import hangoutCardStyle from "../../components/HangoutCardStyle";

const { width: screenWidth } = Dimensions.get('window');
const horizontalPadding = 20;
const gap = 10;
const formatHangoutDate = (dateString: string) => {
  if (!dateString) return "Coming soon";

  const date = new Date(dateString);
  const now = new Date();

  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  if (diffDays > 0 && diffDays <= 7) {
    return `${diffDays} days from now at ${timeStr}`;
  }

  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }) + ` at ${timeStr}`;
};

export default function Discovery() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: "1", title: "WORKOUT & SPORTS", values: ["Sports", "Workout", "Gym"], image: require("../../assets/images/workout.jpg") },
    { id: "2", title: "STUDY SESSION", values: ["Study", "Education", "Workshop"], image: require("../../assets/images/studysess.jpg") },
    { id: "3", title: "FOOD & CAFE HOPPING", values: ["Food", "Cafe Hopping", "Brunch", "Cafe"], image: require("../../assets/images/cafe2.jpg") },
    { id: "4", title: "OUTDOOR & ADVENTURE", values: ["Outdoor", "Photography", "Travel", "Waterpark", "Adventure"], image: require("../../assets/images/adv.jpg") },
    { id: "5", title: "ENTERTAINMENT", values: ["Movie", "Gaming", "Music", "Social", "Entertainment"], image: require("../../assets/images/ent.jpg") },
    { id: "6", title: "OTHERS", values: ["Other", "Others"], image: require("../../assets/images/others.jpg") },
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
    return item.title?.toLowerCase().includes(query) || item.category?.toLowerCase().includes(query);
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
              placeholder="Search hangouts..."
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
            categories.map((cat) => (
              <TouchableOpacity key={cat.id} style={localStyles.categoryRow} onPress={() => setSearchQuery(cat.title)}>
                <Image source={cat.image} style={localStyles.catImage} />
                <View style={localStyles.overlay}>
                  <Text style={localStyles.catTitle}>{cat.title}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{ padding: 16 }}>
              <Text style={localStyles.resultsText}>{filteredEvents.length} hangouts found</Text>
              <View style={localStyles.gridContainer}>
                {filteredEvents.map((item, index) => {
                  const imageSource = (typeof item.image === 'string' && item.image.startsWith('data:image'))
                    ? { uri: item.image }
                    : require("../../assets/images/logo.png");

                  return (
                    <TouchableOpacity
                      key={item._id}
                      onPress={() => router.push(`/hangout/${item._id}`)}
                      style={[
                        hangoutCardStyle.card,
                        {
                          width: 280,
                          height: 265,
                          backgroundColor: "#FFFFFF",
                          borderRadius: 18,
                          marginRight: 18,
                          overflow: "hidden",
                          paddingBottom: 16,
                          marginBottom: 18,
                          elevation: 2,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.1,
                          shadowRadius: 4,
                        }
                      ]}
                    >
                      <Image
                        source={imageSource}
                        style={[
                          hangoutCardStyle.image,
                          {
                            width: "100%",
                            height: 160,
                            backgroundColor: '#f0f0f0',
                          }
                        ]}
                        resizeMode="cover"
                      />

                      {/* ✅ ใช้ Style ต้นฉบับเป๊ะๆ แต่ลดขนาดฟอนต์ให้เข้ากับหน้าจอ */}
                      <Text style={[hangoutCardStyle.title, {
                        fontSize: 20,
                        fontWeight: "700",
                        //color: "#1A3C22",
                        marginLeft: 12,
                        marginBottom: 6,
                        lineHeight: 24,
                      }]} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[hangoutCardStyle.location, {
                        fontSize: 15,
                        color: "#666666",
                        marginBottom: 4,
                        marginLeft: 12,
                        lineHeight: 18,
                      }]} numberOfLines={1}>
                        {item.location}
                      </Text>
                      <Text style={[hangoutCardStyle.time, {
                        fontSize: 15,
                        color: "#666666",
                        marginLeft: 12
                      }]} numberOfLines={1}>
                        {formatHangoutDate(item.date)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  centeredHeader: { marginTop: 40, marginBottom: 20, alignItems: 'center' },
  pageTitle: { fontSize: 24, fontWeight: '800', color: '#042917', letterSpacing: 1, marginTop: 20 },
  searchSection: { paddingHorizontal: 20, marginBottom: 25 },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 10, paddingHorizontal: 15, height: 50 },
  searchInput: { flex: 1, fontSize: 16, color: '#042917', },
  categoryRow: { height: 150, borderRadius: 20, overflow: 'hidden', marginBottom: 18 },
  catImage: { width: '100%', height: '100%', position: 'absolute' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  catTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center', letterSpacing: 1 },
  resultsText: { marginBottom: 15, color: '#666', fontSize: 14, fontWeight: '600' },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});