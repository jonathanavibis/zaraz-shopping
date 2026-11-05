"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SocialButtons({
  redirectUrl = "/",
}: {
  redirectUrl?: string;
}) {
  const [activeProvider, setActiveProvider] = useState<"google" | "github" | null>(null);

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setActiveProvider(provider);
    try {
      const fullCallback = redirectUrl.startsWith("http")
        ? redirectUrl
        : `${window.location.origin}${redirectUrl.startsWith("/") ? redirectUrl : `/${redirectUrl}`}`;

      // Invokes BetterAuth social sign-in with Google / GitHub Client credentials from .env
      const res = await authClient.signIn.social({
        provider,
        callbackURL: fullCallback,
      });

      if (res?.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err: any) {
      console.error(`${provider} OAuth redirect error:`, err);
      toast.error(`Could not initiate ${provider} sign-in. Please try again.`);
      setActiveProvider(null);
    }
  };

  return (
    <div className="w-full space-y-2.5">
      {/* Google Sign In Button */}
      <button
        type="button"
        onClick={() => handleSocialSignIn("google")}
        disabled={activeProvider !== null}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-700 bg-[#111e2f] hover:bg-[#16273e] hover:border-emerald-500/50 py-3 px-4 text-xs sm:text-sm font-semibold text-gray-200 transition shadow-sm disabled:opacity-60 cursor-pointer"
      >
        <FcGoogle className="h-5 w-5 shrink-0" />
        <span>
          {activeProvider === "google" ? "Connecting to Google..." : "Continue with Google"}
        </span>
      </button>

      {/* GitHub Sign In Button */}
      <button
        type="button"
        onClick={() => handleSocialSignIn("github")}
        disabled={activeProvider !== null}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-700 bg-[#0d1624] text-white hover:bg-[#121d30] hover:border-emerald-500/50 py-3 px-4 text-xs sm:text-sm font-semibold transition shadow-sm disabled:opacity-60 cursor-pointer"
      >
        <FaGithub className="h-5 w-5 shrink-0 text-white" />
        <span>
          {activeProvider === "github" ? "Connecting to GitHub..." : "Continue with GitHub"}
        </span>
      </button>
    </div>
  );
}
