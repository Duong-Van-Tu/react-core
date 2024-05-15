import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type KPIState = {
  data: DataKPIType[];
};

export const kpiInitialState: KPIState = {
  data: [],
};

const slice = createSlice({
  name: 'kpi',
  initialState: kpiInitialState,
  reducers: {
    setListKPI(state, { payload }: PayloadAction<DataKPIType[]>) {
      state.data = payload;
    },
    addKPIAction(state, { payload }: PayloadAction<DataKPIType>) {
      state.data = [payload, ...state.data];
    },
  },
});

export const { setListKPI, addKPIAction } = slice.actions;
export default slice.reducer;
