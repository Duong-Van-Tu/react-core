import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ExampleState = {
  exampleData: string;
};

export const exampleInitialState: ExampleState = {
  exampleData: '',
};

const slice = createSlice({
  name: 'example',
  initialState: exampleInitialState,
  reducers: {
    setExampleAction(state, { payload }: PayloadAction<string>) {
      state.exampleData = payload;
    },
  },
});

export const { setExampleAction } = slice.actions;
export default slice.reducer;
