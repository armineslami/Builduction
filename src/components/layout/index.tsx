import { FunctionComponent } from "react";
import Footer from "@/components/footer";
import Head from "@/components/head";
import { useRouter } from "next/router";

const MainLayout: FunctionComponent<any> = ({ children }) => {
  const router = useRouter();
  const isRouterOn404: boolean = String(router.pathname).startsWith("/404");

  return (
    <>
      <Head />
      {/* <Header /> */}
      <>{children}</>
      {!isRouterOn404 ? <Footer /> : undefined}
    </>
  );
};

export default MainLayout;
