import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IncomeState = {
  data: DataIncomeType[];
  dataRoleUser?: DataIncomTypeWithRoleUserType[];
  dataRoleAdmin?: DataIncomTypeWithRoleAdminType[];
  dataDetailIncome: DataIncomeDetailType[];
  pagination?: PaginationAPI;
  totalExtend?: number;
};

export const incomeInitialState: IncomeState = {
  data: [],
  dataRoleUser: [],
  dataRoleAdmin: [],
  dataDetailIncome: [],
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
        data: DataIncomTypeWithRoleAdminType[];
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
        data: DataIncomTypeWithRoleUserType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.dataRoleUser = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    setListIncomeDetail(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataIncomeDetailType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.dataDetailIncome = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
  },
});

export const {
  setListIncomeAction,
  setListIncomeActionWithRoleUser,
  setListIncomeActionWithRoleAdmin,
  setListIncomeDetail,
} = slice.actions;
export default slice.reducer;
