import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full bg-[#0b1420] border border-emerald-950/80 rounded-3xl p-8 shadow-2xl">
        <span className="text-6xl font-black text-emerald-400 block mb-2">404</span>
        <h2 className="text-xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-xs text-gray-400 mb-6">
          The page or product you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-black font-extrabold text-xs rounded-xl shadow-lg transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Zaraz Homepage</span>
        </Link>
      </div>
    </div>
  );
}
