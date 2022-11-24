import { tunings } from "common/constants/stringedInstruments";
import {
  TuningName,
  StringedInstrumentName,
  GuitarTuningName,
  MandolinTuningName,
  UkuleleTuningName,
  BassTuningName,
} from "ts/stringedInstrument";
import { Note } from "ts/musicTheory";

export const getTuning = (
  instrumentType: StringedInstrumentName,
  tuningName: TuningName
): Note[] =>
  instrumentType === "guitar"
    ? tunings[instrumentType][tuningName as GuitarTuningName]
    : instrumentType === "mandolin"
    ? tunings["mandolin"][tuningName as MandolinTuningName]
    : instrumentType === "ukulele"
    ? tunings["ukulele"][tuningName as UkuleleTuningName]
    : tunings["bass"][tuningName as BassTuningName];
