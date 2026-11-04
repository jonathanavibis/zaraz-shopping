"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  CreditCard,
  ArrowLeft,
  Phone,
  Calendar,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { apiRequest } from "@/lib/api";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        const data = await apiRequest(`/orders/${id}`);
        if (data.success && data.order) {
          setOrder(data.order);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400 text-sm">Retrieving order tracking data from MongoDB Atlas...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Order Not Found</h2>
        <p className="text-gray-400 text-sm mb-6">Could not find tracking records for {id}.</p>
        <Link href="/orders" className="px-6 py-2.5 bg-emerald-500 text-black font-bold rounded-xl text-sm">
          View All Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 mb-2 transition"
          >
            <ArrowLeft className="w-4 h-4" /> All Orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white">
              Order #{order.orderNumber}
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              {order.status}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <Link
          href="/"
          className="self-start sm:self-auto px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600 hover:text-black border border-emerald-500/40 text-emerald-400 text-xs font-bold rounded-xl transition"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Live Tracking Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-6 shadow-xl">
            <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-400" /> Live Delivery Progress
            </h2>

            {/* Timeline Steps */}
            <div className="relative pl-6 space-y-6 border-l-2 border-emerald-900/60 ml-3">
              {order.timeline?.map((step: any, index: number) => (
                <div key={index} className="relative group">
                  {/* Indicator Dot */}
                  <div
                    className={`absolute -left-[31px] top-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-emerald-500 text-black shadow-md shadow-emerald-900/60 ring-4 ring-[#0b1420]"
                        : "bg-gray-800 text-gray-500 ring-4 ring-[#0b1420]"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                    )}
                  </div>

                  {/* Step content */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold ${
                          step.completed ? "text-emerald-300" : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[11px] text-gray-500 font-mono">
                        {step.time} &bull; {step.date}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ordered Items List */}
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-400" /> Package Contents ({order.items?.length || 0})
            </h3>
            <div className="space-y-3">
              {order.items?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#111e2f] border border-gray-800/80"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover bg-black flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Qty: <strong className="text-emerald-400">{item.quantity}</strong> &bull; {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Customer & Delivery Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Delivery Address Card */}
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" /> Delivery Destination
            </h3>
            <div className="text-xs text-gray-300 space-y-1.5 bg-[#111e2f] p-4 rounded-xl border border-gray-800">
              <p className="font-bold text-white text-sm">{order.customer?.name}</p>
              <p className="text-gray-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> {order.customer?.phone}
              </p>
              <p className="text-gray-300 mt-2">{order.customer?.address}</p>
              <p className="text-emerald-400 font-medium">{order.customer?.city}</p>
              <div className="pt-2 border-t border-gray-700/60 mt-2 flex items-center justify-between text-[11px] text-gray-400">
                <span>Location Type:</span>
                <span className="uppercase font-bold text-white">{order.customer?.deliveryType || "home"}</span>
              </div>
            </div>
          </div>

          {/* Payment & Delivery Details */}
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" /> Payment &amp; Logistics
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#111e2f] border border-gray-800">
                <span className="text-gray-400">Payment Channel:</span>
                <span className="font-bold text-white uppercase">{order.payment?.method}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#111e2f] border border-gray-800">
                <span className="text-gray-400">Payment Status:</span>
                <span className="font-bold text-emerald-400">{order.payment?.status}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#111e2f] border border-gray-800">
                <span className="text-gray-400">Transaction ID:</span>
                <span className="font-mono text-gray-300 text-[11px]">{order.payment?.transactionId}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#111e2f] border border-gray-800">
                <span className="text-gray-400">Estimated Arrival:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {order.delivery?.estimatedDelivery || "2 - 3 Days"}
                </span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3">Financial Total</h3>
            <div className="space-y-2 text-xs pb-3 border-b border-gray-800 text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-white font-semibold">{formatPrice(order.pricing?.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span className="text-white font-semibold">
                  {order.pricing?.shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : formatPrice(order.pricing?.shippingFee || 0)}
                </span>
              </div>
              {order.pricing?.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount:</span>
                  <span>-{formatPrice(order.pricing?.discount)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-baseline pt-3">
              <span className="text-sm font-bold text-white">Total Paid:</span>
              <span className="text-2xl font-black text-emerald-400">
                {formatPrice(order.pricing?.total || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
