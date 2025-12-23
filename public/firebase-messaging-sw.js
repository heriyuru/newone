// 1. Use the modern v9 "Compat" scripts (Better for Next.js)
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js');

// 2. Your Config (I kept your keys exactly as they are)
firebase.initializeApp({
  apiKey: "AIzaSyDZ2uueufL3iXjyY2q-p1YT4III3xsZfgY",
  authDomain: "realdel-f964c.firebaseapp.com",
  projectId: "realdel-f964c",
  storageBucket: "realdel-f964c.firebasestorage.app",
  messagingSenderId: "118715949536",
  appId: "1:118715949536:web:9d37749a6c6e2346548b85"
});

const messaging = firebase.messaging();

// 3. This listener runs ONLY when the app is Minimized/Closed
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png', // Ensure you have a logo.png in your public folder!
    
    // Optional: This makes the notification click open your app
    click_action: 'https://realdel.vercel.app/' 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});