import clsx from "clsx";

interface Props {
  content: string;
  fromLoggedUser?: boolean;
}

const ChatBubble = ({ content, fromLoggedUser }: Props) => {
  return (
    <div className={clsx("chat", { "chat-end": fromLoggedUser })}>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className={clsx("chat-bubble")}
      />
    </div>
  );
};
export default ChatBubble;
