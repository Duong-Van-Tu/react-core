import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QeustionGainState = {
  data: DataQuestionGainsType[];
  pagination: PaginationAPI;
  report?: DataQuestionGainsType;
  totalExtend?: number;
};

export const questionGainInitialState: QeustionGainState = {
  data: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
  },
};

const slice = createSlice({
  name: 'questionGain',
  initialState: questionGainInitialState,
  reducers: {
    setListQuestionGainAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataQuestionGainsType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    addQuestionGainAction(state, { payload }: PayloadAction<DataQuestionGainsType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        totalRecords: state.pagination.totalRecords + 1,
        totalPages: Math.ceil((state.pagination.totalRecords + 1) / Pagination.PAGESIZE),
      };
    },

    updateQuestionGainAction(state, { payload }: PayloadAction<DataQuestionGainsType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },

    deleteQuestionGainAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },
  },
});

export const {
  setListQuestionGainAction,
  addQuestionGainAction,
  updateQuestionGainAction,
  deleteQuestionGainAction,
} = slice.actions;
export default slice.reducer;
