// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./pages/auth/authSlice";
import dashboardReducer from "./pages/dashboardSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
  },
});

// Infer RootState & AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
