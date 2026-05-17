import { deleteHangout } from '@/api/hangoutApi';

import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'; // Make sure this is installed
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from "../../../components/editHangoutStyles";

const BASE_URL = "http://localhost:5001/api";

export default function EditHangout() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const today = new Date().toISOString().split('T')[0];

  // States matching CreateHangout structure
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentAcceptedCount, setCurrentAcceptedCount] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "Social",
    maxParticipants: ""
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/hangouts/${id}`);
        const data = res.data;

        // Extract date and times from ISO strings
        const startDate = new Date(data.date);
        const endDate = new Date(data.endTime);

        setFormData({
          title: data.title,
          description: data.description,
          location: data.location,
          category: data.category || "Social",
          maxParticipants: data.maxParticipants.toString(),
        });

        setSelectedDay(startDate.toISOString().split('T')[0]);
        setStartTime(startDate.toTimeString().slice(0, 5));
        setEndTime(endDate.toTimeString().slice(0, 5));
        setImage(data.image);
        setCurrentAcceptedCount(data.acceptedParticipants?.length || 0);
      } catch (err) {
        console.error("Fetch Error:", err);
        Alert.alert("Error", "Could not load event data");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  const handleTimeChange = (text: string, setter: (val: string) => void) => {
    let cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length > 2) {
      cleaned = cleaned.slice(0, 2) + ":" + cleaned.slice(2, 4);
    }
    setter(cleaned.slice(0, 5));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.3,
      base64: true,
    });

    if (!result.canceled) {
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleUpdate = async () => {
    if (parseInt(formData.maxParticipants) < currentAcceptedCount) {
      Alert.alert("Error", `Cannot set limit below current participants (${currentAcceptedCount})`);
      return;
    }

    try {
      const startISO = new Date(`${selectedDay}T${startTime}:00`).toISOString();
      const endISO = new Date(`${selectedDay}T${endTime}:00`).toISOString();

      await axios.put(`${BASE_URL}/hangouts/${id}`, {
        ...formData,
        date: startISO,
        endTime: endISO,
        maxParticipants: parseInt(formData.maxParticipants),
        image: image
      });
      alert("Hangout Updated!");
      router.replace(`/hangout/${id}`);

    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this hangout? This will remove it for all participants.");
    
    if (!confirmed) return;

    try {
      await deleteHangout(id);
      alert("Event deleted successfully.");
      router.dismiss(2); 
      
      if (typeof window !== 'undefined') {
        window.location.href = "http://localhost:8081/";
      }
    } catch (err) {
      console.error(err);
      alert("Error: Could not delete the event.");
    }
  };

  if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" color="#1A3C22" /></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1A3C22" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerTitle}>EDIT HANGOUT</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>NAME OF EVENT</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(val) => setFormData({ ...formData, title: val })}
        />

        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          value={formData.description}
          onChangeText={(val) => setFormData({ ...formData, description: val })}
        />

        <Text style={styles.label}>LOCATION</Text>
        <TextInput
          style={styles.input}
          value={formData.location}
          onChangeText={(val) => setFormData({ ...formData, location: val })}
        />

        <Text style={styles.label}>SELECT DATE</Text>
        <Calendar
          current={selectedDay}
          onDayPress={day => setSelectedDay(day.dateString)}
          markedDates={{
            [selectedDay]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: '#1A3C24', 
              selectedTextColor: '#FFFFFF'
            },

          }}

          theme={{
            textSectionTitleColor: '#1A3C22',
            dayTextColor: '#1A3C22',
            monthTextColor: '#1A3C22',
            arrowColor: '#1A3C22',
            textDayFontWeight: '400',
            textMonthFontWeight: 'bold',
          }}
          style={{ borderWidth: 2, borderColor: '#1A3C22', borderRadius: 12, backgroundColor: "white" }}
        />

        <View style={styles.row}>
          <View style={{ width: '48%' }}>
            <Text style={styles.label}>FROM</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={startTime}
              onChangeText={(text) => handleTimeChange(text, setStartTime)}
            />
          </View>
          <View style={{ width: '48%' }}>
            <Text style={styles.label}>TO</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={endTime}
              onChangeText={(text) => handleTimeChange(text, setEndTime)}
            />
          </View>
        </View>

        <Text style={styles.label}>MAX PARTICIPANTS (Current: {currentAcceptedCount})</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.maxParticipants}
          onChangeText={(val) => setFormData({ ...formData, maxParticipants: val })}
        />

        <Text style={styles.label}>CATEGORY</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={formData.category}
            onValueChange={(val) => setFormData({ ...formData, category: val })}
          >
            <Picker.Item label="Cafe Hopping" value="Cafe Hopping" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Movie" value="Movie" />
            <Picker.Item label="Photography" value="Photography" />
            <Picker.Item label="Social" value="Social" />
            <Picker.Item label="Sports" value="Sports" />
            <Picker.Item label="Study" value="Study" />
            <Picker.Item label="Adventure" value="Adventure" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          ) : (
            <View style={styles.imagePlaceholder}><Text>+ CHANGE PHOTO</Text></View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={handleUpdate}>
          <Text style={styles.submitBtnText}>SAVE CHANGES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={handleDelete}>
          <Text style={{ color: '#FF4444', fontWeight: 'bold' }}>DELETE EVENT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}