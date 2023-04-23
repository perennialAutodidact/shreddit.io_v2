import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { BreakpointContext } from "../BreakpointProvider/context";
import { useOnClickOutside } from "common/hooks/useOnClickOutside";
import { useWindowSize } from "usehooks-ts";
import styles from "./DropdownSelectMenu.module.scss";
import LoadingIndicator from "../LoadingIndicator";

export type DropdownSelectOption<T> = {
  label: string;
  value: T;
};

export type DropdownSelectMenuProps<T> = {
  labelText: string;
  defaultOption: DropdownSelectOption<T> | null;
  options: DropdownSelectOption<T>[];
  appStateSetter: (arg: T) => void;
};

const DropdownSelectMenu = <T,>({
  labelText,
  options,
  defaultOption,
  appStateSetter,
}: React.PropsWithChildren<DropdownSelectMenuProps<T>>) => {
  const ref = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const { isMobile, isPortrait } = useContext(BreakpointContext);

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const [showOptions, setShowOptions] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] =
    useState<DropdownSelectOption<T> | null>(defaultOption);

  const toggleShowOptions = () => {
    setShowOptions((showOptions) => !showOptions);
  };

  const handleOptionClick = (option: DropdownSelectOption<T>) => {
    appStateSetter(option.value);
    setSelectedOption(option);
    toggleShowOptions();
  };

  const clickOutsideHandler = useCallback(() => {
    if (showOptions) {
      setShowOptions(false);
    }
  }, [showOptions]);
  useOnClickOutside([ref], clickOutsideHandler);

  useEffect(() => {
    if (showOptions && optionsRef.current && ref.current) {
      const { left, top, width } = ref.current.getBoundingClientRect();
      const { height } = optionsRef.current.getBoundingClientRect();
      if (isMobile) {
        const xOffset = 20;
        optionsRef.current.style.width = `${windowWidth - xOffset}px`;
        optionsRef.current.style.left = `-${left - xOffset / 2}px`;
        optionsRef.current.style.top = `-${height - 20}px `;
      } else {
        optionsRef.current.style.width = `${width * 2}px`;
        optionsRef.current.style.top = `-${height - 20}px`;
      }
      console.log({ height });
    }
  }, [showOptions, windowWidth, isPortrait]);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  return (
    <div
      className={`
        ${styles.dropdownSelectMenu}
        position-relative
        d-flex flex-column
      `}
      ref={ref}
    >
      <label
        htmlFor={`${labelText.toLocaleLowerCase()}-dropdown`}
        className={`fw-bold mb-2`}
      >
        {labelText}
      </label>
      {showOptions ? (
        <div
          className={`
            ${styles.optionsContainer}
            mt-1
            bg-light
            border border-dark
            rounded shadow
            position-absolute
            d-flex flex-wrap justify-content-center
          `}
          data-test-id="DropdownOptionsContainer"
          ref={optionsRef}
        >
          {options.map((option) => (
            <div
              className={`${styles.menuOption} p-3`}
              onClick={() => handleOptionClick(option)}
              key={option.label}
            >
              {option.label}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      {!selectedOption ? (
        <LoadingIndicator />
      ) : (
        <div
          className={`
            ${styles.menuToggle}
            ${showOptions ? "border-info" : ""}
            p-2 
            rounded shadow
            fw-bolder
          `}
          onClick={toggleShowOptions}
          data-test-id="DropdownSelectMenuToggle"
        >
          {selectedOption.label}
        </div>
      )}
    </div>
  );
};

export default DropdownSelectMenu;
