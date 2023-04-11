import "@/styles/globals.sass";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ApplicationWrapper, { ApplicationContext } from "@/context/AppContext";
import { useState, SetStateAction } from "react";
import MainLayout from "@/components/layout";
import Fonts from "@/components/font";

// Sets custom fonts
const normal = `'IRANSansX-Normal', sans-serif`;
const bold = `'IRANSansX-Bold', sans-serif`;
const fonts = {
  heading: bold, // For all heading tags h1, h2, ...
  body: normal, // For body
  iranSansXNormal: normal,
  iranSansXBold: bold,
};

// Sets app direction
const direction = "rtl";

// Chakra-ui theme
const theme = extendTheme({ direction, fonts });

function App({ Component, pageProps }: AppProps) {
  // Creates default config for the app
  const config: ApplicationContext = {
    version: "1.0",
    debug: false,
    update,
  };

  // Creates a state for the context
  const [appContext, setAppContext] = useState<ApplicationContext>(config);

  /**
   * Calls @function setAppContext to update given state.
   * @param {SetStateAction<ApplicationContext>} value - A state to be set
   */
  function update(value: SetStateAction<ApplicationContext>) {
    setAppContext(value);
  }

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <ApplicationWrapper appContext={appContext}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ApplicationWrapper>
    </ChakraProvider>
  );
}

export default App;
