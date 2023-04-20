import LocalStorageInterface, {
  LocalStorageUserDefaults,
} from "./LocalStorageInterface";

class LocalStorageHelper implements LocalStorageInterface {
  private key = "builduction-app";
  private static REBUILD = false;
  private static DEBUG = false;

  private userDefaults: LocalStorageUserDefaults = {
    showPwaInstallPrompt: true,
  };

  constructor() {
    if (LocalStorageHelper.REBUILD) this.purge();
  }

  private log(message: string, data?: any) {
    if (LocalStorageHelper.DEBUG) console.log(message, data);
  }

  private storage(): LocalStorageUserDefaults {
    try {
      // First create a stroage if there is not one. This is to make sure we alaway have a stroage.
      if (localStorage.getItem(this.key) === null) {
        // Storage is null so create a default one
        localStorage.setItem(this.key, JSON.stringify(this.userDefaults));

        this.log("Storage was empty therefore created one.", this.storage());
      }

      // Now get the stroage again and save it.
      const jsonStroage: string = localStorage.getItem(this.key) as string;

      // Now try to parse the storage into JSON
      const storage = JSON.parse(jsonStroage);

      // Return the storage
      return storage;
    } catch (error) {
      this.log("Failed to purge local storage.");
      return this.userDefaults;
    }
  }

  public fetch(): LocalStorageUserDefaults {
    return this.storage();
  }

  public update(userDefaults: LocalStorageUserDefaults): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(userDefaults));
      this.log("Updated the storage.", this.storage());
    } catch (error) {
      this.log("Failed to purge local storage.");
    }
  }

  public purge(): void {
    try {
      localStorage.removeItem(this.key);
      localStorage.setItem(this.key, JSON.stringify(this.userDefaults));
    } catch (error) {
      this.log("Failed to purge local storage.");
    }
  }
}

export default LocalStorageHelper;
