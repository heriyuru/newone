"use client";
import { useEffect, useState } from "react";
import { messaging, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getToken, onMessage } from "firebase/messaging";

export default function PushInitializer() {
  // State to hold the "In-App" notification
  const [inAppNotif, setInAppNotif] = useState(null);

  useEffect(() => {
    // 1. Setup User & Token (Same as before)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && messaging) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, { vapidKey: "BOkelb-ep-EQ6gQ7v1mIMe6nhQcrNUOElTrwNRkuDi6oL0D6CBn5pzpj4Dd2SBWpwgR1Kjm9XJIq3gg8rznKl-k" });
          if(token) localStorage.setItem("my_device_token", token);
          
          // 2. LISTEN FOR FOREGROUND MESSAGES
          // This runs ONLY when the app is OPEN
          onMessage(messaging, (payload) => {
            console.log("👀 App is Open! Showing custom popup.");
            
            // Show the popup inside the app
            setInAppNotif({
              title: payload.notification.title,
              body: payload.notification.body
            });

            // Hide it automatically after 5 seconds
            setTimeout(() => setInAppNotif(null), 5000);
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // 3. Render the Custom Popup
  return (
    <>
      {inAppNotif && (
        <div style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#333",
          color: "#fff",
          padding: "15px 25px",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "300px"
        }}>
          <h4 style={{ margin: "0 0 5px 0", color: "#4CAF50" }}>🔔 {inAppNotif.title}</h4>
          <p style={{ margin: 0, fontSize: "14px" }}>{inAppNotif.body}</p>
          <button 
            onClick={() => setInAppNotif(null)}
            style={{ marginTop: "10px", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}