import { configureStore } from "@reduxjs/toolkit";

import signinReducer from "./signin";
import loginReducer from "./login";
import questionsReducer from "./questions";

const store = configureStore({
  reducer: {
    signin: signinReducer,
    login: loginReducer,
    questions: questionsReducer,
  },
});

export default store;
