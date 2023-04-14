/// <reference types="cypress" />
import DatabaseHelper from "../../../src/models/database/DatabaseHelper";
import Project from "../../../src/models/Project";

describe("storage", () => {
  const dbHelper = new DatabaseHelper();

  afterEach(() => {
    dbHelper.purge();
  });

  it("should return empty array when there is no project", () => {
    const projects = dbHelper.fetch();
    expect(projects).to.deep.equal([]);
  });

  it("should add 1 project into the stroage", () => {
    const project = new Project();
    dbHelper.add(project);
    const projects = dbHelper.fetch();
    expect(projects).to.have.length(1);
  });

  it("should delete 1 project from the stroage", () => {
    const project = new Project();
    dbHelper.add(project);
    dbHelper.delete(project.id);
    const projects = dbHelper.fetch();
    expect(projects).to.have.length(0);
  });

  it("should update 1 project in the stroage", () => {
    const project = new Project();
    dbHelper.add(project);
    project.title = "New Title";
    dbHelper.update(project);
    const projects = dbHelper.fetch();
    expect(projects[0].title).to.be.equal("New Title");
  });

  it("should find 1 project from the stroage", () => {
    const project = new Project();
    dbHelper.add(project);
    const targetProject = dbHelper.find(project.id);
    expect(targetProject).to.not.be.empty;
  });

  it("should purge the stroage", () => {
    const project = new Project();
    dbHelper.add(project);
    let projects = dbHelper.fetch();
    expect(projects).to.have.length(1);
    dbHelper.purge();
    projects = dbHelper.fetch();
    expect(projects).to.have.length(0);
  });
});
