import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isLoading || !isReady) return;

    const inAuthGroup = segments[0] === '(auth)';

    // ถ้า Login แล้วแต่ยังค้างหน้า Login ให้ส่งไปหน้าหลัก
    if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }

    // สังเกตว่าเราจะไม่เขียนเงื่อนไข "if (!user) { router.replace... }" แล้ว
    // เพื่อปล่อยให้หน้า Profile/Create แสดง UI ของตัวเองออกมา
  }, [user, isLoading, segments, isReady]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export const unstable_settings = {
  // ให้แอปเริ่มต้นที่กลุ่ม tabs (หน้า Home)
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}