import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RelationshipState = {
  data: DataRelationshipType[];
  gains?: GainsRelationshipType;
  customer?: RelationshipCustomer[];
  level?: RelationshipLevel[];
  pagination: PaginationAPI;
  report?: DataRelationshipType;
  status?: RelationshipStatus[];
  totalExtend?: number;
  gainsQuestion?: RelationshipGainsQuestion[];
};

export const relationshipInitialState: RelationshipState = {
  data: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
    pageSize: Pagination.PAGESIZE,
  },
};

const slice = createSlice({
  name: 'relationship',
  initialState: relationshipInitialState,
  reducers: {
    setListRelationshipAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataRelationshipType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    addRelationshipAction(state, { payload }: PayloadAction<DataRelationshipType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        pageSize: state.pagination.pageSize + 1,
        totalRecords: state.pagination.totalRecords + 1,
      };
    },
    updateRelationshipAction(state, { payload }: PayloadAction<DataRelationshipType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },
    deleteRelationshipAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },

    setDataStatusAction(state, { payload }: PayloadAction<RelationshipStatus[]>) {
      state.status = payload;
    },

    setDataCustomerAction(state, { payload }: PayloadAction<RelationshipCustomer[]>) {
      state.customer = payload;
    },

    setDataLevelAction(state, { payload }: PayloadAction<RelationshipLevel[]>) {
      state.level = payload;
    },

    setDataGainsRelationshipDetailAction(state, { payload }: PayloadAction<GainsRelationshipType>) {
      state.gains = payload;
    },
    setDataRelationshipGainsQuestionAction(
      state,
      { payload }: PayloadAction<RelationshipGainsQuestion[]>,
    ) {
      state.gainsQuestion = payload;
    },
  },
});

export const {
  addRelationshipAction,
  deleteRelationshipAction,
  setDataStatusAction,
  setListRelationshipAction,
  updateRelationshipAction,
  setDataCustomerAction,
  setDataLevelAction,
  setDataGainsRelationshipDetailAction,
  setDataRelationshipGainsQuestionAction,
} = slice.actions;
export default slice.reducer;
