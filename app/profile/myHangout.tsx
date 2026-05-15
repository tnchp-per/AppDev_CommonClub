import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { fetchDashboardData } from "../../api/hangoutApi";
import hangoutCardStyle from "../../components/HangoutCardStyle";
import { useAuth } from "../../context/AuthContext";

// ✅ 1. เพิ่มฟังก์ชันแปลงวันที่ให้เหมือนหน้า Home
const formatHangoutDate = (dateString: string) => {
    if (!dateString) return "Coming soon";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    if (diffDays > 0 && diffDays <= 7) return `${diffDays} days from now at ${timeStr}`;
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) + ` at ${timeStr}`;
};

export default function MyHangouts() {
    const { user } = useAuth();
    const router = useRouter();
    const [myEvents, setMyEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (user?.id) {
                try {
                    const data = await fetchDashboardData(user.id);
                    setMyEvents(data.upcoming || []);
                } catch (error) {
                    console.error("Error loading my events:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadData();
    }, [user]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FAF9F1" }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 25 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#042917" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 15, color: '#042917' }}>MY HANGOUT</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#FF6B6B" style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={myEvents}
                    keyExtractor={(item) => item._id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 40, paddingRight: 40, paddingTop: 10 }}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', marginTop: 100 }}>
                            <Text style={{ color: '#999', fontSize: 16 }}>You don't have any upcoming hangouts.</Text>
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
                                {/* ส่วนรูปภาพที่คุมความสูงให้นิ่ง */}
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

                                {/* ส่วนข้อความ: เน้นใส่ lineHeight เพื่อให้บรรทัดเท่ากัน */}
                                <Text style={[hangoutCardStyle.title, {
                                    fontSize: 20,
                                    fontWeight: "700",
                                    marginLeft: 16, // ขยับเข้าอีกนิดให้สวยเหมือนในรูป
                                    marginTop: 16,
                                    marginBottom: 6,
                                    lineHeight: 26, // ✅ บังคับความสูงบรรทัด แก้ปัญหาไทย/อังกฤษสูงไม่เท่ากัน
                                }]} numberOfLines={1}>
                                    {item.title}
                                </Text>

                                <Text style={[hangoutCardStyle.location, {
                                    fontSize: 15,
                                    color: "#666666",
                                    marginLeft: 16,
                                    marginBottom: 4,
                                    lineHeight: 20, // ✅ บังคับความสูงบรรทัด
                                }]} numberOfLines={1}>
                                    {item.location}
                                </Text>

                                <Text style={[hangoutCardStyle.time, {
                                    fontSize: 15,
                                    color: "#666666",
                                    marginLeft: 16,
                                    lineHeight: 20, // ✅ บังคับความสูงบรรทัด
                                }]} numberOfLines={1}>
                                    {formatHangoutDate(item.date)}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
        </SafeAreaView>
    );
}