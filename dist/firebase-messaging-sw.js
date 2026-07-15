importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAujm47KkHYny0zphkzhTMFsAYIIdmtBuk",
  authDomain: "barberbookings-79855.firebaseapp.com",
  projectId: "barberbookings-79855",
  storageBucket: "barberbookings-79855.firebasestorage.app",
  messagingSenderId: "680891651185",
  appId: "1:680891651185:web:e4d3ddca24b82801d137d0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message", payload);

  self.registration.showNotification(
    payload.notification?.title || "New Booking",
    {
      body: payload.notification?.body || "You have a new booking",
      icon: "/icon-192.png",
    }
  );
});