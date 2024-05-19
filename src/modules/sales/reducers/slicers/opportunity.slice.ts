import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OpportunityInitialStateState = {
  data: DataOpportunityType[];
  pagination?: PaginationAPI;
  detail?: DataOpportunityType;
  status?: OpportunityStatus[];
  totalExtend?: number;
};

export const opportunityInitialState: OpportunityInitialStateState = {
  data: [],
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

    setDataOpportunityDetail(state, { payload }: PayloadAction<DataOpportunityType>) {
      state.detail = payload;
    },
  },
});

export const {
  setListOpportunityAction,
  addOpportunityAction,
  updateOpportunityAction,
  deleteOpportunityAction,
  setDataStatusAction,
  setDataOpportunityDetail,
} = slice.actions;
export default slice.reducer;
