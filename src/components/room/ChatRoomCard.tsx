import Link from "next/link";

import { Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface Props {
  id: string;
  name: string;
  host: string;
  desc?: string;
}

const ChatRoomCard = ({ host, name, desc, id }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Host: {host}</CardDescription>
      </CardHeader>
      {desc && (
        <CardContent>
          <p>{desc}</p>
        </CardContent>
      )}
      <CardFooter>
        <Link href={`/rooms/${id}`}>
          <Button size={"full"}>{`Let's chat`}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
export { ChatRoomCard };
