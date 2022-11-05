import React from "react";
import styles from "./NoteMarker.module.scss";

type NoteMarkerProps = {
  showMarker: boolean;
};

const NoteMarker = ({ showMarker }: NoteMarkerProps) => {
  return (
    <div
      className={`rounded-circle border-dark border-3 ${styles.noteMarker}`}
    ></div>
  );
};

export default NoteMarker;
