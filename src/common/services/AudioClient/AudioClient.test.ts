import AudioClient from "common/services/AudioClient";
import { context } from "tone";
import { NoteDuration } from "ts/AudioClient";
import { Note } from "ts/musicTheory";

const teoria = require("teoria");

const FakeTone = {
  Sampler: jest.fn(),
  Time: jest.fn().mockReturnValue({ value: "2n" }),
};

describe("AudioClient()", () => {
  it("should merge note durations and pitches for a scale", async () => {
    const fakeAudioClient = new AudioClient({
      instrument: "guitar-acoustic",
      onLoad: jest.fn(),
      Tone: FakeTone,
    });

    expect(fakeAudioClient).toBeInstanceOf(AudioClient);
  });
});
