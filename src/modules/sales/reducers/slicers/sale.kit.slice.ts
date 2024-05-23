import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SaleKitState = {
  data: DataSaleKitType[];
};

export const saleKitInitialState: SaleKitState = {
  data: [],
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
  },
});

export const { setListSaleKitAction } = slice.actions;
export default slice.reducer;
