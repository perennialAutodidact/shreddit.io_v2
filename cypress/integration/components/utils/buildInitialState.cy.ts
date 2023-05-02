import { initialState, RootState } from "store";
import { buildInitialState } from "../../../support/utils/buildInitialState";

describe("buildInitialState()", () => {
  it("should return an updated state object", () => {
    const expected: RootState = {
      ...initialState,
      instrument: {
        ...initialState.instrument,
        instrumentType: "mandolin",
      },
    };

    const actual = buildInitialState<RootState>({
      instrument: {
        instrumentType: "mandolin",
      },
    });

    expect(actual).to.deep.equal(expected);
  });
});
