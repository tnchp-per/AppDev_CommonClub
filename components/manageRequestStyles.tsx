import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
     padding: 20 
  },
  headerTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1A3C22', 
    letterSpacing: 1 
  },
});

export const sectionStyles = StyleSheet.create({
  title: { fontSize: 14, fontWeight: 'bold', color: '#1A3C22', textTransform: 'uppercase', marginBottom: 15, opacity: 0.6 },
  card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF', padding: 12, borderRadius: 12, marginBottom: 10 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { fontSize: 15, fontWeight: '500', color: '#1A3C22' },
  actions: { flexDirection: 'row' },
  removeBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#f0f0f0' },
  removeBtnText: { color: '#888', fontSize: 12, fontWeight: '600' },
  emptyText: { color: '#999', fontStyle: 'italic', marginBottom: 10 },
  acceptBtn: {
    backgroundColor: '#1A3C22',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  }
});

export default { headerStyles, sectionStyles };
