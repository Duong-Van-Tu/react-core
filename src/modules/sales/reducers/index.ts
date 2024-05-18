import { combineReducers } from '@reduxjs/toolkit';
import kpi, { kpiInitialState } from './slicers/kpi.slice';
import opportunity, { opportunityInitialState } from './slicers/opportunity.slice';

export type RawRootState = typeof saleState;
export const salesInitialStates = {
  kpiInitialState,
  opportunityInitialState,
};
export const saleState = {
  kpi,
  opportunity,
};

const saleReducer = combineReducers(saleState);
export type SaleState = ReturnType<typeof saleReducer>;
export default saleReducer;
