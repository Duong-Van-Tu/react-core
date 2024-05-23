import { combineReducers } from '@reduxjs/toolkit';
import kpi, { kpiInitialState } from './slicers/kpi.slice';
import opportunity, { opportunityInitialState } from './slicers/opportunity.slice';
import saleKit, { saleKitInitialState } from './slicers/sale.kit.slice';

export type RawRootState = typeof saleState;
export const salesInitialStates = {
  kpiInitialState,
  opportunityInitialState,
  saleKitInitialState,
};
export const saleState = {
  kpi,
  opportunity,
  saleKit,
};

const saleReducer = combineReducers(saleState);
export type SaleState = ReturnType<typeof saleReducer>;
export default saleReducer;
