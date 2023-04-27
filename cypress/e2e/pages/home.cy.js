/// <reference types="cypress" />

import LocalStorageHelper from "../../../src/models/local-storage/LocalStorageHelper";

describe("Home Page", () => {
  beforeEach(() => {
    const localStorageHelper = new LocalStorageHelper();
    const config = localStorageHelper.fetch();
    localStorageHelper.update({
      ...config,
      isNotificationPermissionRequested: true,
    });
    cy.visit("http://localhost:2095");
  });

  describe("Empty state component", () => {
    it("should have an image", () => {
      cy.get("img")
        .should("be.visible")
        .should("have.attr", "alt", "empty")
        .should("have.attr", "src")
        .and("match", /empty.webp/);
    });

    it("should have a text", () => {
      cy.get("p:first")
        .should("be.visible")
        .should("have.text", "پروژه‌ای ندارید");
    });
  });

  describe("Add button", () => {
    it("should have an add button", () => {
      cy.get("button").should("be.visible").should("have.text", "افزودن");
    });

    it("should link to project page", () => {
      cy.get("a").should("have.attr", "href").and("equal", "/project");
    });

    it("should change browser route to /project when clicked", () => {
      cy.get("a[href='/project']").as("addButton");
      cy.get("@addButton").click();
      cy.location()
        .should("have.property", "pathname")
        .and("equal", "/project");
    });
  });
});
