import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import { supabase } from "./supabaseClient";

const vapidKey =
  "BLgc-wC3nSIecm224GMOLFNU1fUwy4k47QVGWRQWsQKxAo_4uISh-BgPAKWRBtqcKnHjN_W4Bu0GNyZ-VwcdYwg";

export async function requestNotificationPermission() {
  try {

    // If permission is already granted, don't ask again
    if (Notification.permission === "granted") {
      console.log("Notifications already enabled");
      return;
    }

    const permission = await Notification.requestPermission();

    const token = await getToken(messaging, {
      vapidKey,
    });

    console.log("FCM TOKEN:", token);

   if (token) {

  // Remove any previously saved admin token
  const { error: deleteError } = await supabase
    .from("device_tokens")
    .delete()
    .neq("id", 0);

  if (deleteError) {
    console.error("Error deleting old token:", deleteError);
  }

  // Save the current device token
  const { error } = await supabase
    .from("device_tokens")
    .insert([
      {
        token,
      },
    ]);

  if (error) {
    console.log("FULL ERROR:", error);
    console.log(JSON.stringify(error, null, 2));
  } else {
    console.log("Admin token saved successfully");
  }
}

    alert("Notifications enabled successfully!");
  } catch (error) {
    console.error("Notification Error:", error);
  }
}