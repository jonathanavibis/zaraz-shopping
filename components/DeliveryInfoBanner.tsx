import React from "react";
import { Truck, ShieldCheck, CreditCard, RotateCcw, Clock } from "lucide-react";

export default function DeliveryInfoBanner() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 my-4 sm:my-6">
      <div className="bg-gradient-to-r from-[#041a12] via-[#092218] to-[#041a12] border border-emerald-900/60 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 relative z-10">
          <div className="text-center md:text-left">
            <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-1.5 sm:mb-2">
              ZARAZ DELIVERY PROMISE
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white">
              Fast, Reliable Delivery to Your Doorstep
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
              Enjoy nationwide parcel tracking, verified Cash on Delivery across all 64 districts in Bangladesh, and 24/7 dedicated customer care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 w-full md:w-auto text-xs">
            <div className="flex items-center gap-3 bg-[#090e18]/80 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-emerald-900/40">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-white text-xs">Standard (৳60)</p>
                <p className="text-[10px] sm:text-[11px] text-gray-400">2-3 Business Days</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#090e18]/80 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-emerald-900/40">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-white text-xs">Express (৳120)</p>
                <p className="text-[10px] sm:text-[11px] text-gray-400">Same Day / 24 Hours</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#090e18]/80 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-emerald-900/40">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-white text-xs">Cash on Delivery</p>
                <p className="text-[10px] sm:text-[11px] text-gray-400">Pay after receiving</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
