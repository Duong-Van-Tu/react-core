import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CustomerState = {
  data: DataCustomerType[];
  pagination: PaginationAPI;
  report?: DataCustomerType;
  totalExtend?: number;
};

export const customerInitialState: CustomerState = {
  data: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
    pageSize: Pagination.PAGESIZE,
  },
};

const slice = createSlice({
  name: 'customer',
  initialState: customerInitialState,
  reducers: {
    setListCustomerAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataCustomerType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    addCustomerAction(state, { payload }: PayloadAction<DataCustomerType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        pageSize: state.pagination.pageSize ?? Pagination.PAGESIZE + 1,
        totalRecords: state.pagination.totalRecords + 1,
      };
    },

    updateCustomerAction(state, { payload }: PayloadAction<DataCustomerType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },

    deleteCustomerAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },
  },
});

export const {
  setListCustomerAction,
  addCustomerAction,
  deleteCustomerAction,
  updateCustomerAction,
} = slice.actions;
export default slice.reducer;
