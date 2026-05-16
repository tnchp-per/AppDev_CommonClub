import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions // เพิ่มตัวนี้เข้ามา
    ,








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

export default function MyCreatedHangout() {
    const { user } = useAuth();
    const router = useRouter();
    const [createdEvents, setCreatedEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (user?.id) {
                try {
                    const data = await fetchDashboardData(user.id);
                    // ✅ ลองดึงทั้ง created และ upcoming มาเช็ค หรือใช้ตัวใดตัวหนึ่งที่ Backend ส่งมาจริง
                    const myCreated = data.created || data.upcoming?.filter((ev: any) => ev.host === user.id) || [];
                    setCreatedEvents(myCreated);
                } catch (error) {
                    console.error("Error:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadData();
    }, [user]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFCF0" }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#042917" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: '800', color: '#042917', marginLeft: 15 }}>
                    MY CREATED HANGOUTS
                </Text>
            </View>

            {loading ? (
                <View style={{ flex: 1, marginTop: 230, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#FF6B6B" />
                    <Text style={{ marginTop: 10, color: '#999' }}>Loading...</Text>
                </View>
            ) : (
                <FlatList
                    data={createdEvents}
                    keyExtractor={(item) => item._id}
                    horizontal={createdEvents.length > 0} // ✅ ถ้าไม่มีข้อมูล ไม่ต้องเป็นแนวนอน เพื่อให้ Empty State อยู่ตรงกลาง
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingTop: 20, paddingBottom: 20 },
                        createdEvents.length > 0 ? { paddingHorizontal: 25 } : { flex: 1, justifyContent: 'center', alignItems: 'center' }
                    ]}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth }}>
                            <Ionicons name="create-outline" size={100} color="#CCC" style={{ opacity: 0.5 }} />
                            <Text style={{ color: "#999", marginTop: 20, fontSize: 18, fontWeight: '500' }}>
                                You haven't created any events yet.
                            </Text>
                            <TouchableOpacity
                                style={{ marginTop: 20, backgroundColor: '#FF6B6B', padding: 12, borderRadius: 10 }}
                                onPress={() => router.push('/create')} // สมมติว่ามีหน้าสร้างงาน
                            >
                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Create New Hangout</Text>
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
                                        backgroundColor: "#FFFFFF",
                                        borderRadius: 18,
                                        marginRight: 20,
                                        overflow: "hidden",
                                        paddingBottom: 20,
                                        elevation: 5,
                                        shadowColor: "#000",
                                        shadowOpacity: 0.1,
                                    }
                                ]}
                            >
                                <Image source={imageSource} style={{ width: "100%", height: 160 }} resizeMode="cover" />
                                <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                                    <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 6, lineHeight: 26 }} numberOfLines={1}>
                                        {item.title}
                                    </Text>
                                    <Text style={{ color: "#666", marginBottom: 4 }}>📍 {item.location}</Text>
                                    <Text style={{ color: "#FF6B6B", fontWeight: "600" }}>🕒 {item.date}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
        </SafeAreaView>
    );
}