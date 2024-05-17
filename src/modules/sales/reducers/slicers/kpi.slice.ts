import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type KPIState = {
  data: DataKPIType[];
  pagination?: PaginationAPI;
  report?: DataKPIType;
};

export const kpiInitialState: KPIState = {
  data: [],
};

const slice = createSlice({
  name: 'kpi',
  initialState: kpiInitialState,
  reducers: {
    setListKPIAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataKPIType[];
        pagination: PaginationAPI;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
    },
    addKPIAction(state, { payload }: PayloadAction<DataKPIType>) {
      state.data = [payload, ...state.data];
    },
    updateKPIAction(state, { payload }: PayloadAction<DataKPIType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },
    deleteKPIAction(state, { payload }: PayloadAction<string>) {
      state.data = state.data.filter((item) => item.id !== payload);
    },
    setDataReportAction(state, { payload }: PayloadAction<DataKPIType>) {
      state.report = payload;
    },
  },
});

export const {
  setListKPIAction,
  addKPIAction,
  updateKPIAction,
  deleteKPIAction,
  setDataReportAction,
} = slice.actions;
export default slice.reducer;
