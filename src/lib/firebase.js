// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"; // removed getApp as it wasn't used
import { getAuth } from "firebase/auth";
import { getMessaging, isSupported } from "firebase/messaging"; // Added isSupported for extra safety

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
// 1. Singleton pattern: Check if app already exists
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 2. Initialize Auth
const auth = getAuth(app);

// 3. Initialize Messaging (Safe Mode)
let messaging = null;

if (typeof window !== "undefined") {
  // 🛡️ FIX: Wrap in try-catch to prevent "addEventListener" crashes during build
  try {
     messaging = getMessaging(app);
  } catch (err) {
    console.warn("Firebase Messaging failed to initialize (this is normal during build/SSR):", err);
  }
}

// 4. Export 'auth' explicitly so other files can find it
export { app, auth, messaging };