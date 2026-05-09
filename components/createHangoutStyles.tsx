import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FAF9F1", 
    padding: 25 
  },
  header: { 
    fontSize: 28, 
    fontWeight: "400", 
    textAlign: "center", 
    marginTop: 50, 
    marginBottom: 30, 
    letterSpacing: 2, 
    color: '#1A3C22',
  },
  inputGroup: { gap: 12 },
  label: { 
    fontSize: 13, 
    fontWeight: "700", 
    color: "#1A3C22", 
    marginBottom: 4,
    marginTop: 10
  },
  input: { 
    borderWidth: 2, // Thicker chunky borders
    borderColor: "#1A3C22", 
    borderRadius: 12, 
    padding: 15, 
    backgroundColor: "white", 
    fontSize: 14,
    color: "#1A3C22"
  },
  textArea: { height: 120, textAlignVertical: "top" },
  dropdownContainer: {
    borderWidth: 2,
    borderColor: "#1A3C22",
    borderRadius: 12,
    backgroundColor: "white",
    height: 55,
    justifyContent: "center",
    overflow: "hidden"
  },
  pickerStyle: { width: '100%', color: "#1A3C22" },
  row: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginVertical: 10 
  },
  halfBtn: { 
    backgroundColor: "#8C9C8E", 
    paddingVertical: 15, 
    borderRadius: 12, 
    width: "100%", 
    alignItems: "center" 
  },
  btnText: { color: "#FAF9F1", fontWeight: "600", fontSize: 13 },
  dateTimeText: {
    fontSize: 13,
    color: "#1A3C22",
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500"
  },
  submitBtn: { 
    backgroundColor: "#1A3C22", 
    padding: 20, 
    borderRadius: 35, 
    marginTop: 30, 
    alignItems: "center" 
  },
  submitBtnText: { color: "#FAF9F1", fontWeight: "bold", fontSize: 18 }
});