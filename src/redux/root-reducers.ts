import { combineReducers } from '@reduxjs/toolkit';
import loading, { loadingInitialState } from './slicers/loading.slice';
import apiMessage, { apiMessageInitialState } from './slicers/api-message.slice';
import breadcrumb, { breadcrumbInitialState } from './slicers/breadcrumb.slice';
import locale, { localeInitialState } from './slicers/locale.slice';
import auth, { authInitialState } from './slicers/auth.slice';
import saleReducer from '@/modules/sales/reducers';
import categoryReducer from '@/modules/category/reducers';

export type RawRootState = typeof rootState;
export const allInitialStates = {
  loadingInitialState,
  apiMessageInitialState,
  breadcrumbInitialState,
  localeInitialState,
  authInitialState,
};
const rootState = {
  loading,
  apiMessage,
  breadcrumb,
  locale,
  auth,
  sale: saleReducer,
  category: categoryReducer,
};
const rootReducer = combineReducers(rootState);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
