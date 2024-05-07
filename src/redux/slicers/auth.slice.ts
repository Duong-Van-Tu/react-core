import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from '@/utils/common';

export type AuthState = {
  data: UserProfile | null;
  token?: string | null;
  isFetchedProfile: boolean;
};

export const authInitialState: AuthState = {
  data: null,
  token: getToken(),
  isFetchedProfile: false,
};

const slice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    clearAuthDataAction(state) {
      state.data = null;
      state.token = null;
      state.isFetchedProfile = false;
    },
    setDataAndTokenAction(
      state,
      { payload }: PayloadAction<{ data?: UserProfile | null; token?: string | null }>,
    ) {
      for (const field of Object.keys(payload) as ('data' | 'token')[]) {
        state[field] = payload[field] as any;
      }
    },
    setFetchProfileStatusAction(state, { payload }: PayloadAction<boolean>) {
      state.isFetchedProfile = payload;
    },
  },
});

export const { clearAuthDataAction, setDataAndTokenAction, setFetchProfileStatusAction } =
  slice.actions;
export default slice.reducer;
