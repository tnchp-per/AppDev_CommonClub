// styles/homeStyles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    padding: 20,
    backgroundColor: "#f5f5f5",
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
    marginBottom: 8 
  },
  errorText: { 
    color: "red", 
    fontSize: 16,
    fontWeight: "bold"
  }
});