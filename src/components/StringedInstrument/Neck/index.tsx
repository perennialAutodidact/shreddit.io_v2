import React from "react";
import styles from "./Neck.module.scss";

interface NeckProps {
  children: React.ReactNode;
}

const Neck: React.FC<NeckProps> = ({ children }: NeckProps) => {
  return <div className={`border border-danger d-flex gap-3 ${styles.neck}`} id="instrument-neck">{children}</div>;
};

export default Neck;
