import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HangoutDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* This sets the title in the top header bar */}
      <Stack.Screen options={{ title: "Hangout Details", headerBackTitle: "Back" }} />
      
      <Text style={styles.text}>Viewing Hangout ID:</Text>
      <Text style={styles.idText}>{id}</Text>
      
      {/* Later, we will add an Axios call here to fetch 
          the specific hangout data from Port 5001 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FDFCF0" },
  text: { fontSize: 18, color: "#666" },
  idText: { fontSize: 16, fontWeight: "bold", marginTop: 10, color: "#1A3C22" }
});