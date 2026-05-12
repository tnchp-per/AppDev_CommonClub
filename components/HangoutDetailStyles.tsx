import { Dimensions, Platform, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FDFCF0",
  },
  // Header with Back Arrow and Logo
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
    top: Platform.OS === 'ios' ? 10 : 16 ,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1A3C22', 
    letterSpacing: 1
  },

  mainTitle: {
    fontSize: 30,
    color: "#1A3C22",
    fontWeight: '500',
    marginLeft: 12,
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: "Georgia",  
  },
  dateTimeText: {
    fontSize: 20,
    color: "#1A3C22",
    margin: 8,
    marginLeft: 12,
    fontFamily: "Georgia",
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 12,
  },
  locationText: {
    fontSize: 14,
    color: "#1A3C22",
    marginLeft: 5,
  },
  participantText: {
    fontSize: 14,
    color: "#1A3C22",
    marginBottom: 25,
    marginLeft: 12,
  },

  // Host Section
  aboutHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#1A3C22",
    marginBottom: 10,
    marginLeft: 12,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 12,
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#1A3C22',
    marginLeft: 6,
  },
  hostName: {
    fontSize: 16,
    color: "#1A3C22",
    marginLeft: 15,
  },
  descriptionText: {
    fontSize: 14,
    color: "#1A3C22",
    lineHeight: 20,
    marginLeft: 12,
  },

  // Footer
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    backgroundColor: "#FDFCF0",
  },
  Button: {
    backgroundColor: "#1A3C22",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  ButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFCF0",
  },
  image: { 
    width: width,        // Forces full screen width
    height: 350,
    resizeMode: 'cover',
    marginTop: 0
 },
});

export default styles;