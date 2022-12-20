/// <reference types="cypress" />
// @ts-check
describe("Scale Explorer Page", () => {
  it("renders with initial state", () => {
    cy.visit("http://localhost:3000/");

    const strings = cy.findAllByTestId("String");

    strings.should("have.length", 6);
  });
});

export {};
