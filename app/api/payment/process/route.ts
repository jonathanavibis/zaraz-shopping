import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { method, amount, customerInfo, accountOrCardNumber } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid payment amount" },
        { status: 400 }
      );
    }

    // Generate transaction ID
    const txnId = `TXN-${method?.toUpperCase() || "PAY"}-${Math.floor(10000000 + Math.random() * 90000000)}`;

    return NextResponse.json({
      success: true,
      message: method === "cod" ? "Order confirmed for Cash On Delivery" : "Payment approved successfully",
      transactionId: txnId,
      method,
      amount,
      currency: "BDT",
      status: method === "cod" ? "COD_PENDING" : "SETTLED",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
