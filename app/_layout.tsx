import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from "../context/AuthContext";


export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    // ถ้ายังโหลดไม่เสร็จ หรือแอปยัง Mount ไม่เสร็จ ให้หยุดรอก่อน
    if (isLoading || !isReady) return;

    const inAuthGroup = segments[0] === 'login';

    if (!user && !inAuthGroup) {
      // ใช้ setTimeout เล็กน้อยเพื่อให้แน่ใจว่า Navigator พร้อมแล้วจริงๆ
      const timeout = setTimeout(() => {
        router.replace('/login');
      }, 1);
      return () => clearTimeout(timeout);
    } else if (user && inAuthGroup) {
      const timeout = setTimeout(() => {
        router.replace('/(tabs)');
      }, 1);
      return () => clearTimeout(timeout);
    }
  }, [user, isLoading, segments, isReady]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
