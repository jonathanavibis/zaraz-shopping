"use client";

import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import { Product } from "@/lib/seed-data";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const productId = product.id || (product as any)._id || product.slug;

  return (
    <div className="group relative bg-[#0e1624] border border-emerald-950/70 hover:border-emerald-500/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/40 hover:-translate-y-1">
      {/* Product Image Area */}
      <Link href={`/products/${productId}`} className="block relative aspect-square overflow-hidden bg-black/40">
        <img
          src={product.images[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-black font-extrabold text-[11px] px-2 py-0.5 rounded-md shadow-md">
            -{product.discountPercentage}%
          </span>
        )}

        {/* Mall Official Badge */}
        {product.isOfficial && (
          <span className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded flex items-center gap-1 shadow">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> MALL
          </span>
        )}

        {/* Free Delivery Tag */}
        {product.isFreeDelivery && (
          <span className="absolute bottom-2 left-2 bg-[#04281b]/90 border border-emerald-500/30 text-emerald-300 font-semibold text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
            <Truck className="w-3 h-3 text-emerald-400" /> Free Delivery
          </span>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
            <span className="text-emerald-400 font-semibold">{product.brand}</span>
            <span>{product.soldCount > 0 ? `${product.soldCount}+ sold` : "New"}</span>
          </div>

          {/* Title */}
          <Link href={`/products/${productId}`}>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-100 hover:text-emerald-400 line-clamp-2 transition leading-snug mb-2">
              {product.title}
            </h3>
          </Link>
        </div>

        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-gray-200">{product.rating}</span>
            <span className="text-[11px] text-gray-500">({product.reviewsCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-black text-emerald-400">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Quick Add To Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2 px-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-500 border border-emerald-800/80 hover:border-emerald-400 text-emerald-300 hover:text-black font-bold text-xs flex items-center justify-center gap-1.5 transition duration-200 shadow"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add To Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
