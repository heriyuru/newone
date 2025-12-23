            
            
"use client";
import { useEffect } from "react";
import { messaging } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging"; // Import onMessage

export default function PushInitializer() {
  useEffect(() => {
    async function initializePush() {
      // Safety check for server-side rendering
      if (typeof window === "undefined" || !messaging) return;

      try {
        const permission = await Notification.requestPermission();
        
        if (permission === "granted") {
          console.log("✅ Permission granted.");

          // 1. Get the Token
          const token = await getToken(messaging, {
            vapidKey: "BOkelb-ep-EQ6gQ7v1mIMe6nhQcrNUOElTrwNRkuDi6oL0D6CBn5pzpj4Dd2SBWpwgR1Kjm9XJIq3gg8rznKl-k" // <--- ⚠️ PASTE YOUR KEY HERE AGAIN
          });

          if (token) {
            // Register token in MongoDB
            await fetch("/api/notify/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token, email: "test-user@realdel.com" }),
            });
            console.log("📡 Token registered.");
          }

          // 2. LISTEN FOR MESSAGES IN FOREGROUND (The Fix)
          // This code runs when you are LOOKING at the website
          onMessage(messaging, (payload) => {
            console.log("🔔 Foreground Message Received:", payload);
            
            // Play a sound manually
            // const audio = new Audio('/sound.mp3'); audio.play(); 

            // Show a browser alert
            alert(`New Order!\n${payload.notification.title}: ${payload.notification.body}`);
          });

        }
      } catch (error) {
        console.error("❌ Push Init Error:", error);
      }
    }

    initializePush();
  }, []);

  return null;
}