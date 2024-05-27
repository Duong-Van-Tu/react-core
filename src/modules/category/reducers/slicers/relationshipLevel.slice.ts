import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RelationshipLevelState = {
  data: DataReationshipLevelType[];
  pagination: PaginationAPI;
  report?: DataReationshipLevelType;
  totalExtend?: number;
};

export const relationshipLevelInitialState: RelationshipLevelState = {
  data: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
    pageSize: Pagination.PAGESIZE,
  },
};

const slice = createSlice({
  name: 'relationshipLv',
  initialState: relationshipLevelInitialState,
  reducers: {
    setListRelationshipLevelAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataReationshipLevelType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    addRelationshipLevelAction(state, { payload }: PayloadAction<DataReationshipLevelType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        pageSize: state.pagination.pageSize + 1,
        totalRecords: state.pagination.totalRecords + 1,
      };
    },

    updateRelationshipLevelAction(state, { payload }: PayloadAction<DataReationshipLevelType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },

    deleteRelationshipLevelAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },
  },
});

export const {
  setListRelationshipLevelAction,
  addRelationshipLevelAction,
  updateRelationshipLevelAction,
  deleteRelationshipLevelAction,
} = slice.actions;
export default slice.reducer;
