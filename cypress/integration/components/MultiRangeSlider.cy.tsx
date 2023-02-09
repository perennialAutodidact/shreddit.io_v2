import MultiRangeSlider from "components/MultiRangeSlider";

describe("<MultiRangeSlider />", () => {
  beforeEach(() => {
    cy.mount(
      <MultiRangeSlider
        min={0}
        max={21}
        handleChange={cy.stub().as("onSliderChange")}
      />
    );
  });
  it("should render with two slider thumbs", () => {
    cy.findByTestId("MultiSliderThumbLeft").should("exist");
    cy.findByTestId("MultiSliderThumbRight").should("exist");
  });

  it("should change the slider labels when changed", () => {
    cy.findByTestId("MultiSliderLabelRight").should("have.text", "6");
    cy.findByTestId("MultiSliderThumbRight").click({
      multiple: true,
      force: true,
    });

    cy.findByTestId("MultiSliderThumbRight").realType("{rightarrow}");
    cy.findByTestId("MultiSliderLabelRight").should("have.text", "7");

    cy.findByTestId("MultiSliderThumbLeft").click({
      multiple: true,
      force: true,
    });
    cy.findByTestId("MultiSliderThumbLeft").realType("{rightarrow}");
    cy.findByTestId("MultiSliderLabelLeft").should("have.text", 1);
  });
});

export {};
