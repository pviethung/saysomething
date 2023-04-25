import { Button } from '@/components/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import Link from 'next/link';

interface Props {
  id: string;
  name: string;
  host: string;
  desc?: string;
}

const ChatRoomCard = ({ host, name, desc }: Props) => {
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
        <Link href={'/room/1'}>
          <Button size={'full'}>{`Let's chat`}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
export default ChatRoomCard;
