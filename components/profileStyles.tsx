import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F1', // Light cream background
    },
    topHeader: {
        alignItems: 'center',
        paddingTop: 60, // Adjust based on your phone's notch/safe area
        paddingBottom: 10,
    },
    pageTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#042917',
        letterSpacing: 1,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#A5A198',
    },
    name: {
        fontSize: 22,
        color: '#042917',
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    username: {
        fontSize: 14,
        color: '#4D7260',
        marginTop: 4,
    },
    bio: {
        textAlign: 'center',
        marginTop: 15,
        color: '#042917',
        lineHeight: 20,
        fontSize: 13,
    },
    editButton: {
        marginTop: 20,
        backgroundColor: '#0D331C', // Darkest green
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    editButtonText: {
        color: '#FAF9F1',
        fontWeight: 'bold',
        fontSize: 12,
        letterSpacing: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 35,
        paddingHorizontal: 20,
    },
    statCard: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 22,
        color: '#042917',
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#4D7260',
        marginTop: 4,
        fontSize: 14,
        fontWeight: '500',
    },
    section: {
        marginTop: 30,
        paddingHorizontal: 25,
    },
    sectionTitle: {
        fontSize: 14,
        color: '#042917',
        marginBottom: 12,
        fontWeight: '600',
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#0D331C',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    tagText: {
        color: '#FAF9F1',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    emptyText: {
        color: '#A5A198',
        fontStyle: 'italic',
    },
    // Action Block Buttons (Hangout, Request, Saved)
    primaryBlockButton: {
        backgroundColor: '#4D7260', // Medium green for priority action
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 20,
    },
    secondaryBlockButton: {
        backgroundColor: '#A5A198', // Beige/Tan for secondary actions
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 20,
    },
    blockButtonText: {
        color: '#FAF9F1',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    logoutButton: {
        marginTop: 20,
        alignSelf: 'center',
    },
    logoutButtonText: {
        color: '#E06666', // Muted red
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }
});

export default styles;