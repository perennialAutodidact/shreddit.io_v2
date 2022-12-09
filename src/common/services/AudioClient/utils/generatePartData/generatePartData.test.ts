import { NoteDuration } from "ts/AudioClient";
import { Note } from "ts/musicTheory";
import { generatePartData } from ".";

const teoria = require("teoria");

describe("generatePartData()", () => {
  it("should do the thing", () => {
    const durations: NoteDuration[] = ["2n", "4n", "8n"];
    const scale = teoria
      .note("c4")
      .scale("minorpentatonic")
      .notes()
      .map((note: Note) => note.toString());

    generatePartData(durations, scale);
  });
});
