import MultiRangeSlider from "components/MultiRangeSlider";

describe("<MultiRangeSlider />", () => {
  const thumbLeft = "MultiSliderThumbLeft";
  const labelLeft = "MultiSliderLabelLeft";
  const thumbRight = "MultiSliderThumbRight";
  const labelRight = "MultiSliderLabelRight";
  beforeEach(() => {
    cy.mount(
      <MultiRangeSlider
        min={0}
        minVal={0}
        max={21}
        maxVal={12}
        handleChange={cy.stub().as("onSliderChange")}
      />
    );
  });
  it("should render with two slider thumbs with labels", () => {
    cy.findByTestId(thumbLeft).should("exist");
    cy.findByTestId(labelLeft).should("exist");
    cy.findByTestId(thumbRight).should("exist");
    cy.findByTestId(labelRight).should("exist");
  });

  describe("should change slider label when value changes", () => {
    it("right slider", () => {
      cy.findByTestId(labelRight).should("have.text", "12");
      cy.findByTestId(thumbRight).click({
        multiple: true,
        force: true,
      });
      cy.findByTestId(thumbRight).realType("{leftarrow}}");
      cy.findByTestId(labelRight).should("have.text", "11");
      cy.findByTestId(thumbRight).realType("{rightarrow}}");
      cy.findByTestId(labelRight).should("have.text", "12");
    });
    it("left slider", () => {
      cy.findByTestId(labelLeft).should("have.text", "0");
      cy.findByTestId(thumbLeft).click({
        multiple: true,
        force: true,
      });
      cy.findByTestId(thumbLeft).realType("{rightarrow}");
      cy.findByTestId(labelLeft).should("have.text", "1");
      cy.findByTestId(thumbLeft).realType("{leftarrow}");
      cy.findByTestId(labelLeft).should("have.text", "0");
    });
  });
  it("should require a minimum of six frets", () => {
    cy.findByTestId(labelLeft).should("have.text", "0");
    cy.findByTestId(labelRight).should("have.text", "12");

    const rightArrow7x =
      "{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}";
    const leftArrow7x =
      "{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}{leftarrow}";

    // try to move the left thumb seven ticks to the right
    cy.findByTestId(thumbLeft).click({ multiple: true, force: true });
    cy.findByTestId(thumbLeft).realType(rightArrow7x);
    cy.findByTestId(labelLeft).should("have.text", "6");

    // reset the left thumb
    cy.findByTestId(thumbLeft).realType(leftArrow7x);

    // try to move the right thumb seven ticks to the left
    cy.findByTestId(thumbRight).click({ multiple: true, force: true });
    cy.findByTestId(thumbRight).realType(leftArrow7x);
    cy.findByTestId(labelRight).should("have.text", 6);
  });
});

export {};
