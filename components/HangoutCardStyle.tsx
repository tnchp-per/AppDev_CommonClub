import { StyleSheet } from "react-native";

const hangoutCardStyle = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginRight: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111111",
  },

  location: {
    fontSize: 15,
    color: "#666666",
    marginBottom: 4,
  },

  time: {
    fontSize: 15,
    color: "#666666",
  },
});

export default hangoutCardStyle;