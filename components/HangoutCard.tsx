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
  image
}: HangoutCardProps) {
  const router = useRouter();

  const handlePress = () => {
    // This pushes the user to /hangout/69ff...
    router.push(`/hangout/${id}`);
  };

  return (
    <Pressable 
      onPress={handlePress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 } // Gives a nice "click" feedback
      ]}
    >
      <View style={hangoutCardStyle.card}>
          <Image
              source={image}
              style={hangoutCardStyle.image}
          />
          <Text style={hangoutCardStyle.title}>
              {title}
          </Text>

          <Text style={hangoutCardStyle.location}>
              {location}
          </Text>

          <Text style={hangoutCardStyle.time}>
              {time}
           </Text>
      </View>
    </Pressable>
  );
}