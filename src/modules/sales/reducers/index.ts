import { combineReducers } from '@reduxjs/toolkit';
import kpi, { kpiInitialState } from './slicers/kpi.slice';

export type RawRootState = typeof saleState;
export const salesInitialStates = {
  kpiInitialState,
};
export const saleState = {
  kpi,
};

const saleReducer = combineReducers(saleState);
export type SaleState = ReturnType<typeof saleReducer>;
export default saleReducer;
