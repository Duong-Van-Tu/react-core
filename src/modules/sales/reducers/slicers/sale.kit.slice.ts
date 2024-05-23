import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SaleKitState = {
  data: DataSaleKitType[];
  dataSaleKitRole: DataSaleKitRoleType[];
  dataRole: RoleType[];
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
      }>,
    ) {
      state.data = payload.data;
    },
    setListSaleKitActionRole(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataSaleKitRoleType[];
      }>,
    ) {
      state.dataSaleKitRole = payload.data;
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
