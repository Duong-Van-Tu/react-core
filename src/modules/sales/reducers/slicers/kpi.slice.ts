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
    setListKPIAction(state, { payload }: PayloadAction<DataKPIType[]>) {
      state.data = payload;
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
    deleteKPIAction(state, { payload }: PayloadAction<number>) {
      state.data = state.data.filter((item) => item.id !== payload);
    },
  },
});

export const { setListKPIAction, addKPIAction, updateKPIAction, deleteKPIAction } = slice.actions;
export default slice.reducer;
