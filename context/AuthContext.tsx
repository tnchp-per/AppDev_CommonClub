import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

//const BASE_URL = "http://192.168.1.61:5001/api/users";
const BASE_URL = "http://localhost:5001/api/users";

interface User {
  id: string;
  name: string;
  username: string; 
  email: string;
  image?: string;
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
    setIsLoading(true);
    try {
      const cleanEmail = email.trim();
      const cleanPassword = password.trim();

      const response = await axios.post(`${BASE_URL}/login`, { 
        email: cleanEmail, 
        password: cleanPassword 
      });
      
      const data = response.data;

      if (data) {
        const userToSave = { ...data, id: data._id || data.id };
        await AsyncStorage.setItem('user', JSON.stringify(userToSave));
        setUser(userToSave);
        router.replace("/(tabs)/profile");
      }
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login Failed: " + (error.response?.data?.message || "Invalid credentials"));
    } finally {
      setIsLoading(false);
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

  const signUp = async (name: string, username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userToSave = {
          ...data,
          id: data._id || data.id,
          username: data.username // มั่นใจว่ามี username กลับมา
        };

        await AsyncStorage.setItem('user', JSON.stringify(userToSave));
        setUser(userToSave);
        router.replace("/");
      } else {
        // ถ้า Backend ส่ง Error มา (เช่น Username ซ้ำ) ให้โยนออกไป alert
        throw new Error(data.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Signup Error:", error);
      throw error; // ส่ง Error กลับไปให้หน้า SignUp.tsx จัดการ alert
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