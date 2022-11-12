import React, { useRef, useMemo, useContext, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { setInstrumentDimensions } from "store/stringedInstrumentSlice";
import { BreakpointState } from "ts/breakpoints";
import { BreakpointContext } from "common/components/BreakpointProvider/context";
import { useWindowSize } from "usehooks-ts";
import Neck from "./Neck";
import String from "./String";
import styles from "./StringedInstrument.module.scss";

const StringedInstrument: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { strings } = useAppSelector((appState) => appState.instrument);
  const instrumentRef = useRef<HTMLDivElement>(null);
  const { breakpoint } = useContext<BreakpointState>(BreakpointContext);
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  // const instrumentHeight = useMemo<number>(
  //   () => (breakpoint === "sm" ? windowHeight * 0.75 : windowHeight * 0.5),
  //   [breakpoint, windowHeight]
  // );
  // const instrumentWidth = useMemo<number>(
  //   () => (breakpoint === "sm" ? windowWidth * 0.9 : windowWidth * 0.8),
  //   [breakpoint, windowWidth]
  // );

  useEffect(() => {
    if (instrumentRef.current) {
      let { height, width } = instrumentRef.current.getBoundingClientRect();

      appDispatch(
        setInstrumentDimensions({
          neck: {
            height,
            width,
          },
        })
      );
    }
  }, [appDispatch]);

  return (
    <div
      className={`container p-0 ${styles.stringedInstrument}`}
      id="instrument-container"
      ref={instrumentRef}
    >
      <Neck>
        {strings.map((rootNote) => (
          <String rootNote={rootNote} key={rootNote} />
        ))}
      </Neck>
    </div>
  );
};

export default StringedInstrument;
