import { NextResponse } from "next/server";
import { getDb, getMemoryStore } from "@/lib/db";
import { Category } from "@/lib/seed-data";

export async function GET() {
  try {
    const { db, isMemory } = await getDb();

    let categories: Category[] = [];

    if (!isMemory && db) {
      const collection = db.collection<Category>("categories");
      const count = await collection.countDocuments();
      if (count === 0) {
        const mem = getMemoryStore();
        await collection.insertMany(mem.categories as any);
      }
      categories = (await collection.find().toArray()) as any;
    } else {
      categories = getMemoryStore().categories;
    }

    return NextResponse.json({ success: true, count: categories.length, categories });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
