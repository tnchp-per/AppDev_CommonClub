import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F1',
        paddingHorizontal: 20,
        
    },
    topHeader: {
        marginTop: Platform.OS === 'ios' ? 80: 30,
        marginBottom: 20,
        alignItems: "center",
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#042917',
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
        backgroundColor: '#ffffff',
    },
    name: {
        fontSize: 22,
        color: '#042917',
        fontWeight: 'bold',
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
        paddingHorizontal: 20,
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
    },
    guestContainer: {
        flex: 1,
        backgroundColor: '#FAF9F1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#042917',
        marginTop: 20,
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: '#042917',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 12,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FAF9F1',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
