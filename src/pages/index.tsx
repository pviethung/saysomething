import { Button } from '@/components/ui';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import io from 'socket.io-client';

const inter = Inter({ subsets: ['latin'] });
export default function Home() {
  useEffect(() => {
    fetch('/api/socket').finally(() => {
      const socket = io();
      debugger
      socket.on('a user connected', () => {
        console.log('a user connected');
      });
    });
  }, []);

  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="w-screen h-screen flex justify-center items-center">
          <Link href={'/choose-room'}>
            <Button>Login</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
