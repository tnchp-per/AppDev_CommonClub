import { StyleSheet } from "react-native";

const hangoutCardStyle = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginRight: 18,
    overflow: "hidden",
    paddingBottom: 16,
  },

  image: {
    width: "100%",
    height: 160,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
    marginTop: 16,
    marginLeft: 12,
    marginBottom: 6
  },

  location: {
    fontSize: 15,
    color: "#666666",
    marginBottom: 4,
    marginLeft: 12
  },

  time: {
    fontSize: 15,
    color: "#666666",
    marginLeft: 12
  },
});

export default hangoutCardStyle;