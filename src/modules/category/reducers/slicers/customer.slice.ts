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
        totalRecords: state.pagination.totalRecords + 1,
        totalPages: Math.ceil((state.pagination.totalRecords + 1) / Pagination.PAGESIZE),
      };
    },

    deleteCustomerAction(state, { payload }: PayloadAction<string>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },
  },
});

export const { setListCustomerAction, addCustomerAction, deleteCustomerAction } = slice.actions;
export default slice.reducer;
