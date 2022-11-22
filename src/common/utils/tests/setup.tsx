import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { RenderResult } from "@testing-library/react/types";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import type { Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import BreakpointProvider from "common/components/BreakpointProvider";
import TeoriaProvider from "common/components/TeoriaProvider";
import { reducer, RootState } from "store";
import { Store } from "redux";
import StringedInstrument from "components/StringedInstrument";

type Props = {
  children: JSX.Element;
  store: Store;
};

interface ExtendedRenderOptions extends RenderOptions {
  initialState: Partial<RootState>;
  store?: Store<Partial<RootState>>;
  options?: Omit<RenderOptions, "queries">;
  router?: Partial<typeof Router>;
}

const routes = [{ path: "/", element: <StringedInstrument /> }];

export const defaultRouter: MemoryRouterProps = {
  initialEntries: ["/"],
  initialIndex: 1,
};

const AllTheProviders = (
  store: Store,
  router: Partial<typeof MemoryRouter>
) => {
  return ({ children }: { children?: React.ReactNode }) => (
    <MemoryRouter {...router}>
      <ReduxProvider store={store}>
        <BreakpointProvider>
          <TeoriaProvider>{children}</TeoriaProvider>
        </BreakpointProvider>
      </ReduxProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: ReactElement,

  {
    initialState,
    router = defaultRouter,
    store = configureStore({ reducer, preloadedState: initialState }),
    options,
  }: ExtendedRenderOptions = {
    initialState: {},
    router: defaultRouter,
  }
): RenderResult =>
  render(ui, {
    wrapper: AllTheProviders(store, router),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
