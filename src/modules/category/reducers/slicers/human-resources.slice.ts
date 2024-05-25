import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HumanResourcesState = {
  data: DataUserType[];
  pagination?: PaginationAPI;
  totalExtend?: number;
};

export const humanResourcesCategoryInitialState: HumanResourcesState = {
  data: [],
};

const slice = createSlice({
  name: 'humanResources',
  initialState: humanResourcesCategoryInitialState,
  reducers: {
    setListHumanResourcesAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataUserType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
  },
});

export const { setListHumanResourcesAction } = slice.actions;
export default slice.reducer;
