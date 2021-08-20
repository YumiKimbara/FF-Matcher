import { configureStore } from "@reduxjs/toolkit";

import signinReducer from "./signin";

const store = configureStore({
  reducer: { signin: signinReducer },
});

export default store;
