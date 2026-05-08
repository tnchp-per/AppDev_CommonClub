import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B3B2E',
    },

    header: {
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#E8DFC7',
    },

    name: {
        fontSize: 26,
        color: '#F5EFD8',
        fontWeight: '600',
        letterSpacing: 1,
    },

    username: {
        fontSize: 15,
        color: '#D8CFAF',
        marginTop: 4,
    },

    bio: {
        textAlign: 'center',
        marginTop: 12,
        color: '#E8DFC7',
        lineHeight: 22,
        paddingHorizontal: 20,
    },

    editButton: {
        marginTop: 20,
        backgroundColor: '#E8DFC7',
        paddingHorizontal: 28,
        paddingVertical: 10,
        borderRadius: 25,
    },

    editButtonText: {
        color: '#0B3B2E',
        fontWeight: '600',
        letterSpacing: 1,
    },

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 35,
        marginBottom: 10,
    },

    statCard: {
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 24,
        color: '#F5EFD8',
        fontWeight: 'bold',
    },

    statLabel: {
        color: '#D8CFAF',
        marginTop: 4,
        fontSize: 14,
    },

    section: {
        marginTop: 30,
        paddingHorizontal: 25,
    },

    sectionTitle: {
        fontSize: 18,
        color: '#F5EFD8',
        marginBottom: 15,
        letterSpacing: 1,
    },

    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    tag: {
        backgroundColor: '#184D3B',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#D8CFAF',
    },

    tagText: {
        color: '#F5EFD8',
    },

    menuItem: {
        paddingVertical: 18,
        borderBottomWidth: 0.5,
        borderColor: '#295746',
    },

    menuText: {
        fontSize: 16,
        color: '#F5EFD8',
    },
});

export default styles;