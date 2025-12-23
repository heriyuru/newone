// File: src/app/api/notify/register/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    await dbConnect();
    const { token, email } = await req.json();

    console.log("📝 Registering User:", email);

    // Save or Update the user with the new token
    await User.findOneAndUpdate(
      { email }, 
      { $addToSet: { fcmTokens: token } }, // Add token to list
      { upsert: true, new: true } // Create user if not exists
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}