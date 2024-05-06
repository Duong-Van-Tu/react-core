import { combineReducers } from '@reduxjs/toolkit';
import loading, { loadingInitialState } from './slicers/loading.slice';
import apiMessage, { apiMessageInitialState } from './slicers/api-message.slice';
import breadcrumb, { breadcrumbInitialState } from './slicers/breadcrumb.slice';
import locale, { localeInitialState } from './slicers/locale.slice';
import saleReducer from '@/modules/sales/reducers';

export type RawRootState = typeof rootState;
export const allInitialStates = {
  loadingInitialState,
  apiMessageInitialState,
  breadcrumbInitialState,
  localeInitialState,
};
const rootState = {
  loading,
  apiMessage,
  breadcrumb,
  locale,
  sale: saleReducer,
};
const rootReducer = combineReducers(rootState);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
