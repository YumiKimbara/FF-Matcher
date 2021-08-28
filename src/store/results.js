import { createSlice } from "@reduxjs/toolkit";

const initialResultsState = { fetchedData: [] };

const resultsSlice = createSlice({
  name: "results",
  initialState: initialResultsState,
  reducers: {
    getResults(state, action) {
      state.fetchedData = action.payload;
    },
  },
});

export const resultsActions = resultsSlice.actions;

export default resultsSlice.reducer;
