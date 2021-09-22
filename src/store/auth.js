import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { fetchedSession: [] };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    // authToggle(state) {
    //   state.checkAuth = !state.checkAuth;
    // },
    isLoggedIn(state, action) {
      state.fetchedSession = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
