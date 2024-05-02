import { Dispatch } from 'react';
import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// import logger from "redux-logger";
import { configureStore } from '@reduxjs/toolkit';

import rootReducer, { RootState } from './root-reducers';

const initStore = (preloadedState: Partial<RootState> = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const middleware = [...getDefaultMiddleware()];
      if (process.env.NODE_ENV !== 'production') {
        // middleware.push(logger);
      }
      return middleware;
    },
    preloadedState,
  });

  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('./root-reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
};

export const reduxStore = initStore();

export type Store = ReturnType<typeof initStore>;

export type AppDispatch = ThunkDispatch<any, null, AnyAction> &
  ThunkDispatch<any, undefined, AnyAction> &
  Dispatch<AnyAction>;

export type AppThunk<T = any> = ThunkAction<Promise<T>, RootState, unknown, Action<string>>;
