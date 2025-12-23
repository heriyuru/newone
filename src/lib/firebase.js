// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ2uueufL3iXjyY2q-p1YT4III3xsZfgY",
  authDomain: "realdel-f964c.firebaseapp.com",
  projectId: "realdel-f964c",
  storageBucket: "realdel-f964c.firebasestorage.app",
  messagingSenderId: "118715949536",
  appId: "1:118715949536:web:9d37749a6c6e2346548b85",
  measurementId: "G-XGFZJKTF9D"
};

// Initialize Firebase
// 1. Singleton pattern: Check if app already exists to prevent re-initialization crashes
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics;
let messaging;

// 2. Client-side checks: Analytics and Messaging only work in the browser (not on the server)
if (typeof window !== "undefined") {
  // Initialize Analytics if supported
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });

  // Initialize Messaging (FCM)
  try {
    messaging = getMessaging(app);
  } catch (err) {
    console.error("Firebase Messaging failed to init (likely due to unsupported browser):", err);
  }
}

// 3. Export instances for use in other components
export { app, analytics, messaging };