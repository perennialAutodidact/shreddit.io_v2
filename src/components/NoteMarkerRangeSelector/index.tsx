import {
  createRef,
  RefObject,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useAppSelector } from "store/hooks";

const NoteMarkerRangeSelector = () => {
  const { fretTotal, strings } = useAppSelector(
    (appState) => appState.instrument
  );

  const containerRef = createRef<HTMLDivElement>();
  const [cellRefs, setCellRefs] = useState<
    Array<RefObject<HTMLDivElement> | null>
  >([]);
  const [cellSize, setCellSize] = useState<number>(15);

  useEffect(() => {
    setCellRefs((cellRefs) =>
      Array(strings.length)
        .fill(null)
        .map((_, i) => cellRefs[i] || createRef())
    );
  }, [strings.length]);

  useEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      setCellSize(width / 2 / fretTotal);
    }
  }, [containerRef, fretTotal]);

  return (
    <div
      id="note-marker-range-selector"
      data-test-id="NoteMarkerRangeSelector"
      className="container"
      ref={containerRef}
    >
      {strings.map((string, i) => (
        <div className="d-flex justify-content-center" ref={cellRefs[i]}>
          {[...Array(fretTotal)].map((column, j) => (
            <div
              data-test-id="MarkerEnabled"
              className="bg-danger border"
              style={{ height: `${cellSize}px`, width: `${cellSize}px` }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NoteMarkerRangeSelector;
