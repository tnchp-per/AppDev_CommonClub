
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    padding: 20,
    backgroundColor: "#FAF9F1",
    flexGrow: 1,
  },
  centerContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  header: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20,
    marginTop: 40,
    color: "#1A3C22"
  },
  card: { 
    backgroundColor: "white", 
    padding: 15, 
    marginBottom: 15, 
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3 
  },
  title: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 8,
    color: "#1A3C22"
  },
  errorText: { 
    color: "red", 
    fontSize: 16,
    fontWeight: "bold"
    
  }
});