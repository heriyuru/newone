import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import admin from '@/lib/firebase-admin';

export async function POST(req) {
  try {
    await dbConnect();
    const user = await User.findOne({ email: 'test-user@realdel.com' });
    
    // Log what we found to the terminal
    console.log("🔍 Finding User:", user ? "Found" : "Not Found");

    if (!user || !user.fcmTokens?.length) {
      return NextResponse.json({ error: "No tokens found." }, { status: 404 });
    }

    const response = await admin.messaging().send({
      notification: { title: "Test", body: "It works!" },
      token: user.fcmTokens[user.fcmTokens.length - 1]
    });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}