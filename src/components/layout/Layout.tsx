import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useRouter } from "next/router";

import Auth from "@/components/Auth";
import ChatRoomCard from "@/components/ChatRoomCard";
import { Header } from "@/components/layout";
import { protectedRoutes } from "@/constants";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  let content = children;
  const a = "a";

  if (protectedRoutes.includes(pathname)) {
    content = <Auth>{children}</Auth>;
  }

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
