describe("Scale explorer page", () => {
  const sliderLabelLeft = "MultiSliderLabelLeft";
  const sliderThumbLeft = "MultiSliderThumbLeft";
  const sliderLabelRight = "MultiSliderLabelRight";
  const sliderThumbRight = "MultiSliderThumbRight";

  it("should show the number of frets represented on the fret slider", () => {
    cy.visit("http://localhost:3000/");

    cy.findByTestId(sliderLabelLeft).should("have.text", "0");
    cy.findByTestId(sliderLabelRight).should("have.text", "12");

    let frets = cy.findAllByTestId("String").first().findAllByTestId("Fret");
    frets.should("have.length", 13);

    cy.findByTestId(sliderThumbLeft).click({ multiple: true, force: true });
    cy.findByTestId(sliderThumbLeft).realType("{rightarrow}");

    frets = cy.findAllByTestId("String").first().findAllByTestId("Fret");
    frets.should("have.length", 12);
  });
});

export default {};
