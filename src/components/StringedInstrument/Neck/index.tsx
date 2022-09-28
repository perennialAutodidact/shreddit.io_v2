import React from "react";
import styles from "./Neck.module.scss";
interface NeckProps {
  children: React.ReactNode[];
}

const Neck: React.FC<NeckProps> = ({ children }: NeckProps) => {
  return <div className={styles.neck}></div>;
};

export default Neck;
