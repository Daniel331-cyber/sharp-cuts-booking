import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import { supabase } from "./supabaseClient";

const vapidKey =
  "BLgc-wC3nSIecm224GMOLFNU1fUwy4k47QVGWRQWsQKxAo_4uISh-BgPAKWRBtqcKnHjN_W4Bu0GNyZ-VwcdYwg";

export async function requestNotificationPermission() {
  try {
    alert("Step 1: Starting notification setup");

    let permission = Notification.permission;

    if (permission !== "granted") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      alert("Notification permission denied.");
      return;
    }

    alert("Step 2: Permission granted");

    const registration = await navigator.serviceWorker.register(
  "/firebase-messaging-sw.js"
);

console.log("Service Worker registered:", registration);

const token = await getToken(messaging, {
  vapidKey,
  serviceWorkerRegistration: registration,
});

    alert("Step 3: getToken() finished");

    console.log("FCM TOKEN:", token);

    if (!token) {
      alert("ERROR: Firebase returned an empty token.");
      return;
    }

    alert("Step 4: Token generated");

    const { data, error } = await supabase
      .from("device_tokens")
      .upsert([{ token }], {
        onConflict: "token",
      })
      .select();

    console.log(data);
    console.log(error);

    if (error) {
      alert("DATABASE ERROR");
      alert(JSON.stringify(error));
      return;
    }

    alert("Step 5: Token saved successfully");
  } catch (err: any) {
    console.error(err);

    alert("NOTIFICATION ERROR");

    alert(err.message || JSON.stringify(err));
  }
}