"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Grid,
  Zap,
  ShoppingCart,
  User,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user } = useAuth();

  const isHome = pathname === "/";
  const isCategories = pathname.startsWith("/categories");
  const isCart = pathname === "/cart";
  const isOrders = pathname === "/orders" || pathname.startsWith("/orders/");
  const isAuth = pathname === "/login" || pathname === "/register";

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#070e17]/95 backdrop-blur-xl border-t border-emerald-950/90 shadow-[0_-10px_30px_rgba(0,0,0,0.7)] pb-[env(safe-area-inset-bottom,8px)]"
    >
      <div className="grid grid-cols-5 h-14 max-w-md mx-auto items-center text-center">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center h-full transition relative ${
            isHome ? "text-emerald-400 font-bold" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          {isHome && (
            <span className="absolute top-0.5 w-6 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]"></span>
          )}
          <Home className={`w-5 h-5 ${isHome ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Home</span>
        </Link>

        {/* 2. Categories */}
        <Link
          href="/categories/smartphones-gadgets"
          className={`flex flex-col items-center justify-center h-full transition relative ${
            isCategories ? "text-emerald-400 font-bold" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          {isCategories && (
            <span className="absolute top-0.5 w-6 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]"></span>
          )}
          <Grid className={`w-5 h-5 ${isCategories ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Categories</span>
        </Link>

        {/* 3. Flash Sale */}
        <Link
          href="/#flash-sale"
          className="flex flex-col items-center justify-center h-full transition group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-black flex items-center justify-center shadow-lg shadow-amber-950/60 -mt-2 group-active:scale-95 transition">
            <Zap className="w-4 h-4 fill-black" />
          </div>
          <span className="text-[10px] text-amber-400 font-black tracking-tight mt-0.5">Flash</span>
        </Link>

        {/* 4. Cart */}
        <Link
          href="/cart"
          className={`flex flex-col items-center justify-center h-full transition relative ${
            isCart ? "text-emerald-400 font-bold" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          {isCart && (
            <span className="absolute top-0.5 w-6 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]"></span>
          )}
          <div className="relative">
            <ShoppingCart className={`w-5 h-5 ${isCart ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-black text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-md">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Cart</span>
        </Link>

        {/* 5. Account / Orders */}
        <Link
          href={user ? "/orders" : "/login"}
          className={`flex flex-col items-center justify-center h-full transition relative ${
            isOrders || isAuth ? "text-emerald-400 font-bold" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          {(isOrders || isAuth) && (
            <span className="absolute top-0.5 w-6 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]"></span>
          )}
          {user ? (
            <Package className={`w-5 h-5 ${isOrders ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          ) : (
            <User className={`w-5 h-5 ${isAuth ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          )}
          <span className="text-[10px] tracking-tight mt-0.5">
            {user ? "Orders" : "Account"}
          </span>
        </Link>
      </div>
    </nav>
  );
}
