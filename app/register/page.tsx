"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, User, Phone, MapPin, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import SocialButtons from "@/components/SocialButtons";
import toast from "react-hot-toast";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLen = password.length >= 6;

    if (!hasLen || !hasUpper || !hasLower) {
      toast.error("Password must contain uppercase, lowercase letters and be at least 6 characters.");
      return;
    }

    setLoading(true);
    const success = await register(name, email, password, phone, address);
    setLoading(false);
    if (success) {
      router.push(redirectUrl);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#0b1420] border border-emerald-950/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center mx-auto mb-3 text-black font-black text-2xl shadow-lg shadow-emerald-900/40">
            Z
          </div>
          <h1 className="text-2xl font-black text-white">Create Account</h1>
          <p className="text-xs text-gray-400 mt-1">
            Join Zaraz.app with your Google, GitHub or email account.
          </p>
        </div>

        {/* Social Sign up */}
        <div className="mb-5">
          <SocialButtons redirectUrl={redirectUrl} />
        </div>

        <div className="relative flex py-2 items-center mb-5">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-[11px] uppercase font-bold">Or register with email</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jonathan Biswas"
                className="w-full bg-[#111e2f] text-white p-3 pl-10 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
              />
              <User className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Email Address *</label>
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
            <label className="block text-gray-300 font-semibold mb-1">Phone Number (For Delivery SMS)</label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017xxxxxxxx"
                className="w-full bg-[#111e2f] text-white p-3 pl-10 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
              />
              <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Default Delivery Address</label>
            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House, Road, Area, City"
                className="w-full bg-[#111e2f] text-white p-3 pl-10 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
              />
              <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Password *</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 chars, uppercase & lowercase"
                className="w-full bg-[#111e2f] text-white p-3 pl-10 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
            </div>
            <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">Rule:</span> Must contain at least 1 uppercase letter, 1 lowercase letter, and 6+ characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-700 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-950/80 transition flex items-center justify-center gap-2 mt-6 cursor-pointer"
          >
            <span>{loading ? "Creating Account..." : (redirectUrl === "/checkout" ? "Register & Continue to Checkout" : "Create Free Account")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Already have an account?{" "}
          <Link 
            href={`/login${redirectUrl !== "/" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`} 
            className="text-emerald-400 font-bold hover:underline"
          >
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center text-gray-400 text-sm">Loading registration...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
