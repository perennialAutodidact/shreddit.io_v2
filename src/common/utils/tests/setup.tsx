import React, { FC, ReactElement } from "react";
import { queries, render, RenderOptions } from "@testing-library/react";
import { RenderResult } from "@testing-library/react/types";
import configureStore from "redux-mock-store";
// import {BrowserRouter as Router} from 'react-router-dom';
import { Provider as ReduxProvider } from "react-redux";
import BreakpointProvider from "common/components/BreakpointProvider";
import TeoriaProvider from "common/components/TeoriaProvider";
import { RootState } from "store";
import { Store } from "redux";

type Props = {
  children: JSX.Element;
  store: Store;
};
interface ExtendedRenderOptions extends RenderOptions {
  initialState: Partial<RootState>;
  store?: Store<Partial<RootState>>;
  options?: Omit<RenderOptions, "queries">;
  // router?: Partial<NextRouter>;
}

// const defaultRouter: Partial<NextRouter> = {
//   route: "",
//   pathname: "/",
//   query: {},
//   asPath: "",
//   push: jest.fn(),
//   basePath: "",
//   isLocaleDomain: true
// };

const AllTheProviders =
  (store: Store) =>
  ({
    // router?: Partial<NextRouter>) => ({
    children,
  }: {
    children?: React.ReactNode;
  }) =>
    (
      // <RouterContext.Provider value={{ ...defaultRouter, ...router } as NextRouter}>
      <ReduxProvider store={store}>
        <BreakpointProvider>
          <TeoriaProvider>{children}</TeoriaProvider>
        </BreakpointProvider>
      </ReduxProvider>
    );
// </RouterContext.Provider>;

const customRender = (
  ui: ReactElement,
  {
    initialState,
    // router,
    store = configureStore<Partial<RootState>>([])(initialState),
    options,
  }: ExtendedRenderOptions = {
    initialState: {},
    // router: defaultRouter
  }
): RenderResult =>
  render(ui, {
    wrapper: AllTheProviders(store), //router),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
