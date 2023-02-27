import CSS from "csstype";

export type FretClasses =
  | "fret"
  | "fretOpen"
  | "fretFirst"
  | "fretFirstString"
  | "fretLast"
  | "fretLastString";

export type FretStyles = {
  portrait: {
    [key in FretClasses]: CSS.Properties;
  };
  landscape: {
    [key in FretClasses]: CSS.Properties;
  };
};

export const fretStyles: FretStyles = {
  portrait: {
    fret: {
      borderLeftStyle: "solid",
      borderLeftWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
    },
    fretOpen: {
      borderBottomStyle: "double",
      borderBottomWidth: "10px",
    },
    fretFirst: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
    },
    fretFirstString: {
      borderLeftStyle: "solid",
      borderLeftWidth: "1px",
    },
    fretLast: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
    },
    fretLastString: {
      borderRightStyle: "solid",
      borderRightWidth: "1px",
    },
  },
  landscape: {
    fret: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderRightStyle: "solid",
      borderRightWidth: "1px",
    },
    fretOpen: {
      borderRightStyle: "double",
      borderRightWidth: "10px",
    },
    fretFirst: {
      borderLeftStyle: "solid",
      borderLeftWidth: "1px",
    },
    fretFirstString: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
    },
    fretLast: {
      // borderRightStyle: "solid",
      // borderRightWidth: "1px",
      // borderTopStyle: "solid",
      // borderTopWidth: "1px",
    },
    fretLastString: {},
  },
};
