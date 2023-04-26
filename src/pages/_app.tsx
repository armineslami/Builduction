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
import NotificationPermissionPrompt from "@/components/modal/notification-permission-prompt";
const InstallPrompt = dynamic(
  () => import("@/components/modal/install-prompt")
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
  // Creates default config for the app
  const config: ApplicationContext = {
    version: "1.0",
    debug: false,
    update,
  };

  // Creates a state for the context
  const [appContext, setAppContext] = useState<ApplicationContext>(config);

  // Notification States
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [serviceWorkerRegistration, setServiceWorkerRegistration] =
    useState<ServiceWorkerRegistration>();
  const [
    showNotificationPermissionPrompt,
    setShowNotificationPermissionPrompt,
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
        // If no registration or pushManager is found, return!. This happens on iOS safari. but when the app is
        // added to the home screen everything is good to go!.
        if (!registration || !registration.pushManager) {
          console.log(
            "registration.PushManager is not found.",
            registration.pushManager
          );
          return;
        }

        // Get subscription if any exists.
        registration.pushManager.getSubscription().then((subscription) => {
          // Now check if client is already subscribed and subscription is not expired.
          if (
            subscription &&
            !(
              subscription.expirationTime &&
              Date.now() > subscription.expirationTime - 5 * 60 * 1000
            )
          ) {
            // If we are here it means user has valid subscription.
            console.log("Client is subscribed.", subscription);
            setSubscription(subscription);
            setIsSubscribed(true);

            /**
             * We should compare window.Notification.permission against current permission saved in the storage.
             * If in the storage we have 'denied' but window.Notification.permission says 'granted' we should ask
             * user to give us permission again because it can mean that user has manually turned on receiving
             * notifications in the settings.
             */
            checkIfUserHasManuallyUpdatedNotificationPermission(
              window.Notification.permission,
              isIos()
            );
          } else {
            console.log("Client is NOT subscribed.");
            /**
             * iOS requests a user gesture to show notification permission request window.
             * By setting {@link showNotificationPermissionRequest} to true we later show a modal to ask
             * for the permission. Then after user confirmed the request we will use {@link subscribe()}
             * to show user the native permission window.
             */
            if (isIos() || isSafari()) {
              setShowNotificationPermissionPrompt(true);
            } else {
              /**
               * Others like chrome or android don't require user gesture so without any more action
               * native permission request windows will pop up.
               */
              subscribe(registration);
            }
          }
        });
        // Save registration into the state.
        console.log("Saving registration", registration);
        setServiceWorkerRegistration(registration);
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
   * Aks user for permission to send notification. Then if the permission is granted
   * sends the subscription to the server for later use.
   * @param registration - A service worker registration instance to use it for creating a subscription.
   * @returns
   */
  const subscribe = async (
    registration: ServiceWorkerRegistration | undefined
  ) => {
    console.log("Permission status:", window.Notification.permission);

    // If user has already denied the subscription, don't bother asking again.
    if (window.Notification.permission === "denied") {
      console.log(
        "User has denied receiveing notifications so we won't ask for permission again."
      );

      updateStorageWithNotificationPermission(window.Notification.permission);
      return;
    }

    if (!registration) {
      console.log(
        "Registration is not valid so user can NOT subscribe.",
        registration
      );
      return;
    }

    // Triggers a popup to request access to send notifications
    const permission = await window.Notification.requestPermission();

    updateStorageWithNotificationPermission(permission);

    if (permission !== "granted") {
      console.log("User denied to receive notifications.");
      return;
    }

    const subscription = await registration.pushManager.subscribe({
      applicationServerKey:
        "BPiRt6kHY_UdEhDw02-AqzE3Ib8MORv0TT5bdhFhlFr71IYX--z1g-ierN6NpmnOMoFrDW2H2_dOwd_L1ZQ0Ioc",
      userVisibleOnly: true,
    });

    setSubscription(subscription);
    setIsSubscribed(true);

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
        body: JSON.stringify(subscription),
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
   * Updates notification permission value in the storage
   * @param permission - a string equal to one of the {@link NotificationPermission}
   */
  function updateStorageWithNotificationPermission(
    permission: NotificationPermission
  ) {
    console.log("Updating storage with new permission value.", permission);
    const userDefaults: LocalStorageUserDefaults = localStorageHelper.fetch();
    localStorageHelper.update({
      ...userDefaults,
      notificationPermission: permission,
    });
  }

  /**
   * Gets called when notification permission prompt is closed. It updates storage with
   * given permission and calls {@link subscribe()} if permission is granted.
   * @param permission - a string equal to one of the {@link NotificationPermission}
   */
  const onNotificationPermissionChange = (
    permission: NotificationPermission
  ) => {
    updateStorageWithNotificationPermission(permission);
    setShowNotificationPermissionPrompt(false);
    if (permission === "granted") {
      subscribe(serviceWorkerRegistration);
    }
  };

  /**
   * Compares given permission against current permission saved in the storage and updates the storage
   * if they are different. If new permission is 'granted' we should ask user to give us permission again
   * because it can mean that user has manually turned on receiving notifications in the settings.
   * @param currentPermission - a string equal to one of the {@link NotificationPermission}
   * @param isIos - true if client is iOS
   */
  function checkIfUserHasManuallyUpdatedNotificationPermission(
    currentPermission: NotificationPermission,
    isIos: boolean
  ) {
    console.log(
      "Checking for manual notification permission change.",
      currentPermission
    );
    const userDefaults: LocalStorageUserDefaults = localStorageHelper.fetch();
    if (currentPermission !== userDefaults.notificationPermission) {
      updateStorageWithNotificationPermission(currentPermission);

      if (currentPermission === "granted") {
        if (isIos) {
          setShowNotificationPermissionPrompt(true);
        } else {
          subscribe(serviceWorkerRegistration);
        }
      }
    }
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
        {showNotificationPermissionPrompt ? (
          <NotificationPermissionPrompt
            isOpen={showNotificationPermissionPrompt}
            onPromptClose={() => setShowNotificationPermissionPrompt(false)}
            onPermissionDenied={() => onNotificationPermissionChange("denied")}
            onPermissionGained={() => onNotificationPermissionChange("granted")}
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
