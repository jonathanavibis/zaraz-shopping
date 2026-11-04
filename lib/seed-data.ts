export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  soldCount: number;
  category: string;
  categorySlug: string;
  brand: string;
  isFlashSale?: boolean;
  isFreeDelivery?: boolean;
  isOfficial?: boolean;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  seller: {
    name: string;
    rating: number;
    responseRate: string;
  };
  deliveryInfo: {
    standardDays: string;
    standardFee: number;
    expressDays: string;
    expressFee: number;
    codAvailable: boolean;
  };
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  itemCount: number;
  accentColor: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  highlightText: string;
  image: string;
  buttonText: string;
  link: string;
  badge: string;
}

export const initialCategories: Category[] = [
  {
    id: "cat-1",
    name: "Smartphones & Gadgets",
    slug: "smartphones-gadgets",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    itemCount: 248,
    accentColor: "#10b981",
  },
  {
    id: "cat-2",
    name: "Laptops & Computers",
    slug: "laptops-computers",
    icon: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    itemCount: 165,
    accentColor: "#059669",
  },
  {
    id: "cat-3",
    name: "Men's Fashion & Wear",
    slug: "mens-fashion",
    icon: "Shirt",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80",
    itemCount: 412,
    accentColor: "#047857",
  },
  {
    id: "cat-4",
    name: "Women's Fashion",
    slug: "womens-fashion",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
    itemCount: 520,
    accentColor: "#10b981",
  },
  {
    id: "cat-5",
    name: "Audio & Headphones",
    slug: "audio-headphones",
    icon: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    itemCount: 130,
    accentColor: "#34d399",
  },
  {
    id: "cat-6",
    name: "Home & Kitchen Appliances",
    slug: "home-kitchen",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
    itemCount: 290,
    accentColor: "#059669",
  },
  {
    id: "cat-7",
    name: "Smart Watches & Fitness",
    slug: "smart-watches",
    icon: "Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    itemCount: 184,
    accentColor: "#10b981",
  },
  {
    id: "cat-8",
    name: "Gaming & Consoles",
    slug: "gaming-consoles",
    icon: "Gamepad2",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&auto=format&fit=crop&q=80",
    itemCount: 96,
    accentColor: "#047857",
  },
];

