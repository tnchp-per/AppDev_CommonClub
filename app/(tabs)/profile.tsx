import styles from "@/components/ProfileStyles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user: authUser, logout } = useAuth(); // Get the logged-in user's ID
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Replace with your computer's local IP (e.g., 192.168.1.50)
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

  // 1. Show spinner while data is traveling from MongoDB
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FAF9F1" }}>
        <ActivityIndicator size="large" color="#1A3C22" />
      </View>
    );
  }

  // 2. Safety check if user doesn't exist
  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>User not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          // Use Base64 from Mongo, or fallback to a local image if empty
          source={userData.image ? { uri: userData.image } : require('../../assets/images/hong.jpg')}
          style={styles.avatar}
        />

        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.username}>@{userData.username}</Text>

        <Text style={styles.bio}>{userData.bio || "No bio yet"}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats - Now using .length of the arrays we set up in Mongo */}
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

      {/* Interests - Mapping from Mongo array */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsContainer}>
          {userData.interests && userData.interests.length > 0 ? (
            userData.interests.map((interest: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            ))
          ) : (
            <Text style={{ color: "gray" }}>No interests yet.</Text>
          )}
        </View>
      </View>

      {/* Menu */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Events</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}