import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LocaleState = {
  language: Locale;
};

export const localeInitialState: LocaleState = {
  language: (localStorage.getItem('locale')! || 'en_US') as Locale,
};

const slice = createSlice({
  name: 'locale',
  initialState: localeInitialState,
  reducers: {
    setLocaleAction(state, { payload }: PayloadAction<Locale>) {
      state.language = payload;
      localStorage.setItem('locale', payload);
    },
  },
});

export const { setLocaleAction } = slice.actions;
export default slice.reducer;
