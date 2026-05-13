import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

// เปลี่ยน localhost เป็น IP เครื่องคอมคุณถ้าใช้เครื่องจริง/Emulator
const BASE_URL = "http://192.168.1.XX:5001/api/users";

interface User {
  id: string; // หรือเปลี่ยนเป็น _id ให้ตรงกับ MongoDB
  name: string;
  email: string;
  image?: string;
  username?: string;
  bio?: string;
  interests?: string[];
}

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPersistedUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error loading persisted user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkPersistedUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // จัด Format ข้อมูลให้มี id (ไม่มีขีดล่าง) ตาม Interface
        const userToSave = { ...data, id: data._id || data.id };
        await AsyncStorage.setItem('user', JSON.stringify(userToSave));
        setUser(userToSave);
        router.replace("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // สำคัญ: แปลง _id เป็น id เพื่อให้หน้า Profile เรียกใช้ง่ายๆ
        const userToSave = { ...data, id: data._id || data.id };
        await AsyncStorage.setItem('user', JSON.stringify(userToSave));
        setUser(userToSave);

        alert("Sign up successful!");
        router.replace("/");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Network Error: Cannot connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, signUp, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};