import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTenant, getToken } from '@/utils/common';

export type AuthState = {
  user: UserProfile | null;
  token?: string | null;
  tenant?: string | null;
};

export const authInitialState: AuthState = {
  user: null,
  token: getToken(),
  tenant: getTenant(),
};

const slice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    clearAuthDataAction(state) {
      state.user = null;
      state.token = null;
      state.tenant = null;
    },
    setDataAndTokenAction(
      state,
      { payload }: PayloadAction<{ user?: UserProfile | null; token?: string | null }>,
    ) {
      for (const field of Object.keys(payload) as ('user' | 'token')[]) {
        state[field] = payload[field] as any;
      }
    },
  },
});

export const { clearAuthDataAction, setDataAndTokenAction } = slice.actions;
export default slice.reducer;
