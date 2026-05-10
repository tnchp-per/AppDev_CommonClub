import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

const AuthContext = createContext<any>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Instead of null, put Hong's data here manually
  const [user, setUser] = useState({
    id: "60d5ec49f1b2c8b1f8e4e1a2", // Make sure this matches your MongoDB _id
    name: "Hong",
    email: "hong@example.com"
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);