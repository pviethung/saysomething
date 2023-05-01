import dynamic from "next/dynamic";

const RoomContainer = dynamic(
  () =>
    import("@/components/containers").then((module) => module.RoomContainer),
  {
    ssr: false,
  }
);

const RoomDetailPage = () => {
  return <RoomContainer />;
};
export default RoomDetailPage;
