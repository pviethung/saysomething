import { useLoginStatus } from '@/store/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Auth = ({ children }: { children: React.ReactNode }) => {
  const isLogged = useLoginStatus();
  const router = useRouter();

  useEffect(() => {
    if (isLogged === false) {
      router.push('/login');
    }
  }, [isLogged]);

  if (!isLogged) return <></>;

  return <>{children}</>;
};
export default Auth;
