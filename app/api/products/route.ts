import { NextResponse } from "next/server";
import { getDb, getMemoryStore } from "@/lib/db";
import { Product } from "@/lib/seed-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const flashSale = searchParams.get("flashSale");
    const sort = searchParams.get("sort");
    const limit = parseInt(searchParams.get("limit") || "50");

    const { db, isMemory } = await getDb();

    let products: Product[] = [];

    if (!isMemory && db) {
      const collection = db.collection<Product>("products");
      const count = await collection.countDocuments();
      if (count === 0) {
        const mem = getMemoryStore();
        await collection.insertMany(mem.products as any);
      }

      const query: any = {};
      if (category && category !== "all") {
        query.categorySlug = category;
      }
      if (flashSale === "true") {
        query.isFlashSale = true;
      }
      if (search) {
        query.title = { $regex: search, $options: "i" };
      }

      let cursor = collection.find(query);

      if (sort === "price-asc") {
        cursor = cursor.sort({ price: 1 });
      } else if (sort === "price-desc") {
        cursor = cursor.sort({ price: -1 });
      } else if (sort === "rating") {
        cursor = cursor.sort({ rating: -1 });
      } else {
        cursor = cursor.sort({ createdAt: -1 });
      }

      products = (await cursor.limit(limit).toArray()) as any;
    } else {
      const mem = getMemoryStore();
      products = [...mem.products];

      if (category && category !== "all") {
        products = products.filter(
          (p) => p.categorySlug.toLowerCase() === category.toLowerCase()
        );
      }
      if (flashSale === "true") {
        products = products.filter((p) => p.isFlashSale);
      }
      if (search) {
        const s = search.toLowerCase();
        products = products.filter(
          (p) =>
            p.title.toLowerCase().includes(s) ||
            p.brand.toLowerCase().includes(s) ||
            p.category.toLowerCase().includes(s)
        );
      }

      if (sort === "price-asc") {
        products.sort((a, b) => a.price - b.price);
      } else if (sort === "price-desc") {
        products.sort((a, b) => b.price - a.price);
      } else if (sort === "rating") {
        products.sort((a, b) => b.rating - a.rating);
      }
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price: Number(body.price),
      originalPrice: Number(body.originalPrice || body.price),
      discountPercentage: body.discountPercentage || 0,
      rating: body.rating || 5.0,
      reviewsCount: body.reviewsCount || 1,
      stock: Number(body.stock || 10),
      soldCount: 0,
      category: body.category || "General",
      categorySlug: body.categorySlug || "general",
      brand: body.brand || "Generic",
      isFlashSale: !!body.isFlashSale,
      isFreeDelivery: !!body.isFreeDelivery,
      isOfficial: !!body.isOfficial,
      images: Array.isArray(body.images) ? body.images : [body.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"],
      description: body.description || "",
      specifications: body.specifications || {},
      seller: body.seller || {
        name: "Zaraz Official Store",
        rating: 4.9,
        responseRate: "99%",
      },
      deliveryInfo: body.deliveryInfo || {
        standardDays: "2 - 3 Days",
        standardFee: 60,
        expressDays: "24 Hours",
        expressFee: 120,
        codAvailable: true,
      },
      createdAt: new Date().toISOString(),
    };

    const { db, isMemory } = await getDb();
    if (!isMemory && db) {
      await db.collection("products").insertOne(newProduct as any);
    }

    // Always keep memory store updated
    getMemoryStore().products.unshift(newProduct);

    return NextResponse.json(
      { success: true, message: "Product created successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
