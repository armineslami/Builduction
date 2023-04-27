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
const InstallPrompt = dynamic(
  () => import("@/components/modal/install-prompt")
);
const NotificationPermissionPrompt = dynamic(
  () => import("@/components/modal/notification-permission-prompt")
);

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
  /**
   * This helper is going to be used to save user defaults into the storage.
   * The reason of using useMemo is to fix eslint warning that says:
   * The 'localStorageHelper' object construction makes the dependencies of useEffect Hook change on every render.
   */
  const localStorageHelper = useMemo(() => {
    return new LocalStorageHelper();
  }, []);

  // Creates default config for the app
  const config: ApplicationContext = {
    appId: localStorageHelper.fetch().appId,
    version: process.env.NEXT_PUBLIC_APP_VERSION!,
    update,
  };

  // Creates a state for the context
  const [appContext, setAppContext] = useState<ApplicationContext>(config);

  // Creates a state to save serviceWorker registration instance.
  const [serviceWorkerRegistration, setServiceWorkerRegistration] =
    useState<ServiceWorkerRegistration>();

  /**
   * iOS requests a user gesture to show notification permission request window.
   * So we are going to show a modal to the client and get user's action by
   * clicking(touching) a confirmation button.
   * Also to have a matching UX across other platforms, the same modal will be shown to clients on Android/chrome too.
   * By setting {@link showNotificationPermissionWindow} to true we show a modal to ask for the permission.
   * Then after user confirmed the request we will use {@link showNativePermissionRequestWindow()} to show
   * the client the browser native permission window.
   */
  const [
    showNotificationPermissionWindow,
    setShowNotificationPermissionWindow,
  ] = useState<boolean>(false);

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
   * In this hook, we have access to window and navigator instances.
   * Everything releated to PWA install prompt and notification permission request
   * happens here.
   */
  useEffect(() => {
    /*********************************************
     *********************************************
                      PWA Install
     *********************************************
     *********************************************/

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
      isAndroid() &&
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

    /*********************************************
     *********************************************
              Notification Permission
     *********************************************
     *********************************************/

    // To avoid runtime error check for everything we need for working with the notification API.
    if (
      navigator &&
      navigator.serviceWorker &&
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      (window as any).workbox !== undefined
    ) {
      // Wait for service worker to be ready.
      navigator.serviceWorker.ready.then((registration) => {
        // If no registration or pushManager is found, return!. This happens on safari. But in iOS when the app is
        // added to the home screen everything is good to go!.
        if (!registration || !registration.pushManager) {
          return;
        }

        // Get subscription if any exists.
        registration.pushManager.getSubscription().then((subscription) => {
          let subscribed = undefined;

          // Now check if client is already subscribed and subscription is not expired.
          if (
            subscription &&
            !(
              subscription.expirationTime &&
              Date.now() > subscription.expirationTime
            ) //- 5 * 60 * 1000
          ) {
            // If we are here it means user has valid subscription.
            subscribed = true;
          } else {
            subscribed = false;
          }

          // Save registration into the state.
          setServiceWorkerRegistration(registration);

          // Check if the app is allowed to show native notification permission request window.
          if (isAppAllowedToShowNotificationPermissionRequestWindow()) {
            setShowNotificationPermissionWindow(true);
          } else if (subscribed === false) {
            /**
             * Sometimes app may have granted/denied permission but for network issues app
             * could not subscribe successfully. So we should just try to subscribe again.
             */
            sendSubscription(registration);
          }
        });
      });
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
   * Creates a subscription and sends it to backend for storage.
   * @param registration - A service worker registration instance to use it for creating a subscription.
   */
  const sendSubscription = async (
    registration: ServiceWorkerRegistration | undefined
  ) => {
    if (!registration) {
      return;
    }

    /**
     * Create a subscription using server public key. This key is currently saved into .env
     * as NEXT_PUBLIC_WEB_PUSH_KEY and despite it's public, we may need to remove it from .env for security issues.
     * One solution could be to use getStaticProps and use process.env.KEY on server side.
     */
    let subscription = null;
    try {
      subscription = await registration.pushManager.subscribe({
        applicationServerKey: process.env.NEXT_PUBLIC_WEB_PUSH_KEY,
        userVisibleOnly: true,
      });
    } catch (err) {
      /**
       * When client denies the permission we can't check if window.Notification.permission is denied
       * because in chrome it's denied but in iOS it's default so we just try to subscribe and catch any possible error.
       * If we get error it means we can't create a valid subscription so we return from here.
       */
      return;
    }

    // Send subscription to the backend
    await fetch(
      process.env.NEXT_PUBLIC_HOST_NAME +
        ":" +
        process.env.NEXT_PUBLIC_API_PORT +
        "/subscribe",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription,
          appId: config.appId,
        }),
      }
    )
      .then((result) => {
        console.log("Subscribe result:", result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   * Updates the isNotificationPermissionRequested value in the storage.
   * @param isNotificationPermissionRequested - true or false
   */
  function updateStorageWithNotificationPermissionRequest(
    isNotificationPermissionRequested: boolean
  ) {
    const userDefaults: LocalStorageUserDefaults = localStorageHelper.fetch();
    localStorageHelper.update({
      ...userDefaults,
      isNotificationPermissionRequested,
    });
  }

  /**
   * Gets called when notification permission prompt is closed.
   */
  const onNotificationPermissionPromptClosed = async () => {
    setShowNotificationPermissionWindow(false);
    // Triggers a native window  to request permission to send notifications
    await window.Notification.requestPermission();
    updateStorageWithNotificationPermissionRequest(true);
    sendSubscription(serviceWorkerRegistration);
  };

  /**
   * Decides if app can show a modal to inform the user that notification permission needs to be granted.
   * @returns true if app has never showed notification permission request windows.
   */
  function isAppAllowedToShowNotificationPermissionRequestWindow(): boolean {
    const userDefaults: LocalStorageUserDefaults = localStorageHelper.fetch();
    return !userDefaults.isNotificationPermissionRequested;
  }

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

  /**
   * Renders {@link NotificationPermissionPrompt} or null based on {@link showNotificationPermissionPrompt} value.
   * @returns
   */
  function renderNotificationPermissionRequestPrompt(): React.ReactElement {
    return (
      <>
        {showNotificationPermissionWindow ? (
          <NotificationPermissionPrompt
            isOpen={showNotificationPermissionWindow}
            onPromptClose={() => setShowNotificationPermissionWindow(false)}
            onConfirm={() => onNotificationPermissionPromptClosed()}
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
          {renderNotificationPermissionRequestPrompt()}
          <Component {...pageProps} />
        </MainLayout>
      </ApplicationWrapper>
    </ChakraProvider>
  );
}

export default App;
