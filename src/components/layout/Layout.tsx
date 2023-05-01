import { ScrollArea } from "@radix-ui/react-scroll-area";

import { Header } from "@/components/layout";
import { ChatRoomCard } from "@/components/room";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const content = children;

  return (
    <div className="px-6">
      <Header />
      <div className=" flex items-center gap-6 overflow-hidden">
        <div className="left-sidebar w-1/5 h-[calc(100vh_-_96px)] overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="space-y-6">
              <ChatRoomCard
                name="Hùng's room"
                host="Hùng"
                desc={`Let's chat my friends`}
                id={"1"}
              />
              <ChatRoomCard
                name="Hùng's room"
                host="Hùng"
                desc={`Let's chat my friends`}
                id={"1"}
              />
              <ChatRoomCard
                name="Hùng's room"
                host="Hùng"
                desc={`Let's chat my friends`}
                id={"1"}
              />
              <ChatRoomCard
                name="Hùng's room"
                host="Hùng"
                desc={`Let's chat my friends`}
                id={"1"}
              />
              <ChatRoomCard
                name="Hùng's room"
                host="Hùng"
                desc={`Let's chat my friends`}
                id={"1"}
              />
              <ChatRoomCard
                name="Hùng's room"
                host="Hùng"
                desc={`Let's chat my friends`}
                id={"1"}
              />
            </div>
          </ScrollArea>
        </div>
        <div className="main-content w-4/5 h-[calc(100vh_-_96px)]">
          {content}
        </div>
      </div>
    </div>
  );
};
export { Layout };
