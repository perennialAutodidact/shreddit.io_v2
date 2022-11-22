import { render, screen } from "common/utils/tests/setup";
import userEvent from "@testing-library/user-event";
import DropdownSelectMenu, {
  DropdownSelectOption,
} from "common/components/DropdownSelectMenu";

describe("<DropdownSelectMenu/>", () => {
  it("should render with a given set of options", () => {
    const options = [
      { label: "Option 1", value: "value1" },
      { label: "Option 2", value: "value2" },
      { label: "Option 3", value: "value3" },
    ];
    const labelText = "Choose an option";
    const appStateSetter = jest.fn();

    render(
      <DropdownSelectMenu
        labelText={labelText}
        options={options}
        appStateSetter={appStateSetter}
      />
    );

    const dropdownSelect = screen.getByText(labelText);

    expect(dropdownSelect).toBeInTheDocument();
  });

  it("should open the dropdown menu when the menuToggle is clicked", async () => {
    const user = userEvent.setup();
    const options = [
      { label: "Option 1", value: "value1" },
      { label: "Option 2", value: "value2" },
      { label: "Option 3", value: "value3" },
    ];
    const labelText = "Choose an option";
    const appStateSetter = jest.fn();

    render(
      <div data-testid="Wrapper">
        <DropdownSelectMenu
          labelText={labelText}
          options={options}
          appStateSetter={appStateSetter}
        />
      </div>
    );
    const dropdownOptionsContainer = screen.queryByTestId(
      "DropdownOptionsContainer"
    );

    expect(dropdownOptionsContainer).toBe(null);

    const menuToggle = screen.getByTestId("DropdownSelectMenuToggle");

    await user.click(menuToggle);

    expect(
      await screen.findByTestId("DropdownOptionsContainer")
    ).toBeInTheDocument();

    const wrapper = screen.getByTestId("Wrapper");

    await user.click(wrapper);

    expect(await screen.queryByTestId("DropdownOptionsContainer")).toBe(null);
  });
});
