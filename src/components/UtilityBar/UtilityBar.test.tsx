import { render, screen } from "common/utils/tests/setup";
import userEvent from "@testing-library/user-event";
import App from "App";
import UtilityBar from "components/UtilityBar";
import { initialState as rootState, RootState } from "store";

describe("<UtilityBar/>", () => {
  it("should render", () => {
    const initialState: RootState = {
      ...rootState,
      app: {
        showSettingsMenu: true,
      },
    };

    render(<UtilityBar />, { initialState });

    const utilityBar = screen.getByTestId("UtilityBar");

    expect(utilityBar).toBeInTheDocument();
  });

  it("should open the settings menu when the toggle is clicked", async () => {
    const user = userEvent.setup();

    const initialState: RootState = {
      ...rootState,
      app: {
        showSettingsMenu: false,
      },
    };

    render(<App />, {
      initialState,
    });

    const settingsMenuToggle = screen.getByTestId("SettingsMenuToggle");

    expect(settingsMenuToggle).toBeInTheDocument();

    let settingsMenu = screen.queryByTestId("SettingsMenu");

    expect(settingsMenu).toBeNull();

    await user.click(settingsMenuToggle);
    expect(await screen.findByTestId("SettingsMenu")).toBeInTheDocument();
  });
});
