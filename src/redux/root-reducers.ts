import { combineReducers } from '@reduxjs/toolkit';
import loading, { loadingInitialState } from './slicers/loading.slice';
import apiMessage, { apiMessageInitialState } from './slicers/api-message.slice';
import breadcrumb, { breadcrumbInitialState } from './slicers/breadcrumb.slice';

export type RawRootState = typeof rootState;
export const allInitialStates = {
  loadingInitialState,
  apiMessageInitialState,
  breadcrumbInitialState,
};
const rootState = {
  loading,
  apiMessage,
  breadcrumb,
};
const rootReducer = combineReducers(rootState);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
