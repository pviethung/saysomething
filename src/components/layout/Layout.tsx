import Auth from '@/components/Auth';
import { Header } from '@/components/layout';
import { protectedRoutes } from '@/constants';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  let content = children;

  if (protectedRoutes.includes(pathname)) {
    content = <Auth>{children}</Auth>;
  }

  return (
    <>
      <Header />
      {content}
    </>
  );
};
export { Layout };
