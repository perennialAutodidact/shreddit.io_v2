import { createRef, RefObject, useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";
import { FretNumber, StringNumber } from "ts/stringedInstrument";

const NoteMarkerRangeSelector = () => {
  const { fretTotal, strings } = useAppSelector(
    (appState) => appState.instrument
  );

  const containerRef = createRef<HTMLDivElement>();

  type GridKey = `${StringNumber}_${FretNumber}`;
  type Grid = {
    [key in GridKey]: Cell;
  };
  type Cell = {
    string: StringNumber;
    fret: FretNumber;
    ref: RefObject<HTMLDivElement>;
    enabled: boolean;
  };

  const generateGrid = (): Grid => {
    const items = [...Array(strings.length)].flatMap((_, string) =>
      [...Array(fretTotal + 1)].map((_, fret) => [
        `${string}_${fret}`,
        {
          string,
          fret,
          enabled: true,
        },
      ])
    );

    const grid = Object.fromEntries(items);
    return grid;
  };

  const [grid, setGrid] = useState<Grid>(generateGrid());

  const [cellSize, setCellSize] = useState<number>(15);

  const rows = [...Array(strings.length)];
  const cols = [...Array(fretTotal)];

  const toggleCell = (string: StringNumber, fret: FretNumber) => {
    const key = `${string}_${fret}` as GridKey;
    const cell = grid[key];
    setGrid({ ...grid, [key]: { ...cell, enabled: !cell.enabled } });
  };

  const getCell = (string: StringNumber, fret: FretNumber): Cell =>
    grid[`${string}_${fret}` as GridKey];

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
      className="container mt-4"
      ref={containerRef}
    >
      {rows.map((_, i) => {
        const row = i as StringNumber;
        return (
          <div key={row} className="d-flex justify-content-center">
            {cols.map((_, j) => {
              const col = j as FretNumber;
              const cell = getCell(row, col);
              return (
                <div
                  key={col}
                  data-test-id="MarkerEnabled"
                  className={`
                    cell_${
                      cell.enabled
                        ? "enabled bg-success"
                        : "disabled bg-secondary"
                    }
                    border
                  `}
                  style={{ height: `${cellSize}px`, width: `${cellSize}px` }}
                  onClick={() => toggleCell(row, col)}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default NoteMarkerRangeSelector;
