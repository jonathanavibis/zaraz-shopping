import { NextResponse } from "next/server";
import { getDb, getMemoryStore } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "zaraz_super_secure_jwt_secret_key_2026_green_black";

export async function POST(request: Request) {
  try {
    const { name, email, password, phone, address } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const { db, isMemory } = await getDb();
    let existingUser = null;

    if (!isMemory && db) {
      existingUser = await db.collection("users").findOne({ email: email.toLowerCase() });
    } else {
      existingUser = getMemoryStore().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    }

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email is already registered. Please login." },
        { status: 409 }
      );
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || "",
      address: address || "",
      role: "customer",
      createdAt: new Date().toISOString(),
    };

    if (!isMemory && db) {
      await db.collection("users").insertOne(newUser);
    }

    getMemoryStore().users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      address: newUser.address,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Account registered successfully!",
        token,
        user: safeUser,
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
