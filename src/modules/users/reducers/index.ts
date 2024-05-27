import { combineReducers } from '@reduxjs/toolkit';
import humanResources, { humanResourcesInitialState } from './slicers/human-resources.slice';
import income, { incomeInitialState } from './slicers/income.slice';
import organize, { organizeState } from './slicers/organize.slice';

export type RawRootState = typeof userState;
export const usersInitialStates = {
  humanResourcesInitialState,
  incomeInitialState,
  organizeState,
};
export const userState = {
  humanResources,
  income,
  organize,
};

const userReducer = combineReducers(userState);
export type userState = ReturnType<typeof userReducer>;
export default userReducer;
