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
    // First create a stroage if there is not one. This is to make sure we alaway have a stroage.
    if (localStorage.getItem(this.key) === null) {
      // Storage is null so create a default one
      localStorage.setItem(this.key, this.defaultStorage);

      this.log("Storage was empty therefore created one.", this.storage());
    }

    // Now get the stroage again and save it.
    const storage: string = localStorage.getItem(this.key) as string;

    // Now try to parse the storage into JSON
    const jsonStroage = JSON.parse(storage);

    // Return the storage
    return jsonStroage;
  }

  /**
   * Fetches the storage data and returns it as an array.
   * @returns An array of projects
   */
  public fetch(): Project[] {
    return this.storage().data;
  }

  /**
   * Searches database using given id to find a matcehd project.
   * @param id - Id of a project to find it on the database
   * @returns a project or undefined
   */
  public find(id: string): Project | undefined {
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
  }

  /**
   * Adds given project to the storage.
   * @param project - A project object to be added.
   * @returns ture if add process was successful.
   */
  public add(project: Project): boolean {
    // Get the storage
    const storage: Data = this.storage();

    // Add given project to the storage
    storage.data = [...storage.data, project];

    // Update the storage
    localStorage.setItem(this.key, JSON.stringify(storage));

    this.log("Added a new project to the local storage.", this.storage());

    return true;
  }

  /**
   * Replaces given project with the one that already exists with the same id in the storage.
   * @param project - A project object to be updated.
   * @returns true if project was updated successfully.
   */
  public update(project: Project): boolean {
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
  }

  /**
   * Tries to update given project or add it if it's not already in the storage.
   * @param project - A project object to add or update it.
   * @returns true if add/update was successful.
   */
  public addOrUpdate(project: Project): boolean {
    let success = this.update(project);

    if (success) return success;

    success = this.add(project);

    if (success) return success;

    return false;
  }

  /**
   * Deletes a project which has the same id same as given id.
   * @param id - The id of a project to be deleted.
   * @returns true if project was deleted successfully.
   */
  public delete(id: string): boolean {
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
  }

  /**
   * Removes everything from the storage and recrates.
   * @returns true if storage was purged successfully.
   */
  public purge(): boolean {
    localStorage.removeItem(this.key);
    localStorage.setItem(this.key, this.defaultStorage);
    this.log("Purged the storage.", this.storage());
    return true;
  }
}

export default DatabaseHelper;
