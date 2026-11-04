"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ShoppingCart,
  Zap,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Clock,
  Heart,
  Share2,
} from "lucide-react";
import { Product } from "@/lib/seed-data";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { apiRequest } from "@/lib/api";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCity, setSelectedCity] = useState("Dhaka");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await apiRequest(`/products/${id}`);
        if (data.success && data.product) {
          setProduct(data.product);
          setSelectedImage(data.product.images?.[0] || "");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400 text-sm">Loading product details from MongoDB...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-gray-400 text-sm mb-6">The requested item is unavailable.</p>
        <Link href="/" className="px-6 py-2.5 bg-emerald-500 text-black font-bold rounded-xl text-sm">
          Return to Zaraz Homepage
        </Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6 overflow-x-auto">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/categories/${product.categorySlug}`} className="hover:text-emerald-400">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-200 truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0b1420] border border-emerald-950/80 rounded-3xl p-6 shadow-2xl">
        {/* Left: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/60 border border-emerald-900/50 flex items-center justify-center">
            <img
              src={selectedImage || product.images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-emerald-500 text-black font-black text-xs px-3 py-1 rounded-lg shadow-lg">
                -{product.discountPercentage}% OFF
              </span>
            )}
            {product.isOfficial && (
              <span className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-emerald-500/50 text-emerald-400 font-bold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Zaraz Mall
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-18 h-18 rounded-xl overflow-hidden border-2 transition flex-shrink-0 ${
                    selectedImage === img ? "border-emerald-500 scale-105" : "border-gray-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Details & Actions (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            {/* Title & Brand */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-900/60">
                Brand: {product.brand}
              </span>
              <div className="flex items-center gap-2 text-gray-400">
                <button
                  onClick={() => toast.success("Added to Wishlist!")}
                  className="p-1.5 hover:text-red-400 transition"
                  title="Wishlist"
                >
                  <Heart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Product link copied!");
                  }}
                  className="p-1.5 hover:text-emerald-400 transition"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h1 className="text-lg sm:text-xl font-bold text-white leading-snug mb-3">
              {product.title}
            </h1>

            {/* Ratings & Sold */}
            <div className="flex items-center gap-4 text-xs pb-4 border-b border-gray-800 mb-4">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} Ratings)</span>
              </div>
              <span className="text-gray-600">|</span>
              <span className="text-gray-300 font-semibold">{product.soldCount}+ Orders Fulfilled</span>
            </div>

            {/* Pricing Section */}
            <div className="bg-[#0e1927] border border-emerald-950/90 rounded-2xl p-4 mb-5">
              <span className="text-xs text-gray-400 block mb-1">Special Discounted Price:</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-500 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold text-gray-300">Quantity:</span>
              <div className="flex items-center border border-gray-700 rounded-xl overflow-hidden bg-[#111c2e]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-1.5 text-gray-300 hover:text-white hover:bg-emerald-900/40 text-base font-bold transition"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold text-white min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3.5 py-1.5 text-gray-300 hover:text-white hover:bg-emerald-900/40 text-base font-bold transition"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-gray-400">
                Only <strong className="text-emerald-400">{product.stock}</strong> items remaining!
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-800">
            <button
              onClick={() => addToCart(product, quantity)}
              className="py-3 px-4 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/80 transition"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

        {/* Right: Delivery & Services Sidebar (3 cols) */}
        <div className="lg:col-span-3 bg-[#0d1624] border border-emerald-950/90 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
              <Truck className="w-4 h-4" /> Delivery Options
            </h4>

            {/* Location selector */}
            <div className="bg-[#111e2f] p-3 rounded-xl mb-4 border border-gray-800">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Deliver to:
                </span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-black/60 text-emerald-300 text-xs rounded px-2 py-0.5 border border-emerald-900 focus:outline-none"
                >
                  <option value="Dhaka">Dhaka Division</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barisal">Barisal</option>
                </select>
              </div>
              <p className="text-xs font-semibold text-white">{selectedCity}, Bangladesh</p>
            </div>

            {/* Standard Delivery */}
            <div className="space-y-3 text-xs mb-6">
              <div className="flex items-start gap-2.5 pb-3 border-b border-gray-800">
                <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Standard Delivery</span>
                    <span className="font-extrabold text-emerald-400">
                      {product.deliveryInfo?.standardFee === 0 ? "FREE" : formatPrice(product.deliveryInfo?.standardFee || 60)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Get by {product.deliveryInfo?.standardDays || "2 - 3 Days"}
                  </p>
                </div>
              </div>

              {/* Express Delivery */}
              <div className="flex items-start gap-2.5 pb-3 border-b border-gray-800">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Express Delivery</span>
                    <span className="font-extrabold text-emerald-400">
                      {formatPrice(product.deliveryInfo?.expressFee || 120)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Estimated {product.deliveryInfo?.expressDays || "Within 24 Hours"}
                  </p>
                </div>
              </div>

              {/* Cash On Delivery */}
              <div className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Cash on Delivery Available</span>
              </div>
            </div>

            {/* Return & Warranty */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Return &amp; Warranty
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                <span>14 Days Free Return &amp; Exchange</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Authentic Genuine Item</span>
              </div>
            </div>
          </div>

          {/* Seller Box */}
          <div className="mt-6 pt-4 border-t border-gray-800 text-xs">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Sold by:</span>
            <p className="font-bold text-white text-sm mt-0.5">{product.seller?.name || "Zaraz Mall Official"}</p>
            <div className="flex items-center justify-between mt-2 text-gray-400 text-[11px]">
              <span>Positive Rating: <strong className="text-emerald-400">{(product.seller?.rating || 4.9) * 20}%</strong></span>
              <span>Response: <strong className="text-emerald-400">{product.seller?.responseRate || "98%"}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Description Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-[#0b1420] border border-emerald-950/80 rounded-3xl p-6 shadow-xl">
          <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
            <span>Product Specifications &amp; Overview</span>
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            {product.description}
          </p>

          <h3 className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wider">
            Technical Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {product.specifications &&
              Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="bg-[#0f1b2b] p-3 rounded-xl border border-gray-800 flex justify-between">
                  <span className="text-gray-400 font-medium">{key}</span>
                  <span className="text-white font-semibold">{val}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="lg:col-span-4 bg-[#0b1420] border border-emerald-950/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-white mb-4">Customer Ratings &amp; Reviews</h3>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-black text-emerald-400">{product.rating}</span>
              <div>
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-400">{product.reviewsCount} verified customer reviews</span>
              </div>
            </div>

            <div className="space-y-3 border-t border-gray-800 pt-4">
              <div className="bg-[#0f1b2b] p-3 rounded-xl text-xs">
                <div className="flex items-center justify-between text-gray-400 mb-1">
                  <span className="font-bold text-white">Tanvir Ahmed</span>
                  <span className="text-[10px]">Verified Purchase</span>
                </div>
                <div className="flex text-amber-400 mb-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
                <p className="text-gray-300">
                  Received in 2 days in Dhaka. 100% original product with official warranty. Packaging was very secure!
                </p>
              </div>

              <div className="bg-[#0f1b2b] p-3 rounded-xl text-xs">
                <div className="flex items-center justify-between text-gray-400 mb-1">
                  <span className="font-bold text-white">Nusrat Jahan</span>
                  <span className="text-[10px]">Verified Purchase</span>
                </div>
                <div className="flex text-amber-400 mb-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
                <p className="text-gray-300">
                  Great experience using Zaraz.app. Paid using bKash without any hassle. Highly recommended!
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => toast.success("Review submitted for moderation!")}
            className="mt-4 w-full py-2.5 rounded-xl border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black font-bold text-xs transition"
          >
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}
