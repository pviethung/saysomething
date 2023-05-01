import dynamic from "next/dynamic";

const LoginContainer = dynamic(
  () =>
    import("@/components/containers").then((module) => module.LoginContainer),
  {
    ssr: false,
  }
);

const LoginPage = () => {
  return <LoginContainer />;
};
export default LoginPage;
