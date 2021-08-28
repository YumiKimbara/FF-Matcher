import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "./signup";
import loginReducer from "./login";
import questionsReducer from "./questions";
import resultsReducer from "./results";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    questions: questionsReducer,
    results: resultsReducer,
  },
});

export default store;
