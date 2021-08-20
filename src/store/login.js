import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = { showLogin: false };

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    openLoginPage(state) {
      state.showLogin = true;
    },
    closeLoginPage(state) {
      state.showLogin = false;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
