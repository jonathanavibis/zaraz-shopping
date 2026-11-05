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
    async function initAuth() {
      try {
        const savedUser = localStorage.getItem("zaraz_user");
        const savedToken = localStorage.getItem("zaraz_token");

        if (savedToken) {
          setToken(savedToken);
        }
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        // 1. Check for Better Auth OAuth session (Google / GitHub)
        try {
          const sessionRes = await fetch("/api/auth/get-session");
          if (sessionRes.ok) {
            const session = await sessionRes.json();
            if (session && session.user && session.user.email) {
              // Sync OAuth user with MongoDB zaraz_auth_db and obtain JWT
              const syncData = await apiRequest("/auth/social", {
                method: "POST",
                body: JSON.stringify({
                  email: session.user.email,
                  name: session.user.name,
                  image: session.user.image,
                  provider: "oauth",
                }),
              });

              if (syncData.success && syncData.user) {
                setUser(syncData.user);
                setToken(syncData.token);
                localStorage.setItem("zaraz_user", JSON.stringify(syncData.user));
                if (syncData.token) {
                  localStorage.setItem("zaraz_token", syncData.token);
                }
              }
            }
          }
        } catch (sessErr) {
          // Better Auth session check error ignored in offline / static dev
        }

        // 2. If token exists, verify and refresh user profile from zaraz_auth_db
        if (savedToken) {
          try {
            const meRes = await apiRequest("/auth/me");
            if (meRes.success && meRes.user) {
              setUser(meRes.user);
              localStorage.setItem("zaraz_user", JSON.stringify(meRes.user));
            }
          } catch {}
        }
      } catch (e) {
        console.error("[AuthContext Init Error]:", e);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
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
        toast.error(data.message || "Invalid credentials. Please check your email and password.");
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
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

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("zaraz_user");
    localStorage.removeItem("zaraz_token");
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
    } catch {}
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
