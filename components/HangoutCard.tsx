import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import hangoutCardStyle from "./HangoutCardStyle";

type HangoutCardProps = {
  id: string; // <--- Add this!
  title: string;
  location: string;
  time: string;
  image: any;
};

export default function HangoutCard({
  id,
  title,
  location,
  time,
  image // This is usually a string from MongoDB
}: HangoutCardProps) {
  const router = useRouter();

  // 1. Determine the source
  // If image is a string starting with "data:", it's our Base64.
  // If it's empty or null, use the local logo.
  const imageSource = (typeof image === 'string' && image.startsWith('data:image')) 
    ? { uri: image } 
    : require('../assets/images/logo.png'); 

  const handlePress = () => {
    router.push(`/hangout/${id}`);
  };

  return (
    <Pressable 
      onPress={handlePress}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
    >
      <View style={hangoutCardStyle.card}>
          <Image
              source={imageSource} 
              style={hangoutCardStyle.image}
          />
          <Text style={hangoutCardStyle.title}>{title}</Text>
          <Text style={hangoutCardStyle.location}>{location}</Text>
          <Text style={hangoutCardStyle.time}>{time}</Text>
      </View>
    </Pressable>
  );
}