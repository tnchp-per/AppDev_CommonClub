import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import styles from "../../components/ProfilePageStyles"; // Adjust path as needed

import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function PublicProfile() {
    const { id } = useLocalSearchParams(); // This gets the ID from the URL
    const [targetUser, setTargetUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch the specific user's info from your backend
                const response = await fetch(`http://localhost:5001/api/users/${id}`);
                const data = await response.json();
                setTargetUser(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUserData();
    }, [id]);

    if (loading) return <Text>Loading Profile...</Text>;
    if (!targetUser) return <Text>User not found.</Text>;

    return (
        <ScrollView style={styles.container}>
            
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={28} color="#1A3C22" />
                </TouchableOpacity>

            
            {/* Header Info */}
            <View style={styles.profileHeader}>
                <Image source={{ uri: targetUser.image }} style={styles.avatar} />
                <Text style={styles.name}>{targetUser.name?.toUpperCase()}</Text>
                <Text style={styles.username}>@{targetUser.username}</Text>
                <Text style={styles.bio}>{targetUser.bio || "No bio yet."}</Text>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{targetUser.joinedEvents?.length || 0}</Text>
                    <Text style={styles.statLabel}>Joined</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{targetUser.createdEvents?.length || 0}</Text>
                    <Text style={styles.statLabel}>Created</Text>
                </View>
            </View>

            {/* Interests Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Interest</Text>
                <View style={styles.tagsContainer}>
                    {targetUser.interests && targetUser.interests.length > 0 ? (
                        targetUser.interests.map((item: string, index: number) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>{item.toUpperCase()}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>No interests listed.</Text>
                    )}
                </View>
            </View>
            
            {/* Added a bottom spacer for better scrolling */}
            <View style={{ height: 50 }} />
        </ScrollView>
    );
}