export const initialBanners: Banner[] = [
  {
    id: "b-1",
    title: "Zaraz Mega Green Festival",
    subtitle: "Up to 65% OFF on Latest Flagships & Laptops",
    highlightText: "Code: ZARAZGREEN100 | Free Express Delivery across Bangladesh",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80",
    buttonText: "Shop Flash Deals",
    link: "/#flash-sale",
    badge: "11.11 MEGA DEAL",
  },
  {
    id: "b-2",
    title: "Zaraz Mall 100% Authentic",
    subtitle: "Direct From Brand Stores With 14-Day Free Returns",
    highlightText: "Official Apple, Sony, Samsung, Xiaomi & OnePlus Warranty",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&auto=format&fit=crop&q=80",
    buttonText: "Explore Mall",
    link: "/#products",
    badge: "ZARAZ MALL",
  },
  {
    id: "b-3",
    title: "Everyday Cash On Delivery",
    subtitle: "Check Your Parcel Before Payment - Pay With bKash / Nagad",
    highlightText: "Fast 2-3 Day Nationwide Dispatch To All 64 Districts",
    image: "https://images.unsplash.com/photo-1556742049-0a67e5572293?w=1200&auto=format&fit=crop&q=80",
    buttonText: "Order Now",
    link: "/#products",
    badge: "SAFE SHOPPING",
  },
];

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    title: "Apple iPhone 15 Pro Max - 256GB Natural Titanium (Official Warranty)",
    slug: "iphone-15-pro-max-256gb",
    price: 154999,
    originalPrice: 179999,
    discountPercentage: 14,
    rating: 4.9,
    reviewsCount: 342,
    stock: 18,
    soldCount: 1420,
    category: "Smartphones & Gadgets",
    categorySlug: "smartphones-gadgets",
    brand: "Apple",
    isFlashSale: true,
    isFreeDelivery: true,
    isOfficial: true,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Experience the pinnacle of mobile innovation with the iPhone 15 Pro Max in Natural Titanium. Powered by the groundbreaking A17 Pro chip with hardware ray-tracing, customizable Action button, 48MP main camera system with 5x optical telephoto lens, and USB-C connectivity with 10Gbps transfer speeds.",
    specifications: {
      "Display": "6.7-inch Super Retina XDR OLED 120Hz ProMotion",
      "Processor": "Apple A17 Pro (3nm)",
      "Storage": "256GB NVMe",
      "Battery": "Up to 29 hours video playback",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
      "OS": "iOS 17 upgradable to iOS 18",
      "Warranty": "1 Year Official Apple Warranty"
    },
    seller: {
      name: "Apple Flagship Store Bangladesh",
      rating: 4.9,
      responseRate: "99%"
    },
    deliveryInfo: {
      standardDays: "2 - 3 Days",
      standardFee: 0,
      expressDays: "Tomorrow",
      expressFee: 120,
      codAvailable: true
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-2",
    title: "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones",
    slug: "sony-wh-1000xm5-headphones",
    price: 36500,
    originalPrice: 42000,
    discountPercentage: 13,
    rating: 4.8,
    reviewsCount: 189,
    stock: 25,
    soldCount: 840,
    category: "Audio & Headphones",
    categorySlug: "audio-headphones",
    brand: "Sony",
    isFlashSale: true,
    isFreeDelivery: true,
    isOfficial: true,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and crystal clear hands-free calling with 4 beamforming mics.",
    specifications: {
      "Type": "Over-Ear Wireless ANC",
      "Battery Life": "30 Hours with ANC on",
      "Charging": "USB-PD Quick Charge (3 min for 3 hours)",
      "Bluetooth": "Version 5.2 (LDAC, AAC, SBC)",
      "Weight": "250g Ultra-comfortable fit"
    },
    seller: {
      name: "Sony Official Bangladesh",
      rating: 4.8,
      responseRate: "97%"
    },
    deliveryInfo: {
      standardDays: "2 - 4 Days",
      standardFee: 0,
      expressDays: "24 Hours",
      expressFee: 90,
      codAvailable: true
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-3",
    title: "MacBook Air M3 13.6-Inch Liquid Retina Display (16GB RAM, 512GB SSD) Midnight",
    slug: "macbook-air-m3-midnight",
    price: 162000,
    originalPrice: 185000,
    discountPercentage: 12,
    rating: 4.9,
    reviewsCount: 124,
    stock: 12,
    soldCount: 390,
    category: "Laptops & Computers",
    categorySlug: "laptops-computers",
    brand: "Apple",
    isFlashSale: false,
    isFreeDelivery: true,
    isOfficial: true,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Lean, mean M3 machine. Incredibly thin and blazing fast, MacBook Air sails through work and play. An anodization seal on Midnight reduces fingerprints significantly. Liquid Retina display supports 1 billion colors.",
    specifications: {
      "Chip": "Apple M3 (8-core CPU, 10-core GPU)",
      "Unified Memory": "16GB",
      "Storage": "512GB High-speed SSD",
      "Display": "13.6-inch Liquid Retina Display 500 nits",
      "Weight": "1.24 kg"
    },
    seller: {
      name: "TechLand Zaraz Mall",
      rating: 4.9,
      responseRate: "98%"
    },
    deliveryInfo: {
      standardDays: "1 - 3 Days",
      standardFee: 0,
      expressDays: "Same Day Dhaka",
      expressFee: 150,
      codAvailable: true
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-4",
    title: "Samsung Galaxy Watch 6 Classic 47mm Bluetooth (Rotating Bezel, Black)",
    slug: "samsung-galaxy-watch-6-classic",
    price: 28999,
    originalPrice: 35000,
    discountPercentage: 17,
    rating: 4.7,
    reviewsCount: 215,
    stock: 30,
    soldCount: 650,
    category: "Smart Watches & Fitness",
    categorySlug: "smart-watches",
    brand: "Samsung",
    isFlashSale: true,
    isFreeDelivery: true,
    isOfficial: true,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Timeless style meets modern wellness tracking. Featuring a slim physical rotating bezel, sapphire crystal glass display, ECG heart rhythm notification, and advanced sleep coaching.",
    specifications: {
      "Display": "1.5-inch Super AMOLED 480x480 Sapphire Crystal",
      "Sensors": "BioActive Sensor (HR, ECG, BIA), Temperature sensor",
      "Water Resistance": "5ATM + IP68 / MIL-STD-810H",
      "Battery": "425mAh with WPC Fast Wireless Charging"
    },
    seller: {
      name: "Samsung SmartPlaza Official",
      rating: 4.8,
      responseRate: "99%"
    },
    deliveryInfo: {
      standardDays: "2 - 3 Days",
      standardFee: 0,
      expressDays: "24 Hours",
      expressFee: 60,
      codAvailable: true
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-5",
    title: "Sony PlayStation 5 Slim Digital Edition (1TB SSD, 4K 120Hz)",
    slug: "sony-playstation-5-slim-digital",
    price: 58500,
    originalPrice: 68000,
    discountPercentage: 14,
    rating: 4.9,
    reviewsCount: 380,
    stock: 14,
    soldCount: 910,
    category: "Gaming & Consoles",
    categorySlug: "gaming-consoles",
    brand: "Sony",
    isFlashSale: true,
    isFreeDelivery: true,
    isOfficial: true,
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&auto=format&fit=crop&q=80"
    ],
    description: "PlayStation 5 Slim unleashes new gaming possibilities. Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.",
    specifications: {
      "Storage": "1TB Custom High Speed NVMe SSD",
      "Output": "4K 120Hz, 8K Support, HDR10",
      "Controller": "DualSense Wireless Controller included",
      "Audio": "Tempest 3D AudioTech"
    },
    seller: {
      name: "Sony Interactive BD",
      rating: 4.9,
      responseRate: "99%"
    },
    deliveryInfo: {
      standardDays: "2 - 3 Days",
      standardFee: 0,
      expressDays: "Next Day",
      expressFee: 120,
      codAvailable: true
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-6",
    title: "Premium Men's Olive Green Slim-Fit Oxford Casual Shirt 100% Egyptian Cotton",
    slug: "mens-olive-oxford-shirt",
    price: 1850,
    originalPrice: 2850,
    discountPercentage: 35,
    rating: 4.6,
    reviewsCount: 142,
    stock: 55,
    soldCount: 1820,
    category: "Men's Fashion & Wear",
    categorySlug: "mens-fashion",
    brand: "Zaraz Origin",
    isFlashSale: false,
    isFreeDelivery: false,
    isOfficial: false,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Tailored to perfection from breathable 100% combed Egyptian cotton. Pre-shrunk fabric ensures long-lasting fit and zero color bleeding. Modern button-down collar suitable for both casual outings and office meetings.",
    specifications: {
      "Material": "100% Long-Staple Cotton",
      "Fit": "Slim Fit with Curved Hem",
      "Care": "Machine wash cold, warm iron",
      "Sizes": "M (38), L (40), XL (42), XXL (44)"
    },
    seller: {
      name: "Zaraz Fashion Hub",
      rating: 4.7,
      responseRate: "96%"
    },
    deliveryInfo: {
      standardDays: "3 - 5 Days",
      standardFee: 60,
      expressDays: "2 Days",
      expressFee: 110,
      codAvailable: true
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-7",
    title: "Philips Air Fryer XL 6.2L Rapid Air Technology (Touchscreen Digital Display)",
    slug: "philips-air-fryer-xl",
    price: 18900,
    originalPrice: 24500,
    discountPercentage: 23,
    rating: 4.8,
    reviewsCount: 94,
    stock: 22,
    soldCount: 430,
    category: "Home & Kitchen Appliances",
    categorySlug: "home-kitchen",
    brand: "Philips",
    isFlashSale: true,
    isFreeDelivery: true,
    isOfficial: true,
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Healthy frying with Rapid Air technology. Brings delicious fried food with up to 90% less fat. Large 6.2 Liter basket easily cooks meals for a family of 5 in minutes.",
    specifications: {
      "Capacity": "6.2 Liters (1.2 kg food)",
      "Power": "2000 Watts",
      "Preset Programs": "7 Touchscreen Cooking Presets",
      "Cleaning": "Dishwasher-safe non-stick parts"
    },
    seller: {
      name: "Philips Home Living BD",
      rating: 4.8,
      responseRate: "98%"
    },
    deliveryInfo: {
      standardDays: "2 - 4 Days",
      standardFee: 0,
      expressDays: "48 Hours",
      expressFee: 100,
      codAvailable: true
    },
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-8",
    title: "Logitech MX Master 3S Wireless Performance Mouse (Quiet Clicks, 8K DPI)",
    slug: "logitech-mx-master-3s",
    price: 11900,
    originalPrice: 14500,
    discountPercentage: 18,
    rating: 4.9,
    reviewsCount: 512,
    stock: 40,
    soldCount: 2200,
    category: "Laptops & Computers",
    categorySlug: "laptops-computers",
    brand: "Logitech",
    isFlashSale: false,
    isFreeDelivery: true,
    isOfficial: true,
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80"
    ],
    description: "An icon remastered. Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass sensor.",
    specifications: {
      "Sensor": "Darkfield High Precision 8000 DPI",
      "Battery": "Rechargeable Li-Po (500 mAh) up to 70 days",
      "Connectivity": "Bluetooth + Logi Bolt USB Receiver",
      "Weight": "141 g"
    },
    seller: {
      name: "Logitech Official BD",
      rating: 4.9,
      responseRate: "99%"
    },
    deliveryInfo: {
      standardDays: "2 - 3 Days",
      standardFee: 0,
      expressDays: "24 Hours",
      expressFee: 60,
      codAvailable: true
    },
    createdAt: new Date().toISOString()
  }
];
