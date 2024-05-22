import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IncomeState = {
  data: DataIncomeType[];
  dataRoleUser?: DataIncomTypeWithRoleUser[];
  dataRoleAdmin?: DataIncomTypeWithRoleAdmin[];
  pagination?: PaginationAPI;
  totalExtend?: number;
};

export const incomeInitialState: IncomeState = {
  data: [],
  dataRoleUser: [],
  dataRoleAdmin: [],
};

const slice = createSlice({
  name: 'income',
  initialState: incomeInitialState,
  reducers: {
    setListIncomeAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataIncomeType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    setListIncomeActionWithRoleAdmin(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataIncomTypeWithRoleAdmin[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.dataRoleAdmin = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    setListIncomeActionWithRoleUser(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataIncomTypeWithRoleUser[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.dataRoleUser = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
  },
});

export const {
  setListIncomeAction,
  setListIncomeActionWithRoleUser,
  setListIncomeActionWithRoleAdmin,
} = slice.actions;
export default slice.reducer;
