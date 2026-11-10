"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Home,
  Shirt,
  Sparkles,
  Zap,
  ShieldCheck,
  Tag,
  ArrowRight,
} from "lucide-react";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: React.ElementType;
  itemCount: number;
  highlight: string;
  image: string;
  featuredBrands: string[];
  subcategories: string[];
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Smartphones & Gadgets",
    slug: "smartphones-gadgets",
    icon: Smartphone,
    itemCount: 248,
    highlight: "Latest Flagships with Official BD Warranty",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    featuredBrands: ["Apple", "Samsung", "Xiaomi", "OnePlus", "Google Pixel"],
    subcategories: [
      "Flagship 5G Phones",
      "Budget Smartphones",
      "Power Banks & Fast Chargers",
      "MagSafe Accessories",
      "TWS Bluetooth Earbuds",
      "Smart Screen Protectors",
    ],
  },
  {
    id: "cat-2",
    name: "Laptops & Computers",
    slug: "laptops-computers",
    icon: Laptop,
    itemCount: 165,
    highlight: "Apple M3 Chip, Gaming Rigs & Ultrabooks",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    featuredBrands: ["Apple", "Asus", "Dell", "HP", "Lenovo"],
    subcategories: [
      "MacBook Air & Pro",
      "Gaming Laptops (RTX 40-Series)",
      "Wireless Mechanical Keyboards",
      "Ergonomic Precision Mice",
      "4K IPS Color Accurate Monitors",
      "High Speed NVMe SSDs",
    ],
  },
  {
    id: "cat-5",
    name: "Audio & Headphones",
    slug: "audio-headphones",
    icon: Headphones,
    itemCount: 130,
    highlight: "Industry-Leading Active Noise Cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    featuredBrands: ["Sony", "Bose", "JBL", "Sennheiser", "Apple"],
    subcategories: [
      "Over-Ear ANC Headphones",
      "True Wireless Stereo Earbuds",
      "Hi-Res Audiophile Gear",
      "Waterproof Bluetooth Speakers",
      "Podcasting & Studio Mics",
      "Surround Sound Soundbars",
    ],
  },
  {
    id: "cat-7",
    name: "Smart Watches & Fitness",
    slug: "smart-watches",
    icon: Watch,
    itemCount: 184,
    highlight: "AMOLED Displays, Heart Rate & GPS Tracking",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    featuredBrands: ["Apple", "Samsung", "Amazfit", "Garmin", "Huawei"],
    subcategories: [
      "Apple Watch Series & Ultra",
      "Galaxy Watch Classic (Rotating Bezel)",
      "Fitness & Sleep Trackers",
      "Luxury Stainless Steel Bands",
      "Sports Silicone Straps",
      "Magnetic Wireless Docks",
    ],
  },
  {
    id: "cat-8",
    name: "Gaming & Consoles",
    slug: "gaming-consoles",
    icon: Gamepad2,
    itemCount: 96,
    highlight: "PS5 Pro 2TB, Xbox Series X & Handhelds",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&auto=format&fit=crop&q=80",
    featuredBrands: ["Sony", "Microsoft", "Nintendo", "Razer", "Logitech G"],
    subcategories: [
      "PlayStation 5 Pro & Slim",
      "DualSense Wireless Controllers",
      "Low Latency Gaming Headsets",
      "Custom RGB Keyboards",
      "Physical Disc Games",
      "PlayStation Plus Digital Codes",
    ],
  },
  {
    id: "cat-6",
    name: "Home & Kitchen Appliances",
    slug: "home-kitchen",
    icon: Home,
    itemCount: 290,
    highlight: "Rapid Air Fryers & Smart Living Appliances",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
    featuredBrands: ["Philips", "Panasonic", "Miyako", "Walton", "Singer"],
    subcategories: [
      "Rapid Air Fryers (XL & XXL)",
      "High Power Smoothie Blenders",
      "Automatic Rice Cookers",
      "Cordless Electric Kettles",
      "Robot Vacuum Cleaners",
      "Smart Water Purifiers",
    ],
  },
  {
    id: "cat-3",
    name: "Men's Fashion & Wear",
    slug: "mens-fashion",
    icon: Shirt,
    itemCount: 412,
    highlight: "100% Egyptian Cotton & Premium Oxford",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80",
    featuredBrands: ["Zara Man", "Polo Ralph", "Oxford Casuals", "Apex", "Lotto"],
    subcategories: [
      "Slim-Fit Oxford Casual Shirts",
      "Premium Formal Dress Shirts",
      "Stretch Denim Jeans",
      "Pure Cotton Polo Shirts",
      "Genuine Leather Loafers",
      "Designer Wallets & Belts",
    ],
  },
  {
    id: "cat-4",
    name: "Women's Fashion",
    slug: "womens-fashion",
    icon: Sparkles,
    itemCount: 520,
    highlight: "Designer Kurtis, Saree & Modern Wear",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
    featuredBrands: ["Aarong Style", "Cats Eye", "Khaadi", "Bata Ladies", "Limelight"],
    subcategories: [
      "Embroidered Salwar Kameez",
      "Modern Western Tops",
      "Silk & Georgette Sarees",
      "Leather Handbags & Totes",
      "Gold Plated Jewelry Sets",
      "Comfort Heels & Flats",
    ],
  },
];

