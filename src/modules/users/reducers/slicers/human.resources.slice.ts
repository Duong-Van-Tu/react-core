import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HumanResourcesState = {
  item: DataHumanResourcesType;
  data: DataHumanResourcesType[];
  pagination?: PaginationAPI;
  totalExtend?: number;
};

export const humanResourcesInitialState: HumanResourcesState = {
  item: {},
  data: [],
};

const slice = createSlice({
  name: 'humanResources',
  initialState: humanResourcesInitialState,
  reducers: {
    setListHumanResourcesAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataHumanResourcesType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    setUserProfileAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataHumanResourcesType;
      }>,
    ) {
      state.item = payload.data;
    },
  },
});

export const { setListHumanResourcesAction, setUserProfileAction } = slice.actions;
export default slice.reducer;
