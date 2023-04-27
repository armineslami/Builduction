interface LocalStorageInterface {
  fetch: () => LocalStorageUserDefaults;
  update: (userDefaults: LocalStorageUserDefaults) => void;
  purge: () => void;
}

type LocalStorageUserDefaults = {
  showPwaInstallPrompt: boolean;
  isNotificationPermissionRequested: boolean;
};

export type { LocalStorageUserDefaults };
export default LocalStorageInterface;
