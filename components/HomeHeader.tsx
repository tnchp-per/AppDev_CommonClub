import { Image, Text, View } from "react-native";

export default function HomeHeader() {
  return (
    <View
      style={{
        paddingTop: 60,
        paddingHorizontal: 20,
        marginBottom: 30,
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{
          width: 50,
          height: 50,
          marginBottom: 10,
        }}
      />

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Welcome, Hong
      </Text>
    </View>
  );
}