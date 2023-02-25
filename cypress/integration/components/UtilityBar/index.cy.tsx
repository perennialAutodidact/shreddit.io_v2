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
});
