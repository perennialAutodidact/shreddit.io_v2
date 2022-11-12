import React from "react";
import { render, screen } from "common/utils/tests/setup";
import App from "./App";
import { initialState } from "store";

test("renders without crashing", () => {
  render(<App />, { initialState });
});
