# 🛍️ Zaraz.app — Modern Daraz-Inspired E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-v5-570DF8?logo=daisyui)](https://daisyui.com/)
[![Theme](https://img.shields.io/badge/Theme-Green%20%26%20Black-10b981)](https://zaraz.app)

> **Zaraz.app** is a full-stack, enterprise-grade e-commerce application inspired by **Daraz.com**, customized in a high-contrast **Green and Black** aesthetic. Designed for Bangladeshi and South Asian online retail with built-in delivery logistics, multi-channel payment gateway (bKash, Nagad, Rocket, Cards, Cash On Delivery), real-time order tracking, flash sales, categories, and promotional banners.

---

## 🎨 Color Palette & Design Identity
- **Primary Emerald Green:** `#10b981` / `#059669` (Action buttons, prices, active status badges, glowing accents)
- **Deep Matte Black & Obsidian:** `#090d16` / `#0b1420` / `#000000` (Modern contrast backdrop, cards, navbar)
- **Accent Gold/Amber:** `#f59e0b` (Ratings, flash sale countdown badges)
- **Theme Support:** Dark & Light modes with persistent state in `localStorage`.

---

## 🚀 Core Features (Following Daraz.com)

### 1. 🏷️ Categories & Mega Navigation
- Curated departments: Smartphones & Gadgets, Laptops & Computers, Men's Fashion, Women's Fashion, Audio & Headphones, Home & Kitchen, Smart Watches, Gaming & Consoles.
- Direct filtering by category slug (`/categories/[slug]`) with multi-tier price, rating, and free delivery toggles.

### 2. ⚡ Flash Sales with Live Countdown Timer
- Synchronized live countdown timer (`[Hours] : [Minutes] : [Seconds]`).
- Limited stock progress bar ("🔥 Almost Sold Out", "Only X items left").
- Instant discount tags up to 65% OFF.

### 3. 🛡️ Zaraz Mall (100% Authentic Store)
- Official brand partner badges (Apple, Sony, Samsung, Philips, etc.).
- 14-Day Free & Easy Return policy.
- Verified seller metrics (98% positive seller rating, 99% response rate).

### 4. 🚚 Comprehensive Delivery Logistics
- **Standard Delivery:** ৳60 (Free across Bangladesh on orders over ৳999).
- **Zaraz Express Delivery:** ৳120 (Priority Same Day / 24-hour turnaround).
- **Cash on Delivery (COD):** Full parcel verification upon handover.
- Nationwide coverage across all 64 districts.

### 5. 💳 Multi-Channel Payment Integration
- **bKash:** Direct wallet checkout with simulated OTP/PIN verification.
- **Nagad:** Postal wallet integration.
- **Rocket:** DBBL gateway.
- **Credit / Debit Cards:** Visa and Mastercard with 3D Secure simulation.
- **Cash on Delivery (COD):** Zero upfront payment needed.

### 6. 📦 Real-Time Order Tracking Timeline
- Full lifecycle timeline:
  1. *Order Placed*
  2. *Payment Confirmed*
  3. *Packaging at Fulfillment Warehouse*
  4. *Handed over to Courier (Paperfly / RedX / Steadfast)*
  5. *Delivered & Signed*
- Tracking lookup by unique order number (e.g., `ZRZ-894231`).

### 7. 🎁 Vouchers & Cart Discounts
- Enter coupon `ZARAZ100` for an instant ৳100 off!
- Enter coupon `ZARAZGREEN` for 10% off entire order!

---

## 🛠️ Backend API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/products` | Retrieve all products (Supports `?category=`, `?search=`, `?flashSale=true`, `?sort=`) |
| `POST` | `/api/products` | Add new product to catalog |
| `GET` | `/api/products/[id]` | Get single product by ID or Slug |
| `DELETE` | `/api/products/[id]` | Delete a product from inventory |
| `GET` | `/api/categories` | Get all department categories |
| `GET` | `/api/banners` | Get promotional hero carousel banners |
| `GET` | `/api/orders` | Get order list (Filterable by `?email=`) |
| `POST` | `/api/orders` | Place new order with delivery address & payment details |
| `GET` | `/api/orders/[id]` | Track specific order status & timeline |
| `POST` | `/api/auth/login` | User login (Supports 1-click demo login) |
| `POST` | `/api/auth/register` | User signup with delivery address & phone |
| `POST` | `/api/payment/process` | Simulate payment transaction processing |
| `GET` | `/api/seed` | Reset & seed database with initial Daraz sample data |

---

## 🏃 How to Run Locally

### 1. Navigate to the project directory:
```bash
cd D:\Project\Zaraz.app
```

### 2. Start the Development Server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build:
```bash
npm run build
npm run start
```
