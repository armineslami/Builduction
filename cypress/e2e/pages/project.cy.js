/// <reference types="cypress" />

// set local reference to lodash and jquery
const { _, $ } = Cypress;

describe("Project Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:2095/project");
  });

  describe("Back button", () => {
    it("should have a back button", () => {
      cy.get("button")
        .contains("بازگشت")
        .should("be.visible")
        .should("have.text", "بازگشت");
    });

    it("should change browser router to /", () => {
      cy.get("button").contains("بازگشت").as("backButton");
      cy.get("@backButton").click();
      cy.location().should("have.property", "pathname").and("equal", "/");
    });
  });

  describe("Calculate button", () => {
    it("should have a calculate button", () => {
      cy.get("button").contains("محاسبه").should("be.visible");
    });

    it("should open a modal when clicked", () => {
      cy.get("button").contains("محاسبه").as("calculateButton");
      cy.get("@calculateButton").click();
      cy.get(".chakra-modal__content-container").should("be.visible");
    });

    it("modal header's text should be اطلاعات پروژه", () => {
      cy.get("button").contains("محاسبه").as("calculateButton");
      cy.get("@calculateButton").click();
      cy.get(".chakra-modal__content-container")
        .find("header")
        .first()
        .should("have.text", "اطلاعات پروژه");
    });
  });

  describe("Save button", () => {
    it("should have a calculate button", () => {
      cy.get("button").contains("ذخیره").should("be.visible");
    });

    it("should open a modal when clicked", () => {
      cy.get("button").contains("ذخیره").as("saveButton");
      cy.get("@saveButton").click();
      cy.get(".chakra-modal__content-container").should("be.visible");
    });

    it("modal header's text should be ذخیره پروژه", () => {
      cy.get("button").contains("ذخیره").as("saveButton");
      cy.get("@saveButton").click();
      cy.get(".chakra-modal__content-container")
        .should("be.visible")
        .find("p")
        .first()
        .should("have.text", "ذخیره پروژه");
    });
  });

  describe("Inputs", () => {
    it("should have 14 inputs", () => {
      cy.get("input").should("have.length", 14);
    });

    it("should have 3 inputs with 0 as default value", () => {
      cy.get("input[value='0']").should("have.length", 3);
    });

    it("should have 11 empty inputs ", () => {
      cy.get("input[value='']").should("have.length", 11);
    });
  });

  describe("Inputs form", () => {
    it("Should not allow to type alphabet characters", () => {
      cy.get("form").within(() => {
        cy.get("input").each(($input, index) => {
          cy.wrap($input)
            .clear()
            .type("ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+?><~|")
            .should("have.value", "");
        });
      });
    });

    it("Should allow to type numeric characters", () => {
      cy.get("input").each(($input, index) => {
        cy.wrap($input)
          .clear()
          .type("1234567890")
          .should("have.value", "1234567890");
      });
    });
  });
});
