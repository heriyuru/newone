    import { NextResponse } from "next/server";
import { adminMessaging } from "@/lib/firebase-admin";

export async function POST(req) {
  try {
    const body = await req.json();
    const specificToken = body.targetToken; // <--- Read the specific token

    let tokensToSend = [];

    if (specificToken) {
      // ✅ Case 1: Send ONLY to the device that asked
      console.log("🎯 Targeting specific device");
      tokensToSend = [specificToken];
    } else {
      // ❌ Case 2: (Fallback) If no token sent, broadcast to everyone
      // (You can leave your DB lookup code here if you want backup logic)
      return NextResponse.json({ error: "No target token provided" }, { status: 400 });
    }

    // Send the message
    const message = {
      notification: {
        title: "Device Check ✅",
        body: "This notification was sent specifically to THIS device.",
      },
      tokens: tokensToSend,
    };

    const response = await adminMessaging.sendEachForMulticast(message);
    
    return NextResponse.json({ 
      success: true, 
      sentCount: response.successCount,
      failedCount: response.failureCount
    });

  } catch (error) {
    console.error("Send Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
