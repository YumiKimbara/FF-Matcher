import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { fetchedSession: "no data" };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    isLoggedIn(state, action) {
      state.fetchedSession = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
