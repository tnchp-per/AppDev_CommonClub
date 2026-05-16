import hangoutCardStyle from "@/components/HangoutCardStyle";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fetchAllHangouts } from "../../api/hangoutApi";
import style from "../../components/DiscoveryStyles";

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

        <View style={style.centeredHeader}>
          <Text style={style.pageTitle}>DISCOVER</Text>
        </View>

        <View style={style.searchSection}>
          <View style={style.searchWrapper}>
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="arrow-back" size={24} color="#042917" style={{ marginRight: 10 }} />
              </TouchableOpacity>
            )}
            {searchQuery === "" && <Ionicons name="search" size={20} color="#042917" style={{ marginRight: 10 }} />}
            <TextInput
              style={style.searchInput}
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
            <View style={{ flex: 1, marginTop: 200, alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#FF6B6B" />
            </View>
          ) : searchQuery === "" ? (
            categories.map((cat) => (
              <TouchableOpacity key={cat.id} style={style.categoryRow} onPress={() => setSearchQuery(cat.title)}>
                <Image source={cat.image} style={style.catImage} />
                <View style={style.overlay}>
                  <Text style={style.catTitle}>{cat.title}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{ padding: 16 }}>
              <Text style={style.resultsText}>{filteredEvents.length} hangouts found</Text>
              <View style={style.gridContainer}>
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

