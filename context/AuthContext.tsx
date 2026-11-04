"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { apiRequest } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string, address?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("zaraz_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem("zaraz_user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("zaraz_token", data.token);
        }
        toast.success(`Welcome back, ${data.user.name}!`);
        return true;
      } else {
        toast.error(data.message || "Login failed");
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string,
    address?: string
  ): Promise<boolean> => {
    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, phone, address }),
      });

      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem("zaraz_user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("zaraz_token", data.token);
        }
        toast.success("Account created successfully in MongoDB Atlas!");
        return true;
      } else {
        toast.error(data.message || "Registration failed");
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zaraz_user");
    localStorage.removeItem("zaraz_token");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
