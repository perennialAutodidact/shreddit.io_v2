import NoteMarker from "components/NoteMarker";

describe("<NoteMarker />", () => {
  it("should render at a particular size", () => {
    let size = 50;

    cy.mount(<NoteMarker noteName={"c"} interval={"P1"} size={50} />);

    const noteMarker = cy.findByTestId("NoteMarker");

    noteMarker.should("exist");
    noteMarker.invoke("css", "height").then((height) => {
      expect(height).to.eq(`${size}px`);
    });
  });
});
