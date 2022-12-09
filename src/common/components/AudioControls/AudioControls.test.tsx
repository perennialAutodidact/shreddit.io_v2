import { render, screen, waitFor } from "common/utils/tests/setup";
import AudioClient from "common/services/AudioClient";
import * as Tone from "tone";
import AudioControls from ".";

const FakeTone = {
  Sampler: jest.fn(),
  Time: jest.fn().mockReturnValue({ value: 1 }),
};

const fakeAudioClient = new AudioClient({
  instrument: "guitar-acoustic",
  onLoad: jest.fn(),
  Tone: FakeTone,
});

describe("<AudioControls/>", () => {
  it("should display loading state until loaded", async () => {
    const { rerender } = render(
      <AudioControls audioClient={fakeAudioClient} isLoaded={false} />
    );

    const loadingIndicator = screen.getByTestId("LoadingIndicator");

    expect(loadingIndicator).toBeInTheDocument();

    rerender(<AudioControls audioClient={fakeAudioClient} isLoaded={true} />);

    expect(await screen.findByTestId("PlayAudioButton")).toBeInTheDocument();
  });
});
