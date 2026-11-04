import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  PhoneCall,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#070b12] text-gray-400 border-t border-emerald-950/80 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top 4 Value Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-900/60 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Nationwide Delivery</h4>
              <p className="text-xs text-gray-400">Fast 2-3 days shipping across BD</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-900/60 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Safe & Easy Payments</h4>
              <p className="text-xs text-gray-400">bKash, Nagad, Cards & COD</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-900/60 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Authentic</h4>
              <p className="text-xs text-gray-400">Direct from certified brand stores</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-900/60 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">14-Day Free Returns</h4>
              <p className="text-xs text-gray-400">Hassle-free replacement policy</p>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-black text-lg">
                Z
              </div>
              <span className="text-xl font-black text-white">ZARAZ<span className="text-emerald-400">.app</span></span>
            </div>
            <p className="text-xs leading-relaxed text-gray-400 mb-4">
              Bangladesh&apos;s next-generation e-commerce shopping destination crafted with a bold green &amp; black modern design, instant cash on delivery, and authentic brand collections.
            </p>
            <div className="text-xs text-gray-400 space-y-1.5">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /> Gulshan-2, Dhaka 1212, Bangladesh</p>
              <p className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-emerald-400" /> +880 9610-000000 (9am - 10pm)</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-400" /> support@zaraz.app</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider text-emerald-400">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/help" className="hover:text-emerald-400 transition">Help Center &amp; FAQ</Link></li>
              <li><Link href="/orders" className="hover:text-emerald-400 transition">How to Buy &amp; Order Tracking</Link></li>
              <li><Link href="/help" className="hover:text-emerald-400 transition">Returns &amp; Refunds Policy</Link></li>
              <li><Link href="/help" className="hover:text-emerald-400 transition">Shipping &amp; Delivery Charges</Link></li>
              <li><Link href="/help" className="hover:text-emerald-400 transition">Warranty &amp; Authentic Guarantee</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider text-emerald-400">
              Zaraz Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#products" className="hover:text-emerald-400 transition">Zaraz Mall Brands</Link></li>
              <li><Link href="/#flash-sale" className="hover:text-emerald-400 transition">Flash Sales &amp; Daily Deals</Link></li>
              <li><Link href="/cart" className="hover:text-emerald-400 transition">Free Shipping Campaign</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition">Privacy Agreement</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider text-emerald-400">
              Payment Methods &amp; Delivery
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              We support all major Bangladeshi payment channels and instant cash on delivery:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-[#e2136e] text-white">bKash</span>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-[#f7941d] text-white">Nagad</span>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-[#8a2be2] text-white">Rocket</span>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-emerald-600 text-black">Cash On Delivery</span>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-blue-700 text-white">VISA</span>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-red-600 text-white">Mastercard</span>
            </div>
            <p className="text-xs text-gray-500">
              Trusted by 50,000+ satisfied buyers every month.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Zaraz.app (Daraz Inspired E-Commerce). Built with Next.js &amp; Tailwind CSS.</p>
          <p className="mt-2 sm:mt-0 text-emerald-500 font-medium">Theme: Green &amp; Matte Black</p>
        </div>
      </div>
    </footer>
  );
}
