import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Zaraz.app - Online Shopping BD | Daraz Inspired Green & Black",
  description: "Shop electronics, gadgets, fashion, and home appliances on Zaraz.app with nationwide delivery, cash on delivery, and 100% authentic guarantees.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <body className="min-h-screen flex flex-col bg-[#090d16] text-gray-100 antialiased">
        <AuthProvider>
          <CartProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: "#0d1420",
                  color: "#f3f4f6",
                  border: "1px solid #059669",
                  borderRadius: "12px",
                  fontSize: "13px",
                },
                success: {
                  iconTheme: {
                    primary: "#10b981",
                    secondary: "#090d16",
                  },
                },
              }}
            />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
