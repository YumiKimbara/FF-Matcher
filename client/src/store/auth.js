import { createSlice } from "@reduxjs/toolkit";

const jsonData = JSON.parse(localStorage.getItem("login"));

const initialAuthState = { fetchedSession: jsonData ? jsonData : "" };

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
