import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAF9F1",
        paddingHorizontal: 20,
    },
    topHeader: {
        marginTop: 60,
        marginBottom: 20,
        alignItems: "center",
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#042917",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#042917",
    },
    categoriesContainer: {
        flexDirection: "column",
        gap: 20,
    },
    categoryCard: {
        height: 160,
        borderRadius: 20,
        overflow: "hidden",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    categoryImage: {
        width: "100%",
        height: "100%",
    },
    categoryOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.25)", // ปรับให้จางลงเพื่อให้เห็นรูปชัดขึ้นเหมือนในแบบ
        justifyContent: "center",
        alignItems: "center",
    },
    categoryText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});