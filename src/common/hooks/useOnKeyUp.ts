import { KeyboardEvent, useEffect } from "react";

export const useOnKeyUp = (
  targetKey: globalThis.KeyboardEvent["key"],
  callback: () => void
) => {
  const handleKeyUp = (e: globalThis.KeyboardEvent) => {
    if (e.key === targetKey) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [callback]);
};
