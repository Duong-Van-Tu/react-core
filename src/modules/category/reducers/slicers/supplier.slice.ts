import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SupplierState = {
  data: DataSupplierType[];
  pagination: PaginationAPI;
  report?: DataSupplierType;
  totalExtend?: number;
};

export const supplierInitialState: SupplierState = {
  data: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
    pageSize: Pagination.PAGESIZE,
  },
};

const slice = createSlice({
  name: 'supplier',
  initialState: supplierInitialState,
  reducers: {
    setListSupplierAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataSupplierType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    addSupplierAction(state, { payload }: PayloadAction<DataSupplierType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        pageSize: state.pagination.pageSize + 1,
        totalRecords: state.pagination.totalRecords + 1,
      };
    },

    updateSupplierAction(state, { payload }: PayloadAction<DataSupplierType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },

    deleteSupplierAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },
    updateTotalRecordsSupplierAction: (state, action: PayloadAction<number>) => {
      state.pagination.totalRecords = action.payload;
    },
  },
});

export const {
  setListSupplierAction,
  addSupplierAction,
  deleteSupplierAction,
  updateSupplierAction,
  updateTotalRecordsSupplierAction,
} = slice.actions;
export default slice.reducer;
