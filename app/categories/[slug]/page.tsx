"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal, ArrowLeft, Truck, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product, Category } from "@/lib/seed-data";
import { apiRequest } from "@/lib/api";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [priceFilter, setPriceFilter] = useState<"all" | "low" | "mid" | "high">("all");
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState("recommended");

  useEffect(() => {
    async function loadCategoryData() {
      try {
        setLoading(true);
        const [prodData, catData] = await Promise.all([
          apiRequest(`/products?category=${slug}`),
          apiRequest(`/categories`),
        ]);

        if (prodData.success && prodData.products) {
          setProducts(prodData.products);
        }
        if (catData.success && catData.categories) {
          const current = catData.categories.find((c: Category) => c.slug === slug);
          setCategory(current || null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (slug) loadCategoryData();
  }, [slug]);

  const filteredProducts = products.filter((p) => {
    if (freeDeliveryOnly && !p.isFreeDelivery) return false;
    if (minRating > 0 && p.rating < minRating) return false;

    if (priceFilter === "low" && p.price > 2000) return false;
    if (priceFilter === "mid" && (p.price <= 2000 || p.price > 30000)) return false;
    if (priceFilter === "high" && p.price <= 30000) return false;

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/#categories" className="hover:text-emerald-400">Categories</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-200 capitalize font-medium">{category?.name || slug}</span>
      </nav>

      {/* Category Hero Header */}
      <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Departments
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white capitalize">
            {category?.name || slug.replace("-", " ")}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Browse through authentic brands with genuine warranty and fast dispatch across Bangladesh.
          </p>
        </div>

        <div className="bg-[#111e2f] border border-emerald-900/40 px-5 py-3 rounded-xl text-center flex-shrink-0">
          <span className="text-xl font-black text-emerald-400">{products.length}</span>
          <p className="text-[11px] text-gray-400 uppercase font-semibold tracking-wider">Available Items</p>
        </div>
      </div>

      {/* Main Content Layout with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Filter Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" /> Filter Results
              </h3>
              <button
                onClick={() => {
                  setPriceFilter("all");
                  setFreeDeliveryOnly(false);
                  setMinRating(0);
                }}
                className="text-[11px] text-emerald-400 hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Price Filter */}
            <div className="mb-5">
              <label className="text-xs font-bold text-gray-300 block mb-2">Price Range</label>
              <div className="space-y-1.5 text-xs text-gray-400">
                {[
                  { id: "all", label: "All Prices" },
                  { id: "low", label: "Under ৳2,000" },
                  { id: "mid", label: "৳2,000 - ৳30,000" },
                  { id: "high", label: "Above ৳30,000" },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input
                      type="radio"
                      name="price-filter"
                      checked={priceFilter === item.id}
                      onChange={() => setPriceFilter(item.id as any)}
                      className="accent-emerald-500"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Service & Promotion */}
            <div className="mb-5 pt-4 border-t border-gray-800">
              <label className="text-xs font-bold text-gray-300 block mb-2">Service &amp; Promotion</label>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={freeDeliveryOnly}
                  onChange={(e) => setFreeDeliveryOnly(e.target.checked)}
                  className="rounded accent-emerald-500"
                />
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" /> Free Delivery Only
                </span>
              </label>
            </div>

            {/* Customer Rating */}
            <div className="pt-4 border-t border-gray-800">
              <label className="text-xs font-bold text-gray-300 block mb-2">Customer Rating</label>
              <div className="space-y-1.5 text-xs text-gray-400">
                {[
                  { r: 0, label: "All Ratings" },
                  { r: 4.5, label: "4.5 & Above" },
                  { r: 4.0, label: "4.0 & Above" },
                ].map((item) => (
                  <label key={item.r} className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input
                      type="radio"
                      name="rating-filter"
                      checked={minRating === item.r}
                      onChange={() => setMinRating(item.r)}
                      className="accent-emerald-500"
                    />
                    <span className="flex items-center gap-1">
                      {item.r > 0 && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Products Area (9 cols) */}
        <div className="lg:col-span-9">
          {/* Sorting Header */}
          <div className="flex items-center justify-between mb-6 bg-[#0b1420] border border-emerald-950/80 rounded-xl px-4 py-3">
            <span className="text-xs text-gray-400">
              Showing <strong className="text-white">{sortedProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#111e2f] text-gray-200 text-xs px-2.5 py-1 rounded-lg border border-gray-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="recommended">Best Match</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Ratings</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-gray-400">Loading products from MongoDB...</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-12 text-center shadow-xl">
              <p className="text-sm text-gray-300 font-semibold mb-2">
                No items match your selected filter criteria.
              </p>
              <button
                onClick={() => {
                  setPriceFilter("all");
                  setFreeDeliveryOnly(false);
                  setMinRating(0);
                }}
                className="px-4 py-2 bg-emerald-500 text-black font-bold text-xs rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id || (product as any)._id || product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
