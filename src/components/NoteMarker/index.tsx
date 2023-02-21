import { useEffect, useRef } from "react";
import { Interval, NoteName } from "ts/musicTheory";
import styles from "./NoteMarker.module.scss";

type NoteMarkerProps = {
  interval: Interval | null;
  noteName: NoteName;
  size: number;
};

const NoteMarker = ({ noteName, interval, size }: NoteMarkerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && size) {
      ref.current.style.height = `${size}px`;
      ref.current.style.width = `${size}px`;
    }
  }, [size]);

  return (
    <div
      className={`
        rounded-circle
        shadow
        border border-dark border-2  
        position-absolute
        d-flex justify-content-center align-content-center
        bg-${interval}
        ${styles.noteMarker}
      `}
      ref={ref}
      data-test-id="NoteMarker"
    >
      {/* <span className="d-flex align-items-center">{noteName}</span> */}
    </div>
  );
};

export default NoteMarker;
