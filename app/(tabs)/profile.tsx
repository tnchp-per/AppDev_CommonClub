import styles from "@/components/ProfileStyles";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function Profile() {
  const user = {
    name: "Hong",
    username: "@hhonnges",
    bio: "pilates princess👸, matcha lover🍵",
    interests: ["Pilates", "Fine-Dining"],
    joinedEvents: 2,
    createdEvents: 1,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require(('../../assets/images/hong.jpg'))}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>

        <Text style={styles.bio}>{user.bio}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user.joinedEvents}</Text>
          <Text style={styles.statLabel}>Joined</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user.createdEvents}</Text>
          <Text style={styles.statLabel}>Created</Text>
        </View>
      </View>

      {/* Interests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>

        <View style={styles.interestsContainer}>
          {user.interests.map((interest, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menu */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Events</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Saved Activities</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
