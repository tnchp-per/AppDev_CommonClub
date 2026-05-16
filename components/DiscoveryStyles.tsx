import { Platform, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  centeredHeader: { 
    marginBottom: 20, 
    alignItems: 'center' 
},
  pageTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#042917', 
    letterSpacing: 1, 
    marginTop: Platform.OS === 'ios' ? 20: 30, 
},
  searchSection: { 
    paddingHorizontal: 20,
     marginBottom: 25 
    },
  searchWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F0F0F0', 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    height: 50 
},
  searchInput: { 
    flex: 1, 
    fontSize: 16, 
    color: '#042917', 
},
  categoryRow: { 
    height: 150, 
    borderRadius: 20, 
    overflow: 'hidden', 
    marginBottom: 18 
},
  catImage: { width: '100%', height: '100%', position: 'absolute' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  catTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center', letterSpacing: 1 },
  resultsText: { marginBottom: 15, color: '#666', fontSize: 14, fontWeight: '600' },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export default style;