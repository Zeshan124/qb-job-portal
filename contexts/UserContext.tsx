"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import Cookies from "js-cookie";
import LoadingSpinner from "@/components/loader/LoadingSpinner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* <Spin size="large" /> */}
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
