import Project from "@/models/Project";
import DatabaseInterface from "./DatabaseInterface";

type Data = {
  data: Project[];
};

class DatabaseHelper implements DatabaseInterface {
  private key = "builduction-app-storage";
  private defaultStorage = '{"data":[]}';
  private static DEBUG = false;
  private static REBUILD = false;

  constructor() {
    if (DatabaseHelper.REBUILD) this.purge();
  }

  private log(message: string, data?: any) {
    if (DatabaseHelper.DEBUG) console.log(message, data);
  }

  private storage(): Data {
    try {
      // First create a stroage if there is not one. This is to make sure we alaway have a stroage.
      if (localStorage.getItem(this.key) === null) {
        // Storage is null so create a default one
        localStorage.setItem(this.key, this.defaultStorage);

        this.log("Storage was empty therefore created one.", this.storage());
      }

      // Now get the stroage again and save it.
      const jsonStroage: string = localStorage.getItem(this.key) as string;

      // Now try to parse the storage into JSON
      const storage = JSON.parse(jsonStroage);

      // Return the storage
      return storage;
    } catch (error) {
      this.log("Failed to access the storage.", error);
      return JSON.parse(this.defaultStorage);
    }
  }

  /**
   * Fetches the storage data and returns it as an array.
   * @returns An array of projects
   */
  public fetch(): Project[] {
    try {
      return this.storage().data;
    } catch (error) {
      this.log("Failed to fetch the projects.", error);
      return [];
    }
  }

  /**
   * Searches database using given id to find a matcehd project.
   * @param id - Id of a project to find it on the database
   * @returns a project or undefined
   */
  public find(id: string): Project | undefined {
    try {
      // Get the storage
      const storage: Data = this.storage();

      // If storage keys is 0 it means storage is empty
      if (Object.keys(storage.data).length === 0) return undefined;

      // Storage is an array of projects like { data: [ {id, title, ...}, ... ] }
      const targetProject = storage.data.find((project) => project.id == id);

      targetProject === undefined
        ? this.log("Found no matched project.")
        : this.log("Found a matched project.", targetProject);

      return targetProject;
    } catch (error) {
      this.log("Failed to find the project.", error);
      return undefined;
    }
  }

  /**
   * Adds given project to the storage.
   * @param project - A project object to be added.
   * @returns ture if add process was successful.
   */
  public add(project: Project): boolean {
    try {
      // Get the storage
      const storage: Data = this.storage();

      // Add given project to the storage
      storage.data = [project, ...storage.data];

      // Update the storage
      localStorage.setItem(this.key, JSON.stringify(storage));

      this.log("Added a new project to the local storage.", this.storage());

      return true;
    } catch (error) {
      this.log("Failed to add the project.", error);
      return false;
    }
  }

  /**
   * Replaces given project with the one that already exists with the same id in the storage.
   * @param project - A project object to be updated.
   * @returns true if project was updated successfully.
   */
  public update(project: Project): boolean {
    try {
      // Get the storage
      const storage: Data = this.storage();

      // If storage keys is 0 it means storage is empty
      if (Object.keys(storage).length === 0) return false;

      // Find the index of given project
      const index = storage.data.findIndex((p) => p.id === project.id);

      // If index is less than 0, it means no matched is found.
      if (index < 0) return false;

      // Update the project
      storage.data[index] = project;

      // Update the storage
      localStorage.setItem(this.key, JSON.stringify(storage));

      this.log("Updated the storage.", this.storage());

      return true;
    } catch (error) {
      this.log("Failed to update the project.", error);
      return false;
    }
  }

  /**
   * Tries to update given project or add it if it's not already in the storage.
   * @param project - A project object to add or update it.
   * @returns true if add/update was successful.
   */
  public addOrUpdate(project: Project): boolean {
    try {
      let success = this.update(project);

      if (success) return success;

      success = this.add(project);

      if (success) return success;

      return false;
    } catch (error) {
      this.log("Failed to update the project.", error);
      return false;
    }
  }

  /**
   * Deletes a project which has the same id same as given id.
   * @param id - The id of a project to be deleted.
   * @returns true if project was deleted successfully.
   */
  public delete(id: string): boolean {
    try {
      // Get the storage
      const storage: Data = this.storage();

      // If storage keys is 0 it means storage is empty
      if (Object.keys(storage.data).length === 0) return false;

      // Delete target project with given id
      storage.data = storage.data.filter((project) => project.id != id);

      // Update the storage
      localStorage.setItem(this.key, JSON.stringify(storage));

      this.log(`Deleted the project with id of ${id}`, this.storage());

      return true;
    } catch (error) {
      this.log("Failed to delete the project.", error);
      return false;
    }
  }

  /**
   * Removes everything from the storage and recrates.
   * @returns true if storage was purged successfully.
   */
  public purge(): boolean {
    try {
      localStorage.removeItem(this.key);
      localStorage.setItem(this.key, this.defaultStorage);
      this.log("Purged the storage.", this.storage());
      return true;
    } catch (error) {
      this.log("Failed to purge the storage.", error);
      return false;
    }
  }
}

export default DatabaseHelper;
