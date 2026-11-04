import { NextResponse } from "next/server";
import { getDb, getMemoryStore } from "@/lib/db";
import { Product } from "@/lib/seed-data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db, isMemory } = await getDb();

    let product: Product | null = null;

    if (!isMemory && db) {
      product = (await db
        .collection<Product>("products")
        .findOne({ $or: [{ id }, { slug: id }] } as any)) as any;
    }

    if (!product) {
      const mem = getMemoryStore();
      product = mem.products.find((p) => p.id === id || p.slug === id) || null;
    }

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db, isMemory } = await getDb();

    if (!isMemory && db) {
      await db.collection("products").deleteOne({ id });
    }

    const mem = getMemoryStore();
    mem.products = mem.products.filter((p) => p.id !== id);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
