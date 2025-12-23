import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Get Data from Frontend
    const { email, token } = await req.json();

    if (!email || !token) {
      return NextResponse.json({ error: "Missing email or token" }, { status: 400 });
    }

    console.log(`💾 Saving token for: ${email}`);

    // 3. Save to MongoDB (Upsert: Update if exists, Insert if new)
    const user = await User.findOneAndUpdate(
      { email: email },           // Find by email
      { $addToSet: { token: token } }, // Add token to array (no duplicates)
      { new: true, upsert: true } // Create if not found
    );

    console.log("✅ Saved to MongoDB:", user);

    return NextResponse.json({ success: true, user });

  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}