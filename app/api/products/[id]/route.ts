import { NextResponse } from "next/server";
import { getDb, getMemoryStore } from "@/lib/db";
import { Product } from "@/lib/seed-data";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db, isMemory } = await getDb();

    let product: Product | null = null;

    if (!isMemory && db) {
      const orConditions: any[] = [{ id }, { slug: id }];
      if (ObjectId.isValid(id)) {
        orConditions.push({ _id: new ObjectId(id) });
      }
      product = (await db
        .collection<Product>("products")
        .findOne({ $or: orConditions } as any)) as any;
    }

    if (!product) {
      const mem = getMemoryStore();
      product =
        mem.products.find(
          (p) =>
            p.id === id ||
            (p as any)._id?.toString() === id ||
            p.slug === id
        ) || null;
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
      const orConditions: any[] = [{ id }];
      if (ObjectId.isValid(id)) {
        orConditions.push({ _id: new ObjectId(id) });
      }
      await db.collection("products").deleteOne({ $or: orConditions });
    }

    const mem = getMemoryStore();
    mem.products = mem.products.filter(
      (p) => p.id !== id && (p as any)._id?.toString() !== id
    );

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
