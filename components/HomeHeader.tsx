import { Text, View } from "react-native";

export default function HomeHeader() {
  return (
    <View
      style={{
        paddingTop: 60,
        paddingHorizontal: 0,
        marginBottom: 30,
       
      }}
    >
      

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