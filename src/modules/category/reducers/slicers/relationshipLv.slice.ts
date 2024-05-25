import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RelationshipLvState = {
  data: DataReationshipLevelType[];
  pagination: PaginationAPI;
  report?: DataReationshipLevelType;
  totalExtend?: number;
};

export const relationshipLvInitialState: RelationshipLvState = {
  data: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
  },
};

const slice = createSlice({
  name: 'relationshipLv',
  initialState: relationshipLvInitialState,
  reducers: {
    setListRelationshipLvAction(
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
    addRelationshipLvAction(state, { payload }: PayloadAction<DataReationshipLevelType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        totalRecords: state.pagination.totalRecords + 1,
        totalPages: Math.ceil((state.pagination.totalRecords + 1) / Pagination.PAGESIZE),
      };
    },

    updateRelationshipLvAction(state, { payload }: PayloadAction<DataReationshipLevelType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },

    deleteRelationshipLvAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },
  },
});

export const {
  setListRelationshipLvAction,
  addRelationshipLvAction,
  updateRelationshipLvAction,
  deleteRelationshipLvAction,
} = slice.actions;
export default slice.reducer;
