import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface Response extends NextApiResponse {
  hasSocket?: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;
}

export default function handler(req: NextApiRequest, res: Response) {
  if (!res.hasSocket) {
    console.log('*First use, starting socket.io');

    const io = new Server();

    io.on('connection', (socket) => {
      socket.broadcast.emit('a user connected');
      socket.on('hello', (_) => {
        socket.emit('hello', 'world!');
      });
    });

    res.hasSocket = io;
  } else {
    console.log('socket.io already running');
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
