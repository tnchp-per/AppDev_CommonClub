import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        width: 280,
        backgroundColor: "#FAF9F1",
        paddingTop: 40,
        paddingHorizontal: 20,
        borderRightWidth: 1,
        borderColor: "#E5E5E5",
        justifyContent: "flex-start"
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 10
    },
    heading: {
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 40,
        color: "#042917"
    },
    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 40,
        backgroundColor: "#FFF5F5",

    },
    logoutText: { marginLeft: 12, fontSize: 16, fontWeight: "600", color: "#E06666" }
})

export default style;