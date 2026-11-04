"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Product } from "@/lib/seed-data";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  voucherCode: string;
  applyVoucher: (code: string) => boolean;
  removeVoucher: () => void;
  total: number;
  deliveryMethod: "standard" | "express";
  setDeliveryMethod: (method: "standard" | "express") => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
  shippingFee: 60,
  discount: 0,
  voucherCode: "",
  applyVoucher: () => false,
  removeVoucher: () => {},
  total: 0,
  deliveryMethod: "standard",
  setDeliveryMethod: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("zaraz_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCart(items);
    try {
      localStorage.setItem("zaraz_cart", JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let updated: CartItem[];

    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += quantity;
    } else {
      updated = [...cart, { product, quantity }];
    }

    saveCart(updated);
    toast.success(`${product.title.slice(0, 24)}... added to cart!`, {
      icon: "🛒",
      style: {
        background: "#090d16",
        color: "#10b981",
        border: "1px solid #10b981",
      },
    });
  };

  const removeFromCart = (productId: string) => {
    const updated = cart.filter((item) => item.product.id !== productId);
    saveCart(updated);
    toast("Item removed from cart", { icon: "🗑️" });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updated = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
    setVoucherCode("");
    setDiscount(0);
  };

  const applyVoucher = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "ZARAZ100") {
      setVoucherCode("ZARAZ100");
      setDiscount(100);
      toast.success("Voucher ZARAZ100 applied! ৳100 discount added.");
      return true;
    } else if (cleanCode === "ZARAZGREEN") {
      const disc = Math.round(subtotal * 0.1);
      setVoucherCode("ZARAZGREEN");
      setDiscount(disc);
      toast.success(`Voucher ZARAZGREEN applied! ৳${disc} discount (10% OFF).`);
      return true;
    } else {
      toast.error("Invalid or expired voucher code");
      return false;
    }
  };

  const removeVoucher = () => {
    setVoucherCode("");
    setDiscount(0);
    toast("Voucher removed");
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Free shipping if subtotal >= 999 on standard delivery
  const baseShipping = deliveryMethod === "express" ? 120 : (subtotal >= 999 || subtotal === 0 ? 0 : 60);
  const shippingFee = cart.length === 0 ? 0 : baseShipping;
  const total = Math.max(0, subtotal + shippingFee - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingFee,
        discount,
        voucherCode,
        applyVoucher,
        removeVoucher,
        total,
        deliveryMethod,
        setDeliveryMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
