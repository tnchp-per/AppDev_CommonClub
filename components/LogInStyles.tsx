import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAF9F1", // สีเบจเดียวกับ Profile
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    headerArea: {
        alignItems: "center",
        marginBottom: 40,
    },
    welcomeText: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#042917",
        letterSpacing: 1,
    },
    subText: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    formContainer: {
        width: "100%",
    },
    inputWrapper: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#042917",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#FFFFFF",
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#042917",
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 30,
    },
    forgotText: {
        fontSize: 13,
        color: "#666",
        textDecorationLine: "underline",
    },
    loginButton: {
        backgroundColor: "#042917",
        height: 55,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    loginButtonText: {
        color: "#FAF9F1",
        fontSize: 16,
        fontWeight: "bold",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
    },
    footerText: {
        fontSize: 14,
        color: "#666",
    },
    signupText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#042917",
    },
});