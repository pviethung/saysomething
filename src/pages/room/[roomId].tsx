import { useRouter } from "next/router";

import ChatBubble from "@/components/ui/ChatBubble";

const RoomDetailPage = () => {
  const { pathname } = useRouter();

  console.log(pathname);

  return (
    <div className="home-page">
      <ChatBubble
        fromLoggedUser={true}
        content="It was said that you would, destroy the Sith, not join them."
      />
      <ChatBubble content="It was said that you would, destroy the Sith, not join them." />
      <ChatBubble
        content="It's over Anakin,<br/>
I have the high ground."
      />
    </div>
  );
};
export default RoomDetailPage;
