import { useContext, useLayoutEffect, useCallback } from "react";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import React, { useRef } from "react";
import { useAppSelector } from "store/hooks";

const teoria = require("teoria");

const StringLabels = () => {
  const labelContainerRef = useRef<HTMLDivElement>(null);
  const stringLabelRefs = useRef<HTMLDivElement[] | null>([]);
  const {
    strings,
    dimensions: { fret, neck },
  } = useAppSelector((appState) => appState.instrument);
  const { isPortrait } = useContext(BreakpointContext);

  const addRef = useCallback((el: HTMLDivElement) => {
    if (stringLabelRefs.current) {
      stringLabelRefs.current.push(el);
    }
  }, []);

  useLayoutEffect(() => {
    if (labelContainerRef.current) {
      if (isPortrait) {
        labelContainerRef.current.style.width = "100%";
        labelContainerRef.current.style.height = `${neck.height * 0.1}px`;
      } else {
        labelContainerRef.current.style.height = `${neck.height * 1.1}px`;
      }
    }
    if (stringLabelRefs.current) {
      stringLabelRefs.current.forEach((stringLabel) => {
        if (stringLabel) {
          if (isPortrait) {
            stringLabel.style.width = `${fret.width}px`;
          } else {
            stringLabel.style.height = `${fret.height}px`;
            stringLabel.style.width = `${fret.width / 2}px`;
          }
        }
      });
    }
  }, [isPortrait, neck, fret]);

  return (
    <div
      className={`
        d-flex
        ${isPortrait ? "" : "flex-column"}
        flex-lg-column align-items-center justify-content-center
        text-center fs-4 fw-bolder
        bg-light bg-opacity-75
        rounded-start
      `}
      ref={labelContainerRef}
    >
      {strings.map((string) => (
        <div
          className="
            d-flex flex-column 
            justify-content-center
          "
          data-test-id="StringLabel"
          ref={addRef}
          key={string}
        >
          {teoria.note(string).name().toUpperCase()}
        </div>
      ))}
    </div>
  );
};
export default StringLabels;
