// src/features/auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

interface SigninArgs {
  emailOrUsername: string;
  password: string;
}

interface AdminData {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface SigninResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  session_id: string
  admin: AdminData;
}

// 🔐 Admin Signin
export const adminSignin = createAsyncThunk<
  SigninResponse, // Return type
  SigninArgs,     // Argument type
  { rejectValue: string }
>(
  "auth/adminSignin",
  async ({ emailOrUsername, password }, thunkAPI) => {
    try {
      const res = await API.post<SigninResponse>("/admin/signin", {
        emailOrUsername,
        password,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      // Save session ID if backend returns it
      if (res.data.session_id) {
        localStorage.setItem("sessionId", res.data.session_id);
      }

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// 🔄 Refresh Token
export const refreshAccessToken = createAsyncThunk<
  { accessToken: string },
  void,
  { rejectValue: string }
>("auth/refreshToken", async (_, thunkAPI) => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return thunkAPI.rejectWithValue("No refresh token");

    const res = await API.post("/admin/refresh-token", { token: refreshToken });

    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  } catch {
    return thunkAPI.rejectWithValue("Refresh failed");
  }
});

// 🚪 Logout
export const adminLogout = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>("auth/adminLogout", async (_, thunkAPI) => {
  try {
    const session_id = localStorage.getItem("sessionId");
    if (!session_id) return thunkAPI.rejectWithValue("No session ID found");

    await API.post("/admin/logout", { session_id });

    // Clear storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("sessionId");

    return true;
  } catch {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});
