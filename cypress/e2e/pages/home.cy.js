/// <reference types="cypress" />

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:2095");
  });

  describe("Empty state component", () => {
    it("should have an image", () => {
      cy.get("img")
        .should("be.visible")
        .should("have.attr", "alt", "empty")
        .should("have.attr", "src")
        .and("match", /directory.png/);
    });

    it("should have a text", () => {
      cy.get("p:first")
        .should("be.visible")
        .should("have.text", "پروژه‌ای وجود ندارد");
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
