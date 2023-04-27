import NoteMarkerRangeSelector from "components/NoteMarkerRangeSelector";
import { initialState } from "store";

describe("NoteMarkerRangeSelector", () => {
  it("renders without crashing", () => {
    cy.mount(<NoteMarkerRangeSelector />);
    const noteMarkerRangeSelector = cy.findByTestId("NoteMarkerRangeSelector");

    noteMarkerRangeSelector.should("exist");
  });

  it("renders grid represeting frets", () => {
    cy.mount(<NoteMarkerRangeSelector />);

    const { strings, fretTotal } = initialState.instrument;
    const expectedMarkers = strings.length * fretTotal;
    cy.findAllByTestId("MarkerEnabled").should("have.length", expectedMarkers);
  });

  it("disables grid box when clicked", () => {
    cy.mount(<NoteMarkerRangeSelector />);

    cy.findAllByTestId("MarkerEnabled")
      .first()
      .should("have.class", "cell_enabled");
    cy.findAllByTestId("MarkerEnabled").first().click();
    cy.findAllByTestId("MarkerEnabled")
      .first()
      .should("have.class", "cell_disabled");
  });
});
