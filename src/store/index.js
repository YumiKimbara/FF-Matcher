import { configureStore } from "@reduxjs/toolkit";

import signinReducer from "./signin";
import loginReducer from "./login";

const store = configureStore({
  reducer: { signin: signinReducer, login: loginReducer },
});

export default store;
