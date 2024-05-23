import { combineReducers } from '@reduxjs/toolkit';
import customer, { customerInitialState } from './slicers/customer.slice';
import humanResources, {
  humanResourcesCategoryInitialState,
} from './slicers/human.resources.slice';
import supplier, { supplierInitialState } from './slicers/supplier.slice';
import sevice, { serviceInitialState } from './slicers/service.slice';

export type RawRootState = typeof categoryState;

export const categoryInitialStates = {
  customerInitialState,
  humanResourcesCategoryInitialState,
  supplierInitialState,
  serviceInitialState,
};
export const categoryState = {
  customer,
  humanResources,
  supplier,
  sevice,
};
const categoryReducer = combineReducers(categoryState);
export type CategoryState = ReturnType<typeof categoryReducer>;
export default categoryReducer;
