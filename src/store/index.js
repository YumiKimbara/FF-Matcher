import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import questionsReducer from "./questions";
import resultsReducer from "./results";

const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionsReducer,
    results: resultsReducer,
  },
});

export default store;
