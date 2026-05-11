import React, { createContext, useContext, useState } from 'react';

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

  const login = async (email: string, password: string) => {
    // จำลองการโหลด (เหมือนดึงข้อมูลจากเน็ต)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          // ถ้าใส่ค่ามาครบ ให้ถือว่า Login สำเร็จ
          const userData = {
            id: "60d5ec49f1b2c8b1f8e4e1a2",
            name: "Hong", // หรือจะเอาชื่อมาจาก email ก็ได้
            email: email,
          };
          setUser(userData); // อัปเดตสถานะ user
          resolve(userData);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000); // รอ 1 วินาที
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};