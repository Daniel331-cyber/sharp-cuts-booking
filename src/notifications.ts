import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import { supabase } from "./supabaseClient";

const vapidKey =
  "BLgc-wC3nSIecm224GMOLFNU1fUwy4k47QVGWRQWsQKxAo_4uISh-BgPAKWRBtqcKnHjN_W4Bu0GNyZ-VwcdYwg";

export async function requestNotificationPermission() {
  try {

let permission = Notification.permission;

if (permission !== "granted") {
  permission = await Notification.requestPermission();
}

if (permission !== "granted") {
  alert("Notification permission denied");
  return;
}

const token = await getToken(messaging, {
  vapidKey,
});

console.log("FCM TOKEN:", token);

if (!token) {
  console.error("Firebase returned an empty token.");
  alert("No FCM token was generated.");
  return;
}

console.log("About to save token to Supabase...");
if (token) {
  const { error } = await supabase
    .from("device_tokens")
    .upsert(
      [{ token }],
      {
        onConflict: "token",
      }
    );

  if (error) {
    console.error(error);
  } else {
    console.log("Admin token saved successfully");
  }
}

    alert("Notifications enabled successfully!");
  } catch (error) {
    console.error("Notification Error:", error);
  }
}