import { useEffect } from "react";

export const useOnKeyUp = (
  targetKey: globalThis.KeyboardEvent["key"],
  callback: () => void
) => {
  useEffect(() => {
    const handleKeyUp = (e: globalThis.KeyboardEvent) => {
      if (e.key === targetKey) {
        callback();
      }
    };
    document.addEventListener("keydown", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [callback, targetKey]);
};
