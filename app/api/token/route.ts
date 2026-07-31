// app/api/token/route.ts
import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get("room");
  const username = req.nextUrl.searchParams.get("username");
  const userId = req.nextUrl.searchParams.get("userId");

  if (!room || !username || !userId) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json(
      { error: "Missing LiveKit credentials" },
      { status: 500 }
    );
  }

  try {
    // 🔑 Key change: identity uses userId (no spaces), name uses display name
    const at = new AccessToken(apiKey, apiSecret, {
      identity: userId,
      name: username,
    });

    at.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    });

    const token = await at.toJwt();
    return NextResponse.json({ token });
  } catch (error) {
    console.error("LiveKit Token Error:", error);
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}