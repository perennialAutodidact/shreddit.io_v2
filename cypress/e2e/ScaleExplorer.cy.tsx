import { buildInitialState } from "../support/utils/buildInitialState";

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

  it("should toggle the settings menu when the toggle is clicked", () => {
    const initialState = buildInitialState({
      app: { showSettingsMenu: false },
    });

    cy.visit("http://localhost:3000/");

    const settingsMenuToggle = cy.findByTestId("SettingsMenuToggle");

    settingsMenuToggle.should("exist");

    const settingsMenu = cy.findByTestId("SettingsMenu");
    settingsMenu.should("not.exist");

    settingsMenuToggle.click();

    settingsMenu.should("exist");

    const settingsMenuCloseButton = cy.findByTestId("SettingsMenuCloseButton");

    settingsMenuCloseButton.should("exist");

    settingsMenuCloseButton.click();

    settingsMenu.should("not.exist");
  });
});

export default {};
