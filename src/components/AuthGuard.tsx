import { useAuth } from '@/hooks';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) return <>Protected</>;

  return <>{children}</>;
};
export default AuthGuard;
