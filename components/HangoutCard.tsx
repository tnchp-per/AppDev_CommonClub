import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import hangoutCardStyle from "./HangoutCardStyle";

type HangoutCardProps = {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  image: any;
};

export default function HangoutCard({
  id,
  title,
  location,
  date,
  time,
  image
}: HangoutCardProps) {
  const router = useRouter();
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
        <Text style={hangoutCardStyle.time}>{date} at {time}</Text>
      </View>
    </Pressable>
  );
}