import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "./signup";
import loginReducer from "./login";
import questionsReducer from "./questions";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    questions: questionsReducer,
  },
});

export default store;
