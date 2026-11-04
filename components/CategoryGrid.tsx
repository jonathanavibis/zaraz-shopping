"use client";

import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Shirt,
  Sparkles,
  Headphones,
  Home,
  Watch,
  Gamepad2,
} from "lucide-react";
import { Category } from "@/lib/seed-data";

interface CategoryGridProps {
  categories: Category[];
}

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-6 h-6 text-emerald-400" />,
  Laptop: <Laptop className="w-6 h-6 text-emerald-400" />,
  Shirt: <Shirt className="w-6 h-6 text-emerald-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-emerald-400" />,
  Headphones: <Headphones className="w-6 h-6 text-emerald-400" />,
  Home: <Home className="w-6 h-6 text-emerald-400" />,
  Watch: <Watch className="w-6 h-6 text-emerald-400" />,
  Gamepad2: <Gamepad2 className="w-6 h-6 text-emerald-400" />,
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Categories
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Explore curated departments across Zaraz.app
          </p>
        </div>
        <Link
          href="/#products"
          className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
        >
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group bg-[#0d1420] border border-emerald-950/70 hover:border-emerald-500/60 rounded-2xl p-4 flex flex-col items-center text-center transition duration-200 hover:shadow-lg hover:shadow-emerald-950/40 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#111c2e] group-hover:bg-emerald-600/20 border border-emerald-900/40 group-hover:border-emerald-500/40 flex items-center justify-center mb-3 transition duration-300">
              {iconMap[cat.icon] || <Sparkles className="w-6 h-6 text-emerald-400" />}
            </div>
            <h3 className="text-xs font-semibold text-gray-200 group-hover:text-emerald-300 transition line-clamp-2">
              {cat.name}
            </h3>
            <span className="text-[10px] text-gray-500 mt-1 font-medium">
              {cat.itemCount}+ items
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
