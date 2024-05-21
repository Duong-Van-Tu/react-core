import { combineReducers } from '@reduxjs/toolkit';
import humanResources, { humanResourcesInitialState } from './slicers/human.resources.slice';

export type RawRootState = typeof userState;
export const usersInitialStates = {
  humanResourcesInitialState,
};
export const userState = {
  humanResources,
};

const userReducer = combineReducers(userState);
export type userState = ReturnType<typeof userReducer>;
export default userReducer;
