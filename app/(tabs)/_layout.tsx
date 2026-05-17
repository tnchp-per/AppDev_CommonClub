import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, router } from "expo-router";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import style from "../../components/sideBarStyles";
import { useAuth } from "../../context/AuthContext";

function WebSidebar() {
  const { logout } = useAuth();
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      {/* Sidebar */}
      <View style={style.container}>
        <Image
          source={require("../../assets/images/logo_transparent.png")}
          style={style.logo}
        />
        <Text style={style.heading}>
          CommonClub
        </Text>

        <SidebarButton title="Home" icon="home-outline" route="/" />
        <SidebarButton title="Discover" icon="search-outline" route="/discover" />
        <SidebarButton title="Create Hangout" icon="add-circle-outline" route="/create" />
        <SidebarButton title="Profile" icon="person-outline" route="/profile" />


        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={logout}
          style={style.logoutBtn}
        >
          <Ionicons name="log-out-outline" size={20} color="#E06666" />
          <Text style={style.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ width: "100%", maxWidth: 1200, flex: 1 }}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: "none" },
              sceneStyle: { backgroundColor: "#FAF9F1" },
            }}
          >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="discover" />
            <Tabs.Screen name="create" />
            <Tabs.Screen name="profile" />
          </Tabs>
        </View>
      </View>
    </View>
  );
}

function SidebarButton({
  title,
  icon,
  route,
}: {
  title: string;
  icon: any;
  route: string;
}) {
  return (
    <TouchableOpacity
      onPress={() => router.push(route as any)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 8,
      }}
    >
      <Ionicons
        name={icon}
        size={20}
        color="#042917"
      />

      <Text
        style={{
          marginLeft: 12,
          fontSize: 16,
          fontWeight: "500",
          color: "#042917"
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function MobileTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="search"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default function Layout() {
  if (Platform.OS === "web") {
    return <WebSidebar />;
  }

  return <MobileTabs />;
}