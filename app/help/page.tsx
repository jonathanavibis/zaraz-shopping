"use client";

import React from "react";
import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck, CreditCard, PhoneCall, Mail, MapPin, ArrowLeft } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Zaraz Shop
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-white">Zaraz Customer Care &amp; Support</h1>
        <p className="text-xs text-gray-400 mt-2 max-w-lg mx-auto">
          We are committed to delivering the best shopping experience with swift nationwide dispatch, zero-hassle returns, and 24/7 client support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-6 shadow-xl">
          <Truck className="w-8 h-8 text-emerald-400 mb-3" />
          <h3 className="text-base font-bold text-white mb-2">Nationwide Shipping Rates</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Standard delivery is <strong>FREE</strong> for orders above ৳999 across all 64 districts in Bangladesh! For orders under ৳999, standard shipping is only ৳60 (2-3 business days), and priority Express delivery is ৳120 (within 24 hours).
          </p>
        </div>

        <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-6 shadow-xl">
          <RotateCcw className="w-8 h-8 text-emerald-400 mb-3" />
          <h3 className="text-base font-bold text-white mb-2">14-Day Free Returns Policy</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            If your item arrives defective, damaged, or does not match the description, you can claim a 100% free return or replacement within 14 days of delivery.
          </p>
        </div>

        <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-6 shadow-xl">
          <CreditCard className="w-8 h-8 text-emerald-400 mb-3" />
          <h3 className="text-base font-bold text-white mb-2">Accepted Payment Methods</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            We support instant Cash on Delivery (COD), bKash, Nagad, Rocket, and Visa/Mastercard debit and credit cards with bank-grade SSL encryption.
          </p>
        </div>

        <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-6 shadow-xl">
          <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
          <h3 className="text-base font-bold text-white mb-2">100% Authentic Guarantee</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            All products listed under <strong>Zaraz Mall</strong> are sourced directly from authorized brand distributors with genuine manufacturer warranties.
          </p>
        </div>
      </div>

      <div className="bg-[#0b1420] border border-emerald-950/80 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-white">Need Personal Assistance?</h3>
          <p className="text-xs text-gray-400 mt-1">Our support specialists are ready to answer any questions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <PhoneCall className="w-4 h-4" /> +880 9610-000000
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Mail className="w-4 h-4" /> support@zaraz.app
          </span>
        </div>
      </div>
    </div>
  );
}
