// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import React from "react";
import { mount } from "cypress/react18";
import "cypress-real-events";
import { MountReactComponentOptions } from "cypress/react";
import { configure } from "@testing-library/cypress";
import { MountReturn } from "cypress/react";
import { MemoryRouter, MemoryRouterProps } from "react-router";
import { Store } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import BreakpointProvider from "common/components/BreakpointProvider";
import TeoriaProvider from "common/components/TeoriaProvider";
import { initialState, reducer, RootState } from "store";
import { configureStore } from "@reduxjs/toolkit";
import "styles/index.scss";

configure({ testIdAttribute: "data-test-id" });

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: (
        jsx: React.ReactElement,
        options?: ExtendedMountOptions
      ) => Cypress.Chainable<MountReturn>;
    }
  }
}

type ExtendedMountOptions = Partial<
  MountReactComponentOptions & {
    initialState: Partial<RootState>;
    router?: Partial<typeof MemoryRouter>;
    store?: Store<Partial<RootState>>;
  }
>;

export const defaultRouter: Partial<typeof MemoryRouter> = {
  initialEntries: ["/"],
  initialIndex: 1,
};
const AllTheProviders = (
  component: React.ReactNode,
  store: Store,
  router: Partial<typeof MemoryRouter> = defaultRouter
): React.ReactNode => (
  <MemoryRouter {...router}>
    <ReduxProvider store={store}>
      <BreakpointProvider>
        <TeoriaProvider>{component}</TeoriaProvider>
      </BreakpointProvider>
    </ReduxProvider>
  </MemoryRouter>
);

Cypress.Commands.add(
  "mount",
  (
    component,
    options = {
      initialState: {},
      router: defaultRouter,
    }
  ) => {
    const { initialState, router, ...mountOptions } = options;

    const store: Store = configureStore({
      reducer,
      preloadedState: initialState,
    });

    const wrapped = AllTheProviders(component, store, router);

    return mount(wrapped, mountOptions);
  }
);

// Example use:
// cy.mount(<MyComponent />)
