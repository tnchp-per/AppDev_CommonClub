import styles from "@/components/ProfileStyles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user: authUser, logout } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // เปลี่ยน localhost เป็น IP แล้ว (เผื่อในอนาคตจะเปิดใช้ API จริง)
  const API_URL = "http://localhost:5001/api/users";

  useEffect(() => {
    if (authUser?.id) {
      fetchUserData();
    }
  }, [authUser]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // LOG 1: What URL are we actually hitting?
      console.log("Full Request URL:", `${API_URL}/${authUser.id}`);

      const response = await axios.get(`${API_URL}/${authUser.id}`);

      // LOG 2: What did the database send back?
      console.log("Backend Response:", response.data);

      setUserData(response.data);
    } catch (error: any) {
      // LOG 3: Why did it fail?
      console.log("Error Status:", error.response?.status);
      console.log("Error Message:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FAF9F1" }}>
        <ActivityIndicator size="large" color="#042917" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FAF9F1" }}>
        <Text style={{ color: "#042917" }}>User not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Top Header Placeholder */}
      <View style={styles.topHeader}>
        <Text style={styles.pageTitle}>USER</Text>
      </View>

      {/* Header Info */}
      <View style={styles.header}>
        <Image
          source={{ uri: userData.image }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{userData.name?.toUpperCase()}</Text>
        <Text style={styles.username}>@{userData.username}</Text>

        <Text style={styles.bio}>{userData.bio}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>EDIT PROFILE</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userData.joinedEvents?.length || 0}</Text>
          <Text style={styles.statLabel}>Joined</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {userData.createdEvents ? userData.createdEvents.length : 0}
          </Text>
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