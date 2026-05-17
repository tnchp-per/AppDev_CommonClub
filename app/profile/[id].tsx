import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PublicProfile() {
    const { id } = useLocalSearchParams();
    const [targetUser, setTargetUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
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


            <View style={styles.profileHeader}>
                {typeof targetUser.image === 'string' && targetUser.image.startsWith('data:image') ? (
                    <Image source={targetUser.image} style={styles.avatar} />
                ) : (
                    <Image source={require('../../assets/images/default.png')} style={styles.avatar} />
                )}
                <Text style={styles.name}>{targetUser.name?.toUpperCase()}</Text>
                <Text style={styles.username}>@{targetUser.username}</Text>
                <Text style={styles.bio}>{targetUser.bio || "No bio yet."}</Text>
            </View>

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

            <View style={{ height: 50 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F1'
    },
    profileHeader: {
        alignItems: 'center',
        padding: 30,
        marginTop: Platform.OS === 'ios' ? 45 : 5
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAF9F1'
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: Platform.OS === 'ios' ? 45 : 16,
        zIndex: 10,
    },
    topLabel: { fontSize: 18, fontWeight: 'bold', color: '#042917', marginBottom: 15 },
    avatar: { width: 120, height: 120, marginTop: 15, borderRadius: 60, borderWidth: 1, borderColor: '#A5A198' },
    name: { fontSize: 22, fontWeight: '900', color: '#042917', marginTop: 15 },
    username: { fontSize: 14, color: '#4D7260', marginBottom: 5 },
    bio: { fontSize: 14, color: '#042917', opacity: 0.8, marginTop: 5 },

    statsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 60, marginTop: 30 },
    statBox: { alignItems: 'center' },
    statNumber: { fontSize: 20, fontWeight: 'bold', color: '#042917' },
    statLabel: { fontSize: 12, color: '#042917', opacity: 0.6 },

    section: { paddingHorizontal: 30, marginTop: 40 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#042917', marginBottom: 10 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tag: { backgroundColor: '#0D331C', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
    tagText: { color: '#FAF9F1', fontSize: 11, fontWeight: 'bold' },
    emptyText: { color: '#A5A198', fontStyle: 'italic' }
});