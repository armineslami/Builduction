import "@/styles/globals.sass";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ApplicationWrapper from "@/models/context/AppContext";
import ApplicationContext from "@/models/ApplicationContext";
import { useState, SetStateAction, useEffect, useRef, useMemo } from "react";
import MainLayout from "@/components/layout";
import Fonts from "@/components/font";
import LocalStorageHelper from "@/models/local-storage/LocalStorageHelper";
import { LocalStorageUserDefaults } from "@/models/local-storage/LocalStorageInterface";
const InstallPrompt = dynamic(() => import("@/components/install-prompt"));

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

  // Creates a state for showing install prompt
  const [showInstallPrompt, setShowInstallPrompt] = useState<{
    platfrom: string | undefined;
    show: boolean;
  }>({
    platfrom: undefined,
    show: false,
  });

  // A flag to check if PWA install prompt has appeared or not.
  let didPwaInstallPromptAppear = useRef(false);

  /**
   * This helper is going to be used to save user defaults such as showing or not showing
   * pwa install prompt into the storage.
   * The reason of using useMemo is to fix eslint warning that says:
   * The 'localStorageHelper' object construction makes the dependencies of useEffect Hook change on every render.
   */
  const localStorageHelper = useMemo(() => {
    return new LocalStorageHelper();
  }, []);

  /**
   * In this hook, first we look for user agent and then if the agent is android or one of
   * the ios devices, we show the user an install prompt message to infrom that our app can be
   * installed as a stand alone application.
   */
  useEffect(() => {
    /**
     * Window object should not be undefiend here in this hook but to make sure the codes run safely,
     * we double check it here.
     */
    if (!window || !window.navigator || !window.navigator.userAgent) {
      return;
    }

    // Detects if the user's device is on iOS.
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod|android/.test(userAgent);
    };

    // Detects if the user's device is on Android.
    const isAndroid = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /android/.test(userAgent);
    };

    // Detects if user's device is in standalone mode.
    const isInStandaloneMode = () => {
      return "standalone" in window.navigator && window.navigator.standalone;
    };

    // Detects of user's browser is safari
    const isSafari = () => {
      return !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    };

    /**
     * This event is fired on Android/Chrome when PWA is detected to infrom the user that
     * the app can be installed as standalone mode. This event is fired only when the app is serverd over HTTPS.
     */
    window.addEventListener("beforeinstallprompt", (e) => {
      /** This is an experimental api.
       * For now i use my own check for android and ios devices using user agent.
       * @link {https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent} */
      // e.preventDefault();
    });

    // Since `beforeinstallprompt` event is experimental, we manually check for user agent of android.
    if (
      localStorageHelper.fetch().showPwaInstallPrompt == true &&
      didPwaInstallPromptAppear.current === false &&
      // isAndroid() &&
      !isInStandaloneMode()
    ) {
      setShowInstallPrompt({
        platfrom: "android",
        show: true,
      });
      didPwaInstallPromptAppear.current = true;
    }

    // Since `beforeinstallprompt` event is not supported by iOS and safari, this is the way to check it.
    if (
      localStorageHelper.fetch().showPwaInstallPrompt == true &&
      didPwaInstallPromptAppear.current === false &&
      isSafari() && // because only safari has the add to home screen option
      isIos() &&
      !isInStandaloneMode()
    ) {
      setShowInstallPrompt({
        platfrom: "ios",
        show: true,
      });
      didPwaInstallPromptAppear.current = true;
    }
  }, [localStorageHelper]); // localStorageHelper is a dependency for useEffect hook

  /**
   * Gets called when pwa install prompt is closed.
   * @param isStopShowingPwaInstallPromptCheckBoxChecked - True if user asked to stop showing install prompt on next visit.
   */
  const onPwaInstallPromptClose = (
    isStopShowingPwaInstallPromptCheckBoxChecked: boolean
  ) => {
    setShowInstallPrompt({
      ...showInstallPrompt,
      show: false,
    });
    // if user has asked to stop showing install prompt, then save this request into local stroage
    if (isStopShowingPwaInstallPromptCheckBoxChecked) {
      const userDefaults: LocalStorageUserDefaults = localStorageHelper.fetch();
      localStorageHelper.update({
        ...userDefaults,
        showPwaInstallPrompt: false,
      });
    }
  };

  /**
   * Calls @function setAppContext to update given state.
   * @param {SetStateAction<ApplicationContext>} value - A state to be set
   */
  function update(value: SetStateAction<ApplicationContext>) {
    setAppContext(value);
  }

  /**
   * Renders {@link InstallPrompt} or null based on {@link showInstallPrompt} value.
   * @returns InstallPrompt component or null
   */
  function renderInstallPrompt(): React.ReactElement {
    return (
      <>
        {showInstallPrompt ? (
          <InstallPrompt
            isOpen={showInstallPrompt.show}
            platform={showInstallPrompt.platfrom}
            onPromptClose={onPwaInstallPromptClose}
          />
        ) : null}
      </>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <ApplicationWrapper appContext={appContext}>
        <MainLayout>
          {renderInstallPrompt()}
          <Component {...pageProps} />
        </MainLayout>
      </ApplicationWrapper>
    </ChakraProvider>
  );
}

export default App;
