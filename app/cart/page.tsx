"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Truck,
  ShieldCheck,
  Tag,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    shippingFee,
    discount,
    voucherCode,
    applyVoucher,
    removeVoucher,
    total,
    deliveryMethod,
    setDeliveryMethod,
  } = useCart();

  const [inputVoucher, setInputVoucher] = useState("");

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVoucher.trim()) {
      applyVoucher(inputVoucher.trim());
      setInputVoucher("");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-950/40 border border-emerald-900/60 flex items-center justify-center mx-auto mb-6 text-emerald-400">
          <ShoppingCart className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Your Cart is Empty</h2>
        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
          Explore thousands of items on Zaraz.app with authentic warranties and fast delivery across Bangladesh.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm rounded-xl shadow-lg transition"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-emerald-400" />
            Shopping Cart ({itemCount} {itemCount === 1 ? "Item" : "Items"})
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review your selected products and proceed to secure checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-400 hover:text-red-300 underline"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg hover:border-emerald-500/40 transition"
            >
              {/* Image & Title */}
              <div className="flex items-center gap-4 flex-1">
                <Link
                  href={`/products/${product.id}`}
                  className="w-20 h-20 rounded-xl overflow-hidden bg-black/60 flex-shrink-0 border border-gray-800"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {product.brand} &bull; {product.category}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-sm font-bold text-white hover:text-emerald-400 transition line-clamp-1 mt-0.5">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-black text-emerald-400">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Delete */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-800">
                <div className="flex items-center border border-gray-700 rounded-xl bg-[#111e2f] overflow-hidden">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-emerald-950 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-emerald-950 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <span className="text-sm font-black text-white">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-gray-500 hover:text-red-400 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Value Assurance Box */}
          <div className="bg-[#061811] border border-emerald-900/60 rounded-2xl p-4 flex items-center justify-between text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Enjoy <strong>FREE Delivery</strong> across Bangladesh on orders ৳999+</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Right: Order Summary & Voucher (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Voucher Code Box */}
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-400" /> Have a Coupon or Voucher?
            </h3>
            {voucherCode ? (
              <div className="flex items-center justify-between bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> {voucherCode} Applied
                  </span>
                  <p className="text-[11px] text-gray-400">Discount of {formatPrice(discount)}</p>
                </div>
                <button
                  onClick={removeVoucher}
                  className="text-xs font-semibold text-red-400 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyVoucher} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter ZARAZ100 or ZARAZGREEN"
                  value={inputVoucher}
                  onChange={(e) => setInputVoucher(e.target.value)}
                  className="flex-1 bg-[#111e2f] text-white text-xs px-3.5 py-2.5 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500 uppercase"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs px-4 rounded-xl transition"
                >
                  Apply
                </button>
              </form>
            )}
            <p className="text-[11px] text-gray-500 mt-2">
              Tip: Use voucher code <strong>ZARAZ100</strong> for ৳100 discount!
            </p>
          </div>

          {/* Delivery Method Selection */}
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" /> Choose Delivery Speed
            </h3>
            <div className="space-y-2.5 text-xs">
              <label
                onClick={() => setDeliveryMethod("standard")}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                  deliveryMethod === "standard"
                    ? "bg-emerald-950/40 border-emerald-500 text-white"
                    : "bg-[#111e2f] border-gray-800 text-gray-400"
                }`}
              >
                <div>
                  <span className="font-bold block">Standard Nationwide</span>
                  <span className="text-[11px] text-gray-400">2 - 3 Business Days</span>
                </div>
                <span className="font-black text-emerald-400">
                  {subtotal >= 999 ? "FREE" : "৳60"}
                </span>
              </label>

              <label
                onClick={() => setDeliveryMethod("express")}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                  deliveryMethod === "express"
                    ? "bg-emerald-950/40 border-emerald-500 text-white"
                    : "bg-[#111e2f] border-gray-800 text-gray-400"
                }`}
              >
                <div>
                  <span className="font-bold block">Zaraz Express</span>
                  <span className="text-[11px] text-gray-400">Same Day / 24 Hours</span>
                </div>
                <span className="font-black text-emerald-400">৳120</span>
              </label>
            </div>
          </div>

          {/* Order Calculation & Checkout Button */}
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-4">Order Summary</h3>
            <div className="space-y-2.5 text-xs pb-4 border-b border-gray-800">
              <div className="flex justify-between text-gray-400">
                <span>Items Subtotal:</span>
                <span className="text-white font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery Charge:</span>
                <span className="text-white font-semibold">
                  {shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : formatPrice(shippingFee)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Voucher Discount:</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-baseline pt-4 mb-6">
              <span className="text-sm font-bold text-white">Total Amount:</span>
              <span className="text-2xl font-black text-emerald-400">
                {formatPrice(total)}
              </span>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  toast.error("Please sign in to your Zaraz account before proceeding to checkout.");
                  router.push("/login?redirect=/checkout");
                  return;
                }
                router.push("/checkout");
              }}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
