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
  image?: string;
  database?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string,
    address?: string
  ) => Promise<boolean>;
  socialLogin: (
    email: string,
    name?: string,
    image?: string,
    provider?: string
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  token: null,
  login: async () => false,
  register: async () => false,
  socialLogin: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("zaraz_user");
      const savedToken = localStorage.getItem("zaraz_token");
      if (savedToken) {
        setToken(savedToken);
      }
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // If token exists, verify and refresh user profile from zaraz_auth_db
      if (savedToken) {
        apiRequest("/auth/me")
          .then((res) => {
            if (res.success && res.user) {
              setUser(res.user);
              localStorage.setItem("zaraz_user", JSON.stringify(res.user));
            }
          })
          .catch(() => {});
      }
    } catch (e) {
      console.error("[AuthContext Init Error]:", e);
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
        setToken(data.token);
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
        setToken(data.token);
        localStorage.setItem("zaraz_user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("zaraz_token", data.token);
        }
        toast.success("Account created successfully in MongoDB Atlas zaraz_auth_db!");
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

  const socialLogin = async (
    email: string,
    name?: string,
    image?: string,
    provider?: string
  ): Promise<boolean> => {
    try {
      const data = await apiRequest("/auth/social", {
        method: "POST",
        body: JSON.stringify({ email, name, image, provider }),
      });

      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("zaraz_user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("zaraz_token", data.token);
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("zaraz_user");
    localStorage.removeItem("zaraz_token");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, token, login, register, socialLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
