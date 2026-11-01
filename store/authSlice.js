import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: null,
    token: null,
    refreshToken: null,
  },
  reducers: {
    authenticate(state, action) {
      const { login, token, refreshToken } = action.payload;

      state.login = login;
      state.token = token;
      state.refreshToken = refreshToken;
    },
    updateToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.login = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
