import { NextResponse } from "next/server";
import { getDb, getMemoryStore } from "@/lib/db";
import { initialProducts, initialCategories, initialBanners } from "@/lib/seed-data";

export async function GET() {
  try {
    const { db, isMemory } = await getDb();

    if (!isMemory && db) {
      await db.collection("products").deleteMany({});
      await db.collection("categories").deleteMany({});
      await db.collection("banners").deleteMany({});

      await db.collection("products").insertMany(initialProducts as any);
      await db.collection("categories").insertMany(initialCategories as any);
      await db.collection("banners").insertMany(initialBanners as any);
    }

    const mem = getMemoryStore();
    mem.products = [...initialProducts];
    mem.categories = [...initialCategories];
    mem.banners = [...initialBanners];

    return NextResponse.json({
      success: true,
      message: "Zaraz Database seeded with initial Daraz-like products, categories, and banners!",
      productsCount: initialProducts.length,
      categoriesCount: initialCategories.length,
      bannersCount: initialBanners.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
