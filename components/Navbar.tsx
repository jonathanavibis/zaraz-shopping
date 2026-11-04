"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  Truck,
  ShieldCheck,
  Zap,
  Menu,
  X,
  LogOut,
  Package,
  PlusCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}#products`);
    } else {
      router.push(`/#products`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090d16] border-b border-emerald-950/60 shadow-lg">
      {/* Top Utility Bar */}
      <div className="bg-[#041d13] text-emerald-400 text-xs py-1.5 px-4 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-400" /> Free Delivery across Bangladesh on orders over ৳999
            </span>
            <span className="hidden md:inline-block text-emerald-600">|</span>
            <span className="hidden md:flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Genuine Products Guaranteed
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/add-product"
              className="text-emerald-300 hover:text-white font-bold transition flex items-center gap-1 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80"
            >
              <PlusCircle className="w-3 h-3 text-emerald-400" /> Sell on Zaraz (+ Add Product)
            </Link>
            <span className="text-emerald-700">|</span>
            <Link href="/orders" className="hover:text-white transition flex items-center gap-1">
              <Package className="w-3 h-3" /> Track My Order
            </Link>
            <span className="text-emerald-700">|</span>
            <Link href="/help" className="hover:text-white transition">Customer Care</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition">
            <span className="text-black font-black text-2xl tracking-tighter">Z</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-2xl font-black text-white tracking-tight">ZARAZ</span>
              <span className="text-2xl font-black text-emerald-400">.app</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 uppercase tracking-widest font-semibold -mt-1">
              Daraz Inspired BD
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-2xl hidden md:flex items-center relative"
        >
          <input
            type="text"
            placeholder="Search in Zaraz.app (e.g. iPhone, Sony, Air Fryer, Shirt)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111827] text-gray-100 placeholder-gray-400 text-sm px-4 py-2.5 rounded-l-lg border border-emerald-900/80 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-black font-bold px-6 py-2.5 rounded-r-lg flex items-center justify-center transition shadow-md shadow-emerald-900/50"
          >
            <Search className="w-5 h-5 text-black" />
          </button>
        </form>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-3">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-lg bg-[#111827] text-white hover:bg-emerald-950/60 border border-emerald-900/60 flex items-center transition group"
          >
            <ShoppingCart className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-black text-xs font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                {itemCount}
              </span>
            )}
            <span className="hidden lg:inline ml-2 text-sm font-semibold text-gray-200">
              Cart
            </span>
          </Link>

          {/* User Auth Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#111827] border border-emerald-900/60 text-white hover:border-emerald-500 transition"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-black font-bold flex items-center justify-center text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-200 max-w-[100px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="w-4 h-4 text-emerald-400" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-[#111827] rounded-xl shadow-2xl border border-emerald-900/80 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-800">
                    <p className="text-xs text-emerald-400 font-semibold">Signed in as</p>
                    <p className="text-sm font-medium text-white truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/orders"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-emerald-950/50 hover:text-emerald-300"
                  >
                    <Package className="w-4 h-4 text-emerald-400" /> My Orders &amp; Tracking
                  </Link>
                  <Link
                    href="/add-product"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-emerald-400 hover:bg-emerald-950/50 hover:text-emerald-300 font-semibold"
                  >
                    <PlusCircle className="w-4 h-4 text-emerald-400" /> + Add New Product
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdown(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-950/30 text-left"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="px-3.5 py-2 text-sm font-semibold text-emerald-300 hover:text-white bg-[#111827] border border-emerald-900/80 rounded-lg transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="hidden sm:inline-block px-3.5 py-2 text-sm font-bold text-black bg-emerald-500 hover:bg-emerald-400 rounded-lg shadow-md shadow-emerald-950/40 transition"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search products in Zaraz..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111827] text-white text-sm px-3.5 py-2 rounded-l-lg border border-emerald-900/80 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-600 px-4 py-2 rounded-r-lg text-black font-bold"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Navigation Sub-Bar */}
      <nav className="bg-[#0b142d]/80 border-t border-emerald-950/80 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm overflow-x-auto whitespace-nowrap scrollbar-none">
          <div className="flex items-center space-x-6 text-gray-300">
            <Link href="/#categories" className="flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300">
              <Menu className="w-4 h-4" /> Categories
            </Link>
            <Link href="/#flash-sale" className="flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300">
              <Zap className="w-4 h-4 fill-amber-400" /> Flash Sale
            </Link>
            <Link href="/#products" className="hover:text-emerald-400 transition font-medium">
              Zaraz Mall (Official)
            </Link>
            <Link href="/add-product" className="hover:text-white transition font-bold text-emerald-400 flex items-center gap-1">
              <PlusCircle className="w-3.5 h-3.5" /> Add Product (Seller)
            </Link>
            <Link href="/orders" className="hover:text-emerald-400 transition font-medium">
              My Orders &amp; Delivery
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
            <span>🔥 Code: ZARAZ100 for ৳100 OFF</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
