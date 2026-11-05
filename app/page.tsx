"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HeroBanner from "@/components/HeroBanner";
import FlashSaleSection from "@/components/FlashSaleSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import DeliveryInfoBanner from "@/components/DeliveryInfoBanner";
import { Product, Category, Banner } from "@/lib/seed-data";
import { Sparkles, SlidersHorizontal, ShieldCheck } from "lucide-react";
import { apiRequest } from "@/lib/api";

function HomeContent() {
  const searchParams = useSearchParams();
  const searchParamQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [localSearch, setLocalSearch] = useState<string>(searchParamQuery);

  useEffect(() => {
    setLocalSearch(searchParamQuery);
  }, [searchParamQuery]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Connect directly to backend (zaraz-server) -> MongoDB Atlas
        const [prodData, catData, banData] = await Promise.all([
          apiRequest("/products"),
          apiRequest("/categories"),
          apiRequest("/banners"),
        ]);

        if (prodData.success && prodData.products) setProducts(prodData.products);
        if (catData.success && catData.categories) setCategories(catData.categories);
        if (banData.success && banData.banners) setBanners(banData.banners);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" ||
      p.categorySlug?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !localSearch ||
      p.title?.toLowerCase().includes(localSearch.toLowerCase()) ||
      p.brand?.toLowerCase().includes(localSearch.toLowerCase()) ||
      p.category?.toLowerCase().includes(localSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // recommended
  });

  return (
    <div className="pb-12">
      {/* Hero Carousel & Category Bar */}
      <HeroBanner banners={banners} />

      {/* Trust Delivery Value Banner */}
      <DeliveryInfoBanner />

      {/* Flash Sale Section */}
      <FlashSaleSection products={products} />

      {/* Category Grid */}
      <CategoryGrid categories={categories} />

      {/* Zaraz Mall Banner */}
      <div className="max-w-7xl mx-auto px-4 my-6">
        <div className="bg-[#0b1622] border border-emerald-900/60 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white">Zaraz Mall</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-black">
                  100% AUTHENTIC
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Official Stores &bull; 14-Day Hassle-Free Return &bull; 100% Genuine Brands
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-gray-300 hidden sm:inline">Certified Partners:</span>
            <span className="font-bold text-emerald-400">Apple</span>
            <span className="text-gray-600">&bull;</span>
            <span className="font-bold text-emerald-400">Sony</span>
            <span className="text-gray-600">&bull;</span>
            <span className="font-bold text-emerald-400">Samsung</span>
            <span className="text-gray-600">&bull;</span>
            <span className="font-bold text-emerald-400">Philips</span>
          </div>
        </div>
      </div>

      {/* Just For You / Main Catalog */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Just For You
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Live from MongoDB Atlas &bull; Handpicked deals in Bangladesh
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#111827] text-gray-200 text-xs px-3 py-1.5 rounded-lg border border-emerald-900/60 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-950/60"
                : "bg-[#0d1420] text-gray-300 hover:text-white border border-gray-800"
            }`}
          >
            All Products
          </button>
          {categories.map((c) => (
            <button
              key={c.id || c.slug}
              onClick={() => setSelectedCategory(c.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === c.slug
                  ? "bg-emerald-500 text-black shadow-md shadow-emerald-950/60"
                  : "bg-[#0d1420] text-gray-300 hover:text-white border border-gray-800"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search Active Indicator */}
        {localSearch && (
          <div className="mb-4 flex items-center justify-between bg-emerald-950/40 border border-emerald-800/40 px-4 py-2 rounded-xl text-xs text-emerald-300">
            <span>
              Showing results for: <strong className="text-white">&quot;{localSearch}&quot;</strong>
            </span>
            <button
              onClick={() => setLocalSearch("")}
              className="font-bold underline hover:text-white"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-[#0e1624] border border-gray-800 rounded-2xl h-80 animate-pulse p-4 flex flex-col justify-between"
              >
                <div className="w-full aspect-square bg-gray-800/60 rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-800/60 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-800/60 rounded w-1/2 mb-3"></div>
                <div className="h-8 bg-gray-800/60 rounded"></div>
              </div>
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#0e1624] border border-emerald-950/60 rounded-2xl p-8">
            <p className="text-base text-gray-300 font-semibold mb-2">
              No products found matching your filter.
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Try searching for something else or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setLocalSearch("");
              }}
              className="px-5 py-2 bg-emerald-500 text-black font-bold text-xs rounded-xl"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id || (product as any)._id || product.slug} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
