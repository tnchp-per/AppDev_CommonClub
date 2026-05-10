import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { AuthProvider } from "../context/AuthContext";


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
