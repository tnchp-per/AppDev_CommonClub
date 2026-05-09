import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import HomeHeader from "@/components/HomeHeader";
import HorizontalSection from "@/components/HorizontalSection";



export default function Home() {

  const [hangouts, setHangouts] = useState([]);
  useEffect(() => {
  fetch("http://localhost:5001/hangouts")
    .then((res) => res.json())
    .then((data) => {
      setHangouts(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  
  const upcoming = [
  {
    title: "Golf",
    location: "RBSC Golf Course",
    time: "3:00 PM",
    image: require("../../assets/images/logo.png"),
  },
  {
    title: "Morning Run",
    location: "Lumphini Park",
    time: "7:00 AM",
    image: require("../../assets/images/run.jpg"),
  },

  {
    title: "Pilates Class",
    location: "Virgin Active @SiamDiscovery",
    time: "9:00 AM",
    image: require("../../assets/images/pilates.jpg"),
  },
];

  const recommended = [
    {
      title: "Tennis",
      location: "RBSC Tennis Court",
      time: "6:00 PM",
      image: require("../../assets/images/logo.png"),
    },
    {
      title: "Coffee Hangout",
      location: "cafe",
      time: "8:00 AM",
      image: require("../../assets/images/logo.png"),
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
       
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