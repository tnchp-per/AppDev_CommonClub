import { Text, View } from "react-native";

import hangoutCardStyle from "./HangoutCardStyle";

type HangoutCardProps = {
  title: string;
  location: string;
  time: string;
};

export default function HangoutCard({
  title,
  location,
  time,
}: HangoutCardProps) {
  return (
    <View style={hangoutCardStyle.card}>
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