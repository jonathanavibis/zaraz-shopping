import { NextResponse } from "next/server";
import { getDb, getMemoryStore } from "@/lib/db";
import { Banner } from "@/lib/seed-data";

export async function GET() {
  try {
    const { db, isMemory } = await getDb();

    let banners: Banner[] = [];

    if (!isMemory && db) {
      const collection = db.collection<Banner>("banners");
      const count = await collection.countDocuments();
      if (count === 0) {
        const mem = getMemoryStore();
        await collection.insertMany(mem.banners as any);
      }
      banners = (await collection.find().toArray()) as any;
    } else {
      banners = getMemoryStore().banners;
    }

    return NextResponse.json({ success: true, count: banners.length, banners });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
