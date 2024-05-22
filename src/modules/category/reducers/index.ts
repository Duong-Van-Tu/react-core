import { combineReducers } from '@reduxjs/toolkit';
import customer, { customerInitialState } from './slicers/customer.slice';
import humanResources, {
  humanResourcesCategoryInitialState,
} from './slicers/human.resources.slice';
export type RawRootState = typeof categoryState;

export const categoryInitialStates = {
  customerInitialState,
  humanResourcesCategoryInitialState,
};
export const categoryState = {
  customer,
  humanResources,
};
const categoryReducer = combineReducers(categoryState);
export type CategoryState = ReturnType<typeof categoryReducer>;
export default categoryReducer;
