// src/features/dashboard/dashboardThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export interface SummaryStats {
  totalUsers: number;
  signupUsers: number;
  signinUsers: number;
  activeUsers: number;
  totalSessionHours: string;
  avgSessionMinutes: string;
}

export interface TopActiveUser {
  name: string;
  email: string;
  total_time_spent: string;
  total_sessions: number;
}

export interface RecentActivity {
  recentSignups: Array<{ name: string; email: string; activity_date: string; ip_address: string; details: string }>;
  recentSignins: Array<{ name: string; email: string; activity_date: string; ip_address: string; details: string }>;
}

export interface DashboardData {
  summary: SummaryStats ;
  insights: { topActiveUsers: TopActiveUser[] };
  recentActivity: RecentActivity;
  message: string;
}

// ✅ Fetch dashboard stats
export const fetchDashboardStats = createAsyncThunk<
  DashboardData,
  void,
  { rejectValue: string }
>("dashboard/fetchStats", async (_, thunkAPI) => {
  try {
    const res = await API.get<DashboardData>("/admin/activity-stats");
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch stats");
  }
});
