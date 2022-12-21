import { render, screen } from "common/utils/tests/setup";
import { initialState as rootState, RootState } from "store";
import IntervalDisplay from "components/IntervalDisplay";
import { getScaleData } from "common/utils/getScaleData";

describe("<IntervalDisplay/>", () => {
  it("should render intervals for current scale", () => {
    const scale = getScaleData("c1", "ionian");
    const initialState: RootState = {
      ...rootState,
      instrument: {
        ...rootState.instrument,
      },
      audioClient: {
        ...rootState.audioClient,
        scale,
      },
    };

    render(<IntervalDisplay markerSize={30} />, { initialState });

    const intervalDisplay = screen.getByTestId("IntervalDisplay");

    expect(intervalDisplay).toBeInTheDocument();

    scale.intervals.forEach((interval) => {
      let intervalMarker = screen.getByTestId(
        `IntervalDisplayMarker-${interval}`
      );
      expect(intervalMarker).toBeInTheDocument();
    });
  });
});
