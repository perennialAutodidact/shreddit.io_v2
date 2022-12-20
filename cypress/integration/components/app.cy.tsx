import App from "App";
import { initialState as rootState, RootState } from "store";

/// <reference types="cypress" />
// @ts-check
describe("<App/>", () => {
  it("passes", () => {
    const initialState: RootState = {
      ...rootState,
    };
    cy.mount(<App />, { initialState });
  });
});

export {};
