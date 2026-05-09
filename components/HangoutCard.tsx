import { Image, Text, View } from "react-native";

import hangoutCardStyle from "./HangoutCardStyle";

type HangoutCardProps = {
  title: string;
  location: string;
  time: string;
  image: any;
};

export default function HangoutCard({
  title,
  location,
  time,
  image
}: HangoutCardProps) {
  return (
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
  );
}