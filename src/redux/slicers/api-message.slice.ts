import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ApiMessageState = {
  box: Record<string, MessageOptions | undefined>;
};

export const apiMessageInitialState: ApiMessageState = {
  box: {},
};

const slice = createSlice({
  name: "api-message",
  initialState: apiMessageInitialState,
  reducers: {
    setMessageAction(
      state,
      { payload }: PayloadAction<[string, MessageOptions | undefined]>
    ) {
      state.box[payload[0]] = payload[1];
    },
    clearMessageAction(state, { payload }: PayloadAction<string[]>) {
      for (const key of payload) {
        delete state.box[key];
      }
    },
  },
});

export const { setMessageAction, clearMessageAction } = slice.actions;
export default slice.reducer;
