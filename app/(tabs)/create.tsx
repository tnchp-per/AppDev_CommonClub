import { Picker } from "@react-native-picker/picker"; // FIXED IMPORT
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { createHangout } from "../../api/hangoutApi";
import { styles } from "../../components/createHangoutStyles";
import { useAuth } from "../../context/AuthContext";

export default function CreateHangout() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState('2026-05-09');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [image, setImage] = useState<string | null>(null);
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "Social",
    maxParticipants: "",
    image: ""
  });

  const handleTimeChange = (text: string, setter: (val: string) => void) => {
    let cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length > 2) {
      cleaned = cleaned.slice(0, 2) + ":" + cleaned.slice(2, 4);
    }
    setter(cleaned.slice(0, 5));
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to create an event.");
      return;
    }

    if (!formData.title || !formData.location || !startTime || !endTime) {
      Alert.alert("Please fill in the name, location, and times.");
      return;
    }

    const [startHours, startMins] = startTime.split(':').map(Number);
    const [endHours, endMins] = endTime.split(':').map(Number);
    const totalStartMinutes = startHours * 60 + startMins;
    const totalEndMinutes = endHours * 60 + endMins;

    if (totalEndMinutes <= totalStartMinutes) {
      Alert.alert("Time Error", "End time must be after start time.");
      return;
    }

    try {
      const startISO = new Date(`${selectedDay}T${startTime}:00`).toISOString();
      const endISO = new Date(`${selectedDay}T${endTime}:00`).toISOString();

      const finalData = {
        ...formData,
        host: user.id,
        date: startISO,
        endTime: endISO,
        maxParticipants: parseInt(formData.maxParticipants) || 5,
        ...(image && { image: image })
      };

      await createHangout(finalData);
      Alert.alert("Success!", "Your event is scheduled.", [
        { text: "Awesome", onPress: () => router.push("/") }
      ]);
    } catch (err) {
      Alert.alert("Server Error", "Could not connect to the database.");
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need photo access to upload images.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9], // Perfect for hangout banners
      quality: 0.3,    // Keep this low for Base64!
      base64: true,   // This is the magic line
    });

    if (!result.canceled) {
      // We create a Data URI string: "data:image/jpeg;base64,/9j/4AAQSk..."
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(base64Image);
    }
  };

  if (!user) {
    return (
      <View style={styles.guestContainer}>
        <View style={styles.guestCard}>
          <Image 
            source={require("../../assets/images/logo_transparent.png")} 
            style={styles.guestLogoImage} 
            resizeMode="contain" 
          />
          <Text style={styles.guestTitle}>Host a Hangout</Text>
          <Text style={styles.guestSubtitle}>
            Connect with people nearby! You need to be a member to create and manage events.
          </Text>
          
          <TouchableOpacity 
            style={styles.guestLoginBtn} 
            onPress={() => router.push("/login")}
          >
            <Text style={styles.guestLoginBtnText}>Login / Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.guestBackText}>Maybe later</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Text style={styles.header}>Create Hangout</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>NAME OF EVENT</Text>
        <TextInput 
          style={styles.input} 
          placeholder="ENTER EVENT'S NAME" 
          onChangeText={(val) => setFormData({...formData, title: val})}
        />

        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="ENTER DESCRIPTION (MAX 50 WORDS)"
          multiline
          onChangeText={(val) => setFormData({...formData, description: val})}
        />

        

        <Text style={styles.label}>LOCATION</Text>
        <TextInput 
          style={styles.input} 
          placeholder="ENTER EVENT'S LOCATION"
          onChangeText={(val) => setFormData({...formData, location: val})}
        />

        <Text style={styles.label}>SELECT DATE</Text>
        <Calendar
          onDayPress={day => setSelectedDay(day.dateString)}
          markedDates={{ [selectedDay]: { selected: true, selectedColor: '#1A3C22' } }}
          theme={{ selectedDayBackgroundColor: '#1A3C22', todayTextColor: '#8C9C8E' }}
          style={{ borderWidth: 2, borderColor: '#1A3C22', borderRadius: 12 }}
        />

        <View style={styles.row}>
          <View style={{ width: '48%' }}>
            <Text style={styles.label}>FROM</Text>
            <TextInput 
              style={styles.input} 
              placeholder="13:00"
              keyboardType="numeric"
              value={startTime}
              onChangeText={(text) => handleTimeChange(text, setStartTime)}
            />
          </View>
          <View style={{ width: '48%' }}>
            <Text style={styles.label}>TO</Text>
            <TextInput 
              style={styles.input} 
              placeholder="14:00"
              keyboardType="numeric"
              value={endTime}
              onChangeText={(text) => handleTimeChange(text, setEndTime)}
            />
          </View>
        </View>

        <Text style={styles.dateTimeText}>
          SCHEDULED: {selectedDay}  {startTime} - {endTime}
        </Text>

        <Text style={styles.label}>MAX PARTICIPANTS</Text>
        <TextInput 
          style={styles.input} 
          placeholder="5"
          keyboardType="numeric"
          onChangeText={(val) => setFormData({...formData, maxParticipants: val})}
        />

        <Text style={styles.label}>CATEGORY</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={formData.category}
            onValueChange={(itemValue) => setFormData({...formData, category: itemValue})}
          >
            <Picker.Item label="Cafe Hopping" value="Cafe Hopping" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Movie" value="Movie" />
            <Picker.Item label="Photography" value="Photography" />
            <Picker.Item label="Social" value="Social" />
            <Picker.Item label="Sports" value="Sports" />
            <Picker.Item label="Study" value="Study" />
            <Picker.Item label="Other" value="Other" />
            
          </Picker>
        </View>

        {/* IMAGE UPLOAD SECTION */}
      <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>+ ADD PHOTO (OPTIONAL)</Text>
          </View>
        )}
      </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>CREATE HANGOUT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}