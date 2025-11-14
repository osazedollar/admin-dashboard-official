// src/features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { adminSignin, adminLogout, refreshAccessToken } from "./authThunks";

interface AdminState {
  admin: any | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  admin: null,
  accessToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // SIGNIN
    builder
      .addCase(adminSignin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminSignin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(adminSignin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });

    // REFRESH TOKEN
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
    });

    // LOGOUT
    builder.addCase(adminLogout.fulfilled, (state) => {
      state.admin = null;
      state.accessToken = null;
    });
  },
});

export default authSlice.reducer;
