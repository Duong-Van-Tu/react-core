import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BenefitInitialStateState = {
  data: DataBenefitType[];
  pagination: PaginationAPI;
  detail?: DataBenefitType;
  status?: BenefitStatus[];
  totalExtend?: number;
  saleAndSupplier?: SaleAndSupplier[];
  users?: UserBenefit[];
};

export const benefitInitialState: BenefitInitialStateState = {
  data: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
    pageSize: Pagination.PAGESIZE,
  },
};

const slice = createSlice({
  name: 'benefit',
  initialState: benefitInitialState,
  reducers: {
    setListBenefitAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataBenefitType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    addBenefitAction(state, { payload }: PayloadAction<DataBenefitType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        pageSize: state.pagination.pageSize + 1,
        totalRecords: state.pagination.totalRecords + 1,
      };
    },
    updateBenefitAction(state, { payload }: PayloadAction<DataBenefitType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },
    deleteBenefitAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },

    setDataStatusAction(state, { payload }: PayloadAction<BenefitStatus[]>) {
      state.status = payload;
    },

    setDataBenefitDetailAction(state, { payload }: PayloadAction<DataBenefitType>) {
      state.detail = payload;
    },
    setDataSaleAndSupplierAction(state, { payload }: PayloadAction<SaleAndSupplier[]>) {
      state.saleAndSupplier = payload;
    },
    setDataUserBenefitAction(state, { payload }: PayloadAction<UserBenefit[]>) {
      state.users = payload;
    },
  },
});

export const {
  setListBenefitAction,
  addBenefitAction,
  updateBenefitAction,
  deleteBenefitAction,
  setDataStatusAction,
  setDataBenefitDetailAction,
  setDataSaleAndSupplierAction,
  setDataUserBenefitAction,
} = slice.actions;
export default slice.reducer;
