interface LocalStorageInterface {
  fetch: () => LocalStorageUserDefaults;
  update: (userDefaults: LocalStorageUserDefaults) => void;
  purge: () => void;
}

type LocalStorageUserDefaults = {
  showPwaInstallPrompt: boolean;
};

export type { LocalStorageUserDefaults };
export default LocalStorageInterface;
