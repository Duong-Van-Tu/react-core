import { Pagination } from '@/constants/pagination';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProjectState = {
  data: DataProjectType[];
  pagination: PaginationAPI;
  report?: DataProjectType;
  totalExtend?: number;
  dataApplicationUser: DataProjectApplicationUserType[];
  dataStatus: ProjectStatus[];
};

export const projectInitialState: ProjectState = {
  data: [],
  dataApplicationUser: [],
  dataStatus: [],
  pagination: {
    pageIndex: Pagination.PAGEINDEX,
    totalPages: 0,
    totalRecords: 0,
    pageSize: Pagination.PAGESIZE,
  },
};

const slice = createSlice({
  name: 'project',
  initialState: projectInitialState,
  reducers: {
    setListProjectAction(
      state,
      {
        payload,
      }: PayloadAction<{
        data: DataProjectType[];
        pagination: PaginationAPI;
        totalExtend: number;
      }>,
    ) {
      state.data = payload.data;
      state.pagination = payload.pagination;
      state.totalExtend = payload.totalExtend;
    },
    addProjectAction(state, { payload }: PayloadAction<DataProjectType>) {
      state.data = [payload, ...state.data];
      state.pagination = {
        ...state.pagination,
        pageSize: state.pagination.pageSize + 1,
        totalRecords: state.pagination.totalRecords + 1,
      };
    },

    updateProjectAction(state, { payload }: PayloadAction<DataProjectType>) {
      state.data = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
    },

    deleteProjectAction(state, { payload }: PayloadAction<string[]>) {
      state.data = state.data.filter((item) => !payload.includes(item.id!));
    },

    setAllApplicationUserAction(
      state,
      { payload }: PayloadAction<{ dataApplicationUser: DataProjectApplicationUserType[] }>,
    ) {
      state.dataApplicationUser = payload.dataApplicationUser;
    },
    setDataStatusProjectAction(state, { payload }: PayloadAction<{ dataStatus: ProjectStatus[] }>) {
      state.dataStatus = payload.dataStatus;
    },
  },
});

export const {
  setListProjectAction,
  addProjectAction,
  deleteProjectAction,
  updateProjectAction,
  setAllApplicationUserAction,
  setDataStatusProjectAction,
} = slice.actions;
export default slice.reducer;
