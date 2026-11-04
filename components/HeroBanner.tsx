"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Truck,
  Shield,
  Smartphone,
  Laptop,
  Shirt,
  Headphones,
  Home,
  Watch,
  Gamepad2,
} from "lucide-react";
import { Banner } from "@/lib/seed-data";

interface HeroBannerProps {
  banners: Banner[];
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const fallbackBanners: Banner[] = [
    {
      id: "b-1",
      title: "Zaraz Mega Green Festival",
      subtitle: "Up to 65% OFF on Latest Flagships & Laptops",
      highlightText: "Code: ZARAZGREEN | Free Express Delivery across Bangladesh",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80",
      buttonText: "Shop Flash Deals",
      link: "/#flash-sale",
      badge: "11.11 MEGA DEAL",
    },
    {
      id: "b-2",
      title: "Zaraz Mall 100% Authentic",
      subtitle: "Direct From Brand Stores With 14-Day Free Returns",
      highlightText: "Official Apple, Sony, Samsung, Xiaomi & OnePlus Warranty",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&auto=format&fit=crop&q=80",
      buttonText: "Explore Mall",
      link: "/#products",
      badge: "ZARAZ MALL",
    },
    {
      id: "b-3",
      title: "Everyday Cash On Delivery",
      subtitle: "Check Your Parcel Before Payment - Pay With bKash / Nagad",
      highlightText: "Fast 2-3 Day Nationwide Dispatch To All 64 Districts",
      image: "https://images.unsplash.com/photo-1556742049-0a67e5572293?w=1200&auto=format&fit=crop&q=80",
      buttonText: "Order Now",
      link: "/#products",
      badge: "SAFE SHOPPING",
    },
  ];

  const slides = banners && banners.length > 0 ? banners : fallbackBanners;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const categoryList = [
    { name: "Smartphones & Gadgets", icon: <Smartphone className="w-4 h-4 text-emerald-400" />, href: "/categories/smartphones-gadgets" },
    { name: "Laptops & Computers", icon: <Laptop className="w-4 h-4 text-emerald-400" />, href: "/categories/laptops-computers" },
    { name: "Men's Fashion & Wear", icon: <Shirt className="w-4 h-4 text-emerald-400" />, href: "/categories/mens-fashion" },
    { name: "Audio & Headphones", icon: <Headphones className="w-4 h-4 text-emerald-400" />, href: "/categories/audio-headphones" },
    { name: "Home & Appliances", icon: <Home className="w-4 h-4 text-emerald-400" />, href: "/categories/home-kitchen" },
    { name: "Smart Watches", icon: <Watch className="w-4 h-4 text-emerald-400" />, href: "/categories/smart-watches" },
    { name: "Gaming Consoles", icon: <Gamepad2 className="w-4 h-4 text-emerald-400" />, href: "/categories/gaming-consoles" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Side: Daraz Style Category Sidebar (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-3 bg-[#0d1420] border border-emerald-950/80 rounded-2xl p-3 shadow-xl">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-gray-800 flex items-center justify-between">
            <span>Browse Categories</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <ul className="mt-2 space-y-1">
            {categoryList.map((cat, idx) => (
              <li key={idx}>
                <Link
                  href={cat.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-emerald-950/40 rounded-xl transition group"
                >
                  <span className="p-1.5 rounded-lg bg-[#111c2e] group-hover:bg-emerald-600/20 group-hover:text-emerald-300 transition">
                    {cat.icon}
                  </span>
                  <span className="text-xs font-medium">{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Center: Hero Carousel Banner */}
        <div className="lg:col-span-6 relative overflow-hidden rounded-2xl border border-emerald-900/60 bg-black min-h-[340px] md:min-h-[400px] shadow-2xl flex items-center">
          {slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Slide Background Image with Green & Dark Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                {/* Emerald accent glow */}
                <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
              </div>

              {/* Slide Content */}
              <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-10 max-w-lg text-white">
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 w-fit mb-3">
                  {slide.badge}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-2">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base text-gray-300 font-medium mb-2">
                  {slide.subtitle}
                </p>
                <p className="text-xs text-emerald-400 mb-6 font-semibold">
                  {slide.highlightText}
                </p>
                <div>
                  <Link
                    href={slide.link || "/#products"}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-950/60 transition group"
                  >
                    <span>{slide.buttonText}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous Slide"
            className="absolute left-3 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-emerald-600 hover:text-black border border-white/10 transition backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            aria-label="Next Slide"
            className="absolute right-3 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-emerald-600 hover:text-black border border-white/10 transition backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-8 bg-emerald-400" : "w-2 bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Quick Action & Promo Cards (Desktop Only) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-3">
          {/* Card 1: Voucher */}
          <div className="bg-[#0d1420] border border-emerald-950/80 rounded-2xl p-4 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                  New Customer
                </span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-white font-extrabold text-base">Get ৳100 Voucher</h3>
              <p className="text-xs text-gray-400 mt-1">
                Apply coupon code <span className="text-emerald-400 font-bold">ZARAZ100</span> at checkout on any order!
              </p>
            </div>
            <Link
              href="/#flash-sale"
              className="mt-3 block text-center py-2 px-3 bg-emerald-600/20 hover:bg-emerald-600 hover:text-black text-emerald-400 font-bold text-xs rounded-xl border border-emerald-500/30 transition"
            >
              Collect Voucher
            </Link>
          </div>

          {/* Card 2: Cash On Delivery & Free Delivery */}
          <div className="bg-[#0d1420] border border-emerald-950/80 rounded-2xl p-4 shadow-xl flex-1 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-900/60 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Free Express Delivery</h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Orders over ৳999 qualify for nationwide zero delivery fee.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800 text-[11px] text-gray-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Parcel Inspection upon COD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
