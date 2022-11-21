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
  // stateSetter:
};

const DropdownSelectMenu = <T,>({
  labelText,
  options,
}: React.PropsWithChildren<DropdownSelectMenuProps<T>>) => {
  const ref = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useContext(BreakpointContext);

  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const [showOptions, setShowOptions] = useState<boolean>(false);

  const [value, setValue] = useState(options[0].label);

  const toggleShowOptions = () => {
    setShowOptions((showOptions) => !showOptions);
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
      const xOffset = 100;
      optionsRef.current.style.width = `${windowWidth - xOffset}px`;
      optionsRef.current.style.left = `-${left - xOffset / 2}px`;
    }
  }, [showOptions, windowWidth]);

  return (
    <div
      className={`
        ${styles.dropdownSelectMenu}
        p-2
        position-relative
        d-flex flex-column
      `}
      ref={ref}
    >
      <div className={`fw-bold`}>{labelText}</div>
      <div
        className={`
            ${styles.menuToggle}
            p-2 
            rounded shadow
            fw-bolder
        `}
        onClick={toggleShowOptions}
        data-testid="DropdownSelectMenuToggle"
      >
        {value}
      </div>
      {showOptions ? (
        <div
          className={`
            ${styles.optionsContainer}
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
            <div className={`${styles.menuOption} p-3`} key={option.label}>
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
