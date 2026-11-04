"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { apiRequest } from "@/lib/api";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, itemCount, subtotal, shippingFee, discount, total, clearCart, deliveryMethod, setDeliveryMethod } = useCart();
  const { user } = useAuth();

  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "customer@zaraz.com");
  const [phone, setPhone] = useState(user?.phone || "01712345678");
  const [division, setDivision] = useState("Dhaka");
  const [city, setCity] = useState("Dhaka North");
  const [address, setAddress] = useState(user?.address || "House 12, Road 4, Sector 7, Uttara");
  const [deliveryType, setDeliveryType] = useState<"home" | "office">("home");

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad" | "rocket" | "card">("bkash");
  const [accountNumber, setAccountNumber] = useState("01712345678");
  const [pinOrCvv, setPinOrCvv] = useState("1234");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-black text-white mb-2">No Items to Checkout</h2>
        <p className="text-gray-400 text-sm mb-6">Please add some products to your cart before proceeding.</p>
        <Link href="/" className="px-6 py-2.5 bg-emerald-500 text-black font-bold rounded-xl text-sm">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      toast.error("Please fill in all delivery details");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Sending order to backend & saving to MongoDB Atlas...");

    try {
      const orderPayload = {
        customer: {
          name,
          email,
          phone,
          address,
          city: `${city}, ${division}`,
          area: city,
          deliveryType,
        },
        items: cart.map((item) => ({
          productId: item.product.id,
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images[0],
          brand: item.product.brand,
        })),
        delivery: {
          method: deliveryMethod,
          fee: shippingFee,
        },
        payment: {
          method: paymentMethod,
          accountNumber: paymentMethod !== "cod" ? accountNumber : null,
        },
        pricing: {
          subtotal,
          shippingFee,
          discount,
          total,
        },
      };

      // Send data from frontend to backend (zaraz-server) -> saves directly to MongoDB Atlas
      const data = await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify(orderPayload),
      });

      if (data.success && data.order) {
        toast.dismiss(toastId);
        toast.success("Order saved to MongoDB Atlas! Tracking number generated.", {
          duration: 4000,
        });
        clearCart();
        const orderId = data.order.id || data.order._id;
        router.push(`/orders/${orderId}`);
      } else {
        toast.dismiss(toastId);
        toast.error(data.message || "Failed to place order");
      }
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 mb-2 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Lock className="w-6 h-6 text-emerald-400" />
            Secure Checkout &amp; Delivery
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            100% Encrypted &bull; Direct Fulfillment Across 64 Districts of Bangladesh
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-[#091b14] border border-emerald-900/60 px-3.5 py-1.5 rounded-xl text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>MongoDB Atlas Connected</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Delivery Details & Payment (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Delivery Information Section */}
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/40">
                1
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" /> Delivery Address &amp; Contact
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jonathan Biswas"
                  className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Phone Number (For Delivery SMS) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01712345678"
                  className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. you@example.com"
                  className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Division</label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Dhaka">Dhaka Division</option>
                  <option value="Chittagong">Chittagong Division</option>
                  <option value="Sylhet">Sylhet Division</option>
                  <option value="Rajshahi">Rajshahi Division</option>
                  <option value="Khulna">Khulna Division</option>
                  <option value="Barisal">Barisal Division</option>
                  <option value="Rangpur">Rangpur Division</option>
                  <option value="Mymensingh">Mymensingh Division</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">City / District</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Delivery Location Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("home")}
                    className={`p-2.5 rounded-xl border font-bold text-center transition ${
                      deliveryType === "home"
                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-300"
                        : "bg-[#111e2f] border-gray-800 text-gray-400"
                    }`}
                  >
                    🏠 Home (All Day)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType("office")}
                    className={`p-2.5 rounded-xl border font-bold text-center transition ${
                      deliveryType === "office"
                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-300"
                        : "bg-[#111e2f] border-gray-800 text-gray-400"
                    }`}
                  >
                    🏢 Office (9am-6pm)
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-300 font-semibold mb-1">Detailed Street Address *</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House number, road number, apartment floor, landmarks..."
                  className="w-full bg-[#111e2f] text-white p-3 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Speed Options */}
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/40">
                2
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400" /> Delivery Service Option
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div
                onClick={() => setDeliveryMethod("standard")}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-start justify-between ${
                  deliveryMethod === "standard"
                    ? "bg-emerald-950/40 border-emerald-500 text-white shadow-md shadow-emerald-950/40"
                    : "bg-[#111e2f] border-gray-800 text-gray-400 hover:border-gray-700"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Standard Nationwide</h4>
                    <p className="text-gray-400 mt-0.5">2 - 3 Business Days Delivery</p>
                    <span className="text-[10px] text-emerald-400 font-medium">Free for orders over ৳999</span>
                  </div>
                </div>
                <span className="text-sm font-black text-emerald-400">
                  {subtotal >= 999 ? "FREE" : "৳60"}
                </span>
              </div>

              <div
                onClick={() => setDeliveryMethod("express")}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-start justify-between ${
                  deliveryMethod === "express"
                    ? "bg-emerald-950/40 border-emerald-500 text-white shadow-md shadow-emerald-950/40"
                    : "bg-[#111e2f] border-gray-800 text-gray-400 hover:border-gray-700"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Zaraz Express 24h</h4>
                    <p className="text-gray-400 mt-0.5">Priority Same Day / Tomorrow</p>
                    <span className="text-[10px] text-emerald-400 font-medium">Fast tracked by courier</span>
                  </div>
                </div>
                <span className="text-sm font-black text-emerald-400">৳120</span>
              </div>
            </div>
          </div>

          {/* 3. Payment Method Section */}
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/40">
                3
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" /> Select Payment Method
              </h2>
            </div>

            {/* Payment Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPaymentMethod("bkash")}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                  paymentMethod === "bkash"
                    ? "bg-[#e2136e]/20 border-[#e2136e] text-white"
                    : "bg-[#111e2f] border-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-xs font-black text-[#e2136e]">bKash</span>
                <span className="text-[10px] font-normal text-gray-400">Mobile Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("nagad")}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                  paymentMethod === "nagad"
                    ? "bg-[#f7941d]/20 border-[#f7941d] text-white"
                    : "bg-[#111e2f] border-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-xs font-black text-[#f7941d]">Nagad</span>
                <span className="text-[10px] font-normal text-gray-400">Postal Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("rocket")}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                  paymentMethod === "rocket"
                    ? "bg-[#8a2be2]/20 border-[#8a2be2] text-white"
                    : "bg-[#111e2f] border-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-xs font-black text-[#a855f7]">Rocket</span>
                <span className="text-[10px] font-normal text-gray-400">DBBL</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                  paymentMethod === "card"
                    ? "bg-blue-600/20 border-blue-500 text-white"
                    : "bg-[#111e2f] border-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-xs font-black text-blue-400">Card</span>
                <span className="text-[10px] font-normal text-gray-400">Visa / MC</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`col-span-2 sm:col-span-1 p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                  paymentMethod === "cod"
                    ? "bg-emerald-600/20 border-emerald-500 text-white"
                    : "bg-[#111e2f] border-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-xs font-black text-emerald-400">COD</span>
                <span className="text-[10px] font-normal text-gray-400">Cash On Delivery</span>
              </button>
            </div>

            {/* Payment Details Form */}
            {paymentMethod === "cod" ? (
              <div className="bg-[#051c14] border border-emerald-900/60 p-4 rounded-xl text-xs text-gray-300 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Pay When You Receive the Parcel</h4>
                  <p className="mt-1 leading-relaxed">
                    You can pay the full amount of <strong>{formatPrice(total)}</strong> directly in cash to the delivery courier after opening and verifying your package.
                  </p>
                </div>
              </div>
            ) : paymentMethod === "card" ? (
              <div className="space-y-3 bg-[#0d1b2a] border border-blue-900/40 p-4 rounded-xl text-xs">
                <p className="font-bold text-blue-300">Enter Card Information (Visa / Mastercard):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4123 4567 8901 2345"
                      defaultValue="4123 4567 8901 2345"
                      className="w-full bg-[#111e2f] text-white p-2.5 rounded-lg border border-gray-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-gray-400 block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="w-full bg-[#111e2f] text-white p-2.5 rounded-lg border border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 block mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="***"
                        defaultValue="789"
                        className="w-full bg-[#111e2f] text-white p-2.5 rounded-lg border border-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 bg-[#111e2f] border border-emerald-900/60 p-4 rounded-xl text-xs">
                <p className="font-bold text-emerald-300">
                  {paymentMethod.toUpperCase()} Direct Checkout Gateway:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 block mb-1">
                      {paymentMethod.toUpperCase()} Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="017xxxxxxxx"
                      className="w-full bg-black/60 text-white p-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">Security PIN / OTP *</label>
                    <input
                      type="password"
                      value={pinOrCvv}
                      onChange={(e) => setPinOrCvv(e.target.value)}
                      placeholder="Enter PIN"
                      className="w-full bg-black/60 text-white p-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">
                  A verification token will be processed through Zaraz Instant Pay. 100% Secure.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Order Summary & Confirmation Button (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-5 shadow-xl sticky top-24">
            <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-gray-800">
              Order Summary ({itemCount} {itemCount === 1 ? "Item" : "Items"})
            </h3>

            {/* Small Item list preview */}
            <div className="max-h-48 overflow-y-auto space-y-2.5 mb-4 pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-10 h-10 rounded-lg object-cover bg-black flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-200 font-medium truncate">{product.title}</p>
                    <p className="text-gray-500 text-[11px]">
                      {quantity} &times; {formatPrice(product.price)}
                    </p>
                  </div>
                  <span className="text-white font-bold">{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>

            {/* Financial calculation */}
            <div className="space-y-2 text-xs py-3 border-t border-b border-gray-800">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span className="text-white font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping Fee:</span>
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
              <span className="text-sm font-bold text-white">Grand Total:</span>
              <span className="text-2xl font-black text-emerald-400">
                {formatPrice(total)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-700 text-black font-black text-sm rounded-xl shadow-xl shadow-emerald-950/80 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{isSubmitting ? "Saving to MongoDB..." : "Confirm & Place Order"}</span>
            </button>

            <div className="mt-4 pt-3 border-t border-gray-800 text-center text-[11px] text-gray-500">
              <p>Sent directly to backend server &amp; saved to MongoDB Atlas.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
