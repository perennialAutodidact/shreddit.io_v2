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

export type DropdownSelectOption<T> = {
  label: string;
  value: T;
};

export type DropdownSelectMenuProps<T> = {
  labelText: string;
  options: DropdownSelectOption<T>[];
  appStateSetter: (arg: T) => void;
};

const DropdownSelectMenu = <T,>({
  labelText,
  options,
  appStateSetter,
}: React.PropsWithChildren<DropdownSelectMenuProps<T>>) => {
  const ref = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useContext(BreakpointContext);

  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const [showOptions, setShowOptions] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<DropdownSelectOption<T>>(
    options[0]
  );

  const toggleShowOptions = () => {
    setShowOptions((showOptions) => !showOptions);
  };

  const handleOptionClick = (option: DropdownSelectOption<T>) => {
    setSelectedOption(option);
    appStateSetter(option.value);
    toggleShowOptions();
  };

  const clickOutsideHandler = useCallback(() => {
    if (showOptions) {
      setShowOptions(false);
    }
  }, [showOptions]);
  useOnClickOutside([ref], clickOutsideHandler);

  useEffect(() => {
    if (isMobile && showOptions && optionsRef.current && ref.current) {
      const left = ref.current?.getBoundingClientRect().left;
      const xOffset = 20;
      optionsRef.current.style.width = `${windowWidth - xOffset}px`;
      optionsRef.current.style.left = `-${left - xOffset / 2}px`;
    }
  }, [showOptions, windowWidth]);

  return (
    <div
      className={`
        ${styles.dropdownSelectMenu}
        position-relative
        d-flex flex-column
      `}
      ref={ref}
    >
      <div className={`fw-bold`}>{labelText}</div>
      <div
        className={`
            ${styles.menuToggle}
            ${showOptions ? "border-info" : ""}
            p-2 
            rounded shadow
            fw-bolder
        `}
        onClick={toggleShowOptions}
        data-testid="DropdownSelectMenuToggle"
      >
        {selectedOption.label}
      </div>
      {showOptions ? (
        <div
          className={`
            ${styles.optionsContainer}
            mt-1
            bg-light
            border border-dark
            rounded shadow
            position-absolute
            top-100
            d-flex flex-wrap justify-content-center
          `}
          data-testid="DropdownOptionsContainer"
          ref={optionsRef}
        >
          {options.map((option: any) => (
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
    </div>
  );
};

export default DropdownSelectMenu;