export default function CategoryMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryItem>(CATEGORIES_DATA[0]);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleCategoryClick = (slug: string) => {
    setIsOpen(false);
    router.push(`/categories/${slug}`);
  };

  const handleBrandClick = (brand: string) => {
    setIsOpen(false);
    router.push(`/?search=${encodeURIComponent(brand)}#products`);
  };

  return (
    <div
      ref={menuRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Daraz-Style Categories Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer shadow-md ${
          isOpen
            ? "bg-emerald-500 text-black shadow-emerald-950/60"
            : "bg-emerald-600 hover:bg-emerald-500 text-black shadow-emerald-950/40"
        }`}
        aria-expanded={isOpen}
      >
        <Menu className="w-4 h-4 text-black" />
        <span className="tracking-tight">Categories</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-black transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Daraz-Style Flyout Mega-Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full pt-2 z-50 w-[840px] max-w-[95vw] animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-[#0b1420] border border-emerald-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row backdrop-blur-xl">
            {/* Left Column: Vertical Category List */}
            <div className="w-full md:w-[280px] bg-[#070e17] border-r border-emerald-950/70 p-2.5 flex flex-col gap-1">
              <div className="px-3 py-2 text-[11px] font-black uppercase tracking-wider text-emerald-400 border-b border-gray-800/80 flex items-center justify-between">
                <span>All Departments</span>
                <span className="text-[10px] text-gray-400 font-normal">8 Categories</span>
              </div>

              <div className="flex flex-col gap-0.5 mt-1">
                {CATEGORIES_DATA.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory.id === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onMouseEnter={() => setActiveCategory(cat)}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-150 group cursor-pointer ${
                        isActive
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm"
                          : "text-gray-300 hover:bg-emerald-950/40 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition ${
                            isActive
                              ? "bg-emerald-500 text-black"
                              : "bg-[#111e2f] text-emerald-400 group-hover:bg-emerald-900/40"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isActive
                            ? "text-emerald-400 translate-x-0.5"
                            : "text-gray-600 group-hover:text-gray-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Extra Daraz Quick Links */}
              <div className="pt-2 mt-2 border-t border-gray-800/80 flex flex-col gap-1">
                <Link
                  href="/#flash-sale"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 hover:bg-amber-950/30 transition"
                >
                  <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>⚡ Flash Sale Deals</span>
                </Link>
                <Link
                  href="/#products"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-400 hover:bg-emerald-950/30 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>🛡️ Zaraz Mall (Official Stores)</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Active Category Flyout Details & Subcategories */}
            <div className="flex-1 p-5 bg-[#0b1420] flex flex-col justify-between">
              <div>
                {/* Header with Title and "View All" Link */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-800/80">
                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span>{activeCategory.name}</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {activeCategory.highlight}
                    </p>
                  </div>

                  <Link
                    href={`/categories/${activeCategory.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/60 transition group"
                  >
                    <span>View All ({activeCategory.itemCount})</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Popular Brands Tags */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-emerald-400" />
                    <span>Popular Brands</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCategory.featuredBrands.map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => handleBrandClick(brand)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#111e2f] hover:bg-emerald-500 hover:text-black text-gray-200 border border-emerald-950/80 transition cursor-pointer"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategories Grid */}
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Subcategories &amp; Segments
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {activeCategory.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`/categories/${activeCategory.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl bg-[#0e1927] hover:bg-[#142337] border border-gray-800/60 hover:border-emerald-500/50 text-xs text-gray-300 hover:text-white transition group"
                      >
                        <span className="truncate">{sub}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-emerald-400 transition" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Promotional Visual Banner Card at Bottom */}
              <div className="mt-5 pt-4 border-t border-gray-800/80">
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-emerald-950/80 via-[#0d2218] to-black border border-emerald-500/30 p-3.5 flex items-center justify-between">
                  <div className="relative z-10 max-w-[65%]">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                      Zaraz Mall Verified
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1">
                      Explore authentic {activeCategory.name} with Free Express Delivery
                    </h4>
                  </div>

                  <Link
                    href={`/categories/${activeCategory.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="relative z-10 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-lg shadow-md transition"
                  >
                    Shop Now &rarr;
                  </Link>

                  {/* Thumbnail Preview */}
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.name}
                    className="absolute right-0 top-0 bottom-0 w-28 object-cover opacity-20 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
