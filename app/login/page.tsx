"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import SocialButtons from "@/components/SocialButtons";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      router.push("/");
    }
  };

  const handleDemoLogin = async () => {
    setEmail("user@zaraz.com");
    setPassword("Password123");
    setLoading(true);
    const success = await login("user@zaraz.com", "Password123");
    setLoading(false);
    if (success) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#0b1420] border border-emerald-950/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative emerald glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center mx-auto mb-3 text-black font-black text-2xl shadow-lg shadow-emerald-900/40">
            Z
          </div>
          <h1 className="text-2xl font-black text-white">Welcome Back</h1>
          <p className="text-xs text-gray-400 mt-1">
            Sign in to Zaraz.app with your Google, GitHub or email account.
          </p>
        </div>

        {/* 1-Click Social Sign-in (Google & GitHub) */}
        <div className="mb-5">
          <SocialButtons redirectUrl="/" />
        </div>

        <div className="relative flex py-2 items-center mb-5">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-[11px] uppercase font-bold">Or sign in with email</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        {/* Demo Login Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full mb-4 py-2.5 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Click Here for 1-Click Instant Demo Login</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#111e2f] text-white p-3 pl-10 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
              />
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#111e2f] text-white p-3 pl-10 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-700 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-950/80 transition flex items-center justify-center gap-2 mt-6"
          >
            <span>{loading ? "Signing In..." : "Sign In to Zaraz"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-emerald-400 font-bold hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
