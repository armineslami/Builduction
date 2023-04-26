interface LocalStorageInterface {
  fetch: () => LocalStorageUserDefaults;
  update: (userDefaults: LocalStorageUserDefaults) => void;
  purge: () => void;
}

type LocalStorageUserDefaults = {
  showPwaInstallPrompt: boolean;
  notificationPermission: NotificationPermission;
};

export type { LocalStorageUserDefaults };
export default LocalStorageInterface;
