import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BreadcrumbItem = {
  title: {
    vi_VN: string;
    en_US: string;
  };
  link?: string;
};
export type BreadcrumbState = {
  items: BreadcrumbItem[];
};

export const breadcrumbInitialState: BreadcrumbState = {
  items: [],
};

const slice = createSlice({
  name: 'breadcrumb',
  initialState: breadcrumbInitialState,
  reducers: {
    setBreadcrumbItemsAction(state, { payload }: PayloadAction<BreadcrumbItem[]>) {
      state.items = payload;
    },
  },
});

export const { setBreadcrumbItemsAction } = slice.actions;
export default slice.reducer;
