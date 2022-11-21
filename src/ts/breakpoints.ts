export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type BreakpointSizes = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type BreakpointState = {
  breakpoint: Breakpoint;
  isMobile: boolean;
  orientation: OrientationType;
  isPortrait: boolean;
};
