import { NextResponse } from "next/server";
import { getDb, getMemoryStore } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const { db, isMemory } = await getDb();
    let orders: any[] = [];

    if (!isMemory && db) {
      const query = email ? { "customer.email": email } : {};
      orders = await db.collection("orders").find(query).sort({ createdAt: -1 }).toArray();
    } else {
      const mem = getMemoryStore();
      orders = email
        ? mem.orders.filter((o) => o.customer?.email === email)
        : mem.orders;
    }

    return NextResponse.json({ success: true, count: orders.length, orders });
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
    const { customer, items, delivery, payment, pricing } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart cannot be empty" },
        { status: 400 }
      );
    }

    const orderNumber = `ZRZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city || "Dhaka",
        area: customer.area || "City Center",
        deliveryType: customer.deliveryType || "home",
      },
      items,
      delivery: {
        method: delivery?.method || "standard",
        fee: delivery?.fee || 60,
        estimatedDelivery:
          delivery?.method === "express" ? "Within 24 Hours" : "2 - 3 Business Days",
      },
      payment: {
        method: payment?.method || "cod",
        status: payment?.method === "cod" ? "Pending (Cash On Delivery)" : "Paid Successfully",
        transactionId: payment?.transactionId || `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        paidAt: payment?.method !== "cod" ? now.toISOString() : null,
      },
      pricing: {
        subtotal: pricing?.subtotal || 0,
        shippingFee: pricing?.shippingFee || 60,
        discount: pricing?.discount || 0,
        total: pricing?.total || 0,
      },
      status: "Order Placed",
      timeline: [
        {
          title: "Order Placed",
          description: "Your order has been recorded in Zaraz systems.",
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: now.toLocaleDateString(),
          completed: true,
        },
        {
          title: "Payment Confirmed",
          description: payment?.method === "cod" ? "Pay upon parcel handover." : "Payment verified via Zaraz Secure Gateway.",
          time: "Instant",
          date: now.toLocaleDateString(),
          completed: true,
        },
        {
          title: "Processing at Zaraz Fulfillment Warehouse",
          description: "Items are packed with shock-absorbent safety wrap.",
          time: "Pending",
          date: "Next",
          completed: false,
        },
        {
          title: "Handed over to Zaraz Express Delivery Courier",
          description: "On its way to your designated destination.",
          time: "Pending",
          date: "Upcoming",
          completed: false,
        },
        {
          title: "Delivered & Signed",
          description: "Package received safely by customer.",
          time: "Pending",
          date: "Final step",
          completed: false,
        },
      ],
      createdAt: now.toISOString(),
    };

    const { db, isMemory } = await getDb();
    if (!isMemory && db) {
      await db.collection("orders").insertOne(newOrder);
    }

    getMemoryStore().orders.unshift(newOrder);

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully!",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
