import { combineReducers } from '@reduxjs/toolkit';
import humanResources, { humanResourcesInitialState } from './slicers/human-resources.slice';
import income, { incomeInitialState } from './slicers/income.slice';

export type RawRootState = typeof userState;
export const usersInitialStates = {
  humanResourcesInitialState,
  incomeInitialState,
};
export const userState = {
  humanResources,
  income,
};

const userReducer = combineReducers(userState);
export type userState = ReturnType<typeof userReducer>;
export default userReducer;
