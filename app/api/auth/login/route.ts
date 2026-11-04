import { NextResponse } from "next/server";
import { getDb, getMemoryStore } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "zaraz_super_secure_jwt_secret_key_2026_green_black";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const { db, isMemory } = await getDb();
    let user: any = null;

    if (!isMemory && db) {
      user = await db.collection("users").findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      const mem = getMemoryStore();
      user = mem.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    }

    // Allow quick demo login or check password
    if (!user) {
      // Create user automatically for quick smooth testing if valid email format
      user = {
        id: `usr-${Date.now()}`,
        name: email.split("@")[0],
        email: email.toLowerCase(),
        password,
        role: "customer",
        createdAt: new Date().toISOString(),
      };
      if (!isMemory && db) {
        await db.collection("users").insertOne(user);
      }
      getMemoryStore().users.push(user);
    } else if (user.password && user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
      address: user.address || "",
    };

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
