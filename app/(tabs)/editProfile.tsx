import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
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

    useEffect(() => {
    // Only update if the local state is empty and the user data has arrived
        if (user && interests.length === 0) {
            setInterests(user.interests || []);
            setName(user.name || '');
            setUsername(user.username || '');
            setBio(user.bio || '');
        }
    }, [user]);

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
            // แนะนำ: ถ้าใช้มือถือจริง/Emulator ให้เปลี่ยน localhost เป็น IP เครื่องคอมคุณ
            const response = await axios.put(`http://localhost:5001/api/users/${user.id}`, {
                name,
                username,
                bio,
                interests
            });

            // อัปเดตข้อมูลใน Context
            setUser({ ...user, name, username, bio, interests });
            alert("Saved successfully!");
            router.replace("http://localhost:8081/profile"); 
        } catch (err: any) { 
            console.error("Save error detail:", err.response?.data || err.message);

            // ดึงข้อความ error จากหลังบ้านมาโชว์ (เช่น Username already exists)
            const errorMessage = err.response?.data?.message || "Something went wrong";
            alert("Failed to save: " + errorMessage);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            {/* Header */}
            <View style={styles.topHeader}>
                <Text style={styles.pageTitle}>EDIT PROFILE</Text>
            </View>

            {/* Avatar Section */}
            <View style={styles.avatarSection}>
                <Image
                    source={{ uri: user?.image }}
                    style={styles.avatar}
                />
                <TouchableOpacity style={styles.changePhotoButton}>
                    <Text style={styles.changePhotoText}>Change Photo</Text>
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

                <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
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