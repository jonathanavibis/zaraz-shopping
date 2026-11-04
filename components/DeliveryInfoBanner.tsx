import React from "react";
import { Truck, ShieldCheck, CreditCard, RotateCcw, Clock } from "lucide-react";

export default function DeliveryInfoBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 my-6">
      <div className="bg-gradient-to-r from-[#041a12] via-[#092218] to-[#041a12] border border-emerald-900/60 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center md:text-left">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-2">
              ZARAZ DELIVERY PROMISE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Fast, Reliable Delivery to Your Doorstep
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
              Enjoy nationwide parcel tracking, verified Cash on Delivery across all 64 districts in Bangladesh, and 24/7 dedicated customer care.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-[#090e18]/80 px-4 py-2.5 rounded-xl border border-emerald-900/40">
              <Truck className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="font-bold text-white">Standard (৳60)</p>
                <p className="text-[11px] text-gray-400">2-3 Business Days</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#090e18]/80 px-4 py-2.5 rounded-xl border border-emerald-900/40">
              <Clock className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="font-bold text-white">Express (৳120)</p>
                <p className="text-[11px] text-gray-400">Same Day / 24 Hours</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#090e18]/80 px-4 py-2.5 rounded-xl border border-emerald-900/40">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="font-bold text-white">Cash on Delivery</p>
                <p className="text-[11px] text-gray-400">Pay after receiving</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
