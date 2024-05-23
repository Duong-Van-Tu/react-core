import { combineReducers } from '@reduxjs/toolkit';
import kpi, { kpiInitialState } from './slicers/kpi.slice';
import opportunity, { opportunityInitialState } from './slicers/opportunity.slice';
import saleKit, { saleKitInitialState } from './slicers/sale.kit.slice';
import benefit, { benefitInitialState } from './slicers/benefit.slice';

export type RawRootState = typeof saleState;
export const salesInitialStates = {
  kpiInitialState,
  opportunityInitialState,
  saleKitInitialState,
  benefitInitialState,
};
export const saleState = {
  kpi,
  opportunity,
  saleKit,
  benefit,
};

const saleReducer = combineReducers(saleState);
export type SaleState = ReturnType<typeof saleReducer>;
export default saleReducer;
