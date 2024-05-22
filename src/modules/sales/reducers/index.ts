import { combineReducers } from '@reduxjs/toolkit';
import kpi, { kpiInitialState } from './slicers/kpi.slice';
import opportunity, { opportunityInitialState } from './slicers/opportunity.slice';
import benefit, { benefitInitialState } from './slicers/benefit.slice';

export type RawRootState = typeof saleState;
export const salesInitialStates = {
  kpiInitialState,
  opportunityInitialState,
  benefitInitialState,
};
export const saleState = {
  kpi,
  opportunity,
  benefit,
};

const saleReducer = combineReducers(saleState);
export type SaleState = ReturnType<typeof saleReducer>;
export default saleReducer;
