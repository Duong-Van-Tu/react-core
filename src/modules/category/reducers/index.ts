import { combineReducers } from '@reduxjs/toolkit';
import customer, { customerInitialState } from './slicers/customer.slice';
import humanResources, {
  humanResourcesCategoryInitialState,
} from './slicers/human-resources.slice';

import supplier, { supplierInitialState } from './slicers/supplier.slice';
import sevice, { serviceInitialState } from './slicers/service.slice';
import relationshipLv, { relationshipLvInitialState } from './slicers/relationshipLv.slice';
import questionGain, { questionGainInitialState } from './slicers/question-gain.slice';
import contract, { contractInitialState } from './slicers/contract.slice';

export type RawRootState = typeof categoryState;

export const categoryInitialStates = {
  customerInitialState,
  humanResourcesCategoryInitialState,
  supplierInitialState,
  serviceInitialState,
  relationshipLvInitialState,
  questionGainInitialState,
  contractInitialState,
};
export const categoryState = {
  customer,
  humanResources,
  supplier,
  sevice,
  relationshipLv,
  questionGain,
  contract,
};
const categoryReducer = combineReducers(categoryState);
export type CategoryState = ReturnType<typeof categoryReducer>;
export default categoryReducer;
