import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OpportunityInitialStateState = {
  data: DataOpportunityType[];
  history?: HistoryOpportunityType[];
  pagination: PaginationAPI;
  detail?: DataOpportunityType;
  status?: OpportunityStatus[];
  totalExtend?: number;
  saleAndSupplier?: SaleAndSupplier[];
};

export const opportunityInitialState: OpportunityInitialStateState = {
  data: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
    pageSize: Pagination.PAGESIZE,
  },
};

const slice = createSlice({
  name: 'opportunity',
  initialState: opportunityInitialState,
  reducers: {
    setListOpportunityAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataOpportunityType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    addOpportunityAction(state, { payload }: PayloadAction<DataOpportunityType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        pageSize: state.pagination.pageSize + 1,
        totalRecords: state.pagination.totalRecords + 1,
      };
    },
    updateOpportunityAction(state, { payload }: PayloadAction<DataOpportunityType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },
    deleteOpportunityAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },

    setDataStatusAction(state, { payload }: PayloadAction<OpportunityStatus[]>) {
      state.status = payload;
    },

    setDataOpportunityDetailAction(state, { payload }: PayloadAction<DataOpportunityType>) {
      state.detail = payload;
    },
    setDataSaleAndSupplierAction(state, { payload }: PayloadAction<SaleAndSupplier[]>) {
      state.saleAndSupplier = payload;
    },

    setListHistoryOpportunityAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: HistoryOpportunityType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.history = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },

    addHistoryOpportunityAction(state, { payload }: PayloadAction<HistoryOpportunityType>) {
      state.history = state.history ? [payload, ...state.history] : [payload];
      state.pagination = {
        ...state.pagination,
        pageSize: state.pagination.pageSize + 1,
        totalRecords: state.pagination.totalRecords + 1,
      };
    },
  },
});

export const {
  setListOpportunityAction,
  addOpportunityAction,
  updateOpportunityAction,
  deleteOpportunityAction,
  setDataStatusAction,
  setDataOpportunityDetailAction,
  setDataSaleAndSupplierAction,
  setListHistoryOpportunityAction,
  addHistoryOpportunityAction,
} = slice.actions;
export default slice.reducer;
