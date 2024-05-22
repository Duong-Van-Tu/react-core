import { combineReducers } from '@reduxjs/toolkit';
import customer, { customerInitialState } from './slicers/customer.slice';
export type RawRootState = typeof categoryState;

export const categoryInitialStates = {
  customerInitialState,
};
export const categoryState = {
  customer,
};
const categoryReducer = combineReducers(categoryState);
export type CategoryState = ReturnType<typeof categoryReducer>;
export default categoryReducer;
