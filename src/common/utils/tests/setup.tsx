import React, { FC, ReactElement } from "react";
import { queries, render, RenderOptions } from "@testing-library/react";
import { RenderResult } from "@testing-library/react/types";
import configureStore from "redux-mock-store";
import {
  RouterProvider,
  createMemoryRouter,
  MemoryRouter,
} from "react-router-dom";
import type { Router } from "react-router-dom";
import { ReactRouter } from "ts/router";
import { Provider as ReduxProvider } from "react-redux";
import BreakpointProvider from "common/components/BreakpointProvider";
import TeoriaProvider from "common/components/TeoriaProvider";
import { RootState } from "store";
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
export const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/settings"],
  initialIndex: 0,
});

const AllTheProviders = (store: Store, router: ReturnType<typeof Router>) => {
  return ({ children }: { children?: React.ReactNode }) => (
    <RouterProvider router={router}>
      <ReduxProvider store={store}>
        <BreakpointProvider>
          <TeoriaProvider>{children}</TeoriaProvider>
        </BreakpointProvider>
      </ReduxProvider>
    </RouterProvider>
  );
};

const customRender = (
  ui: ReactElement,
  {
    initialState,
    router,
    store = configureStore<Partial<RootState>>([])(initialState),
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
