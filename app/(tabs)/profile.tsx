import styles from "@/components/ProfileStyles";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5001/api/users"; // อย่าลืมเปลี่ยนเป็น IP จริงถ้าใช้เครื่องจริงเทส

  // ย้าย useEffect มาไว้ตรงนี้ (ก่อน if return) ตามกฎของ React Hooks
  useEffect(() => {
    // ดึงข้อมูลเฉพาะตอนที่มี user เท่านั้น
    if (user?.id) {
      fetchUserData();
    } else {
      // ถ้าไม่มี user ให้เคลียร์ข้อมูลเก่าออก (เผื่อกด logout)
      setUserData(null);
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${user.id}`);
      setUserData(response.data);
    } catch (error: any) {
      console.log("Fetch error, using context data instead.");
      // ถ้าหาใน DB ไม่เจอ ให้ดึงข้อมูลจาก Context มาโชว์แก้ขัด
      setUserData({
        name: user.name || "User",
        email: user.email,
        username: user.name?.replace(/\s+/g, '').toLowerCase() || "user",
        bio: "Welcome to my profile!",
        image: "https://via.placeholder.com/150",
        interests: ["Hangout"],
        joinedEvents: [],
        createdEvents: []
      });
    } finally {
      setLoading(false);
    }
  };

  // --- 1. เช็คว่าเป็น Guest หรือไม่ ---
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

  // --- 2. เช็คสถานะ Loading ---
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FAF9F1" }}>
        <ActivityIndicator size="large" color="#042917" />
      </View>
    );
  }

  // --- 3. ป้องกันหน้าขาว ---
  if (!userData) return null;

  // --- 4. แสดงผลหน้า Profile จริง ---
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.pageTitle}>USER</Text>
      </View>

      <View style={styles.header}>
        <Image
          source={{ uri: userData.image || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData.name?.toUpperCase()}</Text>
        <Text style={styles.username}>@{userData.username}</Text>
        <Text style={styles.bio}>{userData.bio}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>EDIT PROFILE</Text>
        </TouchableOpacity>
      </View>

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

      {/* Interests */}
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

      {/* Action Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Hangout</Text>
        <TouchableOpacity style={styles.primaryBlockButton}>
          <Text style={styles.blockButtonText}>VIEW MY HANGOUT</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>My Request</Text>
        <TouchableOpacity style={styles.secondaryBlockButton}>
          <Text style={styles.blockButtonText}>VIEW MY REQUEST</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Saved Activities</Text>
        <TouchableOpacity style={styles.secondaryBlockButton}>
          <Text style={styles.blockButtonText}>VIEW MY SAVED ACTIVITIES</Text>
        </TouchableOpacity>

        {/* Logout Button (Kept at the bottom for functionality) */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom padding to ensure you can scroll past the last button */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}