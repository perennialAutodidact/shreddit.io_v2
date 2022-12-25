import { MusicKeys, ScaleName } from "ts/musicTheory";
import { ScaleData } from "ts/musicTheory";

const teoria = require("teoria");

export const getScaleData = (
  key: keyof MusicKeys,
  scaleName: ScaleName
): ScaleData => ({
  name: scaleName,
  intervals: teoria.note(key).scale(scaleName).scale,
  notes: teoria.note(key).scale(scaleName).simple(),
});
