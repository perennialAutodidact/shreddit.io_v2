import NoteMarkerRangeSelector from "components/NoteMarkerRangeSelector";

describe("NoteMarkerRangeSelector", () => {
  it("renders without crashing", () => {
    cy.mount(<NoteMarkerRangeSelector />);
    const noteMarkerRangeSelector = cy.findByTestId("NoteMarkerRangeSelector");

    noteMarkerRangeSelector.should("exist");
  });

  it("renders grid represeting frets", () => {
    cy.mount(<NoteMarkerRangeSelector />);

    cy.findAllByTestId("MarkerEnabled").should("have.length", 72);
  });
});
