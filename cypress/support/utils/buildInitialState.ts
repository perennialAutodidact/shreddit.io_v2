import _ from "lodash";
import { initialState as rootState, RootState } from "store";
import { DeepPartial } from "@reduxjs/toolkit";

/**
 *
 * @param stateUpdates object of values to replace in initialState
 * @returns RootState object with desired replacement values
 */
export const buildInitialState = <T>(
  stateUpdates: DeepPartial<T>
): RootState => {
  const initialState = { ...rootState };
  return _.mergeWith({}, initialState, stateUpdates, (a, b) =>
    _.isArray(b) ? b : undefined
  );
};
