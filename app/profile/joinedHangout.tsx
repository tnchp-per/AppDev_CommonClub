import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { fetchDashboardData } from "../../api/hangoutApi";
import hangoutCardStyle from "../../components/HangoutCardStyle";
import { useAuth } from "../../context/AuthContext";

const { width: screenWidth } = Dimensions.get("window");

// ฟังก์ชันแปลงวันที่
const formatHangoutDate = (dateString: string) => {
    if (!dateString) return "Coming soon";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

export default function MyJoinedHangout() {
    const { user } = useAuth();
    const router = useRouter();
    const [joinedEvents, setJoinedEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (user?.id) {
                try {
                    const data = await fetchDashboardData(user.id);
                    // ✅ สำหรับ Joined เราจะใช้ข้อมูลจากก้อน 'upcoming' 
                    // (ซึ่ง API มักจะส่งรายการที่เรากด Join แล้วมาให้ในนี้)
                    setJoinedEvents(data.upcoming || []);
                } catch (error) {
                    console.error("Error loading joined events:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadData();
    }, [user?.id]);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFCF0" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 20 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color="#042917" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#042917', marginLeft: 15 }}>
                        JOINED HANGOUTS
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 100 }}>
                    <ActivityIndicator size="large" color="#FF6B6B" />
                    <Text style={{ marginTop: 10, color: '#999' }}>Checking your schedule...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFCF0" }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 20 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#042917" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#042917', marginLeft: 15 }}>
                    JOINED HANGOUTS
                </Text>
            </View>

            <FlatList
                data={joinedEvents}
                keyExtractor={(item) => item._id}
                numColumns={4}
                key={4}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingTop: 20, paddingBottom: 20 },
                    joinedEvents.length > 0
                        ? { paddingHorizontal: 55 }
                        : { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }
                ]}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: -80, width: screenWidth }}>
                        <Ionicons name="calendar-outline" size={80} color="#CCC" style={{ opacity: 0.5 }} />
                        <Text style={{ color: "#999", marginTop: 10, fontSize: 16, fontWeight: '500' }}>
                            No upcoming hangouts joined yet.
                        </Text>
                        <TouchableOpacity
                            style={{ marginTop: 20, backgroundColor: '#4D7260', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 10 }}
                            onPress={() => router.push('/(tabs)')} // กลับไปหน้า Discover
                        >
                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Explore More Events</Text>
                        </TouchableOpacity>
                    </View>
                }
                renderItem={({ item }) => {
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
                                style={{
                                    width: "100%",
                                    height: 160,
                                    backgroundColor: '#f0f0f0',
                                }}
                                resizeMode="cover"
                            />
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
                }}
            />
        </SafeAreaView>
    );
}