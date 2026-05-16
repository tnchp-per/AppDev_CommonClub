import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FAF9F1' 
    },
    profileHeader: { 
        alignItems: 'center', 
        padding: 30 , 
        marginTop: 25 
    },
    center: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#FAF9F1' 
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: Platform.OS === 'ios' ? 15 : 16 ,
        zIndex: 10,
    },
    topLabel: { fontSize: 18, fontWeight: 'bold', color: '#042917', marginBottom: 15 },
    avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: '#A5A198' },
    name: { fontSize: 22, fontWeight: '900', color: '#042917', marginTop: 15 },
    username: { fontSize: 14, color: '#4D7260', marginBottom: 5 },
    bio: { fontSize: 14, color: '#042917', opacity: 0.8, marginTop: 5 },
    
    statsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 60, marginTop: 30 },
    statBox: { alignItems: 'center' },
    statNumber: { fontSize: 20, fontWeight: 'bold', color: '#042917' },
    statLabel: { fontSize: 12, color: '#042917', opacity: 0.6 },

    section: { paddingHorizontal: 30, marginTop: 40 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#042917', marginBottom: 10 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tag: { backgroundColor: '#0D331C', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
    tagText: { color: '#FAF9F1', fontSize: 11, fontWeight: 'bold' },
    emptyText: { color: '#A5A198', fontStyle: 'italic' }
});

export default styles;