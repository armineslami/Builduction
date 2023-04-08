import { FunctionComponent } from "react";
import Footer from "@/components/footer";
import Head from "@/components/head";

const MainLayout: FunctionComponent<any> = ({children}) => {
    return (
        <>
            <Head />
            {/* <Header /> */}
            <>{children}</>
            <Footer />
        </>
    );
}

export default MainLayout;