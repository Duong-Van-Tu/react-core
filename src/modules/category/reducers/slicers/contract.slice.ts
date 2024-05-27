import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ContractState = {
  data: DataContractType[];
  dataCustomer: DataContractCustomerType[];
  pagination: PaginationAPI;
  report?: DataContractType;
  totalExtend?: number;
};

export const contractInitialState: ContractState = {
  data: [],
  dataCustomer: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
    pageSize: Pagination.PAGESIZE,
  },
};

const slice = createSlice({
  name: 'contract',
  initialState: contractInitialState,
  reducers: {
    setListContractAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataContractType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    addContractAction(state, { payload }: PayloadAction<DataContractType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        pageSize: state.pagination.pageSize + 1,
        totalRecords: state.pagination.totalRecords + 1,
      };
    },

    updateContractAction(state, { payload }: PayloadAction<DataContractType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },

    deleteContractAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },

    setAllContractAction(
      state,
      { payload }: PayloadAction<{ dataCustomer: DataContractCustomerType[] }>,
    ) {
      state.dataCustomer = payload.dataCustomer;
    },
  },
});

export const {
  setListContractAction,
  addContractAction,
  updateContractAction,
  deleteContractAction,
  setAllContractAction,
} = slice.actions;
export default slice.reducer;
