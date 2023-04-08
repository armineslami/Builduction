import Project from "@/models/Project";

interface DatabaseInterface {
  fetch: () => Project[];
  find: (id: string) => Project | undefined;
  add: (project: Project) => boolean;
  update: (project: Project) => boolean;
  addOrUpdate: (project: Project) => boolean;
  delete: (id: string) => boolean;
  purge: () => boolean;
}

export default DatabaseInterface;
