import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RelationshipState = {
  data: DataRelationshipType[];
  pagination: PaginationAPI;
  report?: DataRelationshipType;
  status?: RelationshipStatus[];
  totalExtend?: number;
};

export const relationshipInitialState: RelationshipState = {
  data: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
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
        totalRecords: state.pagination.totalRecords + 1,
        totalPages: Math.ceil((state.pagination.totalRecords + 1) / Pagination.PAGESIZE),
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
    setDataReportAction(state, { payload }: PayloadAction<DataRelationshipType>) {
      state.report = payload;
    },
    setDataStatusAction(state, { payload }: PayloadAction<RelationshipStatus[]>) {
      state.status = payload;
    },
  },
});

export const {
  setListRelationshipAction,
  addRelationshipAction,
  updateRelationshipAction,
  deleteRelationshipAction,
  setDataReportAction,
  setDataStatusAction,
} = slice.actions;
export default slice.reducer;
