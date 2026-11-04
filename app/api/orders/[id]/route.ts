import { NextResponse } from "next/server";
import { getDb, getMemoryStore } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db, isMemory } = await getDb();

    let order = null;

    if (!isMemory && db) {
      order = await db
        .collection("orders")
        .findOne({ $or: [{ id }, { orderNumber: id }] });
    }

    if (!order) {
      const mem = getMemoryStore();
      order = mem.orders.find((o) => o.id === id || o.orderNumber === id) || null;
    }

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
