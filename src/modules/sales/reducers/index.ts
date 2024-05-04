import { combineReducers } from '@reduxjs/toolkit';
import example, { exampleInitialState } from './slicers/example.slice';

export type RawRootState = typeof saleState;
export const salesInitialStates = {
  exampleInitialState,
};
export const saleState = {
  example,
};

const saleReducer = combineReducers(saleState);
export type SaleState = ReturnType<typeof saleReducer>;
export default saleReducer;
