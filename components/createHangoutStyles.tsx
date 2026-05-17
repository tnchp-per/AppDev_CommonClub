import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F1",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Platform.OS === 'ios' ? 80 : 30,
    marginBottom: 30,
    letterSpacing: 1,
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
    borderWidth: 2,
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
  imageUploadBox: {
    width: '100%',
    height: 180,
    backgroundColor: '#FAF9F1',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1A3C22',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    color: '#1A3C22',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  submitBtnText: { color: "#FAF9F1", fontWeight: "bold", fontSize: 18 },

  guestContainer: {
    flex: 1,
    backgroundColor: '#FDFCF0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  guestCard: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 24,
    alignItems: 'center',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  guestLogoImage: {
    width: 180,
    height: 80,
    marginBottom: 20,
  },
  guestEmoji: {
    fontSize: 50,
    marginBottom: 20,
  },
  guestTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A3C22',
    marginBottom: 10,
  },
  guestSubtitle: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
    fontSize: 16,
    marginBottom: 30,
  },
  guestLoginBtn: {
    backgroundColor: '#1A3C22',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  guestLoginBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  guestBackText: {
    color: '#999',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 10,
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'ios' ? 10 : 16,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A3C22',
    letterSpacing: 1
  }
});