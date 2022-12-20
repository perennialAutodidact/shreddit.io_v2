import AudioControls from "common/components/AudioControls";
import AudioClient from "common/services/AudioClient";
import * as Tone from "tone";

describe("<AudioControls />", () => {
  it("should display loading state while loading", () => {
    const audioClient = new AudioClient({
      instrument: "guitar-acoustic",
      onLoad: cy.stub(),
      Tone,
    });

    cy.mount(<AudioControls audioClient={audioClient} isLoaded={false} />);

    cy.findByTestId("LoadingIndicator").should("exist");
  });

  it("should display play and stop button once loaded", () => {
    const audioClient = new AudioClient({
      instrument: "guitar-acoustic",
      onLoad: cy.stub().as("OnLoad"),
      Tone,
    });

    cy.mount(<AudioControls audioClient={audioClient} isLoaded={true} />);

    cy.findByTestId("PlayAudioButton").should("exist");
    cy.findByTestId("StopAudioButton").should("exist");

    cy.get("@OnLoad").should("have.been.called");
  });
});
