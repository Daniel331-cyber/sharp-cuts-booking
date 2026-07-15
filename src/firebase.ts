import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAujm47KkHYny0zphkzhTMFsAYIIdmtBuk",
  authDomain: "barberbookings-79855.firebaseapp.com",
  projectId: "barberbookings-79855",
  storageBucket: "barberbookings-79855.firebasestorage.app",
  messagingSenderId: "680891651185",
  appId: "1:680891651185:web:e4d3ddca24b82801d137d0"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);