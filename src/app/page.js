"use client";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";

export default function HomePage() {

  // 1. Function to Send Notification
  const handleSendNotification = async () => {
    const myToken = localStorage.getItem("my_device_token");

    if (!myToken) {
      alert("⚠️ No token found! Click the Orange button first.");
      return;
    }

    alert("Sending... Minimize the app NOW to see the banner! 📉");

    // Wait 3 seconds to give you time to minimize
    setTimeout(async () => {
      await fetch("/api/notify/send-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          targetToken: myToken 
        }),
      });
    }, 3000);
  };

  // 2. Function to Manually Fix/Generate Token
  const handleRepair = async () => {
    if (!messaging) {
      alert("Firebase Messaging not loaded yet. Refresh page.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        
        // ⚠️ PASTE YOUR VAPID KEY BELOW
        const token = await getToken(messaging, {
          vapidKey: "BOkelb-ep-EQ6gQ7v1mIMe6nhQcrNUOElTrwNRkuDi6oL0D6CBn5pzpj4Dd2SBWpwgR1Kjm9XJIq3gg8rznKl-k" 
        });

        if (token) {
          console.log("Token generated:", token);
          localStorage.setItem("my_device_token", token);
          alert("✅ Token Fixed! Now try the Send button.");
        }
      } else {
        alert("❌ Permission denied.");
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h1>Delivery App Test</h1>
      
      {/* The Main Button */}
      <button 
        onClick={handleSendNotification}
        style={{ 
          padding: "15px 30px", 
          fontSize: "18px", 
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginRight: "20px"
        }}
      >
        🔔 Ring THIS Device
      </button>

      {/* The Repair Button */}
      <button 
        onClick={handleRepair}
        style={{ 
          padding: "15px 30px", 
          fontSize: "18px", 
          cursor: "pointer",
          backgroundColor: "orange",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        🛠️ Fix Token
      </button>
    </div>
  );
}