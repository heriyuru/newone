import admin from "firebase-admin";

// 1. Check if we already have the environment variables
if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("Missing FIREBASE_PRIVATE_KEY in .env file");
}

// 2. Setup the keys
const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Fix for Vercel/Windows newlines in private keys
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

// 3. Initialize the App (Check if already initialized to prevent errors)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// 4. Create the Messaging service
const adminMessaging = admin.messaging();

// 5. EXPORT IT (This is the line you were missing!)
export { adminMessaging };