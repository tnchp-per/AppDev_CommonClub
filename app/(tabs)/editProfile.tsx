import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function EditProfile() {
    const { user, setUser } = useAuth();
    const router = useRouter();

    // 1. Keep these! They handle the typing/editing
    const [name, setName] = useState(user?.name || '');
    const [username, setUsername] = useState(user?.username || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [interestInput, setInterestInput] = useState('');
    const [interests, setInterests] = useState<string[]>(user?.interests || []);
    const DEFAULT_AVATAR = require('../../assets/images/default.png');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(user?.image || null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, // ให้ User ครอบตัดรูปได้ (Crop)
            aspect: [1, 1],     // บังคับเป็นรูปจัตุรัส
            quality: 1,         // ความคมชัดสูงสุด
        });

        if (!result.canceled) {
            // เก็บ URI ของรูปไว้ใน State เพื่อแสดงผลและเตรียมส่งไป Backend
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        const fetchFreshUser = async () => {
            try {
                // Use _id or id depending on your setup
                const res = await axios.get(`http://localhost:5001/api/users/${user._id || user.id}`);
                console.log("Fresh data from server:", res.data.interests);

                // Now set the interests from the actual database response
                if (res.data.interests) {
                    setInterests(res.data.interests);
                }
            } catch (err) {
                console.error("Could not fetch fresh user data", err);
            }
        };

        if (user) fetchFreshUser();
    }, []); // Run ONCE when the page opens

    const addInterest = () => {
        if (interestInput.trim() && !interests.includes(interestInput.trim())) {
            // This adds to the existing list (Yoga, Coffee + New)
            setInterests([...interests, interestInput.trim()]);
            setInterestInput('');
        }
    };

    const removeInterest = (target: string) => {
        setInterests(interests.filter(i => i !== target));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const response = await axios.put(`http://localhost:5001/api/users/${user.id}`, {
                name,
                username,
                bio,
                interests
            });

            setUser({ ...user, name, username, bio, interests });
            alert("Update successful!");
            router.replace("/(tabs)/profile");

        } catch (error) {
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            {/* Header */}
            <View style={styles.topHeader}>
                <Text style={styles.pageTitle}>EDIT PROFILE</Text>
            </View>

            {/* Avatar Section */}
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <Image
                    source={image ? { uri: image } : require("../../assets/images/default.png")}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />

                <TouchableOpacity onPress={pickImage} style={{ marginTop: 10 }}>
                    <Text style={{ color: '#4D7260', fontWeight: 'bold' }}>Change Photo</Text>
                </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={styles.form}>
                <Text style={styles.label}>NAME</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your Name" />

                <Text style={styles.label}>USERNAME</Text>
                <View style={styles.usernameInputWrapper}>
                    <Text style={styles.atSymbol}>@</Text>
                    <TextInput
                        style={[styles.input, { flex: 1, marginBottom: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="username"
                        autoCapitalize="none"
                    />
                </View>

                <Text style={styles.label}>BIO</Text>
                <TextInput
                    style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Tell us about yourself..."
                    multiline
                />

                <Text style={styles.label}>INTERESTS</Text>
                <View style={styles.interestInputContainer}>
                    <TextInput
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        value={interestInput}
                        onChangeText={setInterestInput}
                        placeholder="Add interest (e.g. Pilates)"
                        onSubmitEditing={addInterest} // กด Enter เพื่อเพิ่ม
                    />
                    <TouchableOpacity style={styles.addButton} onPress={addInterest}>
                        <Ionicons name="add" size={24} color="#FAF9F1" />
                    </TouchableOpacity>
                </View>

                {/* Display Interest Tags */}
                <View style={styles.tagsContainer}>
                    {interests.map((item, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{item.toUpperCase()}</Text>
                            <TouchableOpacity onPress={() => removeInterest(item)}>
                                <Ionicons name="close-circle" size={16} color="#FAF9F1" style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>

            {/* Action Buttons - จัดให้อยู่ตรงกลาง */}
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.replace('/(tabs)/profile')} // เปลี่ยนจาก router.push('/(tabs)/home') เป็น back()
                    style={styles.cancelButton}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF9F1' },
    topHeader: { marginTop: 60, marginBottom: 20, alignItems: 'center' },
    pageTitle: { fontSize: 24, fontWeight: '700', color: '#042917' },
    avatarSection: { alignItems: 'center', marginBottom: 30 },
    avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: '#A5A198' },
    changePhotoButton: { marginTop: 10 },
    changePhotoText: { color: '#4D7260', fontWeight: 'bold', fontSize: 14 },

    form: { paddingHorizontal: 25 },
    label: { fontSize: 13, fontWeight: '700', color: '#042917', marginBottom: 8, marginTop: 15 },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#A5A198',
        borderRadius: 12,
        padding: 15,
        marginBottom: 5,
        color: '#042917',
        fontSize: 14,
    },
    usernameInputWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    atSymbol: {
        backgroundColor: '#E9E7D8',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#A5A198',
        borderRightWidth: 0,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        color: '#042917',
        fontWeight: 'bold',
    },
    interestInputContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    addButton: { backgroundColor: '#042917', padding: 13, borderRadius: 12 },

    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 15, gap: 8 },
    tag: { backgroundColor: '#0D331C', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
    tagText: { color: '#FAF9F1', fontSize: 11, fontWeight: 'bold' },

    buttonWrapper: { alignItems: 'center', marginTop: 40, paddingHorizontal: 25 },
    saveButton: { backgroundColor: '#042917', width: '100%', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
    saveButtonText: { color: '#FAF9F1', fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
    cancelButton: { marginTop: 20 },
    cancelText: { color: '#E06666', fontWeight: 'bold' },
});