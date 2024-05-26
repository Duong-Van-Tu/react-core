import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type KPIState = {
  data: DataKPIType[];
  pagination: PaginationAPI;
  report?: DataKPIType;
  status?: KPIStatus[];
  totalExtend?: number;
};

export const kpiInitialState: KPIState = {
  data: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
    pageSize: Pagination.PAGESIZE,
  },
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
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    addKPIAction(state, { payload }: PayloadAction<DataKPIType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        pageSize: state.pagination.pageSize + 1,
        totalRecords: state.pagination.totalRecords + 1,
      };
    },
    updateKPIAction(state, { payload }: PayloadAction<DataKPIType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },
    deleteKPIAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },
    setDataReportAction(state, { payload }: PayloadAction<DataKPIType>) {
      state.report = payload;
    },
    setDataStatusAction(state, { payload }: PayloadAction<KPIStatus[]>) {
      state.status = payload;
    },
  },
});

export const {
  setListKPIAction,
  addKPIAction,
  updateKPIAction,
  deleteKPIAction,
  setDataReportAction,
  setDataStatusAction,
} = slice.actions;
export default slice.reducer;
