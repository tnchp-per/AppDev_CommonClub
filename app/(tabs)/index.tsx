import { ScrollView, View } from "react-native";

import HomeHeader from "@/components/HomeHeader";
import HorizontalSection from "@/components/HorizontalSection";

export default function Home() {
  const upcoming = [
    {
      title: "Cafe Meetup",
      location: "Siam",
      time: "7:00 PM",
    },
    {
      title: "Movie Night",
      location: "Central World",
      time: "9:00 PM",
    },
  ];

  const recommended = [
    {
      title: "Gym Session",
      location: "อโศก",
      time: "6:00 PM",
    },
    {
      title: "Board Game Cafe",
      location: "ทองหล่อ",
      time: "8:00 PM",
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5",
      }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <HomeHeader />

        <HorizontalSection
          title="Upcoming Events"
          data={upcoming}
        />

        <HorizontalSection
          title="Recommended Hangouts"
          data={recommended}
        />
      </View>
    </ScrollView>
  );
}