import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';


const BASE_URL = "http://localhost:5001/api/users"; // CHANGE THIS to your actual backend URL (e.g., http://
interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  username?: string;
  bio?: string;
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
  const [user, setUser] = useState<User | null>(null); // เริ่มต้นเป็น null เสมอ
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(false); // Stop loading regardless of result
      }
    };

    checkPersistedUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, { // URL becomes .../api/users/login
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // DEBUG: If you get the '<' error again, uncomment the line below to see the HTML
      // const text = await response.text(); console.log(text);

      const data = await response.json();

      if (response.ok) {
        // SUCCESS: Overwrite the 'Hong' data
        await AsyncStorage.setItem('user', JSON.stringify(data));
        setUser(data); 
        router.replace("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
    // Note: Your backend POST "/" route expects the whole body
      const response = await fetch(`${BASE_URL}/`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        router.replace("/");
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  // อย่าลืมส่ง signUp ออกไปใน Provider value
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, signUp, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};