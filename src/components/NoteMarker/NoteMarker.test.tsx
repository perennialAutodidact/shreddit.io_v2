import NoteMarker from "components/NoteMarker";
import { render, screen } from "common/utils/tests/setup";

describe("<NoteMarker />", () => {
  it("should render at a particular size", () => {
    let size = 50;

    render(<NoteMarker noteName={"c"} interval={"P1"} size={50} />);

    const noteMarker = screen.getByTestId("NoteMarker");

    expect(noteMarker).toBeInTheDocument();
    expect(noteMarker).toHaveStyle(`height: ${size}px`);
  });
});
