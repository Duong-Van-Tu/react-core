import { combineReducers } from '@reduxjs/toolkit';
import humanResources, {
  humanResourcesCategoryInitialState,
} from './slicers/human.resources.slice';

export type RawRootState = typeof userState;
export const usersInitialStates = {
  humanResourcesCategoryInitialState,
};
export const userState = {
  humanResources,
};

const userReducer = combineReducers(userState);
export type userState = ReturnType<typeof userReducer>;
export default userReducer;
