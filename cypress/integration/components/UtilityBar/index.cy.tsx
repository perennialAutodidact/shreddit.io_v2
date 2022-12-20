import _ from "lodash";
import UtilityBar from "components/UtilityBar";
import { initialState as rootState, RootState } from "store";

describe("<UtilityBar />", () => {
  it("should render without crashing", () => {
    const initialState: RootState = _.merge(rootState, {
      app: { showSettingsMenu: true },
    });

    cy.mount(<UtilityBar />, { initialState });

    cy.findByTestId("UtilityBar").should("exist");
  });

  it("should toggle the settings menu when the toggle is clicked", () => {
    const initialState: RootState = _.merge(rootState, {
      app: { showSettingsMenu: false },
    });

    cy.mount(<UtilityBar />, { initialState });

    const settingsMenuToggle = cy.findByTestId("SettingsMenuToggle");

    settingsMenuToggle.should("exist");

    const settingsMenu = cy.findByTestId("SettingsMenu");
    settingsMenu.should("not.exist");

    settingsMenuToggle.click();

    settingsMenu.should("exist");

    const settingsMenuCloseButton = cy.findByTestId("SettingsMenuCloseButton");

    settingsMenuCloseButton.should("exist");

    settingsMenuCloseButton.click();

    settingsMenu.should("not.exist");
  });
});
