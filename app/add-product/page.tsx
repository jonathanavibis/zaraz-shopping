"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle, ArrowLeft, Sparkles, Image, Tag, DollarSign, Package, ShieldCheck } from "lucide-react";
import { apiRequest } from "@/lib/api";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Smartphones & Gadgets");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("20");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800");
  const [description, setDescription] = useState("");
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [isFreeDelivery, setIsFreeDelivery] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { name: "Smartphones & Gadgets", slug: "smartphones-gadgets" },
    { name: "Laptops & Computers", slug: "laptops-computers" },
    { name: "Men's Fashion & Wear", slug: "mens-fashion" },
    { name: "Women's Fashion", slug: "womens-fashion" },
    { name: "Audio & Headphones", slug: "audio-headphones" },
    { name: "Home & Kitchen Appliances", slug: "home-kitchen" },
    { name: "Smart Watches & Fitness", slug: "smart-watches" },
    { name: "Gaming & Consoles", slug: "gaming-consoles" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !brand) {
      toast.error("Please fill in the required fields (Title, Brand, Price)");
      return;
    }

    const currentCat = categories.find((c) => c.name === category) || categories[0];
    const numPrice = Number(price);
    const numOrig = Number(originalPrice || price);
    const disc = numOrig > numPrice ? Math.round(((numOrig - numPrice) / numOrig) * 100) : 0;

    const payload = {
      title,
      brand,
      category: currentCat.name,
      categorySlug: currentCat.slug,
      price: numPrice,
      originalPrice: numOrig,
      discountPercentage: disc,
      stock: Number(stock || 10),
      images: [imageUrl],
      description: description || `${title} from ${brand}. Official warranty included.`,
      isFlashSale,
      isFreeDelivery,
      isOfficial: true,
      specifications: {
        "Brand": brand,
        "Warranty": "1 Year Official Warranty",
        "Authenticity": "100% Genuine Zaraz Mall",
      },
      seller: {
        name: "Zaraz Verified Merchant",
        rating: 4.9,
        responseRate: "99%",
      },
    };

    setIsSubmitting(true);
    const toastId = toast.loading("Sending product data from Frontend to Backend...");

    try {
      // POST directly to backend zaraz-server -> MongoDB Atlas
      const data = await apiRequest("/products", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (data.success) {
        toast.dismiss(toastId);
        toast.success("Product successfully saved to MongoDB Atlas!", { duration: 4000 });
        router.push("/#products");
      } else {
        toast.dismiss(toastId);
        toast.error(data.message || "Failed to add product");
      }
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Storefront
      </Link>

      <div className="bg-[#0b1420] border border-emerald-950/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-900/60 inline-block mb-2">
              Seller Center
            </span>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <PlusCircle className="w-6 h-6 text-emerald-400" />
              Add New Product to MongoDB
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Submit product data from frontend &bull; Saves directly to MongoDB Atlas via <code className="text-emerald-300">zaraz-server</code>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#111e2f] border border-emerald-900/40 px-3.5 py-2 rounded-xl text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Atlas Live Sync</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Row 1: Title */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Smart Watch Ultra 2 with AMOLED Display & Heart Rate Monitor"
              className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500 text-xs"
            />
          </div>

          {/* Row 2: Brand & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Brand Name *</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Apple, Sony, Samsung, Xiaomi"
                className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Pricing & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Selling Price (৳ BDT) *</label>
              <input
                type="number"
                required
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 4500"
                className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Original Price (৳ Strike-through)</label>
              <input
                type="number"
                min="1"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="e.g. 5500"
                className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Stock Quantity</label>
              <input
                type="number"
                min="1"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="e.g. 25"
                className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          {/* Row 4: Image URL */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Product Image URL</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500 font-mono text-xs"
            />
            {/* Quick preview */}
            {imageUrl && (
              <div className="mt-2 flex items-center gap-3 bg-[#111e2f] p-2 rounded-xl border border-gray-800">
                <img src={imageUrl} alt="Preview" className="w-12 h-12 rounded-lg object-cover bg-black" />
                <span className="text-[11px] text-gray-400">Image Preview Loaded</span>
              </div>
            )}
          </div>

          {/* Row 5: Description */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Product Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the key features, specs, and benefits of the product..."
              className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Row 6: Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#111e2f] border border-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={isFlashSale}
                onChange={(e) => setIsFlashSale(e.target.checked)}
                className="rounded accent-emerald-500 w-4 h-4"
              />
              <div>
                <span className="text-white font-bold block">Include in Flash Sale</span>
                <span className="text-[11px] text-gray-400">Featured in top countdown deals</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#111e2f] border border-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={isFreeDelivery}
                onChange={(e) => setIsFreeDelivery(e.target.checked)}
                className="rounded accent-emerald-500 w-4 h-4"
              />
              <div>
                <span className="text-white font-bold block">Free Nationwide Delivery</span>
                <span className="text-[11px] text-gray-400">Zero shipping fee across Bangladesh</span>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-700 text-black font-black text-sm rounded-xl shadow-xl shadow-emerald-950/80 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{isSubmitting ? "Sending to MongoDB Atlas..." : "Publish Product to MongoDB Atlas"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
