import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { JWT } from "npm:google-auth-library@9";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const clientEmail = Deno.env.get("FIREBASE_CLIENT_EMAIL");

    const privateKey = Deno.env
  .get("FIREBASE_PRIVATE_KEY")
  ?.replace(/\\n/g, "\n");

    const jwtClient = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
    });

    const tokens = await jwtClient.authorize();

    const accessToken = tokens.access_token;
    console.log("ACCESS TOKEN EXISTS:", !!accessToken);

    const response = await fetch(
      "https://fcm.googleapis.com/v1/projects/barberbookings-79855/messages:send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            token: body.token,
            notification: {
              title: "New Barber Booking",
              body: `${body.name} booked ${body.time}`,
            },
          },
        }),
      }
    );

    const data = await response.json();

    console.log("FCM RESPONSE:", data);

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});