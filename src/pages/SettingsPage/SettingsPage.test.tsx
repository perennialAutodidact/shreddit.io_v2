import SettingsPage from "pages/SettingsPage";
import { getByTestId, render, screen } from "common/utils/tests/setup";
import { initialState as rootState, RootState } from "store";

describe("<SettingsPage/>", () => {
  it("should render without crashing", () => {
    const initialState: RootState = {
      ...rootState,
    };
    render(<SettingsPage />, { initialState });

    const settingsPage = screen.getByText(/settings/i);

    expect(settingsPage).toBeInTheDocument();
  });
});
