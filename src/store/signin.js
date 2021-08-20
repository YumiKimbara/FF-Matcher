import { createSlice } from "@reduxjs/toolkit";

const initialSigninState = { showSignin: false };

const signinSlice = createSlice({
  name: "signin",
  initialState: initialSigninState,
  reducers: {
    openSigninPage(state) {
      state.showSignin = true;
    },
    closeSigninPage(state) {
      state.showSignin = false;
    },
  },
});

export const signinActions = signinSlice.actions;

export default signinSlice.reducer;
