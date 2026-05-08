import { ScrollView, Text, View } from "react-native";
import HangoutCard from "./HangoutCard";

type HangoutItem = {
  title: string;
  location: string;
  time: string;
};

type HorizontalSectionProps = {
  title: string;
  data: HangoutItem[];
};

export default function HorizontalSection({
  title,
  data,
}: HorizontalSectionProps) {
  return (
    <View style={{ marginBottom: 30 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        {title}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <HangoutCard
            key={index}
            title={item.title}
            location={item.location}
            time={item.time}
          />
        ))}
      </ScrollView>
    </View>
  );
}