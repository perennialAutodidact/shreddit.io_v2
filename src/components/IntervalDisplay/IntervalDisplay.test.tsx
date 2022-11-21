import { render, screen } from "common/utils/tests/setup";
import { initialState as rootState, RootState } from "store";
import IntervalDisplay from "components/IntervalDisplay";
import { getScaleData } from "common/utils/getScaleData";

describe("<IntervalDisplay/>", () => {
  it("should render intervals for current scale", () => {
    const initialState: RootState = {
      ...rootState,
      instrument: {
        ...rootState.instrument,
        scale: getScaleData("c1", "ionian"),
      },
    };

    render(<IntervalDisplay />, { initialState });

    const intervalDisplay = screen.getByTestId("IntervalDisplay");

    expect(intervalDisplay).toBeInTheDocument();
  });
});
