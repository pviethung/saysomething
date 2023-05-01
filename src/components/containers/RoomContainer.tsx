import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { Room } from "@/components/room";

const RoomContainer = () => {
  const supabaseClient = useSupabaseClient();
  const [channel, setChanel] = useState<RealtimeChannel | null>(null);
  const [message, setMessage] = useState("");
  const handleSendMsg = async (msg: string) => {
    setMessage(msg);
    if (channel) {
      await channel.send({
        type: "broadcast",
        event: "chat",
        payload: msg,
      });
    }
  };

  useEffect(() => {
    const channel = supabaseClient.channel("room1");
    setChanel(channel);
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.on("broadcast", { event: "chat" }, (payload) =>
          // console.log("msg", payload)
          alert(payload)
        );
      }
    });

    return () => {
      void channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <input
        style={{ border: "1px solid black" }}
        type="text"
        value={message}
        onChange={(e) => void handleSendMsg(e.target.value)}
      />
      <Room />
    </>
  );
};
export { RoomContainer };
