import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SaleKitState = {
  data: DataSaleKitType[];
  dataSaleKitRole: DataSaleKitRoleType[];
  dataRole: RoleType[];
  pagination?: PaginationAPI;
  totalExtend?: number;
};

export const saleKitInitialState: SaleKitState = {
  data: [],
  dataRole: [],
  dataSaleKitRole: [],
};

const slice = createSlice({
  name: 'saleKit',
  initialState: saleKitInitialState,
  reducers: {
    setListSaleKitAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataSaleKitType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    setListSaleKitActionRole(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataSaleKitRoleType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.dataSaleKitRole = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    setListSaleKitRoleAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: RoleType[];
      }>,
    ) {
      state.dataRole = payload.data;
    },
  },
});

export const { setListSaleKitAction, setListSaleKitActionRole, setListSaleKitRoleAction } =
  slice.actions;
export default slice.reducer;
