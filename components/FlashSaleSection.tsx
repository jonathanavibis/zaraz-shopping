"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Flame, Clock } from "lucide-react";
import { Product } from "@/lib/seed-data";
import ProductCard from "./ProductCard";

interface FlashSaleSectionProps {
  products: Product[];
}

export default function FlashSaleSection({ products }: FlashSaleSectionProps) {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.isFlashSale).slice(0, 4);

  if (flashProducts.length === 0) return null;

  return (
    <section id="flash-sale" className="max-w-7xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-black shadow-lg shadow-amber-900/30">
              <Zap className="w-5 h-5 fill-black" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-1.5">
                Flash Sale
                <Flame className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
              </h2>
              <span className="text-xs text-emerald-400 font-semibold">
                Limited Stock &bull; Grab Before Gone
              </span>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-[#050b13] px-3.5 py-1.5 rounded-xl border border-gray-800">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Ends in:</span>
            <div className="flex items-center gap-1 text-sm font-black text-white font-mono">
              <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/80">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-emerald-500">:</span>
              <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/80">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-emerald-500">:</span>
              <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/80">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/#products"
          className="self-start sm:self-auto px-5 py-2 rounded-xl border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black font-extrabold text-xs uppercase tracking-wider transition shadow-md"
        >
          Shop More
        </Link>
      </div>

      {/* Grid of Flash Sale Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {flashProducts.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            {/* Flash Sold Progress Bar */}
            <div className="mt-2 px-1">
              <div className="flex justify-between text-[11px] font-semibold mb-1">
                <span className="text-emerald-400">🔥 Almost Sold Out</span>
                <span className="text-gray-400">Only {product.stock} left</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full"
                  style={{ width: `${Math.min(92, Math.max(40, 100 - product.stock * 3))}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
