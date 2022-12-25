import IntervalDisplay from "components/IntervalDisplay";
import { initialState as rootState, RootState } from "store";
import { getScaleData } from "common/utils/getScaleData";
import { Interval } from "ts/musicTheory";

describe("<IntervalDisplay />", () => {
  it("should render intervals for current scale", () => {
    const scale = getScaleData("c1", "ionian");
    const initialState: RootState = {
      ...rootState,
      instrument: {
        ...rootState.instrument,
      },
      musicTheory: {
        ...rootState.musicTheory,
        scale,
      },
    };

    cy.mount(<IntervalDisplay markerSize={30} />, { initialState });

    const intervalDisplay = cy.findByTestId("IntervalDisplay");

    intervalDisplay.should("exist");

    scale.intervals.forEach((interval: Interval) => {
      let intervalMarker = cy.findByTestId(`IntervalDisplayMarker-${interval}`);
      intervalMarker.should("exist");
    });
  });
});
