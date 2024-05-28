import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrganizeState = {
  dataTabs: TabOrganizeType[];
  pagination?: PaginationAPI;
  totalExtend?: number;
};

export const organizeState: OrganizeState = {
  dataTabs: [],
};

const slice = createSlice({
  name: 'organize',
  initialState: organizeState,
  reducers: {
    setListTabOrganizeAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: TabOrganizeType[];
      }>,
    ) {
      state.dataTabs = payload.data;
    },
  },
});

export const { setListTabOrganizeAction } = slice.actions;
export default slice.reducer;
