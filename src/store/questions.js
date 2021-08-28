import { createSlice } from "@reduxjs/toolkit";

const initialQuestionsState = { fetchedData: [], clickedId: "" };

const questionsSlice = createSlice({
  name: "questions",
  initialState: initialQuestionsState,
  reducers: {
    getQuestions(state, action) {
      state.fetchedData = action.payload;
    },
    getClickedId(state, action) {
      state.clickedId = action.payload;
    },
  },
});

export const questionsActions = questionsSlice.actions;

export default questionsSlice.reducer;
