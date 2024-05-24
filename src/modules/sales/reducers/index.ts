import { combineReducers } from '@reduxjs/toolkit';
import kpi, { kpiInitialState } from './slicers/kpi.slice';
import opportunity, { opportunityInitialState } from './slicers/opportunity.slice';
import saleKit, { saleKitInitialState } from './slicers/sale-kit.slice';
import benefit, { benefitInitialState } from './slicers/benefit.slice';
import relationship, { relationshipInitialState } from './slicers/relationship.slice';

export type RawRootState = typeof saleState;
export const salesInitialStates = {
  kpiInitialState,
  opportunityInitialState,
  saleKitInitialState,
  benefitInitialState,
  relationshipInitialState,
};
export const saleState = {
  kpi,
  opportunity,
  saleKit,
  benefit,
  relationship,
};

const saleReducer = combineReducers(saleState);
export type SaleState = ReturnType<typeof saleReducer>;
export default saleReducer;
