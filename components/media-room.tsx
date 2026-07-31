"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useUser } from "@clerk/nextjs";
import { Loader2, Video, Mic, LogIn } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  isChannel?: boolean;
}

export const MediaRoom = ({
  chatId,
  video,
  audio,
  isChannel = false,
}: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState("");
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) return;

    const name =
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.username || user.emailAddresses[0]?.emailAddress || "Guest";

    (async () => {
      try {
        const res = await fetch(
          `/api/token?room=${chatId}&username=${encodeURIComponent(name)}&userId=${user.id}`
        );

        if (!res.ok) return;

        const data = await res.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user, chatId]);

  const handleDisconnect = () => {
    if (isChannel) {
      // Server Channel -> Show "Start Channel" screen
      setIsDisconnected(true);
    } else {
      // 1-on-1 Call -> Unmount LiveKit view first, then push route on next tick
      setIsLeaving(true);
      setTimeout(() => {
        router.push(pathname || "");
      }, 0);
    }
  };

  const handleStartCall = () => {
    setIsDisconnected(false);
  };

  
  if (isDisconnected && isChannel) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center gap-y-4 bg-white dark:bg-[#313338] h-full">
        <div className="p-4 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
          {video ? (
            <Video className="h-10 w-10" />
          ) : (
            <Mic className="h-10 w-10" />
          )}
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
            You left the {video ? "video" : "audio"} channel
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Click below whenever you are ready to start or join again.
          </p>
        </div>
        <button
          onClick={handleStartCall}
          className="flex items-center gap-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-md transition shadow-md"
        >
          <LogIn className="h-4 w-4" />
          {video ? "Start Video Channel" : "Start Audio Channel"}
        </button>
      </div>
    );
  }

  
  if (isLeaving) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Disconnecting...
        </p>
      </div>
    );
  }

  
  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading...
        </p>
      </div>
    );
  }

 
  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
      onDisconnected={handleDisconnect}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};