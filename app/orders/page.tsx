"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Truck, Search, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTracking, setSearchTracking] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const query = user?.email ? `?email=${encodeURIComponent(user.email)}` : "";
        const data = await apiRequest(`/orders${query}`);
        if (data.success && data.orders) {
          setOrders(data.orders);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [user]);

  const filteredOrders = orders.filter((o) =>
    searchTracking
      ? o.orderNumber?.toLowerCase().includes(searchTracking.toLowerCase()) ||
        o.id?.toLowerCase().includes(searchTracking.toLowerCase()) ||
        o._id?.toLowerCase().includes(searchTracking.toLowerCase())
      : true
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-emerald-400" />
            My Orders &amp; Delivery Tracking
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time fulfillment and dispatch updates loaded directly from MongoDB Atlas.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search Order Number (e.g. ZRZ-123456)..."
            value={searchTracking}
            onChange={(e) => setSearchTracking(e.target.value)}
            className="w-full bg-[#111e2f] text-white text-xs px-3.5 py-2.5 rounded-xl border border-gray-800 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-gray-500 absolute right-3 top-3" />
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-gray-400">Loading orders from MongoDB...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-12 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-900/60 flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <Truck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No Orders Found</h3>
          <p className="text-xs text-gray-400 mb-6 max-w-sm mx-auto">
            You have not placed any orders yet, or no orders match your search query.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-black font-extrabold text-xs rounded-xl transition"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const orderId = order.id || order._id;
            return (
              <div
                key={orderId}
                className="bg-[#0b1420] border border-emerald-950/80 hover:border-emerald-500/50 rounded-2xl p-5 shadow-xl transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-extrabold text-white">
                        Order #{order.orderNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Placed: {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-400">Order Total</p>
                    <p className="text-base font-black text-emerald-400">
                      {formatPrice(order.pricing?.total || 0)}
                    </p>
                  </div>
                </div>

                {/* Items row */}
                <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-x-auto">
                    {order.items?.slice(0, 4).map((item: any, idx: number) => (
                      <img
                        key={idx}
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover bg-black border border-gray-800 flex-shrink-0"
                        title={item.title}
                      />
                    ))}
                    {order.items?.length > 4 && (
                      <span className="text-xs font-bold text-gray-400 px-2">
                        +{order.items.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-xs text-gray-400">
                      <span className="flex items-center gap-1 text-emerald-300 font-medium">
                        <Clock className="w-3.5 h-3.5" /> {order.delivery?.estimatedDelivery || "2 - 3 Days"}
                      </span>
                      <span>Pay: <strong className="text-white uppercase">{order.payment?.method || "COD"}</strong></span>
                    </div>

                    <Link
                      href={`/orders/${orderId}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl transition"
                    >
                      <span>Track Order</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
