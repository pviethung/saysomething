import ChatBubble from "@/components/ui/ChatBubble";

const Room = () => {
  return (
    <div className="room">
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
export { Room };
