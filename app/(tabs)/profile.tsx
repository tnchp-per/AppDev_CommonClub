import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router"; // 1. เพิ่ม useFocusEffect
import React, { useCallback, useState } from "react"; // 2. เพิ่ม useCallback
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../components/profileStyles";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5001/api/users";

  // 3. ใช้ useFocusEffect แทน useEffect เดิมบางส่วน 
  // เพื่อให้ดึงข้อมูลใหม่ทุกครั้งที่หน้า Profile ถูก "Focus" (เช่น ตอนกด Back กลับมา)
  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        fetchUserData();
      } else {
        setUserData(null);
      }
    }, [user])
  );

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/${user.id}`);
      setUserData(response.data);
    } catch (error) {
      // ถ้าเพิ่งสมัครใหม่แล้วยังไม่มีข้อมูลใน DB ให้ใช้ค่าจาก Context แทน
      setUserData({
        name: user.name,
        username: "new_user",
        bio: "Add your bio here!",
        interests: [],
        joinedEvents: [],
        createdEvents: []
      });
    }
  };
  const getProfileImage = (imageData: string | undefined | null) => {
    if (!imageData || (typeof imageData === 'string' && imageData.trim() === "") || imageData === "default.png") {
      return require("../../assets/images/default.png");
    }
    return { uri: imageData };
  };


  if (!user) {
    return (
      <View style={styles.guestContainer}>
        <Ionicons name="lock-closed" size={80} color="#042917" style={{ opacity: 0.2 }} />
        <Text style={styles.title}>JOIN COMMON CLUB</Text>
        <Text style={styles.subTitle}>Login to see your profile and activities</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.buttonText}>LOGIN / SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading && !userData) { // โชว์ loading เฉพาะตอนที่ยังไม่มีข้อมูลเดิม
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FAF9F1" }}>
        <ActivityIndicator size="large" color="#042917" />
      </View>
    );
  }

  if (!userData) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.pageTitle}>USER</Text>
      </View>

      <View style={styles.header}>
        <Image
          source={getProfileImage(userData?.image)}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData.name?.toUpperCase()}</Text>
        <Text style={styles.username}>@{userData.username}</Text>
        <Text style={styles.bio}>{userData.bio}</Text>

        {/* 4. ใส่ Link ไปหน้า Edit Profile */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push('/profile/editProfile')} // ใช้ push เท่านั้น!
        >
          <Text style={styles.editButtonText}>EDIT PROFILE</Text>
        </TouchableOpacity>
      </View>

      {/* ส่วน Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userData.joinedEvents?.length || 0}</Text>
          <Text style={styles.statLabel}>Joined</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userData.createdEvents?.length || 0}</Text>
          <Text style={styles.statLabel}>Created</Text>
        </View>
      </View>

      {/* ส่วน Interests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interest</Text>
        <View style={styles.interestsContainer}>
          {userData.interests && userData.interests.length > 0 ? (
            userData.interests.map((interest: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{interest.toUpperCase()}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No interests yet.</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Hangout</Text>
        <TouchableOpacity
          style={styles.primaryBlockButton}
          onPress={() => router.push('/profile/myHangout')}
        >
          <Text style={styles.blockButtonText}>VIEW MY HANGOUT</Text>
        </TouchableOpacity>

        {/* --- ปุ่ม My Request --- */}
        <Text style={styles.sectionTitle}>My Request</Text>
        <TouchableOpacity
          style={styles.secondaryBlockButton}
        >
          <Text style={styles.blockButtonText}>VIEW MY REQUEST</Text>
        </TouchableOpacity>

        {/* --- ปุ่ม Saved Activities --- */}
        <Text style={styles.sectionTitle}>Saved Activities</Text>
        <TouchableOpacity
          style={styles.secondaryBlockButton}
        >
          <Text style={styles.blockButtonText}>VIEW MY SAVED ACTIVITIES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}