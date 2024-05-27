import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ServiceState = {
  data: DataServiceCategoryType[];
  pagination: PaginationAPI;
  report?: DataServiceCategoryType;
  totalExtend?: number;
};

export const serviceInitialState: ServiceState = {
  data: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
    pageSize: Pagination.PAGESIZE,
  },
};

const slice = createSlice({
  name: 'service',
  initialState: serviceInitialState,
  reducers: {
    setListServiceAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataServiceCategoryType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    addServiceAction(state, { payload }: PayloadAction<DataServiceCategoryType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        pageSize: state.pagination.pageSize + 1,
        totalRecords: state.pagination.totalRecords + 1,
      };
    },

    updateServiceAction(state, { payload }: PayloadAction<DataServiceCategoryType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },

    deleteServiceAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },
  },
});

export const { setListServiceAction, addServiceAction, deleteServiceAction, updateServiceAction } =
  slice.actions;
export default slice.reducer;
