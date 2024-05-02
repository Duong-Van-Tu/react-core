import { combineReducers } from "@reduxjs/toolkit";
import loading, { loadingInitialState } from "./slicers/loading.slice";
import apiMessage, {
  apiMessageInitialState,
} from "./slicers/api-message.slice";

export type RawRootState = typeof rootState;
export const allInitialStates = {
  loadingInitialState,
  apiMessageInitialState,
};
const rootState = {
  loading,
  apiMessage,
};
const rootReducer = combineReducers(rootState);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
