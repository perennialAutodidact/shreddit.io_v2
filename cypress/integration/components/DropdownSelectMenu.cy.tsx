import DropdownSelectMenu from "common/components/DropdownSelectMenu";

describe("<DropdownSelectMenu />", () => {
  const options = [
    { label: "Option 1", value: "value1" },
    { label: "Option 2", value: "value2" },
    { label: "Option 3", value: "value3" },
  ];
  const labelText = "Choose an option";

  beforeEach(() => {
    cy.mount(
      <div data-test-id="Wrapper">
        <div data-test-id="OtherElement"></div>
        <DropdownSelectMenu
          labelText={labelText}
          options={options}
          appStateSetter={cy.stub().as("appStateSetter")}
        />
      </div>
    );
  });

  it("should render with a given set of options", () => {
    const dropdownSelect = cy.findByText(labelText);

    dropdownSelect.should("exist");
  });

  it("should open the dropdown menu when the menuToggle is clicked", () => {
    const dropdownOptionsContainer = cy.findByTestId(
      "DropdownOptionsContainer"
    );
    dropdownOptionsContainer.should("not.exist");

    const menuToggle = cy.findByTestId("DropdownSelectMenuToggle");
    menuToggle.should("exist");

    menuToggle.click();
    dropdownOptionsContainer.should("exist");
  });

  it("should close on click outside", () => {
    // open the menu
    const menuToggle = cy.findByTestId("DropdownSelectMenuToggle");
    menuToggle.should("exist");
    menuToggle.click();
    // test close on click outside
    const otherEl = cy.findByTestId("OtherElement");

    otherEl.click({ force: true });
    const dropdownOptionsContainer = cy.findByTestId(
      "DropdownOptionsContainer"
    );

    dropdownOptionsContainer.should("not.exist");
  });

  it("should close when an option is clicked", () => {
    // open the menu
    const menuToggle = cy.findByTestId("DropdownSelectMenuToggle");
    menuToggle.should("exist");
    menuToggle.click().then(() => {
      cy.findByTestId("DropdownOptionsContainer").should("exist");

      const menuOption = cy.contains(options[2].label);
      menuOption.should("exist");

      menuOption.click();
      cy.get("@appStateSetter").should("have.been.called");
      cy.findByTestId("DropdownOptionsContainer").should("not.exist");
    });
  });
});
