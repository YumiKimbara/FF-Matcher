import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { checkAuth: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    authToggle(state) {
      state.checkAuth = !state.checkAuth;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
